"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/api";

export default function OrdersPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-zinc-800 rounded-lg p-6 h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

        {orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-zinc-800 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium">
                      Order #{order.id.slice(0, 8)}
                    </h3>
                    <p className="text-sm text-zinc-400">{order.created_at}</p>
                  </div>
                  <div className="text-right">
                    <a
                      href={order.tracking.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Track Order
                    </a>
                  </div>
                </div>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <pre className="text-wrap">
                        {JSON.stringify(item, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-800 rounded-lg p-6 text-center">
            <p className="text-zinc-400">You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
