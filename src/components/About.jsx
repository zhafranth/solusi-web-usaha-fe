import { Button } from "./ui/button"
import { CheckCircle, Users, Award, Clock, Target } from "lucide-react"

const About = () => {
  const achievements = [
    {
      icon: <Users className="text-primary-green" size={32} />,
      number: "50+",
      label: "Klien Puas"
    },
    {
      icon: <Award className="text-primary-green" size={32} />,
      number: "100+",
      label: "Project Selesai"
    },
    {
      icon: <Clock className="text-primary-green" size={32} />,
      number: "3+",
      label: "Tahun Pengalaman"
    },
    {
      icon: <Target className="text-primary-green" size={32} />,
      number: "98%",
      label: "Tingkat Kepuasan"
    }
  ]

  const whyChooseUs = [
    "Tim developer berpengalaman dengan keahlian terkini",
    "Proses development yang transparan dan terstruktur",
    "Harga kompetitif dengan kualitas premium",
    "Support dan maintenance jangka panjang",
    "Garansi revisi hingga Anda puas",
    "Delivery tepat waktu sesuai timeline yang disepakati"
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-primary-blue">
                Tentang SolusiWeb Usaha
              </h2>
              <p className="text-lg text-gray-600 font-body leading-relaxed">
                Kami adalah tim profesional yang berdedikasi untuk membantu UMKM dan perusahaan dalam transformasi digital. Dengan pengalaman lebih dari 3 tahun, kami telah membantu ratusan klien mewujudkan visi digital mereka.
              </p>
              <p className="text-lg text-gray-600 font-body leading-relaxed">
                Fokus kami adalah memberikan solusi web yang tidak hanya menarik secara visual, tetapi juga fungsional, user-friendly, dan mampu meningkatkan performa bisnis klien.
              </p>
            </div>

            {/* Why Choose Us */}
            <div className="space-y-4">
              <h3 className="text-2xl font-heading font-bold text-gray-800">
                Mengapa Memilih Kami?
              </h3>
              <div className="grid gap-3">
                {whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-primary-green mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-600 font-body">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-primary-blue hover:bg-primary-blue/90 text-white font-body px-8"
            >
              Hubungi Tim Kami
            </Button>
          </div>

          {/* Right Content - Stats & Visual */}
          <div className="space-y-8">
            {/* Achievements Grid */}
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-3">
                    {achievement.icon}
                  </div>
                  <div className="text-3xl font-heading font-bold text-primary-blue mb-1">
                    {achievement.number}
                  </div>
                  <div className="text-gray-600 font-body text-sm">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Process Visual */}
            <div className="bg-gradient-to-br from-primary-blue to-primary-blue/90 rounded-2xl p-8 text-white">
              <h4 className="text-xl font-heading font-bold mb-6 text-center">
                Proses Kerja Kami
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span className="font-body">Konsultasi & Analisis Kebutuhan</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span className="font-body">Desain & Prototype</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <span className="font-body">Development & Testing</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <span className="font-body">Launch & Maintenance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About