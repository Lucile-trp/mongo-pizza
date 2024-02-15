import { connectToDatabase } from "@/libs/MongoClient";
import { OrderService } from "@/services/OrderService";

export const Button = () => {
  async function dataLoading() {
    fetch("/api/orders")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div>
      <button onClick={() => dataLoading()}>Récupérer les commandes</button>
    </div>
  );
};
