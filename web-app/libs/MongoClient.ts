// const { MongoClient } = require("mongodb");
// or as an es module:
import { MongoClient } from "mongodb";

// Connection URL
const url: string = process.env.MONGODB_URI as string;
// const client: MongoClient = new MongoClient(url);

// async function main() {
//   // Use connect method to connect to the server
//   return await client.connect();
//   console.log("Connected successfully to server");
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

export async function connectToDatabase() {
  const client: MongoClient = new MongoClient(
    process.env.MONGODB_URI as string
  );

  await client.connect();

  console.log(`Successfully connected to database`);

  return client;
}
