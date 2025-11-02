export function Footer0001({
  companyName = "EduPlatform",
  description = "Empowering learners worldwide with quality education",
  links = {
    company: ["About", "Careers", "Press", "Contact"],
    resources: ["Blog", "Help Center", "Community", "Support"],
    legal: ["Privacy", "Terms", "Cookie Policy"],
  },
  socials = ["Facebook", "Twitter", "LinkedIn", "Instagram"],
  bgColor = "#1f2937",
}) {
  return (
    <footer
      style={{ backgroundColor: bgColor }}
      className="text-gray-300 py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">{companyName}</h3>
            <p className="text-sm mb-4">{description}</p>
            <div className="flex gap-3">
              {socials.map((social, index) => (
                <a key={index} href="#" className="hover:text-white transition">
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm">© 2024 {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
