import express from "express";
import { connectToDatabase } from "./lib/mongoClient.js";
import { PizzaMenuService } from "./services/pizzaMenuService.js";

const app = express();
const port = 3001;
const client = await connectToDatabase();
const service = new PizzaMenuService(client);

app.get("/pizza", async (req, res) => {
  const pizzas = await service.getAllPizzas();
  res.send(pizzas);
});

app.get("/pizza/:id", async (req, res) => {
  const pizza = await service.getPizzaById(req.params.id);
  res.send(pizza);
});

app.get("/pizza/:id/declinaisons/:size", async (req, res) => {
  const pizza = await service.getPizzaByIdAndSize(
    req.params.id,
    req.params.size
  );
  res.send(pizza);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
