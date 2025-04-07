"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/api";
import { format } from "date-fns";

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
                    <h2 className="text-xl font-bold">Order #{order.id}</h2>
                    <p className="text-zinc-400">
                      {format(new Date(order.created_at), "MMMM d, yyyy")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      ${(order.total / 100).toFixed(2)}
                    </p>
                    <p className="text-sm text-zinc-400 capitalize">
                      {order.status}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.variant && (
                          <p className="text-sm text-zinc-400">
                            {item.variant.name} x {item.quantity}
                          </p>
                        )}
                      </div>
                      <p className="font-medium">
                        ${((item.price * item.quantity) / 100).toFixed(2)}
                      </p>
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
