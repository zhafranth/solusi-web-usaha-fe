import { Button } from "./ui/button"
import { Mail, Phone, MapPin, Clock, Send, ArrowRight, Loader2, CheckCircle2 } from "lucide-react"
import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { submitContact } from "../services/contactService"
import { useTranslation } from "../hooks/useTranslation"

const contactSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Nama wajib diisi")
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: yup
    .string()
    .trim()
    .required("Email wajib diisi")
    .email("Format email tidak valid")
    .max(255, "Email maksimal 255 karakter"),
  subject: yup
    .string()
    .trim()
    .required("Subjek wajib diisi")
    .min(5, "Subjek minimal 5 karakter")
    .max(200, "Subjek maksimal 200 karakter"),
  message: yup
    .string()
    .trim()
    .required("Pesan wajib diisi")
    .min(10, "Pesan minimal 10 karakter")
    .max(2000, "Pesan maksimal 2000 karakter"),
})

const defaultValues = { name: "", email: "", subject: "", message: "" }

const contactIcons = [Phone, Mail, MapPin, Clock]
const contactContents = ["+62 812-3456-7890", "info@luminaracodex.com", "Jakarta, Indonesia", "09:00 - 18:00 WIB"]

const Contact = () => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues,
    mode: "onTouched",
  })

  useEffect(() => {
    if (!isSubmitSuccessful) return
    const timer = setTimeout(() => reset(defaultValues, { keepIsSubmitted: false }), 5000)
    return () => clearTimeout(timer)
  }, [isSubmitSuccessful, reset])

  const onSubmit = async (data) => {
    clearErrors("root")
    try {
      await submitContact(data)
      reset(defaultValues, { keepIsSubmitted: true })
    } catch (error) {
      setError("root", { type: "server", message: error.message || t("contact.defaultError") })
    }
  }

  const contactInfo = t("contact.info").map((info, i) => ({
    icon: contactIcons[i],
    title: info.title,
    content: contactContents[i],
    description: info.description,
  }))

  const baseInputClasses = "w-full px-4 py-3.5 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue focus:bg-white font-body text-sm transition-all outline-none"
  const inputClass = (hasError) => `${baseInputClasses} ${hasError ? "border-red-300 focus:ring-red-200 focus:border-red-400" : "border-gray-200"}`

  const rootError = errors.root?.message
  const showSuccess = isSubmitSuccessful && !rootError

  return (
    <section id="contact" className="py-24 bg-gray-50/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-mesh opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-blue/5 border border-primary-blue/10 text-primary-blue text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-blue animate-pulse" />
            {t("contact.badge")}
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6 text-balance">
            {t("contact.titlePart1")} <span className="gradient-text">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-glass transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-green/15 transition-colors">
                    <Icon className="text-primary-green" size={20} />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-gray-900 text-sm mb-0.5">
                      {info.title}
                    </h4>
                    <p className="text-primary-blue font-medium text-sm mb-0.5">
                      {info.content}
                    </p>
                    <p className="text-xs text-gray-400">{info.description}</p>
                  </div>
                </motion.div>
              )
            })}

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-glass">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-8">
                {t("contact.formTitle")}
              </h3>

              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mb-5 flex items-start gap-3 px-4 py-3 bg-primary-green/5 border border-primary-green/20 rounded-xl"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary-green flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-primary-green">{t("contact.successTitle")}</p>
                      <p className="text-xs text-gray-600">
                        {t("contact.successDesc")}
                      </p>
                    </div>
                  </motion.div>
                )}
                {rootError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl"
                  >
                    <p className="text-sm text-red-600">{rootError}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
                      {t("contact.labels.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className={inputClass(!!errors.name)}
                      placeholder={t("contact.placeholders.name")}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
                      {t("contact.labels.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={inputClass(!!errors.email)}
                      placeholder={t("contact.placeholders.email")}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
                    {t("contact.labels.subject")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register("subject")}
                    className={inputClass(!!errors.subject)}
                    placeholder={t("contact.placeholders.subject")}
                  />
                  {errors.subject && <p className="mt-1.5 text-xs text-red-500">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
                    {t("contact.labels.message")}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    className={`${inputClass(!!errors.message)} resize-none`}
                    placeholder={t("contact.placeholders.message")}
                  />
                  {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white py-4 rounded-xl shadow-md shadow-primary-blue/20 group transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={18} />
                      {t("contact.submitting")}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 group-hover:rotate-12 transition-transform" size={18} />
                      {t("contact.submit")}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
