import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-auto py-4 text-center text-sm text-gray-400">
      <div className="space-y-2">
        <Link
          href="https://github.com/Hacksore/terminalcoffee.shop"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors"
        >
          View source on gitHub
        </Link>
        <p>
          This site is not affiliated with{" "}
          <a
            href="https://terminal.shop"
            className="underline hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            terminal.shop
          </a>{" "}
          and but it is using their{" "}
          <a
            href="https://www.terminal.shop/api"
            className="underline hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            offical API
          </a>
        </p>
      </div>
    </footer>
  );
};
