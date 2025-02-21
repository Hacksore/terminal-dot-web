import Terminal from "@terminaldotshop/sdk";

const client = new Terminal({
  bearerToken: process.env["TERMINAL_BEARER_TOKEN"],
});

const getProducts = async () => {
  const product = await client.product.list();

  const skus = product.data.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
    };
  })

  return skus;
}

export default async function Home() {
  const data = await getProducts();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {data.map((skus) => (
          <div key={skus.id} className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">{skus.name}</h1>
            <p>{skus.description}</p>
          </div>
        ))}

      </main>

    </div>
  );
}
