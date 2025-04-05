import Terminal from "@terminaldotshop/sdk";
import { App } from "./app";
export { metadata } from "./metadata";

const client = new Terminal({
  bearerToken: process.env.TERMINAL_BEARER_TOKEN,
});

export default async function Home() {
  const { data } = await client.product.list();

  return <App data={data} />;
}
