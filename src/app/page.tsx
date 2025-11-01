import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  return (
    <section className="h-screen w-full grid place-items-center">
      <Button asChild>
        <Link href="/sign-in">Get Started</Link>
      </Button>
    </section>
  );
};

export default HomePage;
