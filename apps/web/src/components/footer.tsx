import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-auto py-4 text-center text-sm text-gray-400">
      <Link
        href="https://github.com/Hacksore/terminalcoffee.shop"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-orange-400 transition-colors"
      >
        View source on gitHub
      </Link>
    </footer>
  );
}; 