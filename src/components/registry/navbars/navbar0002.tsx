export function Navbar0002({
  logo = "/logo.png",
  links = ["Home", "Courses", "About", "Contact"],
  bgColor = "#1f2937",
}) {
  return (
    <nav style={{ backgroundColor: bgColor }} className="shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
            <span className="text-white text-xl font-bold">EduPlatform</span>
          </div>
          <ul className="flex gap-8">
            {links.map((link, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition font-medium"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <button className="text-white px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-gray-900 transition">
              Login
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
