import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useTranslation } from "../hooks/useTranslation"

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const services = t("footer.services")
  const quickLinks = t("footer.quickLinks")
  const legal = t("footer.legal")

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
    { icon: Twitter, href: "#", name: "Twitter" }
  ]

  return (
    <footer className="relative bg-gray-950 text-white overflow-hidden">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-blue/50 to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src="/logo-luminara.png"
                  alt="Luminara Codex"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-heading font-bold">Luminara Codex</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {t("footer.description")}
            </p>

            <div className="space-y-3">
              <a
                href="https://wa.me/6285111371404"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 text-sm group"
              >
                <Phone size={14} className="text-primary-green flex-shrink-0" />
                <span className="group-hover:text-white transition-colors">+62 851-1137-1404</span>
              </a>
              <a
                href="mailto:info@luminaracodex.id"
                className="flex items-center gap-3 text-gray-400 text-sm group"
              >
                <Mail size={14} className="text-primary-green flex-shrink-0" />
                <span className="group-hover:text-white transition-colors">info@luminaracodex.id</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400 text-sm group">
                <MapPin size={14} className="text-primary-green flex-shrink-0" />
                <span className="group-hover:text-white transition-colors">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-heading font-semibold uppercase tracking-wider text-gray-300 mb-6">
              {t("footer.servicesTitle")}
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-gray-400 hover:text-primary-green text-sm transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-heading font-semibold uppercase tracking-wider text-gray-300 mb-6">
              {t("footer.menuTitle")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className="text-gray-400 hover:text-primary-green text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-heading font-semibold uppercase tracking-wider text-gray-300 mb-6">
              {t("footer.newsletterTitle")}
            </h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              {t("footer.newsletterDesc")}
            </p>

            <div className="flex mb-6">
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-l-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-blue/50 focus:bg-white/10 transition-all"
              />
              <button className="bg-primary-green hover:bg-primary-green/90 px-4 rounded-r-xl transition-colors flex items-center justify-center">
                <ArrowRight size={16} />
              </button>
            </div>

            <div>
              <p className="text-gray-500 text-xs mb-3 uppercase tracking-wider">{t("footer.followUs")}</p>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-green hover:border-primary-green transition-all"
                      aria-label={social.name}
                    >
                      <Icon size={16} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              &copy; {currentYear} Luminara Codex. {t("footer.copyright")}
            </div>
            <div className="flex gap-6">
              {legal.map((item) => (
                <a key={item} href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
