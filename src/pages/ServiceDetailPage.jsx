import { useEffect, useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  MessageCircle,
  Smartphone,
  Globe,
  Database,
  Mail,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useTranslation } from "../hooks/useTranslation";

const WA_NUMBER = "6281234567890";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

const SERVICE_SLUGS = [
  "application-dev",
  "web-development",
  "data-solutions",
  "digital-invites",
];

const SERVICE_STYLES = [
  {
    icon: Smartphone,
    gradient: "from-violet-500 to-purple-400",
    gradientVia: "from-violet-500 via-fuchsia-500 to-purple-400",
    accent: "bg-violet-500/10 text-violet-600",
    glow: "bg-violet-500/20",
    ring: "ring-violet-500/20",
    border: "border-violet-200/60",
    soft: "bg-violet-50",
    text: "text-violet-600",
    rgba: "rgba(139, 92, 246, 0.25)",
  },
  {
    icon: Globe,
    gradient: "from-blue-500 to-cyan-400",
    gradientVia: "from-blue-600 via-blue-500 to-cyan-400",
    accent: "bg-blue-500/10 text-blue-600",
    glow: "bg-blue-500/20",
    ring: "ring-blue-500/20",
    border: "border-blue-200/60",
    soft: "bg-blue-50",
    text: "text-blue-600",
    rgba: "rgba(59, 130, 246, 0.25)",
  },
  {
    icon: Database,
    gradient: "from-primary-green to-emerald-400",
    gradientVia: "from-emerald-600 via-primary-green to-emerald-400",
    accent: "bg-emerald-500/10 text-emerald-600",
    glow: "bg-emerald-500/20",
    ring: "ring-emerald-500/20",
    border: "border-emerald-200/60",
    soft: "bg-emerald-50",
    text: "text-emerald-600",
    rgba: "rgba(16, 185, 129, 0.25)",
  },
  {
    icon: Mail,
    gradient: "from-pink-500 to-rose-400",
    gradientVia: "from-pink-600 via-rose-500 to-orange-400",
    accent: "bg-pink-500/10 text-pink-600",
    glow: "bg-pink-500/20",
    ring: "ring-pink-500/20",
    border: "border-pink-200/60",
    soft: "bg-pink-50",
    text: "text-pink-600",
    rgba: "rgba(236, 72, 153, 0.25)",
  },
];

const PricingCard = ({ pkg, popularLabel, accent, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="relative group"
  >
    {pkg.popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
        <div
          className={`flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r ${accent.gradient} rounded-full text-white text-xs font-heading font-bold shadow-lg`}
          style={{ boxShadow: `0 10px 30px ${accent.rgba}` }}
        >
          <Star size={12} fill="currentColor" />
          {popularLabel}
        </div>
      </div>
    )}

    <div
      className={`relative h-full rounded-3xl p-8 lg:p-10 overflow-hidden transition-all duration-500 ${
        pkg.popular
          ? "bg-gray-900 text-white border-2 shadow-card-hover scale-[1.02] lg:scale-105"
          : "bg-white border border-gray-100 hover:border-gray-200 hover:shadow-card-hover hover:-translate-y-1"
      }`}
      style={pkg.popular ? { borderColor: accent.rgba } : undefined}
    >
      {pkg.popular && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute top-0 right-0 w-72 h-72 ${accent.glow} rounded-full blur-3xl -translate-y-1/2 translate-x-1/3`}
          />
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
        <div className="flex items-center justify-between mb-6">
          <h3
            className={`text-2xl font-heading font-bold ${
              pkg.popular ? "text-white" : "text-gray-900"
            }`}
          >
            {pkg.name}
          </h3>
          <div
            className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center shadow-sm`}
          >
            <Sparkles size={16} className="text-white" />
          </div>
        </div>

        <div className="mb-6">
          <div
            className={`text-[11px] font-semibold uppercase tracking-[0.15em] mb-1.5 ${
              pkg.popular ? "text-white/60" : "text-gray-400"
            }`}
          >
            {pkg.suffix}
          </div>
          <div className="flex items-baseline gap-1">
            <span
              className={`text-4xl lg:text-5xl font-heading font-bold leading-none ${
                pkg.popular ? "text-white" : "text-gray-900"
              }`}
            >
              {pkg.price}
            </span>
          </div>
        </div>

        <p
          className={`text-sm leading-relaxed mb-8 ${
            pkg.popular ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {pkg.description}
        </p>

        <div className={`h-px mb-8 ${pkg.popular ? "bg-white/10" : "bg-gray-100"}`} />

        <ul className="space-y-3 mb-10">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  pkg.popular ? "bg-white/10" : accent.soft
                }`}
              >
                <Check
                  size={12}
                  className={pkg.popular ? "text-white" : accent.text}
                />
              </div>
              <span
                className={`text-sm leading-relaxed ${
                  pkg.popular ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

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
                ? "bg-white text-gray-900 hover:bg-gray-100"
                : `bg-gradient-to-r ${accent.gradient} text-white hover:opacity-95 shadow-md`
            }`}
          >
            {pkg.cta}
            <ArrowRight
              size={16}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </a>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accent.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
      />
    </div>
  </motion.div>
);

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const { t, language } = useTranslation();
  const pricingRef = useRef(null);

  const index = SERVICE_SLUGS.indexOf(slug);

  const data = useMemo(() => {
    if (index === -1) return null;
    const items = t("services.items");
    const details = t("services.details");
    const style = SERVICE_STYLES[index];
    const item = items[index];
    const detail = details[index];
    return { style, item, detail };
  }, [index, t]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!data) {
    return (
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium mb-6">
            404
          </div>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
            {t("serviceDetail.notFoundTitle")}
          </h1>
          <p className="text-gray-500 mb-10">{t("serviceDetail.notFoundDesc")}</p>
          <Link to="/">
            <Button
              size="lg"
              className="bg-primary-blue hover:bg-primary-blue/90 text-white rounded-2xl px-8"
            >
              <ArrowLeft size={16} className="mr-2" />
              {t("serviceDetail.back")}
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  const { style, item, detail } = data;
  const Icon = style.icon;

  const suffixFrom = t("serviceDetail.suffixFrom");
  const suffixContact = t("serviceDetail.suffixContact");

  const packages = detail.packages.map((p) => ({
    ...p,
    price: language === "en" ? p.priceEn : p.price,
    suffix: p.suffixKey === "from" ? suffixFrom : suffixContact,
  }));

  const processSteps = t("serviceDetail.processSteps");
  const items = t("services.items");

  const otherServices = SERVICE_SLUGS.map((s, i) => ({
    slug: s,
    item: items[i],
    style: SERVICE_STYLES[i],
  })).filter((_, i) => i !== index);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative pt-10 lg:pt-14 pb-20 lg:pb-28 overflow-hidden bg-white">
        {/* Dynamic gradient ambient backdrop */}
        <div className="absolute inset-0 -z-10">
          <div
            className={`absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br ${style.gradientVia} opacity-20 rounded-full blur-3xl`}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
              color: "#1f2937",
            }}
          />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-sm text-gray-500 mb-10"
          >
            <Link
              to="/"
              className="hover:text-primary-blue transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft size={14} />
              {t("serviceDetail.back")}
            </Link>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-gray-700 font-medium">{item.title}</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-7"
            >
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${style.accent} text-sm font-medium mb-6`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {detail.tagline}
              </div>

              <h1 className="text-[2.75rem] sm:text-5xl lg:text-[4.25rem] leading-[1.05] font-heading font-bold text-gray-900 tracking-tight mb-6 text-balance">
                {item.title.split(" ")[0]}{" "}
                <span
                  className={`bg-clip-text text-transparent bg-gradient-to-r ${style.gradientVia}`}
                >
                  {item.title.split(" ").slice(1).join(" ") || ""}
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
                {detail.longDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {item.features.map((feature, i) => (
                  <span
                    key={i}
                    className={`px-4 py-2 text-sm font-medium ${style.soft} ${style.text} rounded-full border ${style.border}`}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={scrollToPricing}
                  className={`bg-gradient-to-r ${style.gradient} text-white px-8 py-6 rounded-2xl shadow-lg transition-all hover:opacity-95 group text-base`}
                  style={{ boxShadow: `0 14px 40px ${style.rgba}` }}
                >
                  {t("serviceDetail.pricingBadge")}
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </Button>
                <a
                  href={`${WA_URL}?text=${encodeURIComponent(t("serviceDetail.waMessage"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 px-8 py-6 rounded-2xl transition-all text-base w-full sm:w-auto"
                  >
                    <MessageCircle size={18} className="mr-2" />
                    {t("serviceDetail.ctaButton")}
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Right: gradient ornament */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Outer gradient ring */}
                <div
                  className={`absolute inset-0 rounded-[3rem] bg-gradient-to-br ${style.gradientVia} opacity-90`}
                />
                {/* Inner texture overlay */}
                <div
                  className="absolute inset-0 rounded-[3rem] opacity-30 mix-blend-overlay"
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.2) 0%, transparent 50%)`,
                  }}
                />
                {/* Noise overlay */}
                <div
                  className="absolute inset-0 rounded-[3rem] opacity-[0.15] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
                  }}
                />
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-3xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl">
                    <Icon size={56} className="text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Floating chip top-left */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-glass px-4 py-2.5 flex items-center gap-2 border border-gray-100"
                >
                  <div className={`w-2 h-2 rounded-full ${style.text.replace("text-", "bg-")}`} />
                  <span className="text-xs font-semibold text-gray-900">
                    {detail.tagline}
                  </span>
                </motion.div>

                {/* Floating chip bottom-right */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-glass px-4 py-3 border border-gray-100"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                    {detail.packages[0].suffixKey === "from"
                      ? suffixFrom
                      : suffixContact}
                  </div>
                  <div className="text-base font-heading font-bold text-gray-900">
                    {language === "en"
                      ? detail.packages[0].priceEn
                      : detail.packages[0].price}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ──────────────────────────────────────── */}
      <section className="py-24 bg-gray-50/60 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-16"
          >
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${style.accent} text-sm font-medium mb-5`}
            >
              <Sparkles size={14} />
              {t("serviceDetail.overviewBadge")}
            </div>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-gray-900 mb-5 text-balance">
              {t("serviceDetail.capabilitiesTitle")}
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              {t("serviceDetail.capabilitiesSubtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {item.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-white rounded-3xl border border-gray-100 p-7 hover:border-gray-200 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`}
                />
                <div className="relative">
                  <div
                    className={`inline-flex w-10 h-10 rounded-2xl ${style.accent} items-center justify-center font-heading font-bold text-base mb-5`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
                    {feature}
                  </h3>
                  <div
                    className={`h-0.5 w-10 bg-gradient-to-r ${style.gradient} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div
          className={`absolute -top-32 -left-32 w-[500px] h-[500px] ${style.glow} rounded-full blur-3xl opacity-50`}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 lg:sticky lg:top-28"
            >
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${style.accent} text-sm font-medium mb-5`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {t("serviceDetail.benefitsBadge")}
              </div>
              <h2 className="text-3xl lg:text-5xl font-heading font-bold text-gray-900 mb-6 text-balance leading-tight">
                {t("serviceDetail.benefitsTitle")}
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                {detail.longDescription}
              </p>
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="lg:col-span-7 space-y-3"
            >
              {detail.benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="group flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-colors"
                >
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}
                  >
                    <Check size={16} className="text-white" />
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed pt-1.5">
                    {benefit}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50/60 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${style.accent} text-sm font-medium mb-5`}
            >
              {t("serviceDetail.processBadge")}
            </div>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-gray-900 mb-4 text-balance">
              {t("serviceDetail.processTitle")}
            </h2>
          </motion.div>

          <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Connector line, lg only */}
            <div className="absolute top-12 left-0 right-0 hidden lg:block">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </div>

            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                <div
                  className={`relative w-14 h-14 rounded-2xl bg-white border ${style.border} flex items-center justify-center mb-5 shadow-sm`}
                >
                  <span
                    className={`font-heading font-bold text-lg bg-clip-text text-transparent bg-gradient-to-br ${style.gradientVia}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────── */}
      <section
        ref={pricingRef}
        id="pricing"
        className="py-24 bg-white relative overflow-hidden scroll-mt-20"
      >
        <div
          className={`absolute top-0 right-0 w-96 h-96 ${style.glow} rounded-full blur-3xl opacity-40`}
        />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-blue/[0.04] rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${style.accent} text-sm font-medium mb-5`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {t("serviceDetail.pricingBadge")}
            </div>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-gray-900 mb-5 text-balance">
              {t("serviceDetail.pricingTitle")}
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              {t("serviceDetail.pricingSubtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 items-start">
            {packages.map((pkg, i) => (
              <PricingCard
                key={i}
                pkg={pkg}
                accent={style}
                popularLabel={t("serviceDetail.popularBadge")}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA + OTHER SERVICES ──────────────────────────────── */}
      <section className="py-24 bg-gray-50/60 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-3xl p-10 lg:p-16 overflow-hidden mb-20"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div
                className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${style.gradient} opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3`}
              />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-blue/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/90 text-sm font-medium mb-6">
                <MessageCircle size={16} />
                {item.title}
              </div>
              <h3 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
                {t("serviceDetail.ctaTitle")}
              </h3>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                {t("serviceDetail.ctaSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`${WA_URL}?text=${encodeURIComponent(t("serviceDetail.waMessage"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className={`bg-gradient-to-r ${style.gradient} text-white px-8 py-6 rounded-2xl shadow-lg transition-all hover:opacity-95 group text-base`}
                    style={{ boxShadow: `0 14px 40px ${style.rgba}` }}
                  >
                    <MessageCircle size={18} className="mr-2" />
                    {t("serviceDetail.ctaButton")}
                    <ArrowRight
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                      size={18}
                    />
                  </Button>
                </a>
                <Link to="/#services">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/25 px-8 py-6 rounded-2xl transition-all text-base"
                  >
                    {t("serviceDetail.ctaSecondary")}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Other services */}
          <div className="flex items-end justify-between mb-8">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-gray-900">
              {t("serviceDetail.otherServicesTitle")}
            </h3>
            <Link
              to="/#services"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary-blue transition-colors"
            >
              {t("serviceDetail.ctaSecondary")}
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {otherServices.map(({ slug: otherSlug, item: otherItem, style: otherStyle }) => {
              const OtherIcon = otherStyle.icon;
              return (
                <Link
                  key={otherSlug}
                  to={`/services/${otherSlug}`}
                  className="group relative bg-white rounded-3xl border border-gray-100 p-7 hover:border-gray-200 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${otherStyle.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`}
                  />
                  <div className="relative flex items-start justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl ${otherStyle.accent} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <OtherIcon size={22} />
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-gray-300 group-hover:text-primary-blue group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                  <h4 className="text-lg font-heading font-bold text-gray-900 group-hover:text-primary-blue transition-colors mb-1.5">
                    {otherItem.title}
                  </h4>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {otherItem.description}
                  </p>
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${otherStyle.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailPage;
