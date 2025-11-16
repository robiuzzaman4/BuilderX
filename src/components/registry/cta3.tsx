const Cta3 = () => {
  return (
    <section className="py-12 bg-white border-b border-zinc-200">
      <div className="h-full w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="space-y-6">
            <div className="bg-fuchsia-50 text-fuchsia-500 py-1 px-4 w-fit mx-auto rounded-md text-sm font-medium">
              Get Started
            </div>
            <h2 className="text-4xl text-center font-medium leading-tight text-balance">
              Ready to transform your business?
            </h2>
            <p className="text-center text-zinc-500 text-sm lg:text-lg max-w-2xl mx-auto">
              Join thousands of companies already using our platform to
              streamline their workflow and boost productivity.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-3 py-2 rounded-md bg-fuchsia-500 text-white text-sm font-medium hover:cursor-pointer">
              Start Free Trial
            </button>
            <button className="px-3 py-2 rounded-md bg-zinc-100 text-fuchsia-500 text-sm font-medium hover:cursor-pointer">
              See Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta3;
