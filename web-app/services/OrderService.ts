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

  async getTotalPizzaOrder() {
    const db = this.client.db("pizzas_orders_db");
    const collection = db.collection("orders");

    return collection
      .aggregate([
        {
          $group: {
            _id: "$name",
            total: { $sum: 1 },
          },
        },
      ])
      .toArray();
  }

  async getTotalPrice() {
    const db = this.client.db("pizzas_orders_db");
    const collection = db.collection("orders");

    return collection.aggregate([
      {
        $project: {
          _id: null,
          price: 1,
          quantity: 1,
          totalPizzaSold: {
            $multiply: ["$price", "$quantity"],
          },
        },
      },
    ]);
  }

  async getMediumSizeQuantityOrder() {
    const db = this.client.db("pizzas_orders_db");
    const collection = db.collection("orders");

    return collection.aggregate([
      {
        $match: { size: "medium" },
      },
      {
        $group: {
          _id: "$name",
          totalQuantityMedium: { $sum: "$quantity" },
        },
      },
    ]);
  }

  async getAverageNumberOfPizzaSold() {
    const db = this.client.db("pizzas_orders_db");
    const collection = db.collection("orders");

    return collection.aggregate([
      {
        $group: {
          _id: null,
          totalPizzas: { $sum: "$quantity" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $project: {
          moyenne: { $divide: ["$totalPizzas", "$totalOrders"] },
        },
      },
    ]);
  }
}
