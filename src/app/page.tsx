import Link from "next/link";

const HomePage = () => {
  return (
    <main className="min-h-screen w-full bg-zinc-50 flex items-center justify-center gap-6">
      <Link
        href="/demo1"
        className="px-3 py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:cursor-pointer"
      >
        Demo 1
      </Link>
      <Link
        href="/demo2"
        className="px-3 py-2 rounded-md bg-cyan-500 text-white text-sm font-medium hover:cursor-pointer"
      >
        Demo 2
      </Link>
      <Link
        href="/demo3"
        className="px-3 py-2 rounded-md bg-fuchsia-500 text-white text-sm font-medium hover:cursor-pointer"
      >
        Demo 3
      </Link>
    </main>
  );
};

export default HomePage;
