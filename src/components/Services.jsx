import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
import { SERVICE_SLUGS, SERVICE_STYLES } from "../lib/serviceStyles";

const WA_CONSULT_URL = `https://wa.me/6285111371404?text=${encodeURIComponent("Halo, saya tertarik untuk konsultasi gratis tentang layanan Anda.")}`;

const ServiceCard = ({ service, learnMoreLabel }) => {
  const Icon = service.icon;

  return (
    <Link to={`/services/${service.slug}`} className="group relative h-full block">
      <div className="relative h-full bg-white rounded-3xl border border-gray-100 p-8 overflow-hidden transition-all duration-500 hover:border-gray-200/50 hover:-translate-y-1 hover:shadow-card-hover">
        {/* Gradient glow on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-3xl`}
        />

        {/* Top row: icon + arrow */}
        <div className="flex items-start justify-between mb-5 relative z-10">
          <div
            className={`p-3 rounded-2xl ${service.accent} transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon size={28} />
          </div>
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-primary-blue/30 group-hover:bg-primary-blue/5">
            <ArrowUpRight size={16} className="text-primary-blue" />
          </div>
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
          <div className="flex flex-wrap gap-2 mb-6">
            {service.features.map((feature, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-600 rounded-full border border-gray-100 group-hover:bg-primary-blue/5 group-hover:text-primary-blue group-hover:border-primary-blue/10 transition-colors"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Learn more affordance */}
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-400 group-hover:text-primary-blue transition-colors">
            {learnMoreLabel}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Bottom gradient line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
        />
      </div>
    </Link>
  );
};

const AUTOPLAY_INTERVAL = 4000;

const Services = () => {
  const { t } = useTranslation();
  const services = useMemo(() => {
    const items = t("services.items");
    return items.map((item, i) => ({
      ...item,
      slug: SERVICE_SLUGS[i],
      icon: SERVICE_STYLES[i].icon,
      gradient: SERVICE_STYLES[i].gradient,
      accent: SERVICE_STYLES[i].accent,
    }));
  }, [t]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, services.length - visibleCount);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  useEffect(() => {
    if (isPaused || maxIndex === 0) return undefined;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const cardWidthPercent = 100 / visibleCount;
  const translatePercent = currentIndex * cardWidthPercent;
  const progressDots = useMemo(
    () => Array.from({ length: maxIndex + 1 }, (_, i) => i),
    [maxIndex]
  );

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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-blue/5 border border-primary-blue/10 text-primary-blue text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-blue animate-pulse" />
            {t("services.badge")}
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6 text-balance">
            {t("services.titlePart1")} <span className="gradient-text">{t("services.titlePart2")}</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Carousel Controls + Counter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="font-heading font-semibold text-gray-900">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="w-12 h-px bg-gray-300" />
            <span>
              {String(services.length).padStart(2, "0")} {t("services.counterLabel")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous service"
              className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 transition-all duration-300 hover:border-primary-blue hover:bg-primary-blue hover:text-white hover:shadow-glass"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next service"
              className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 transition-all duration-300 hover:border-primary-blue hover:bg-primary-blue hover:text-white hover:shadow-glass"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          className="overflow-hidden mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <motion.div
            className="flex"
            animate={{ x: `-${translatePercent}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="px-3 shrink-0"
                style={{ width: `${cardWidthPercent}%` }}
              >
                <ServiceCard service={service} learnMoreLabel={t("services.learnMore")} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-20">
          {progressDots.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-8 bg-primary-blue"
                  : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

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
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
                {t("services.cta.title")}
              </h3>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                {t("services.cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={WA_CONSULT_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="bg-primary-green hover:bg-primary-green/90 text-white px-8 py-5 rounded-2xl shadow-lg shadow-primary-green/25 transition-all group text-base"
                  >
                    {t("services.cta.primary")}
                    <ArrowRight
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                      size={18}
                    />
                  </Button>
                </a>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 px-8 py-5 rounded-2xl transition-all text-base"
                >
                  {t("services.cta.secondary")}
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
