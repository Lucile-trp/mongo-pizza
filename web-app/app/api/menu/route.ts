import { connectToDatabase } from "@/libs/MongoClient";
import { OrderService } from "@/services/OrderService";
import fs from "fs";

export async function GET() {
  const client = await connectToDatabase();
  const service = new OrderService(client);
  const data = await service.getMenu();

  let tmp = {};
  for (const a of data) {
    tmp = {
      ...a,
      id: crypto.randomUUID(),
    };

    data[data.indexOf(a)] = tmp;
  }
  console.log(data, "data");
  const fileName: string = "menu.json";

  //Create a json file inside the public folder with the menu data
  const menu = JSON.stringify(data);
  const publicFolderPath = process.cwd() + "/public";
  fs.writeFileSync(publicFolderPath + fileName, menu);

  //Return the file as a response
  return new Response(menu, {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="menu.json"',
    },
  });
}
