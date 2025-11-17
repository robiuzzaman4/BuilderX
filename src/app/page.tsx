import Link from "next/link";

const HomePage = () => {
  return (
    <main className="min-h-screen w-full bg-zinc-50 flex items-center justify-center gap-6">
      <Link
        href="/auth/sign-in"
        className="px-3 py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:cursor-pointer"
      >
        Get Started
      </Link>
    </main>
  );
};

export default HomePage;
