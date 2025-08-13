import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useState } from "react"

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.')
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const contactInfo = [
    {
      icon: <Phone className="text-primary-green" size={24} />,
      title: "Telepon",
      content: "+62 812-3456-7890",
      description: "Senin - Jumat, 09:00 - 18:00"
    },
    {
      icon: <Mail className="text-primary-green" size={24} />,
      title: "Email",
      content: "info@solusiwebusaha.com",
      description: "Respon dalam 24 jam"
    },
    {
      icon: <MapPin className="text-primary-green" size={24} />,
      title: "Alamat",
      content: "Jakarta, Indonesia",
      description: "Konsultasi online tersedia"
    },
    {
      icon: <Clock className="text-primary-green" size={24} />,
      title: "Jam Operasional",
      content: "09:00 - 18:00 WIB",
      description: "Senin - Jumat"
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-primary-blue mb-6">
            Hubungi Kami
          </h2>
          <p className="text-xl text-gray-600 font-body max-w-3xl mx-auto leading-relaxed">
            Siap untuk memulai proyek digital Anda? Tim ahli kami siap membantu mewujudkan visi bisnis Anda. Konsultasi gratis tersedia!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-2xl font-heading font-bold text-gray-800 mb-6">
              Informasi Kontak
            </h3>
            
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-gray-800 mb-1">
                        {info.title}
                      </h4>
                      <p className="text-primary-blue font-body font-medium mb-1">
                        {info.content}
                      </p>
                      <p className="text-sm text-gray-500 font-body">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* CTA Card */}
            <Card className="bg-primary-blue text-white border-0">
              <CardContent className="p-6 text-center">
                <h4 className="font-heading font-bold text-xl mb-3">
                  Konsultasi Gratis
                </h4>
                <p className="font-body mb-4 text-blue-100">
                  Dapatkan konsultasi gratis untuk proyek Anda. Kami akan membantu menemukan solusi terbaik.
                </p>
                <Button 
                  className="bg-primary-green hover:bg-primary-green/90 text-white font-body w-full"
                >
                  Jadwalkan Konsultasi
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-heading font-bold text-gray-800">
                  Kirim Pesan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-body font-medium text-gray-700 mb-2">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent font-body"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-body font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent font-body"
                        placeholder="nama@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-body font-medium text-gray-700 mb-2">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent font-body"
                        placeholder="08xx-xxxx-xxxx"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-body font-medium text-gray-700 mb-2">
                        Subjek *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent font-body"
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
                    <label htmlFor="message" className="block text-sm font-body font-medium text-gray-700 mb-2">
                      Pesan *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent font-body resize-none"
                      placeholder="Ceritakan tentang proyek yang Anda inginkan..."
                    ></textarea>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white font-body"
                  >
                    <Send className="mr-2" size={20} />
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact