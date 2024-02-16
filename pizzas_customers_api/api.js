import express from "express";
import { connectToDatabase } from "./lib/mongoClient.js";
import { CustomerService } from "./services/customerService.js";
import bodyParser from "body-parser";

const app = express();
const port = 3002;
const client = await connectToDatabase();
const service = new CustomerService(client);

app.use(bodyParser.json());

app.post("/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await service.signup(email, password);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Signup failed", error: error.message });
  }
});

app.post("/auth/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await service.signin(email, password);
    res.status(200).json({ message: "User signed in successfully", token });
  } catch (error) {
    res.status(401).json({ message: "Signin failed", error: error.message });
  }
});

app.post("/auth/verify", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new Error("No token provided");
    }

    console.log(token, "token");
    await service.verifyToken(token);

    res.status(200).json({ message: "Token verified successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Token verification failed", error: error.message });
  }
});

app.get("/customers/me", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Suppose que le token est fourni dans l'en-tête d'autorisation
    const user = await service.getUserDetails(token);
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
