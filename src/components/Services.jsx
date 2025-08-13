import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Globe, Smartphone, ShoppingCart, Search, Palette, Headphones } from "lucide-react"

const Services = () => {
  const services = [
    {
      icon: <Globe className="text-primary-blue" size={48} />,
      title: "Website Company Profile",
      description: "Website profesional untuk memperkenalkan perusahaan Anda dengan desain modern dan responsif.",
      features: ["Desain Responsif", "SEO Friendly", "Admin Panel", "SSL Certificate"]
    },
    {
      icon: <ShoppingCart className="text-primary-blue" size={48} />,
      title: "E-Commerce Website",
      description: "Toko online lengkap dengan sistem pembayaran, manajemen produk, dan laporan penjualan.",
      features: ["Payment Gateway", "Inventory Management", "Order Tracking", "Multi Vendor"]
    },
    {
      icon: <Smartphone className="text-primary-blue" size={48} />,
      title: "Web Application",
      description: "Aplikasi web custom sesuai kebutuhan bisnis dengan fitur-fitur canggih dan user-friendly.",
      features: ["Custom Features", "Database Integration", "API Development", "Cloud Hosting"]
    },
    {
      icon: <Search className="text-primary-blue" size={48} />,
      title: "SEO Optimization",
      description: "Optimasi website untuk meningkatkan ranking di Google dan mendatangkan lebih banyak pengunjung.",
      features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Analytics Setup"]
    },
    {
      icon: <Palette className="text-primary-blue" size={48} />,
      title: "UI/UX Design",
      description: "Desain antarmuka yang menarik dan pengalaman pengguna yang optimal untuk website Anda.",
      features: ["User Research", "Wireframing", "Prototyping", "Design System"]
    },
    {
      icon: <Headphones className="text-primary-blue" size={48} />,
      title: "Maintenance & Support",
      description: "Layanan pemeliharaan website dan dukungan teknis 24/7 untuk menjaga performa optimal.",
      features: ["24/7 Support", "Regular Updates", "Backup Service", "Security Monitoring"]
    }
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-primary-blue mb-6">
            Layanan Kami
          </h2>
          <p className="text-xl text-gray-600 font-body max-w-3xl mx-auto leading-relaxed">
            Kami menyediakan berbagai layanan pengembangan web yang komprehensif untuk membantu bisnis Anda berkembang di era digital.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-heading font-bold text-gray-800">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 font-body">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600 font-body">
                      <div className="w-2 h-2 bg-primary-green rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-body"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg">
          <h3 className="text-3xl font-heading font-bold text-primary-blue mb-4">
            Siap Memulai Proyek Anda?
          </h3>
          <p className="text-lg text-gray-600 font-body mb-8 max-w-2xl mx-auto">
            Konsultasikan kebutuhan website atau aplikasi web Anda dengan tim ahli kami. Dapatkan penawaran terbaik dan solusi yang tepat untuk bisnis Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary-green hover:bg-primary-green/90 text-white font-body px-8"
            >
              Konsultasi Gratis Sekarang
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-body px-8"
            >
              Lihat Harga Paket
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services