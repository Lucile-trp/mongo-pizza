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

  async getOrderBySize(size: string) {
    const db = this.client.db("pizzas_orders_db");
    const collection = db.collection("orders");
    return collection.find({ size: size }).toArray();
  }

  async getOrderByPizza(pizza: string) {
    const db = this.client.db("pizzas_orders_db");
    const collection = db.collection("orders");
    return collection.find({ name: pizza }).toArray();
  }
}
