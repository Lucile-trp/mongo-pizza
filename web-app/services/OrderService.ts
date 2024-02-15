import { MongoClient } from "mongodb";

export class OrderService {
  client: MongoClient;

  constructor(mongoClient: MongoClient) {
    this.client = mongoClient;
  }

  async getOrders() {
    const db = this.client.db("pizzas_orders_db");
    const collection = db.collection("orders");
    return collection.find({}).toArray();
  }
}
