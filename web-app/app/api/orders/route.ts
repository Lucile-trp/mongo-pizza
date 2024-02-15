import { connectToDatabase } from "@/libs/MongoClient";
import { OrderService } from "@/services/OrderService";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await connectToDatabase();
  const service = new OrderService(client);

  const orders = await service.getOrders();

  console.log(orders);

  return NextResponse.json(orders, { status: 200 });
}
