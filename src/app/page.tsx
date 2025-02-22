import Terminal from "@terminaldotshop/sdk";

const client = new Terminal({
  bearerToken: process.env["TERMINAL_BEARER_TOKEN"],
});

type ProductList = Awaited<ReturnType<typeof client.product.list>>;
type Product = ProductList["data"][number];

const getProducts = async () => {
  const product = await client.product.list();

  const skus = product.data.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      tags: product.tags,
      order: product.order || 0,
      variants: product.variants,
    } satisfies Product;
  })

  return skus;
}

const ProductCard = ({ sku }: { sku: Product }) => {
  return (
    <div className="flex flex-col gap-2 max-w-2xl">
      <h1 className="text-3xl font-bold">{sku.name}</h1>
      <p>{sku.description}</p>
      <p className="text-sm text-gray-500">{JSON.stringify(sku.tags)}</p>
    </div>
  );
}

export default async function Home() {
  const data = await getProducts();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-4xl font-bold">Terminal Coffee</h2>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {data.map((sku) => (
          <ProductCard key={sku.id} sku={sku} />
        ))}
      </main>

    </div>
  );
}
