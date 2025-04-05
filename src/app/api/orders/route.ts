import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/auth";
import Terminal from "@terminaldotshop/sdk";

export async function GET() {
  const bearerToken = await getAccessToken();

  if (!bearerToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = new Terminal({
    bearerToken,
  });

  // Use the access token to make requests to the Terminal API
  const orders = await client.order.list();

  return NextResponse.json(orders.data);
}
