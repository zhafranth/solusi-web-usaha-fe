import { Button } from "./ui/button"
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import PixelBlast from "./PixelBlast"
import { useTranslation } from "../hooks/useTranslation"

const WA_CONSULT_URL = `https://wa.me/6285111371404?text=${encodeURIComponent("Halo, saya tertarik untuk konsultasi gratis tentang layanan Anda.")}`

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

const Hero = () => {
  const { t, language } = useTranslation()
  const benefits = t("hero.benefits")
  const stats = t("hero.stats")
  const mobileStats = t("hero.mobileStats")
  const freeLabel = language === "id" ? "Gratis" : "Free"
  const guaranteeLabel = language === "id" ? "Garansi" : "Guarantee"

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* PixelBlast WebGL background */}
      <div className="absolute inset-0">
        <PixelBlast
          variant="square"
          patternScale={2.75}
          color="#2b66e9"
          pixelSize={6}
          pixelSizeJitter={0.4}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          edgeFade={0.25}
          transparent
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary-green/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-white">
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium"
              >
                <Sparkles size={16} className="text-primary-green" />
                <span>{t("hero.badge")}</span>
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-4xl lg:text-6xl xl:text-7xl font-heading font-bold leading-[1.1] tracking-tight"
              >
                {t("hero.title.line1")}
                <br />
                {t("hero.title.line2")}
                <br />
                <span className="relative">
                  <span className="text-primary-green">{t("hero.title.line3")}</span>
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <motion.path
                      d="M2 8C50 2 100 2 150 6C200 10 250 4 298 6"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                    />
                  </motion.svg>
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-lg lg:text-xl text-blue-100/90 max-w-lg leading-relaxed"
              >
                {t("hero.description")}
              </motion.p>

              {/* Benefits */}
              <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="space-y-3">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-green/20 flex items-center justify-center">
                      <CheckCircle className="text-primary-green" size={14} />
                    </div>
                    <span className="text-blue-100/90 text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href={WA_CONSULT_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="bg-primary-green hover:bg-primary-green/90 text-white text-base px-8 py-5 rounded-2xl shadow-lg shadow-primary-green/25 hover:shadow-xl hover:shadow-primary-green/30 transition-all group"
                  >
                    {t("hero.ctaPrimary")}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* Right Content - Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { number: "100%", label: stats.custom, color: "from-primary-green/20 to-primary-green/5" },
                      { number: "24/7", label: stats.support, color: "from-primary-blue/20 to-blue-500/5" },
                      { number: freeLabel, label: stats.consultation, color: "from-yellow-500/20 to-yellow-500/5" },
                      { number: guaranteeLabel, label: stats.guarantee, color: "from-purple-500/20 to-purple-500/5" },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center`}
                      >
                        <div className="text-3xl font-heading font-bold text-white mb-1">{stat.number}</div>
                        <div className="text-blue-100/70 text-sm">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 bg-primary-green rounded-2xl px-5 py-3 shadow-lg shadow-primary-green/30"
                >
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle size={18} />
                    <span className="font-heading font-bold text-sm">{stats.trusted}</span>
                  </div>
                </motion.div>

                {/* Floating dot */}
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center"
                >
                  <div className="w-4 h-4 bg-primary-green rounded-full" />
                </motion.div>
              </div>
            </motion.div>

            {/* Mobile Stats */}
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="grid grid-cols-3 gap-4 lg:hidden text-white"
            >
              {[
                { number: "100%", label: mobileStats.custom },
                { number: "24/7", label: mobileStats.support },
                { number: freeLabel, label: mobileStats.consultation },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-heading font-bold text-primary-green">{stat.number}</div>
                  <div className="text-blue-100/70 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
