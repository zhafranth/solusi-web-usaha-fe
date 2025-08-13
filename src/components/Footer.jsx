import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const services = [
    "Website Company Profile",
    "E-Commerce Development",
    "Web Application",
    "SEO Optimization",
    "UI/UX Design",
    "Maintenance & Support"
  ]

  const quickLinks = [
    { name: "Beranda", href: "#home" },
    { name: "Layanan", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Tentang Kami", href: "#about" },
    { name: "Kontak", href: "#contact" },
    { name: "Blog", href: "#blog" }
  ]

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#", name: "Facebook" },
    { icon: <Instagram size={20} />, href: "#", name: "Instagram" },
    { icon: <Linkedin size={20} />, href: "#", name: "LinkedIn" },
    { icon: <Twitter size={20} />, href: "#", name: "Twitter" }
  ]

  return (
    <footer className="bg-primary-blue text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-heading font-bold mb-6">
              SolusiWeb Usaha
            </h3>
            <p className="text-blue-100 font-body mb-6 leading-relaxed">
              Membantu UMKM dan perusahaan dalam transformasi digital dengan solusi web yang profesional, inovatif, dan terpercaya.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary-green" />
                <span className="text-blue-100 font-body text-sm">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary-green" />
                <span className="text-blue-100 font-body text-sm">info@solusiwebusaha.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-primary-green" />
                <span className="text-blue-100 font-body text-sm">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">
              Layanan Kami
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#services" 
                    className="text-blue-100 hover:text-primary-green transition-colors font-body text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">
              Menu Cepat
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-blue-100 hover:text-primary-green transition-colors font-body text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6">
              Tetap Terhubung
            </h4>
            <p className="text-blue-100 font-body text-sm mb-4">
              Dapatkan tips dan update terbaru tentang teknologi web.
            </p>
            
            {/* Newsletter Form */}
            <div className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-4 py-2 rounded-l-lg border-0 text-gray-800 font-body text-sm focus:ring-2 focus:ring-primary-green"
                />
                <button className="bg-primary-green hover:bg-primary-green/90 px-4 py-2 rounded-r-lg transition-colors">
                  <Mail size={16} />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-blue-100 font-body text-sm mb-3">Ikuti Kami:</p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="bg-white/10 hover:bg-primary-green p-2 rounded-lg transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-blue-400/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-blue-100 font-body text-sm">
              © {currentYear} SolusiWeb Usaha. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-100 hover:text-primary-green transition-colors font-body text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-blue-100 hover:text-primary-green transition-colors font-body text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-blue-100 hover:text-primary-green transition-colors font-body text-sm">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer