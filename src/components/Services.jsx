import { Button } from "./ui/button";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Search,
  Palette,
  Headphones,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Globe,
    title: "Website Company Profile",
    description:
      "Website profesional untuk memperkenalkan perusahaan Anda dengan desain modern dan responsif.",
    features: ["Desain Responsif", "SEO Friendly", "Admin Panel", "SSL Certificate"],
    gradient: "from-blue-500 to-cyan-400",
    accent: "bg-blue-500/10 text-blue-600",
    size: "lg",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Website",
    description:
      "Toko online lengkap dengan sistem pembayaran, manajemen produk, dan laporan penjualan.",
    features: ["Payment Gateway", "Inventory Management", "Order Tracking", "Multi Vendor"],
    gradient: "from-primary-green to-emerald-400",
    accent: "bg-emerald-500/10 text-emerald-600",
    size: "sm",
  },
  {
    icon: Smartphone,
    title: "Web Application",
    description:
      "Aplikasi web custom sesuai kebutuhan bisnis dengan fitur canggih dan user-friendly.",
    features: ["Custom Features", "Database Integration", "API Development", "Cloud Hosting"],
    gradient: "from-violet-500 to-purple-400",
    accent: "bg-violet-500/10 text-violet-600",
    size: "sm",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Optimasi website untuk meningkatkan ranking di Google dan mendatangkan lebih banyak pengunjung.",
    features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Analytics Setup"],
    gradient: "from-amber-500 to-orange-400",
    accent: "bg-amber-500/10 text-amber-600",
    size: "sm",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Desain antarmuka yang menarik dan pengalaman pengguna yang optimal untuk website Anda.",
    features: ["User Research", "Wireframing", "Prototyping", "Design System"],
    gradient: "from-pink-500 to-rose-400",
    accent: "bg-pink-500/10 text-pink-600",
    size: "sm",
  },
  {
    icon: Headphones,
    title: "Maintenance & Support",
    description:
      "Layanan pemeliharaan dan dukungan teknis 24/7 untuk menjaga performa optimal.",
    features: ["24/7 Support", "Regular Updates", "Backup Service", "Security Monitoring"],
    gradient: "from-primary-blue to-blue-400",
    accent: "bg-blue-500/10 text-blue-600",
    size: "lg",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;
  const isLarge = service.size === "lg";

  return (
    <motion.div
      variants={itemVariants}
      className={`group relative ${isLarge ? "md:col-span-2 lg:col-span-2" : ""}`}
    >
      <div className="relative h-full bg-white rounded-3xl border border-gray-100 p-8 overflow-hidden transition-all duration-500 hover:shadow-card-hover hover:border-gray-200/50 hover:-translate-y-1">
        {/* Gradient glow on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-3xl`}
        />

        {isLarge ? (
          /* Large card: horizontal layout to fill the wider space */
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-6 h-full">
            {/* Left: icon + text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-5">
                <div className={`p-3 rounded-2xl ${service.accent} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={28} />
                </div>
                <motion.div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-primary-blue/30 group-hover:bg-primary-blue/5 sm:hidden">
                  <ArrowUpRight size={16} className="text-primary-blue" />
                </motion.div>
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary-blue transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Right: features + arrow */}
            <div className="flex flex-col items-end justify-between sm:h-full sm:min-h-[140px] shrink-0">
              <motion.div className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-primary-blue/30 group-hover:bg-primary-blue/5 hidden sm:flex">
                <ArrowUpRight size={16} className="text-primary-blue" />
              </motion.div>
              <div className="flex flex-wrap gap-2 sm:justify-end sm:max-w-[220px]">
                {service.features.map((feature, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-600 rounded-full border border-gray-100 group-hover:bg-primary-blue/5 group-hover:text-primary-blue group-hover:border-primary-blue/10 transition-colors"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Small card: compact vertical layout */
          <>
            {/* Top row: icon + arrow */}
            <div className="flex items-start justify-between mb-5 relative z-10">
              <div className={`p-3 rounded-2xl ${service.accent} transition-transform duration-300 group-hover:scale-110`}>
                <Icon size={28} />
              </div>
              <motion.div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-primary-blue/30 group-hover:bg-primary-blue/5">
                <ArrowUpRight size={16} className="text-primary-blue" />
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-2 group-hover:text-primary-blue transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-600 rounded-full border border-gray-100 group-hover:bg-primary-blue/5 group-hover:text-primary-blue group-hover:border-primary-blue/10 transition-colors"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Bottom gradient line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
        />
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gray-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-blue-mesh opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-blue/5 border border-primary-blue/10 text-primary-blue text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-blue animate-pulse" />
            Layanan Kami
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6 text-balance">
            Solusi Digital{" "}
            <span className="gradient-text">Komprehensif</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Kami menyediakan berbagai layanan pengembangan web untuk membantu
            bisnis Anda berkembang di era digital.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-3xl p-12 lg:p-16 overflow-hidden">
            {/* CTA decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              />
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
                Siap Memulai Proyek Anda?
              </h3>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Konsultasikan kebutuhan website atau aplikasi web Anda dengan tim
                ahli kami. Dapatkan penawaran terbaik.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary-green hover:bg-primary-green/90 text-white px-8 py-5 rounded-2xl shadow-lg shadow-primary-green/25 transition-all group text-base"
                >
                  Konsultasi Gratis Sekarang
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 text-gray-300 hover:bg-white/5 hover:border-gray-600 px-8 py-5 rounded-2xl transition-all text-base"
                >
                  Lihat Harga Paket
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
