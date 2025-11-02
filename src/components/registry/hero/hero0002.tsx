export function Hero0002({
  title = "Learn Anything, Anytime",
  subtitle = "Access thousands of courses from world-class instructors",
  buttonText = "Start Learning",
}) {
  return (
    <section className="relative bg-cover bg-center min-h-[600px] flex items-center">
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="h-9 rounded-full bg-blue-50 border border-blue-300 text-blue-600 w-fit px-4 py-1.5 grid place-items-center mb-10 font-medium">
          #1 LMS Platform
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg">
          {buttonText}
        </button>
      </div>
    </section>
  );
}
