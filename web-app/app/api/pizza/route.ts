import { connectToDatabase } from "@/libs/MongoClient";
import { OrderService } from "@/services/OrderService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const client = await connectToDatabase();
  const service = new OrderService(client);

  const formData = await request.formData();
  const pizza: string = formData.get("pizza") as string;

  const data = await service.getOrderByPizza(pizza);

  console.log(data, "pizza data");

  return NextResponse.json(data, { status: 200 });
}
