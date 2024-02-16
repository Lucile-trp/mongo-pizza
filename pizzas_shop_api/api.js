import express from "express";
import { connectToDatabase } from "./lib/mongoClient.js";
import { PizzaShopService } from "./services/pizzaShopService.js";
import bodyParser from "body-parser";

const app = express();
const port = 3003;
const client = await connectToDatabase();
const service = new PizzaShopService(client);

app.use(bodyParser.json());

app.post("/carts", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  const { pizzas } = req.body;
  console.log(pizzas);

  res.send("YOLO");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
