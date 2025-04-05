import Terminal from "@terminaldotshop/sdk";
import { App } from "./app";
export { metadata } from "./metadata";

const client = new Terminal({
  bearerToken: process.env.TERMINAL_BEARER_TOKEN,
});

const CRON_PRODUCT_ID = "prd_01JD0E7PD4H3XDZA5P5VXSDPQC";

export default async function Home() {
  const { data } = await client.product.list();

  const filteredData = data.filter((product) => product.id !== CRON_PRODUCT_ID);
  return <App data={filteredData} />;
}
