import { MongoClient } from "mongodb";
import "dotenv/config";

export async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);

  await client.connect();

  console.log(`Successfully connected to database`);

  return client;
}
