export function Footer0002({
  companyName = "BuilderX LMS",
  description = "Empowering learners worldwide with quality education and innovative learning experiences.",
  links = {
    platform: ["About Us", "How It Works", "Pricing", "Become Instructor"],
    courses: [
      "Browse Courses",
      "Categories",
      "Popular Courses",
      "Free Resources",
    ],
    support: ["Help Center", "FAQs", "Contact Support", "System Status"],
    legal: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "Refund Policy",
    ],
  },
  bgColor = "#ffffff",
}) {
  return (
    <footer style={{ backgroundColor: bgColor }} className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-blue-600">
                {companyName}
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-blue-100 hover:bg-blue-600 rounded-full flex items-center justify-center text-blue-600 hover:text-white transition"
              >
                <span className="text-lg">f</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-100 hover:bg-blue-600 rounded-full flex items-center justify-center text-blue-600 hover:text-white transition"
              >
                <span className="text-lg">𝕏</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-100 hover:bg-blue-600 rounded-full flex items-center justify-center text-blue-600 hover:text-white transition"
              >
                <span className="text-lg">in</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-100 hover:bg-blue-600 rounded-full flex items-center justify-center text-blue-600 hover:text-white transition"
              >
                <span className="text-lg">📸</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-2">
              {links.platform.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Courses</h4>
            <ul className="space-y-2">
              {links.courses.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2">
              {links.support.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © 2024 {companyName}. All rights reserved.
            </p>
            <div className="flex gap-6">
              {links.legal.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600 transition"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
