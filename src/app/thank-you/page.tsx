import { metadata as allMetadata } from "../metadata";

export const metadata = {
  ...allMetadata,
  title: "Thank You",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-2xl w-full mt-20 mx-auto">
        <h1 className="text-3xl font-bold mb-8">Thank You for Your Order!</h1>

        <div className="bg-zinc-800 rounded-lg p-8 mb-8">
          <div className="space-y-6">
            <p className="text-lg">
              Your order has been received and is being processed. We've sent a
              confirmation email to your inbox with all the details.
            </p>
            <p className="text-zinc-400">
              Please check your email for updates on your order status. If you
              have any questions, feel free to reach out to our support team.
            </p>
            <div className="pt-4 flex justify-end">
              <a
                href="/orders"
                className="inline-block bg-primary text-black px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                View Your Orders
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <a
            href="/"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}
