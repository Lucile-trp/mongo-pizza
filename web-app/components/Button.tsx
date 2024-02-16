import { connectToDatabase } from "@/libs/MongoClient";
import { OrderService } from "@/services/OrderService";
import { FormEvent } from "react";

export const Button = () => {
  async function dataLoading() {
    const response = await fetch("/api/orders");
    const data = await response.json();
    console.log(data);
  }

  async function onSubmitPizza(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    await fetch("/api/pizza", {
      method: "POST",
      body: formData,
    });
  }

  async function onSubmitSize(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    await fetch("/api/size", {
      method: "POST",
      body: formData,
    });
  }

  async function downloadMenu() {
    await fetch("/api/menu", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": 'attachment; filename="menu.json"',
      },
    });
  }

  return (
    <div>
      <button
        onClick={() => dataLoading()}
        className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Récupérer les commandes
      </button>
      <form
        method="post"
        onSubmit={onSubmitPizza}
        className="container w-1/2 mt-4"
      >
        <select
          name="pizza"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="Cheese">Cheese</option>
          <option value="Pepperoni">Pepperoni</option>
          <option value="Vegan">Vegan</option>
        </select>
        <button
          type="submit"
          className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Choisir ma pizza
        </button>
      </form>

      <form
        method="post"
        onSubmit={onSubmitSize}
        className="container w-1/2 mt-4"
      >
        <select
          name="size"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <button
          type="submit"
          className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Choisir ma taille
        </button>
      </form>
      <a
        href="/api/menu"
        download={true}
        className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-4"
      >
        Télécharger le menu
      </a>
    </div>
  );
};
