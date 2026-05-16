import { Button } from "./ui/button"
import { CheckCircle, Sparkles, Award, Clock, Target, ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useTranslation } from "../hooks/useTranslation"

const WA_CONSULT_URL = `https://wa.me/6285111371404?text=${encodeURIComponent("Halo, saya tertarik untuk konsultasi gratis tentang layanan Anda.")}`

const AnimatedCounter = ({ target, suffix = "" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const num = parseInt(target)
    if (isNaN(num)) { setCount(target); return }

    let start = 0
    const duration = 1500
    const increment = num / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= num) {
        setCount(num)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {typeof count === 'number' ? count : target}{suffix}
    </span>
  )
}

const achievementStyles = [
  { icon: Sparkles, number: "100", suffix: "%", color: "from-primary-blue to-blue-400" },
  { icon: Award, number: "100", suffix: "%", color: "from-primary-green to-emerald-400" },
  { icon: Clock, number: "24/7", suffix: "", color: "from-amber-500 to-orange-400" },
  { icon: Target, number: null, suffix: "", color: "from-violet-500 to-purple-400" },
]

const About = () => {
  const { t, language } = useTranslation()
  const whyChooseUs = t("about.whyList")
  const achievementLabels = t("about.achievements")
  const processSteps = t("about.processSteps").map((item, i) => ({
    step: String(i + 1).padStart(2, "0"),
    ...item,
  }))
  const freeLabel = language === "id" ? "Gratis" : "Free"
  const achievements = achievementStyles.map((style, i) => ({
    ...style,
    number: style.number ?? freeLabel,
    label: achievementLabels[i].label,
  }))

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue/[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-green/[0.03] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-blue/5 border border-primary-blue/10 text-primary-blue text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-blue animate-pulse" />
                {t("about.badge")}
              </div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 leading-tight">
                {t("about.titlePart1")}{" "}
                <span className="gradient-text">{t("about.titleHighlight")}</span>{" "}
                {t("about.titlePart2")}
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                {t("about.description")}
              </p>
            </div>

            {/* Why Choose Us */}
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-bold text-gray-900">
                {t("about.whyTitle")}
              </h3>
              <div className="grid gap-3">
                {whyChooseUs.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-green/20 transition-colors">
                      <CheckCircle className="text-primary-green" size={12} />
                    </div>
                    <span className="text-gray-600 text-sm">{reason}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <a href={WA_CONSULT_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button
                size="lg"
                className="bg-primary-blue hover:bg-primary-blue/90 text-white px-8 py-5 rounded-2xl shadow-md shadow-primary-blue/20 group transition-all"
              >
                {t("about.cta")}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </a>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Achievement Grid */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="group bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-gray-200 hover:shadow-glass transition-all duration-300"
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-sm`}>
                      <Icon className="text-white" size={22} />
                    </div>
                    <div className="text-3xl font-heading font-bold text-gray-900 mb-1">
                      <AnimatedCounter target={achievement.number} suffix={achievement.suffix} />
                    </div>
                    <div className="text-gray-500 text-sm">
                      {achievement.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Process */}
            <div className="bg-gray-900 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary-blue/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-green/10 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <h4 className="text-lg font-heading font-bold text-white mb-8">
                  {t("about.processTitle")}
                </h4>
                <div className="space-y-6">
                  {processSteps.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-blue to-primary-green flex items-center justify-center flex-shrink-0 text-sm font-heading font-bold text-white shadow-md">
                        {item.step}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{item.title}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{item.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
