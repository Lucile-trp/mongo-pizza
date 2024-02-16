import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class PizzaShopService {
  client = null;

  constructor(client) {
    this.client = client;
  }

  async createOrder(customerId, pizzas) {
    const data = {
      customer_id: customerId,
      date: new Date(),
      pizzas: [pizzas],
    };

    return data;
  }
}
