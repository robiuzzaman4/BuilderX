import Link from "next/link";

const Header3 = () => {
  return (
    <header className="h-16 bg-white border-b border-zinc-200">
      <div className="h-full w-full max-w-7xl mx-auto flex items-center justify-between gap-6 px-4">
        <Link
          href={"/"}
          className="font-bold hover:cursor-pointer text-fuchsia-500"
        >
          LOGO
        </Link>
        <button className="px-3 py-1.5 rounded-md bg-fuchsia-500 text-white text-sm font-medium hover:cursor-pointer">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header3;
