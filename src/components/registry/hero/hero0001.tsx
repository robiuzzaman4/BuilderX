export default function Hero0001({ 
  title = "Learn Anything, Anytime", 
  subtitle = "Access thousands of courses from world-class instructors",
  buttonText = "Start Learning",
  bgImage = "/hero-bg.jpg"
}) {
  return (
    <section 
      className="relative bg-cover bg-center min-h-[600px] flex items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg">
          {buttonText}
        </button>
      </div>
    </section>
  );
}