const Hero1 = () => {
  return (
    <section className="py-12 bg-white border-b border-zinc-200">
      <div className="h-full w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 px-4">
        {/* left section */}
        <div className="flex flex-col gap-6">
          <div className="bg-orange-50 text-orange-500 py-1 px-4 w-fit rounded-md text-sm font-medium">
            #1 Platform
          </div>
          <span className="space-y-2">
            <h2 className="text-3xl lg:text-5xl font-medium leading-tight">
              One platform for all your online teaching needs
            </h2>
            <p className="text-zinc-500">
              Stop spending on multiple tools to get your job done
            </p>
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:cursor-pointer">
              Get Started
            </button>
            <button className="px-3 py-2 rounded-md bg-zinc-100 text-orange-500 text-sm font-medium hover:cursor-pointer">
              See Demo
            </button>
          </div>
        </div>
        {/* right section */}
        <div className="min-h-60 h-full w-full bg-orange-50 border border-dashed border-orange-500 rounded-md flex items-center justify-center font-mono">
          {JSON.stringify(
            {
              name: "Hero1",
            },
            null,
            4
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero1;
