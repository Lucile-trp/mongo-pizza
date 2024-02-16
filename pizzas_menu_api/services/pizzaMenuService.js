import "dotenv/config";

export class PizzaMenuService {
  client = null;

  constructor(client) {
    this.client = client;
  }

  async getAllPizzas() {
    const db = this.client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection("pizzas_menu_db");
    return collection.find({}).toArray();
  }

  async getPizzaById(id) {
    const db = this.client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection("pizzas_menu_db");
    return collection.find({ id: id }).toArray();
  }

  async getPizzaByIdAndSize(id, size) {
    const db = this.client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection("pizzas_menu_db");
    return collection.find({ id: id, size: size }).toArray();
  }
}
