import { connectToDatabase } from "@/libs/MongoClient";
import { OrderService } from "@/services/OrderService";
import { NextResponse } from "next/server";
import fs from "fs";

export async function GET(response: NextResponse) {
  const client = await connectToDatabase();
  const service = new OrderService(client);
  const data = await service.getMenu();

  //Create a json file inside the public folder with the menu data
  const menu = JSON.stringify(data);
  const publicFolderPath = process.cwd() + "/public";
  fs.writeFileSync(publicFolderPath + "/menu.json", menu);

  response.headers.set("Content-Disposition", "attachment; filename=menu.json");

  return response.json();
}
