const Courses1 = () => {
  return (
    <section className="py-12 bg-white border-b border-zinc-200">
      <div className="h-full w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-12">
          <div className="space-y-6">
            <div className="bg-orange-50 text-orange-500 py-1 px-4 w-fit mx-auto rounded-md text-sm font-medium">
              Available Courses
            </div>
            <h2 className="text-2xl text-center font-medium leading-tight">
              Explore our all available courses
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="border border-zinc-200 h-full p-6 rounded-lg flex flex-col gap-6">
                <div className="min-h-60 w-full bg-orange-50 border border-dashed border-orange-500 flex items-center justify-center font-mono text-sm rounded-md">
                  {JSON.stringify(
                    {
                      thumbnail: "/thumbnail.png",
                    },
                    null,
                    4
                  )}
                </div>
                <span className="space-y-2">
                  <h2>Title - {index + 1}</h2>
                  <p className="text-sm">Description - {index + 1}</p>
                </span>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:cursor-pointer w-full">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses1;
