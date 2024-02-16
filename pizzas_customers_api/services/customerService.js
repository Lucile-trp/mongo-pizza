import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class CustomerService {
  client = null;

  constructor(client) {
    this.client = client;
  }

  async signup(email, password) {
    const db = this.client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection("customers");
    const user = await collection
      .findOne({ email })
      .catch((error) => console.error(error));

    if (user) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = crypto.randomUUID();

    const newUser = await collection
      .insertOne({ email, hashedPassword, id: uuid })
      .catch((error) => console.error(error));
    return newUser;
  }

  async signin(email, password) {
    const db = this.client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection("customers");
    const user = await collection
      .findOne({ email })
      .catch((error) => console.error(error));

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const payload = {
      id: user.id,
      expires: Math.round(new Date().getTime() / 1000) + 3600,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    //Store token in the database
    await collection
      .updateOne(
        { id: user.id },
        {
          $set: {
            token: token,
          },
        }
      )
      .catch((error) => console.error(error));

    delete user.hashedPassword;

    return {
      user: user,
      access_token: token,
    };
  }

  async verifyToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.expires < Math.round(new Date().getTime() / 1000)) {
      throw new Error("Token expired");
    }
    return true;
  }

  async getUserDetails(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const db = this.client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection("customers");
    const user = await collection
      .findOne({ id: decoded.id })
      .catch((error) => console.error(error));
    if (!user) {
      throw new Error("Invalid token");
    }

    delete user.hashedPassword;
    delete user.token;

    return user;
  }
}
