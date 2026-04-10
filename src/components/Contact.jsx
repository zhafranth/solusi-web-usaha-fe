import { Button } from "./ui/button"
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const contactInfo = [
    { icon: Phone, title: "Telepon", content: "+62 812-3456-7890", description: "Senin - Jumat, 09:00 - 18:00" },
    { icon: Mail, title: "Email", content: "info@solusiwebusaha.com", description: "Respon dalam 24 jam" },
    { icon: MapPin, title: "Alamat", content: "Jakarta, Indonesia", description: "Konsultasi online tersedia" },
    { icon: Clock, title: "Jam Operasional", content: "09:00 - 18:00 WIB", description: "Senin - Jumat" },
  ]

  const inputClasses = "w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue focus:bg-white font-body text-sm transition-all outline-none"

  return (
    <section id="contact" className="py-24 bg-gray-50/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-mesh opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-blue/5 border border-primary-blue/10 text-primary-blue text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-blue animate-pulse" />
            Hubungi Kami
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6 text-balance">
            Mari <span className="gradient-text">Berdiskusi</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Siap untuk memulai proyek digital Anda? Tim ahli kami siap membantu mewujudkan visi bisnis Anda.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
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

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative bg-gray-900 rounded-3xl p-8 overflow-hidden"
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-blue/15 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-green/15 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 text-center">
                <h4 className="font-heading font-bold text-lg text-white mb-2">
                  Konsultasi Gratis
                </h4>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                  Dapatkan konsultasi gratis untuk proyek Anda.
                </p>
                <Button className="w-full bg-primary-green hover:bg-primary-green/90 text-white rounded-xl group transition-all">
                  Jadwalkan Sekarang
                  <ArrowRight size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-glass">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-8">
                Kirim Pesan
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={inputClasses}
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={inputClasses}
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="08xx-xxxx-xxxx"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
                      Subjek *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={inputClasses}
                    >
                      <option value="">Pilih subjek</option>
                      <option value="website-company">Website Company Profile</option>
                      <option value="ecommerce">E-Commerce</option>
                      <option value="web-app">Web Application</option>
                      <option value="seo">SEO Optimization</option>
                      <option value="maintenance">Maintenance & Support</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
                    Pesan *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`${inputClasses} resize-none`}
                    placeholder="Ceritakan tentang proyek yang Anda inginkan..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white py-4 rounded-xl shadow-md shadow-primary-blue/20 group transition-all"
                >
                  <Send className="mr-2 group-hover:rotate-12 transition-transform" size={18} />
                  Kirim Pesan
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
