# mongo-pizza MAALSI 2023

- Lucile TRIPIER
- Grégory LEBLOND

## Questions partie 3

a. Quel est le montant total des commandes de pizzas (tous formats confondus)
?
| totalAmount |
| :--- |
| 2540 |

b. Combien de pizzas ont été commandées (toutes recettes et formats
confondus) ?
| totalOrder |
| :--- |
| 155 |

c. Combien de pizzas "Vegan" ont été commandées ?
| \_id | totalVeganPizzaOrdered |
| :--- | :--- |
| null | 20 |

d. Combien de pizzas ont été commandées en format "large" ?
| \_id | totalOrdered |
| :--- | :--- |
| null | 40 |

e. Quelle recette de pizza a été la plus vendue ?
| \_id | totalQuantity |
| :--- | :--- |
| Cheese | 75 |

f. Quel format de pizza a été le plus vendu ?
| \_id | totalQuantity |
| :--- | :--- |
| medium | 80 |

g. Quelle recette de pizza a rapporté le plus de revenus ?
| \_id | totalRevenue |
| :--- | :--- |
| Pepperoni | 1220 |

## Questions partie 4

| \_id      | totalQuantityMedium |
| :-------- | :------------------ |
| Cheese    | 50                  |
| Pepperoni | 20                  |
| Vegan     | 10                  |

| \_id | moyenne |
| :--- | :------ |
| 0    | 19.375  |

Implémentation en code

```ts
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
```

```ts
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
```
