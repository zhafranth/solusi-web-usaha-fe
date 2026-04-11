import { Button } from "./ui/button"
import { Menu, X, User, LogOut, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import ScrollProgressBar from "./ScrollProgressBar"
import { useAuth } from "../hooks/useAuth"
import { useLogout } from "../services/authService"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const { isAuthenticated, user } = useAuth()
  const { logout: handleLogoutAction } = useLogout()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`
      return
    }
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    handleLogoutAction()
  }

  const navItems = [
    { label: "Beranda", type: "link", to: "/" },
    { label: "Layanan", type: "scroll", target: "services" },
    { label: "Blog", type: "link", to: "/blog" },
    { label: "Tentang", type: "scroll", target: "about" },
    { label: "Kontak", type: "scroll", target: "contact" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-glass border-b border-gray-100/50'
            : 'bg-white/95 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-blue to-primary-green flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-heading font-bold text-sm">SW</span>
              </div>
              <span className="text-lg font-heading font-bold text-gray-900 group-hover:text-primary-blue transition-colors">
                SolusiWeb
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                item.type === "link" ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-blue transition-colors rounded-lg hover:bg-primary-blue/5"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.target)}
                    className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-blue transition-colors rounded-lg hover:bg-primary-blue/5"
                  >
                    {item.label}
                  </button>
                )
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-blue rounded-lg hover:bg-primary-blue/5 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-blue to-primary-green flex items-center justify-center">
                      <User size={14} className="text-white" />
                    </div>
                    <span>{user?.name || 'Dashboard'}</span>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 rounded-xl"

                  >
                    <LogOut size={14} className="mr-1.5" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => scrollToSection('contact')}
                  size="sm"
                  className="bg-primary-blue hover:bg-primary-blue/90 text-white rounded-xl shadow-md shadow-primary-blue/25 hover:shadow-lg hover:shadow-primary-blue/30 transition-all"
                >
                  Konsultasi Gratis
                  <ArrowRight size={14} className="ml-1.5" />
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:text-primary-blue hover:bg-primary-blue/5 transition-all"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-gray-100/50"
            >
              <div className="px-4 py-4 space-y-1 bg-white/95 backdrop-blur-xl">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {item.type === "link" ? (
                      <Link
                        to={item.to}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-primary-blue hover:bg-primary-blue/5 rounded-xl transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => scrollToSection(item.target)}
                        className="block w-full text-left px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-primary-blue hover:bg-primary-blue/5 rounded-xl transition-colors"
                      >
                        {item.label}
                      </button>
                    )}
                  </motion.div>
                ))}
                <div className="pt-3 mt-2 border-t border-gray-100">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-primary-blue rounded-xl"
                      >
                        <User size={16} />
                        <span>{user?.name || 'Dashboard'}</span>
                      </Link>
                      <Button
                        onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                        variant="outline"
                        className="w-full border-red-200 text-red-500 hover:bg-red-50 rounded-xl"
    
                      >
                        <LogOut size={14} className="mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => { scrollToSection('contact'); setIsMenuOpen(false); }}
                      className="w-full bg-primary-blue text-white rounded-xl"
                    >
                      Konsultasi Gratis
                      <ArrowRight size={14} className="ml-1.5" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      <ScrollProgressBar />
    </>
  )
}

export default Header
