import { getAccessToken } from "@/lib/auth";
import Terminal from "@terminaldotshop/sdk";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const bearerToken = await getAccessToken();

  if (!bearerToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = new Terminal({
    bearerToken,
  });

  if (!params?.entity) {
    return NextResponse.json({ error: "Entity parameter is required" }, { status: 400 });
  }

  const entityPath = Array.isArray(params.entity) ? params.entity.join("/") : params.entity;

  if (entityPath === "cards/list") {
    const cards = await client.card.list();
    return NextResponse.json({ data: cards.data });
  }

  if (entityPath === "address/list") {
    const cards = await client.address.list();
    return NextResponse.json({ data: cards.data });
  }

  return NextResponse.json({ entity: params.entity });
}
