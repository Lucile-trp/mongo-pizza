import { connectToDatabase } from "@/libs/MongoClient";
import { OrderService } from "@/services/OrderService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const client = await connectToDatabase();
  const service = new OrderService(client);

  const formData = await request.formData();
  const size: string = formData.get("size") as string;

  const data = await service.getOrderBySize(size);

  console.log(data, "size data");

  return NextResponse.json(data, { status: 200 });
}
