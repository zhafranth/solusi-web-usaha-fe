import { Button } from "./ui/button"
import { Menu, X, User, LogOut } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import ScrollProgressBar from "./ScrollProgressBar"
import { useAuth } from "../hooks/useAuth"
import { useLogout } from "../services/authService"
import LoginForm from "./LoginForm"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const location = useLocation()
  const { isAuthenticated, user } = useAuth()
  const logoutMutation = useLogout()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`
      return
    }
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const handleLoginClick = () => {
    setShowLoginForm(true)
  }

  const handleCloseLogin = () => {
    setShowLoginForm(false)
  }

  return (
    <>
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-heading font-bold text-primary-blue hover:text-primary-blue/90 transition-colors">
              SolusiWeb Usaha
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-blue transition-colors font-body">
              Beranda
            </Link>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-primary-blue transition-colors font-body">
              Layanan
            </button>
            <Link to="/blog" className="text-gray-700 hover:text-primary-blue transition-colors font-body">
              Blog
            </Link>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-primary-blue transition-colors font-body">
              Tentang
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-primary-blue transition-colors font-body">
              Kontak
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-primary-blue transition-colors">
                  <User size={20} />
                  <span className="font-body">{user?.name || 'Dashboard'}</span>
                </Link>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-body"
                  disabled={logoutMutation.isPending}
                >
                  <LogOut size={16} className="mr-2" />
                  {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button onClick={handleLoginClick} variant="outline" className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-body">
                  Login
                </Button>
                <Button onClick={() => scrollToSection('contact')} className="bg-primary-green hover:bg-primary-green/90 text-white font-body">
                  Konsultasi Gratis
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary-blue transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-primary-blue transition-colors font-body">
                Beranda
              </Link>
              <button onClick={() => { scrollToSection('services'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-blue transition-colors font-body">
                Layanan
              </button>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-primary-blue transition-colors font-body">
                Blog
              </Link>
              <button onClick={() => { scrollToSection('about'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-blue transition-colors font-body">
                Tentang
              </button>
              <button onClick={() => { scrollToSection('contact'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-blue transition-colors font-body">
                Kontak
              </button>
              <div className="px-3 py-2 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-primary-blue transition-colors font-body">
                      <User size={20} />
                      <span>{user?.name || 'Dashboard'}</span>
                    </Link>
                    <Button 
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-body"
                      disabled={logoutMutation.isPending}
                    >
                      <LogOut size={16} className="mr-2" />
                      {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => { handleLoginClick(); setIsMenuOpen(false); }} variant="outline" className="w-full border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-body">
                      Login
                    </Button>
                    <Button onClick={() => { scrollToSection('contact'); setIsMenuOpen(false); }} className="w-full bg-primary-green hover:bg-primary-green/90 text-white font-body">
                      Konsultasi Gratis
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
     <ScrollProgressBar />
     
     {/* Login Form Modal */}
     {showLoginForm && (
       <LoginForm onClose={handleCloseLogin} />
     )}
     </>
  )
}

export default Header