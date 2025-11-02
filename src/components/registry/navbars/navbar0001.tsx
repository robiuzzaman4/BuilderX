export function Navbar0001({
  links = ["Home", "Courses", "About", "Contact"],
  bgColor = "#ffffff",
}) {
  return (
    <nav style={{ backgroundColor: bgColor }} className="shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <p className="text-base font-medium cursor-pointer">BuilderX LMS</p>
        <ul className="flex gap-6">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Sign Up
        </button>
      </div>
    </nav>
  );
}
