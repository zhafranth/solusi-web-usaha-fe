import { Button } from "./ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-primary-blue to-primary-blue/90 text-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-heading font-bold leading-tight">
                Wujudkan Bisnis Digital Anda Bersama
                <span className="text-primary-green block mt-2">
                  SolusiWeb Usaha
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 font-body leading-relaxed">
                Kami membantu UMKM dan perusahaan membangun website dan aplikasi web yang profesional, responsif, dan menguntungkan.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-primary-green" size={20} />
                <span className="font-body text-lg">Website Responsif & Modern</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-primary-green" size={20} />
                <span className="font-body text-lg">SEO Optimized untuk Ranking Google</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-primary-green" size={20} />
                <span className="font-body text-lg">Maintenance & Support 24/7</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary-green hover:bg-primary-green/90 text-white font-body text-lg px-8 py-4"
              >
                Mulai Konsultasi Gratis
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary-blue font-body text-lg px-8 py-4"
              >
                Lihat Portfolio
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-blue-400/30">
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary-green">50+</div>
                <div className="text-blue-100 font-body">Klien Puas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary-green">100+</div>
                <div className="text-blue-100 font-body">Project Selesai</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary-green">24/7</div>
                <div className="text-blue-100 font-body">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="h-4 bg-primary-green rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-white/40 rounded w-1/2"></div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="h-4 bg-primary-green rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-white/40 rounded w-3/4"></div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="h-4 bg-primary-green rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-white/40 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary-green rounded-full p-4">
              <CheckCircle className="text-white" size={24} />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white/20 backdrop-blur-sm rounded-full p-3">
              <div className="w-6 h-6 bg-primary-green rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero