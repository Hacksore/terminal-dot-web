import { getAccessToken } from "@/lib/auth";
import { API_URL } from "@/lib/constants";
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

  const resolvedParams = await params;
  if (!resolvedParams?.entity) {
    return NextResponse.json(
      { error: "Entity parameter is required" },
      { status: 400 },
    );
  }

  const entityPath = Array.isArray(resolvedParams.entity)
    ? resolvedParams.entity.join("/")
    : resolvedParams.entity;

  if (entityPath === "card/list") {
    const cards = await client.card.list();
    return NextResponse.json({ data: cards.data });
  }

  if (entityPath === "address/list") {
    const cards = await client.address.list();
    return NextResponse.json({ data: cards.data });
  }

  return NextResponse.json({ entity: params.entity });
}

export async function POST(request, { params }) {
  const bearerToken = await getAccessToken();
  const resolvedParams = await params;
  const body = await request.json().catch(() => null);

  if (!bearerToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = new Terminal({
    bearerToken,
  });

  if (!resolvedParams?.entity) {
    return NextResponse.json(
      { error: "Entity parameter is required" },
      { status: 400 },
    );
  }

  const entityPath = Array.isArray(resolvedParams.entity)
    ? resolvedParams.entity.join("/")
    : resolvedParams.entity;

  if (entityPath === "card/collect") {
    try {
      const response = await fetch(`${API_URL}/card/collect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      });
      return NextResponse.json(response);
    } catch (error) {
      console.error("Error creating card:", error);
      return NextResponse.json(
        { error: { message: `${error}` } },
        { status: 500 },
      );
    }
  }

  if (entityPath === "address/create") {
    try {
      const card = await client.address.create(body);
      return NextResponse.json({ data: card });
    } catch (error) {
      console.error("Error creating address:", error);
      return NextResponse.json(
        { error: { message: `${error}` } },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ entity: params.entity });
}
