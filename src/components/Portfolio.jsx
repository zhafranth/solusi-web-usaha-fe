import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

const portfolioItems = [
  {
    title: "Toko Online Fashion",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    description: "Platform e-commerce lengkap dengan payment gateway dan inventory management.",
  },
  {
    title: "Website Klinik Kesehatan",
    category: "Company Profile",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop",
    description: "Website profesional dengan fitur booking online dan informasi layanan.",
  },
  {
    title: "Sistem Manajemen Restoran",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    description: "Aplikasi manajemen pesanan, inventaris, dan laporan penjualan real-time.",
  },
  {
    title: "Landing Page Startup",
    category: "Landing Page",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    description: "Landing page konversi tinggi dengan desain modern dan animasi interaktif.",
  },
  {
    title: "Portal Berita Daerah",
    category: "CMS",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
    description: "Platform berita dengan CMS custom, multi-author, dan SEO optimized.",
  },
  {
    title: "Dashboard Analitik UMKM",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    description: "Dashboard interaktif untuk monitoring penjualan dan performa bisnis.",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-green/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-blue/[0.03] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-green/5 border border-primary-green/10 text-primary-green text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-green animate-pulse" />
            Hasil Kerja Kami
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6 text-balance">
            Karya yang Sudah{" "}
            <span className="gradient-text">Kami Wujudkan</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Beberapa project terbaik yang telah kami kerjakan untuk klien dari
            berbagai industri dan skala bisnis.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-card-hover hover:border-gray-200/50 hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 rounded-full border border-white/50">
                      {item.category}
                    </span>
                  </div>

                  {/* Arrow on hover */}
                  <motion.div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/50">
                    <ArrowUpRight size={16} className="text-primary-blue" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-heading font-bold text-gray-900 mb-2 group-hover:text-primary-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-blue to-primary-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio
