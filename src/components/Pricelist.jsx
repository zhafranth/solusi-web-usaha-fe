import { Button } from "./ui/button"
import { Check, Star, ArrowRight, MessageCircle, Zap, Crown, Rocket } from "lucide-react"
import { motion } from "framer-motion"

const WA_NUMBER = "6281234567890"
const WA_URL = `https://wa.me/${WA_NUMBER}`

const packages = [
  {
    name: "Starter",
    icon: Zap,
    price: "2 Juta",
    suffix: "mulai dari",
    description: "Cocok untuk UMKM dan bisnis kecil yang ingin hadir secara profesional di dunia digital.",
    gradient: "from-primary-blue to-blue-400",
    features: [
      "Website Company Profile",
      "Desain Responsif (Mobile Friendly)",
      "Hingga 5 Halaman",
      "Formulir Kontak",
      "Integrasi WhatsApp",
      "SSL Certificate",
      "1 Bulan Support Gratis",
    ],
    popular: false,
    cta: "Mulai Sekarang",
    waMessage: "Halo, saya tertarik dengan paket Starter untuk website company profile. Bisa konsultasi lebih lanjut?",
  },
  {
    name: "Business",
    icon: Crown,
    price: "5 Juta",
    suffix: "mulai dari",
    description: "Solusi lengkap untuk bisnis yang membutuhkan fitur lebih dan tampilan premium.",
    gradient: "from-primary-green to-emerald-400",
    features: [
      "Semua fitur Starter",
      "Desain Custom Premium",
      "Hingga 10 Halaman",
      "SEO On-Page Optimization",
      "Blog / Artikel System",
      "Google Analytics Setup",
      "Admin Panel (CMS)",
      "3 Bulan Support Gratis",
      "Revisi Tanpa Batas",
    ],
    popular: true,
    cta: "Pilih Business",
    waMessage: "Halo, saya tertarik dengan paket Business. Bisa konsultasi lebih lanjut?",
  },
  {
    name: "Enterprise",
    icon: Rocket,
    price: "Custom",
    suffix: "hubungi kami",
    description: "Untuk kebutuhan khusus seperti e-commerce, web app, atau sistem custom sesuai bisnis Anda.",
    gradient: "from-violet-500 to-purple-400",
    features: [
      "Semua fitur Business",
      "E-Commerce / Web Application",
      "Payment Gateway Integration",
      "Custom Fitur Sesuai Kebutuhan",
      "API Development",
      "Database & Cloud Hosting",
      "Priority Support 24/7",
      "6 Bulan Support Gratis",
      "Training & Dokumentasi",
    ],
    popular: false,
    cta: "Konsultasi Dulu",
    waMessage: "Halo, saya tertarik dengan paket Enterprise. Bisa konsultasi untuk kebutuhan custom saya?",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const PricingCard = ({ pkg }) => {
  const Icon = pkg.icon

  return (
    <motion.div variants={cardVariants} className="relative group">
      {/* Popular badge */}
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-primary-green to-emerald-400 rounded-full text-white text-xs font-heading font-bold shadow-lg shadow-primary-green/30">
            <Star size={12} fill="currentColor" />
            Paling Populer
          </div>
        </div>
      )}

      <div
        className={`relative h-full rounded-3xl p-8 lg:p-10 overflow-hidden transition-all duration-500 ${
          pkg.popular
            ? "bg-gray-900 text-white border-2 border-primary-green/30 shadow-card-hover hover:shadow-[0_20px_60px_rgba(16,185,129,0.2)] scale-[1.02] lg:scale-105"
            : "bg-white border border-gray-100 hover:border-gray-200 hover:shadow-card-hover hover:-translate-y-1"
        }`}
      >
        {/* Background glow */}
        {pkg.popular && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary-blue/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
          </div>
        )}

        <div className="relative z-10">
          {/* Icon + Name */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center shadow-sm`}
            >
              <Icon size={22} className="text-white" />
            </div>
            <div>
              <h3 className={`text-xl font-heading font-bold ${pkg.popular ? "text-white" : "text-gray-900"}`}>
                {pkg.name}
              </h3>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className={`text-xs font-medium uppercase tracking-wider mb-1 ${pkg.popular ? "text-primary-green" : "text-primary-blue"}`}>
              {pkg.suffix}
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl lg:text-5xl font-heading font-bold ${pkg.popular ? "text-white" : "text-gray-900"}`}>
                {pkg.price}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className={`text-sm leading-relaxed mb-8 ${pkg.popular ? "text-gray-400" : "text-gray-500"}`}>
            {pkg.description}
          </p>

          {/* Divider */}
          <div className={`h-px mb-8 ${pkg.popular ? "bg-white/10" : "bg-gray-100"}`} />

          {/* Features */}
          <ul className="space-y-3 mb-10">
            {pkg.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    pkg.popular ? "bg-primary-green/20" : "bg-primary-blue/10"
                  }`}
                >
                  <Check size={12} className={pkg.popular ? "text-primary-green" : "text-primary-blue"} />
                </div>
                <span className={`text-sm ${pkg.popular ? "text-gray-300" : "text-gray-600"}`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href={`${WA_URL}?text=${encodeURIComponent(pkg.waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              size="lg"
              className={`w-full py-5 rounded-2xl group transition-all text-base font-medium ${
                pkg.popular
                  ? "bg-primary-green hover:bg-primary-green/90 text-white shadow-lg shadow-primary-green/25"
                  : "bg-primary-blue hover:bg-primary-blue/90 text-white shadow-md shadow-primary-blue/20"
              }`}
            >
              {pkg.cta}
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>

        {/* Bottom gradient line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${pkg.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
        />
      </div>
    </motion.div>
  )
}

const Pricelist = () => {
  return (
    <section id="pricelist" className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-green/[0.03] rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-blue/5 border border-primary-blue/10 text-primary-blue text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-blue animate-pulse" />
            Harga & Paket
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6 text-balance">
            Investasi <span className="gradient-text">Terjangkau</span> untuk Bisnis Anda
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Mulai dari <span className="font-semibold text-primary-blue">Rp 2 Juta</span>, Anda sudah bisa memiliki
            website company profile profesional yang siap meningkatkan kredibilitas bisnis Anda.
          </p>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400 mb-16"
        >
          {["Tanpa biaya tersembunyi", "Gratis domain & hosting tahun pertama", "Garansi uang kembali"].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check size={14} className="text-primary-green" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 items-start mb-20"
        >
          {packages.map((pkg, index) => (
            <PricingCard key={index} pkg={pkg} />
          ))}
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-3xl p-10 lg:p-14 overflow-hidden">
            {/* Decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-blue/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-green/10 border border-primary-green/20 text-primary-green text-sm font-medium mb-6">
                <MessageCircle size={16} />
                Konsultasi Gratis via WhatsApp
              </div>
              <h3 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
                Bingung Pilih Paket?
              </h3>
              <p className="text-gray-400 text-lg mb-4 leading-relaxed">
                Tidak perlu khawatir! Tim kami siap membantu Anda memilih paket yang paling sesuai dengan kebutuhan dan budget bisnis Anda.
              </p>
              <p className="text-gray-500 text-sm mb-10">
                Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan Anda dan dapatkan rekomendasi terbaik dari tim ahli kami.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`${WA_URL}?text=${encodeURIComponent("Halo, saya ingin konsultasi mengenai pembuatan website. Bisa bantu saya memilih paket yang sesuai?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-primary-green hover:bg-primary-green/90 text-white px-8 py-5 rounded-2xl shadow-lg shadow-primary-green/25 transition-all group text-base"
                  >
                    <MessageCircle size={18} className="mr-2" />
                    Chat WhatsApp Sekarang
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricelist
