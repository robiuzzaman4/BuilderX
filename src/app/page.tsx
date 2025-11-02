import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constant";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-white to-blue-50 grid place-items-center">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                The Future of Learning
              </span>
            </div>
          </div>

          {/* Headline & Subheadline */}
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Build Your{" "}
              <span className="text-blue-600">Learning Platform</span> in
              Minutes
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Drag, drop, and deploy. No coding required. Create stunning online
              courses and manage learners effortlessly with our intuitive
              platform builder.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold rounded-lg transition-colors"
              asChild
            >
              <Link href="/sign-in">
                Start Building Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-gray-300 text-gray-900 hover:bg-gray-50 px-8 py-6 text-base font-semibold rounded-lg bg-transparent"
            >
              <Link href={`${BASE_URL}/platform/rucourse`} target="_blank">
                See Demo
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
      </section>
    </main>
  );
};

export default HomePage;
