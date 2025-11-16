const Features2 = () => {
  return (
    <section className="py-12 bg-white border-b border-zinc-200">
      <div className="h-full w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-12">
          <div className="space-y-6">
            <div className="bg-cyan-50 text-cyan-500 py-1 px-4 w-fit mx-auto rounded-md text-sm font-medium">
              Features
            </div>
            <h2 className="text-2xl text-center font-medium leading-tight">
              What would you get?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="border border-zinc-200 h-full p-6 rounded-lg flex flex-col md:flex-row gap-6"
              >
                <div className="min-h-60 w-full md:w-60 bg-cyan-50 border border-dashed border-cyan-500 flex items-center justify-center font-mono text-sm rounded-md">
                  {`cirtificate`}
                </div>
                <div className="flex flex-col gap-6">
                  <span className="space-y-2">
                    <h2>Earn Certificate - {index + 1}</h2>
                    <p className="text-sm text-zinc-500">
                      Get the right professional certificate program for you.
                    </p>
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-2 rounded-md bg-cyan-500 text-white text-sm font-medium hover:cursor-pointer">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features2;
