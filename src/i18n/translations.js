export const translations = {
  id: {
    header: {
      nav: {
        home: "Beranda",
        services: "Layanan",
        pricelist: "Harga",
        about: "Tentang",
        contact: "Kontak",
      },
      cta: "Konsultasi Gratis",
      dashboard: "Dashboard",
      logout: "Logout",
    },
    hero: {
      badge: "Solusi Digital untuk Bisnis Anda",
      title: {
        line1: "Wujudkan",
        line2: "Bisnis Digital",
        line3: "Bersama Kami",
      },
      description:
        "Kami membantu UMKM dan perusahaan membangun website dan aplikasi web yang profesional, responsif, dan menguntungkan.",
      benefits: [
        "Website Responsif & Modern",
        "SEO Optimized untuk Ranking Google",
        "Maintenance & Support 24/7",
      ],
      ctaPrimary: "Mulai Konsultasi Gratis",
      ctaSecondary: "Lihat Portfolio",
      stats: {
        custom: "Solusi Custom",
        support: "Support Aktif",
        consultation: "Konsultasi Awal",
        guarantee: "Kepuasan Klien",
        trusted: "Terpercaya",
      },
      mobileStats: {
        custom: "Custom",
        support: "Support",
        consultation: "Konsultasi",
      },
    },
    services: {
      badge: "Layanan Kami",
      titlePart1: "Solusi Digital",
      titlePart2: "Komprehensif",
      subtitle:
        "Kami menyediakan berbagai layanan pengembangan web untuk membantu bisnis Anda berkembang di era digital.",
      counterLabel: "Services",
      learnMore: "Lihat detail",
      items: [
        {
          title: "Application Dev",
          description:
            "Pengembangan aplikasi mobile dan desktop yang powerful, scalable, dan user-friendly sesuai kebutuhan bisnis Anda.",
          features: ["iOS & Android", "Cross Platform", "Cloud Sync", "Push Notification"],
        },
        {
          title: "Web Development",
          description:
            "Website modern dan responsif dengan performa tinggi, mulai dari company profile hingga aplikasi web kompleks.",
          features: ["Responsive Design", "SEO Friendly", "Fast Loading", "Secure"],
        },
        {
          title: "Data Solutions",
          description:
            "Solusi pengolahan, integrasi, dan visualisasi data untuk membantu pengambilan keputusan bisnis yang akurat.",
          features: ["Data Pipeline", "Analytics", "Dashboard", "Integration"],
        },
        {
          title: "Digital Invites",
          description:
            "Undangan digital elegan dan interaktif untuk pernikahan, acara perusahaan, dan event spesial Anda.",
          features: ["Custom Theme", "RSVP Online", "Gallery", "Map Integration"],
        },
      ],
      details: [
        {
          tagline: "Aplikasi Mobile & Desktop",
          longDescription:
            "Dari ide hingga produk siap rilis, kami membangun aplikasi mobile dan desktop yang nyaman digunakan setiap hari. Fokus pada arsitektur yang scalable, pengalaman pengguna yang mulus, dan integrasi backend yang andal — agar bisnis Anda bisa berkembang tanpa hambatan teknis.",
          benefits: [
            "Tim cross-platform yang akrab dengan React Native, Flutter, dan native iOS/Android",
            "Code base modular, mudah dirawat dan dikembangkan jangka panjang",
            "Integrasi API dan layanan pihak ketiga (payment, notifikasi, analytics)",
            "Testing menyeluruh pada device nyata sebelum rilis",
            "Pendampingan publikasi ke App Store dan Play Store",
            "Dukungan maintenance pasca-launch agar aplikasi tetap relevan",
          ],
          packages: [
            {
              name: "Mobile MVP",
              description: "Aplikasi cross-platform untuk validasi ide dan early traction.",
              price: "8 Juta",
              priceEn: "8 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Cross-platform (iOS & Android)",
                "Hingga 5 fitur utama",
                "Autentikasi & profil user",
                "Backend Firebase / serverless",
                "Publikasi ke store",
                "1 bulan maintenance",
              ],
              cta: "Mulai MVP",
              waMessage:
                "Halo, saya tertarik dengan paket Mobile MVP. Bisa konsultasi lebih lanjut?",
            },
            {
              name: "Custom App",
              description: "Aplikasi lengkap dengan backend khusus dan integrasi bisnis.",
              price: "15 Juta",
              priceEn: "15 Million",
              suffixKey: "from",
              popular: true,
              features: [
                "Semua fitur Mobile MVP",
                "Backend custom (Node.js / Go / Laravel)",
                "Admin panel & dashboard",
                "Payment & notification integration",
                "Push notification & deep linking",
                "Analytics & crash reporting",
                "3 bulan maintenance",
              ],
              cta: "Bangun Aplikasi",
              waMessage:
                "Halo, saya tertarik dengan paket Custom App. Bisa diskusi kebutuhan saya?",
            },
            {
              name: "Enterprise App",
              description: "Solusi aplikasi kompleks dengan fitur khusus dan skala besar.",
              price: "Custom",
              priceEn: "Custom",
              suffixKey: "contact",
              popular: false,
              features: [
                "Arsitektur micro-services",
                "Integrasi sistem internal (ERP/CRM)",
                "Multi-role & permission",
                "Compliance & keamanan tingkat enterprise",
                "Priority support 24/7",
                "Training & dokumentasi lengkap",
              ],
              cta: "Konsultasi Enterprise",
              waMessage: "Halo, saya butuh aplikasi enterprise. Bisa diskusi lebih lanjut?",
            },
          ],
        },
        {
          tagline: "Website & Web Application",
          longDescription:
            "Website yang cepat, modern, dan dirancang untuk konversi. Kami menggabungkan desain yang khas dengan fondasi teknis yang kuat — dari company profile sederhana hingga aplikasi web kompleks yang menggerakkan operasional bisnis Anda.",
          benefits: [
            "Desain custom yang mencerminkan karakter brand Anda",
            "Performance Score 90+ di Google Lighthouse",
            "SEO-ready dengan struktur semantik dan metadata yang tepat",
            "CMS yang mudah dikelola, tanpa perlu sentuh kode",
            "Hosting & domain ditangani end-to-end di tahun pertama",
            "Maintenance, backup, dan monitoring rutin",
          ],
          packages: [
            {
              name: "Starter",
              description:
                "Cocok untuk UMKM dan bisnis yang ingin tampil profesional secara online.",
              price: "2 Juta",
              priceEn: "2 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Website Company Profile",
                "Desain responsif (mobile-friendly)",
                "Hingga 5 halaman",
                "Formulir kontak & integrasi WhatsApp",
                "SSL & hosting tahun pertama",
                "1 bulan support gratis",
              ],
              cta: "Mulai Sekarang",
              waMessage:
                "Halo, saya tertarik dengan paket Starter Web. Bisa konsultasi lebih lanjut?",
            },
            {
              name: "Business",
              description:
                "Untuk bisnis yang butuh fitur lebih, blog, dan tampilan premium.",
              price: "5 Juta",
              priceEn: "5 Million",
              suffixKey: "from",
              popular: true,
              features: [
                "Semua fitur Starter",
                "Desain custom premium",
                "Hingga 10 halaman",
                "SEO on-page optimization",
                "Blog / artikel system + CMS",
                "Google Analytics & Search Console",
                "3 bulan support gratis",
                "Revisi tanpa batas",
              ],
              cta: "Pilih Business",
              waMessage:
                "Halo, saya tertarik dengan paket Business Web. Bisa konsultasi lebih lanjut?",
            },
            {
              name: "Enterprise",
              description:
                "E-commerce, web app, atau sistem custom sesuai alur kerja bisnis Anda.",
              price: "Custom",
              priceEn: "Custom",
              suffixKey: "contact",
              popular: false,
              features: [
                "Semua fitur Business",
                "E-commerce / Web Application",
                "Payment gateway integration",
                "API development & integrasi sistem",
                "Database & cloud hosting",
                "Priority support 24/7",
                "6 bulan support gratis",
              ],
              cta: "Konsultasi Enterprise",
              waMessage:
                "Halo, saya butuh web app/e-commerce custom. Bisa diskusi lebih lanjut?",
            },
          ],
        },
        {
          tagline: "Data Pipeline & Visualisasi",
          longDescription:
            "Ubah data Anda menjadi keputusan. Kami membangun pipeline, dashboard, dan integrasi yang membuat data bisnis terorganisir, mudah dibaca, dan benar-benar berguna untuk tim operasional maupun manajemen.",
          benefits: [
            "Pipeline data otomatis dari berbagai sumber",
            "Dashboard interaktif yang dipersonalisasi per peran",
            "Integrasi langsung dengan tools yang Anda gunakan",
            "Visualisasi yang fokus pada insight, bukan sekadar grafik",
            "Skalabel — dari ratusan baris hingga jutaan record",
            "Pendampingan tim agar mampu mengoperasikan secara mandiri",
          ],
          packages: [
            {
              name: "Insight",
              description: "Dashboard dan laporan rutin untuk satu unit bisnis.",
              price: "5 Juta",
              priceEn: "5 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "1 dashboard interaktif",
                "Integrasi 1-2 sumber data",
                "Laporan otomatis mingguan/bulanan",
                "Hingga 5 metrik utama",
                "1 bulan support gratis",
              ],
              cta: "Mulai Dashboard",
              waMessage:
                "Halo, saya tertarik dengan paket Insight (data). Bisa konsultasi lebih lanjut?",
            },
            {
              name: "Analytics",
              description:
                "Pipeline lengkap, visualisasi mendalam, dan analisis lintas departemen.",
              price: "10 Juta",
              priceEn: "10 Million",
              suffixKey: "from",
              popular: true,
              features: [
                "Semua fitur Insight",
                "Pipeline ETL otomatis",
                "Integrasi 3-5 sumber data",
                "Dashboard multi-role",
                "Forecasting & analisis trend",
                "3 bulan support gratis",
              ],
              cta: "Pilih Analytics",
              waMessage:
                "Halo, saya tertarik dengan paket Analytics (data). Bisa konsultasi lebih lanjut?",
            },
            {
              name: "Platform",
              description: "Data platform end-to-end dengan governance dan skala enterprise.",
              price: "Custom",
              priceEn: "Custom",
              suffixKey: "contact",
              popular: false,
              features: [
                "Data warehouse / data lake",
                "Pipeline real-time & batch",
                "Governance & data quality",
                "Machine learning ready",
                "Priority support 24/7",
                "Training tim data internal",
              ],
              cta: "Konsultasi Platform",
              waMessage:
                "Halo, saya butuh data platform enterprise. Bisa diskusi lebih lanjut?",
            },
          ],
        },
        {
          tagline: "Undangan Digital Interaktif",
          longDescription:
            "Undangan digital yang membuat tamu Anda merasa diundang secara istimewa. Dari pernikahan, ulang tahun, hingga acara korporat — kami merancang pengalaman undangan yang elegan, interaktif, dan mudah dibagikan ke siapa pun.",
          benefits: [
            "Desain custom mengikuti tema dan warna acara Anda",
            "RSVP online dengan rekap otomatis ke dashboard",
            "Galeri foto & video, countdown, dan musik latar",
            "Integrasi Google Maps untuk lokasi acara",
            "Domain custom atau link share yang elegan",
            "Tampilan tetap cepat di koneksi 4G",
          ],
          packages: [
            {
              name: "Classic",
              description:
                "Template elegan dengan tema dan warna yang disesuaikan untuk acara Anda.",
              price: "300 Ribu",
              priceEn: "300 Thousand",
              suffixKey: "from",
              popular: false,
              features: [
                "Pilihan tema premium",
                "Custom nama, tanggal, dan foto",
                "Hingga 4 sesi acara",
                "Galeri foto (hingga 12)",
                "Lokasi & countdown",
                "Aktif 3 bulan",
              ],
              cta: "Pilih Classic",
              waMessage:
                "Halo, saya tertarik dengan paket Classic (undangan digital). Bisa konsultasi lebih lanjut?",
            },
            {
              name: "Premium",
              description: "Desain custom penuh dengan animasi, RSVP, dan amplop digital.",
              price: "600 Ribu",
              priceEn: "600 Thousand",
              suffixKey: "from",
              popular: true,
              features: [
                "Desain custom dari nol",
                "Animasi & micro-interaction",
                "RSVP online + rekap tamu",
                "Amplop digital (transfer/QRIS)",
                "Galeri & video tanpa batas",
                "Domain custom .me / .id",
                "Aktif 6 bulan",
              ],
              cta: "Pilih Premium",
              waMessage:
                "Halo, saya tertarik dengan paket Premium (undangan digital). Bisa konsultasi lebih lanjut?",
            },
            {
              name: "Luxury",
              description:
                "Undangan eksklusif dengan fitur khusus dan dukungan event manager.",
              price: "Custom",
              priceEn: "Custom",
              suffixKey: "contact",
              popular: false,
              features: [
                "Konsep & art direction khusus",
                "Live streaming integration",
                "Manajemen tamu lengkap (group/VIP)",
                "Multi-bahasa",
                "Pendamping dedicated saat hari-H",
                "Aktif tanpa batas waktu",
              ],
              cta: "Konsultasi Luxury",
              waMessage: "Halo, saya butuh undangan digital luxury. Bisa diskusi lebih lanjut?",
            },
          ],
        },
      ],
      cta: {
        title: "Siap Memulai Proyek Anda?",
        subtitle:
          "Konsultasikan kebutuhan website atau aplikasi web Anda dengan tim ahli kami. Dapatkan penawaran terbaik.",
        primary: "Konsultasi Gratis Sekarang",
        secondary: "Lihat Harga Paket",
      },
    },
    serviceDetail: {
      back: "Kembali ke Beranda",
      overviewBadge: "Tentang Layanan",
      capabilitiesTitle: "Yang Anda Dapatkan",
      capabilitiesSubtitle:
        "Setiap detail dirancang untuk mendorong bisnis Anda lebih jauh.",
      benefitsBadge: "Kenapa Pilih Kami",
      benefitsTitle: "Bukan sekadar layanan, tapi partner",
      processBadge: "Cara Kami Bekerja",
      processTitle: "Alur kerja yang transparan & terstruktur",
      processSteps: [
        { title: "Discovery", desc: "Mendengarkan kebutuhan, tujuan, dan kendala Anda." },
        { title: "Design & Plan", desc: "Merancang solusi yang tepat dengan timeline jelas." },
        {
          title: "Build & Test",
          desc: "Membangun dengan kualitas tinggi dan pengujian menyeluruh.",
        },
        { title: "Launch & Support", desc: "Peluncuran lancar dan dukungan setelahnya." },
      ],
      pricingBadge: "Paket Layanan",
      pricingTitle: "Pilih paket yang sesuai untuk Anda",
      pricingSubtitle:
        "Harga transparan tanpa biaya tersembunyi. Tidak yakin paket mana? Konsultasi gratis terlebih dahulu.",
      popularBadge: "Paling Populer",
      suffixFrom: "mulai dari",
      suffixContact: "hubungi kami",
      ctaTitle: "Siap memulai proyek Anda?",
      ctaSubtitle:
        "Konsultasikan kebutuhan Anda dengan tim kami. Gratis, tanpa komitmen.",
      ctaButton: "Chat WhatsApp",
      ctaSecondary: "Lihat layanan lain",
      waMessage: "Halo, saya ingin diskusi lebih lanjut tentang layanan Anda.",
      notFoundTitle: "Layanan tidak ditemukan",
      notFoundDesc: "Layanan yang Anda cari belum tersedia.",
      otherServicesTitle: "Layanan lainnya",
    },
    about: {
      badge: "Tentang Kami",
      titlePart1: "Partner Digital",
      titleHighlight: "Terpercaya",
      titlePart2: "untuk Bisnis Anda",
      description:
        "Kami adalah tim yang berdedikasi untuk membantu UMKM dan perusahaan dalam transformasi digital. Sebagai partner yang baru merintis, kami menghadirkan pendekatan personal, dedikasi penuh, dan tech stack modern untuk mewujudkan visi digital Anda — bukan sekadar daftar angka.",
      whyTitle: "Mengapa Memilih Kami?",
      whyList: [
        "Tim developer berpengalaman dengan keahlian terkini",
        "Proses development yang transparan dan terstruktur",
        "Harga kompetitif dengan kualitas premium",
        "Support dan maintenance jangka panjang",
        "Garansi revisi hingga Anda puas",
        "Delivery tepat waktu sesuai timeline",
      ],
      cta: "Hubungi Tim Kami",
      achievements: [
        { label: "Solusi Custom" },
        { label: "Komitmen Mutu" },
        { label: "Support Aktif" },
        { label: "Konsultasi Awal" },
      ],
      processTitle: "Proses Kerja Kami",
      processSteps: [
        { title: "Konsultasi & Analisis", desc: "Memahami kebutuhan bisnis Anda" },
        { title: "Desain & Prototype", desc: "Merancang solusi yang tepat" },
        { title: "Development & Testing", desc: "Membangun dengan kualitas tinggi" },
        { title: "Launch & Maintenance", desc: "Peluncuran dan dukungan berkelanjutan" },
      ],
    },
    pricelist: {
      badge: "Harga & Paket",
      titlePart1: "Investasi",
      titleHighlight: "Terjangkau",
      titlePart2: "untuk Bisnis Anda",
      subtitle1: "Mulai dari",
      subtitleAmount: "Rp 2 Juta",
      subtitle2:
        ", Anda sudah bisa memiliki website company profile profesional yang siap meningkatkan kredibilitas bisnis Anda.",
      trustItems: [
        "Tanpa biaya tersembunyi",
        "Gratis domain & hosting tahun pertama",
        "Garansi uang kembali",
      ],
      popularBadge: "Paling Populer",
      suffixFrom: "mulai dari",
      suffixContact: "hubungi kami",
      packages: [
        {
          name: "Starter",
          description:
            "Cocok untuk UMKM dan bisnis kecil yang ingin hadir secara profesional di dunia digital.",
          features: [
            "Website Company Profile",
            "Desain Responsif (Mobile Friendly)",
            "Hingga 5 Halaman",
            "Formulir Kontak",
            "Integrasi WhatsApp",
            "SSL Certificate",
            "1 Bulan Support Gratis",
          ],
          cta: "Mulai Sekarang",
          waMessage:
            "Halo, saya tertarik dengan paket Starter untuk website company profile. Bisa konsultasi lebih lanjut?",
        },
        {
          name: "Business",
          description:
            "Solusi lengkap untuk bisnis yang membutuhkan fitur lebih dan tampilan premium.",
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
          cta: "Pilih Business",
          waMessage: "Halo, saya tertarik dengan paket Business. Bisa konsultasi lebih lanjut?",
        },
        {
          name: "Enterprise",
          description:
            "Untuk kebutuhan khusus seperti e-commerce, web app, atau sistem custom sesuai bisnis Anda.",
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
          cta: "Konsultasi Dulu",
          waMessage:
            "Halo, saya tertarik dengan paket Enterprise. Bisa konsultasi untuk kebutuhan custom saya?",
        },
      ],
      waCta: {
        badge: "Konsultasi Gratis via WhatsApp",
        title: "Bingung Pilih Paket?",
        subtitle1:
          "Tidak perlu khawatir! Tim kami siap membantu Anda memilih paket yang paling sesuai dengan kebutuhan dan budget bisnis Anda.",
        subtitle2:
          "Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan Anda dan dapatkan rekomendasi terbaik dari tim ahli kami.",
        button: "Chat WhatsApp Sekarang",
        waMessage:
          "Halo, saya ingin konsultasi mengenai pembuatan website. Bisa bantu saya memilih paket yang sesuai?",
      },
    },
    contact: {
      badge: "Hubungi Kami",
      titlePart1: "Mari",
      titleHighlight: "Berdiskusi",
      subtitle:
        "Siap untuk memulai proyek digital Anda? Tim ahli kami siap membantu mewujudkan visi bisnis Anda.",
      info: [
        { title: "Telepon", description: "Senin - Jumat, 09:00 - 18:00" },
        { title: "Email", description: "Respon dalam 24 jam" },
        { title: "Alamat", description: "Konsultasi online tersedia" },
        { title: "Jam Operasional", description: "Senin - Jumat" },
      ],
      formTitle: "Kirim Pesan",
      successTitle: "Pesan terkirim",
      successDesc: "Terima kasih! Tim kami akan segera menghubungi Anda.",
      labels: {
        name: "Nama Lengkap *",
        email: "Email *",
        subject: "Subjek *",
        message: "Pesan *",
      },
      placeholders: {
        name: "Masukkan nama lengkap",
        email: "nama@email.com",
        subject: "Singkat tentang topik pesan Anda",
        message: "Ceritakan tentang proyek yang Anda inginkan...",
      },
      submit: "Kirim Pesan",
      submitting: "Mengirim...",
      defaultError: "Gagal mengirim pesan",
    },
    footer: {
      description:
        "Membantu UMKM dan perusahaan dalam transformasi digital dengan solusi web yang profesional dan inovatif.",
      servicesTitle: "Layanan",
      services: [
        "Website Company Profile",
        "E-Commerce Development",
        "Web Application",
        "SEO Optimization",
        "UI/UX Design",
        "Maintenance & Support",
      ],
      menuTitle: "Menu",
      quickLinks: [
        { name: "Beranda", href: "/" },
        { name: "Layanan", href: "/#services" },
        { name: "Tentang Kami", href: "/#about" },
        { name: "Blog", href: "/blog" },
        { name: "Kontak", href: "/#contact" },
      ],
      newsletterTitle: "Newsletter",
      newsletterDesc: "Dapatkan tips dan update terbaru tentang teknologi web.",
      emailPlaceholder: "Email Anda",
      followUs: "Ikuti Kami",
      copyright: "All rights reserved.",
      legal: ["Privacy Policy", "Terms of Service", "Sitemap"],
    },
  },
  en: {
    header: {
      nav: {
        home: "Home",
        services: "Services",
        pricelist: "Pricing",
        about: "About",
        contact: "Contact",
      },
      cta: "Free Consultation",
      dashboard: "Dashboard",
      logout: "Logout",
    },
    hero: {
      badge: "Digital Solutions for Your Business",
      title: {
        line1: "Build Your",
        line2: "Digital Business",
        line3: "With Us",
      },
      description:
        "We help SMEs and enterprises build professional, responsive, and profitable websites and web applications.",
      benefits: [
        "Responsive & Modern Website",
        "SEO Optimized for Google Ranking",
        "24/7 Maintenance & Support",
      ],
      ctaPrimary: "Start Free Consultation",
      ctaSecondary: "View Portfolio",
      stats: {
        custom: "Custom Solutions",
        support: "Active Support",
        consultation: "Initial Consultation",
        guarantee: "Client Satisfaction",
        trusted: "Trusted",
      },
      mobileStats: {
        custom: "Custom",
        support: "Support",
        consultation: "Consult",
      },
    },
    services: {
      badge: "Our Services",
      titlePart1: "Comprehensive",
      titlePart2: "Digital Solutions",
      subtitle:
        "We provide a range of web development services to help your business thrive in the digital era.",
      counterLabel: "Services",
      learnMore: "See details",
      items: [
        {
          title: "Application Dev",
          description:
            "Powerful, scalable, and user-friendly mobile and desktop application development tailored to your business needs.",
          features: ["iOS & Android", "Cross Platform", "Cloud Sync", "Push Notification"],
        },
        {
          title: "Web Development",
          description:
            "Modern, responsive websites with high performance — from company profiles to complex web applications.",
          features: ["Responsive Design", "SEO Friendly", "Fast Loading", "Secure"],
        },
        {
          title: "Data Solutions",
          description:
            "Data processing, integration, and visualization solutions to support accurate business decisions.",
          features: ["Data Pipeline", "Analytics", "Dashboard", "Integration"],
        },
        {
          title: "Digital Invites",
          description:
            "Elegant and interactive digital invitations for weddings, corporate events, and your special occasions.",
          features: ["Custom Theme", "RSVP Online", "Gallery", "Map Integration"],
        },
      ],
      details: [
        {
          tagline: "Mobile & Desktop Applications",
          longDescription:
            "From idea to launch-ready product, we build mobile and desktop applications that feel great to use every day. Focused on scalable architecture, smooth UX, and reliable backend integration — so your business can grow without technical friction.",
          benefits: [
            "Cross-platform team familiar with React Native, Flutter, and native iOS/Android",
            "Modular code base, easy to maintain and evolve long-term",
            "Integrations with third-party services (payments, notifications, analytics)",
            "End-to-end testing on real devices before release",
            "App Store and Play Store publishing assistance",
            "Post-launch maintenance to keep the app fresh",
          ],
          packages: [
            {
              name: "Mobile MVP",
              description:
                "Cross-platform application to validate your idea and earn early traction.",
              price: "8 Juta",
              priceEn: "8 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Cross-platform (iOS & Android)",
                "Up to 5 core features",
                "Authentication & user profile",
                "Firebase / serverless backend",
                "Store publishing assistance",
                "1 month maintenance",
              ],
              cta: "Start the MVP",
              waMessage:
                "Hi, I'm interested in the Mobile MVP package. Can we discuss further?",
            },
            {
              name: "Custom App",
              description: "A full application with a custom backend and business integrations.",
              price: "15 Juta",
              priceEn: "15 Million",
              suffixKey: "from",
              popular: true,
              features: [
                "Everything in Mobile MVP",
                "Custom backend (Node.js / Go / Laravel)",
                "Admin panel & dashboard",
                "Payment & notification integration",
                "Push notification & deep linking",
                "Analytics & crash reporting",
                "3 months maintenance",
              ],
              cta: "Build the App",
              waMessage:
                "Hi, I'm interested in the Custom App package. Can we discuss my needs?",
            },
            {
              name: "Enterprise App",
              description:
                "Complex application solutions with custom features at enterprise scale.",
              price: "Custom",
              priceEn: "Custom",
              suffixKey: "contact",
              popular: false,
              features: [
                "Micro-services architecture",
                "Internal system integrations (ERP/CRM)",
                "Multi-role & permissions",
                "Enterprise-grade compliance & security",
                "Priority 24/7 support",
                "Training & complete documentation",
              ],
              cta: "Enterprise Consult",
              waMessage:
                "Hi, I need an enterprise application. Can we discuss further?",
            },
          ],
        },
        {
          tagline: "Websites & Web Applications",
          longDescription:
            "Fast, modern websites built for conversion. We pair distinctive design with strong technical foundations — from simple company profiles to complex web applications that power your operations.",
          benefits: [
            "Custom design that reflects the character of your brand",
            "Performance Score 90+ on Google Lighthouse",
            "SEO-ready with semantic structure and proper metadata",
            "Easy-to-manage CMS — no need to touch code",
            "Hosting & domain handled end-to-end for the first year",
            "Routine maintenance, backups, and monitoring",
          ],
          packages: [
            {
              name: "Starter",
              description:
                "Great for SMEs and businesses wanting to look professional online.",
              price: "2 Juta",
              priceEn: "2 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Company Profile Website",
                "Responsive (mobile-friendly) design",
                "Up to 5 pages",
                "Contact form & WhatsApp integration",
                "SSL & first-year hosting",
                "1 month free support",
              ],
              cta: "Get Started",
              waMessage:
                "Hi, I'm interested in the Starter Web package. Can we discuss further?",
            },
            {
              name: "Business",
              description:
                "For businesses needing more features, a blog, and a premium look.",
              price: "5 Juta",
              priceEn: "5 Million",
              suffixKey: "from",
              popular: true,
              features: [
                "Everything in Starter",
                "Premium custom design",
                "Up to 10 pages",
                "SEO on-page optimization",
                "Blog / article system + CMS",
                "Google Analytics & Search Console",
                "3 months free support",
                "Unlimited revisions",
              ],
              cta: "Choose Business",
              waMessage:
                "Hi, I'm interested in the Business Web package. Can we discuss further?",
            },
            {
              name: "Enterprise",
              description:
                "E-commerce, web apps, or custom systems built around your workflow.",
              price: "Custom",
              priceEn: "Custom",
              suffixKey: "contact",
              popular: false,
              features: [
                "Everything in Business",
                "E-commerce / Web Application",
                "Payment gateway integration",
                "API development & system integration",
                "Database & cloud hosting",
                "Priority 24/7 support",
                "6 months free support",
              ],
              cta: "Enterprise Consult",
              waMessage:
                "Hi, I need a custom web app/e-commerce. Can we discuss further?",
            },
          ],
        },
        {
          tagline: "Data Pipelines & Visualization",
          longDescription:
            "Turn your data into decisions. We build pipelines, dashboards, and integrations that keep business data organized, readable, and genuinely useful for both operational teams and leadership.",
          benefits: [
            "Automated data pipelines from multiple sources",
            "Interactive dashboards personalized per role",
            "Direct integrations with the tools you already use",
            "Visualizations focused on insight, not just charts",
            "Scalable — from hundreds of rows to millions of records",
            "Team enablement so you can operate independently",
          ],
          packages: [
            {
              name: "Insight",
              description: "Dashboards and recurring reports for a single business unit.",
              price: "5 Juta",
              priceEn: "5 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "1 interactive dashboard",
                "1-2 data source integrations",
                "Automated weekly/monthly reports",
                "Up to 5 core metrics",
                "1 month free support",
              ],
              cta: "Start Dashboard",
              waMessage:
                "Hi, I'm interested in the Insight (data) package. Can we discuss further?",
            },
            {
              name: "Analytics",
              description:
                "Complete pipelines, deep visualization, and cross-departmental analysis.",
              price: "10 Juta",
              priceEn: "10 Million",
              suffixKey: "from",
              popular: true,
              features: [
                "Everything in Insight",
                "Automated ETL pipeline",
                "3-5 data source integrations",
                "Multi-role dashboards",
                "Forecasting & trend analysis",
                "3 months free support",
              ],
              cta: "Choose Analytics",
              waMessage:
                "Hi, I'm interested in the Analytics (data) package. Can we discuss further?",
            },
            {
              name: "Platform",
              description:
                "End-to-end data platform with governance at enterprise scale.",
              price: "Custom",
              priceEn: "Custom",
              suffixKey: "contact",
              popular: false,
              features: [
                "Data warehouse / data lake",
                "Real-time & batch pipelines",
                "Governance & data quality",
                "Machine learning ready",
                "Priority 24/7 support",
                "Internal data team training",
              ],
              cta: "Platform Consult",
              waMessage:
                "Hi, I need an enterprise data platform. Can we discuss further?",
            },
          ],
        },
        {
          tagline: "Interactive Digital Invitations",
          longDescription:
            "Digital invitations that make your guests feel personally welcomed. From weddings and birthdays to corporate events — we craft elegant, interactive invitation experiences that are easy to share with anyone.",
          benefits: [
            "Custom design matching your event's theme and palette",
            "Online RSVP with automatic guest tracking dashboard",
            "Photo & video gallery, countdown, and background music",
            "Google Maps integration for the venue",
            "Custom domain or elegant share link",
            "Stays fast even on 4G connections",
          ],
          packages: [
            {
              name: "Classic",
              description:
                "An elegant template with themes and colors tailored to your event.",
              price: "300 Ribu",
              priceEn: "300 Thousand",
              suffixKey: "from",
              popular: false,
              features: [
                "Curated premium themes",
                "Custom names, dates, and photos",
                "Up to 4 event sessions",
                "Photo gallery (up to 12)",
                "Location & countdown",
                "Active for 3 months",
              ],
              cta: "Choose Classic",
              waMessage:
                "Hi, I'm interested in the Classic (digital invite) package. Can we discuss further?",
            },
            {
              name: "Premium",
              description:
                "Fully custom design with animations, RSVP, and digital envelope.",
              price: "600 Ribu",
              priceEn: "600 Thousand",
              suffixKey: "from",
              popular: true,
              features: [
                "Designed from scratch",
                "Animation & micro-interactions",
                "Online RSVP + guest tracking",
                "Digital envelope (transfer/QRIS)",
                "Unlimited gallery & video",
                "Custom .me / .id domain",
                "Active for 6 months",
              ],
              cta: "Choose Premium",
              waMessage:
                "Hi, I'm interested in the Premium (digital invite) package. Can we discuss further?",
            },
            {
              name: "Luxury",
              description:
                "An exclusive invitation with bespoke features and event-manager support.",
              price: "Custom",
              priceEn: "Custom",
              suffixKey: "contact",
              popular: false,
              features: [
                "Bespoke concept & art direction",
                "Live streaming integration",
                "Full guest management (group/VIP)",
                "Multi-language",
                "Dedicated coordinator on the day",
                "Active indefinitely",
              ],
              cta: "Luxury Consult",
              waMessage:
                "Hi, I need a luxury digital invitation. Can we discuss further?",
            },
          ],
        },
      ],
      cta: {
        title: "Ready to Start Your Project?",
        subtitle:
          "Discuss your website or web application needs with our expert team. Get the best offer.",
        primary: "Get Free Consultation Now",
        secondary: "See Package Pricing",
      },
    },
    serviceDetail: {
      back: "Back to Home",
      overviewBadge: "About this service",
      capabilitiesTitle: "What You'll Get",
      capabilitiesSubtitle:
        "Every detail crafted to move your business forward.",
      benefitsBadge: "Why Us",
      benefitsTitle: "More than a service — a real partner",
      processBadge: "How We Work",
      processTitle: "A transparent, structured workflow",
      processSteps: [
        { title: "Discovery", desc: "We listen to your needs, goals, and constraints." },
        { title: "Design & Plan", desc: "We design the right solution with a clear timeline." },
        {
          title: "Build & Test",
          desc: "We build with high quality and thorough testing.",
        },
        {
          title: "Launch & Support",
          desc: "Smooth launch with ongoing post-launch support.",
        },
      ],
      pricingBadge: "Service Packages",
      pricingTitle: "Pick the package that fits you",
      pricingSubtitle:
        "Transparent pricing, no hidden fees. Not sure which one? Get a free consultation first.",
      popularBadge: "Most Popular",
      suffixFrom: "starting from",
      suffixContact: "contact us",
      ctaTitle: "Ready to start your project?",
      ctaSubtitle:
        "Discuss your needs with our team. Free, no commitment.",
      ctaButton: "Chat on WhatsApp",
      ctaSecondary: "View other services",
      waMessage: "Hi, I'd like to discuss your services further.",
      notFoundTitle: "Service not found",
      notFoundDesc: "The service you're looking for isn't available.",
      otherServicesTitle: "Other services",
    },
    about: {
      badge: "About Us",
      titlePart1: "Your Trusted",
      titleHighlight: "Digital Partner",
      titlePart2: "for Business Growth",
      description:
        "We are a dedicated team helping SMEs and enterprises with digital transformation. As an emerging partner, we bring a personal approach, full dedication, and a modern tech stack to realize your digital vision — not just a list of numbers.",
      whyTitle: "Why Choose Us?",
      whyList: [
        "Experienced developers with up-to-date expertise",
        "Transparent and structured development process",
        "Competitive pricing with premium quality",
        "Long-term support and maintenance",
        "Revision guarantee until you're satisfied",
        "On-time delivery as per timeline",
      ],
      cta: "Contact Our Team",
      achievements: [
        { label: "Custom Solutions" },
        { label: "Quality Commitment" },
        { label: "Active Support" },
        { label: "Initial Consultation" },
      ],
      processTitle: "Our Work Process",
      processSteps: [
        { title: "Consultation & Analysis", desc: "Understanding your business needs" },
        { title: "Design & Prototype", desc: "Designing the right solution" },
        { title: "Development & Testing", desc: "Building with high quality" },
        { title: "Launch & Maintenance", desc: "Launch and ongoing support" },
      ],
    },
    pricelist: {
      badge: "Pricing & Packages",
      titlePart1: "Affordable",
      titleHighlight: "Investment",
      titlePart2: "for Your Business",
      subtitle1: "Starting from",
      subtitleAmount: "IDR 2 Million",
      subtitle2:
        ", you can already own a professional company profile website that boosts your business credibility.",
      trustItems: [
        "No hidden fees",
        "Free domain & hosting for the first year",
        "Money-back guarantee",
      ],
      popularBadge: "Most Popular",
      suffixFrom: "starting from",
      suffixContact: "contact us",
      packages: [
        {
          name: "Starter",
          description:
            "Ideal for SMEs and small businesses wanting a professional presence in the digital world.",
          features: [
            "Company Profile Website",
            "Responsive Design (Mobile Friendly)",
            "Up to 5 Pages",
            "Contact Form",
            "WhatsApp Integration",
            "SSL Certificate",
            "1 Month Free Support",
          ],
          cta: "Get Started",
          waMessage:
            "Hi, I'm interested in the Starter package for a company profile website. Can we discuss further?",
        },
        {
          name: "Business",
          description:
            "A complete solution for businesses needing more features and a premium look.",
          features: [
            "All Starter features",
            "Premium Custom Design",
            "Up to 10 Pages",
            "SEO On-Page Optimization",
            "Blog / Article System",
            "Google Analytics Setup",
            "Admin Panel (CMS)",
            "3 Months Free Support",
            "Unlimited Revisions",
          ],
          cta: "Choose Business",
          waMessage: "Hi, I'm interested in the Business package. Can we discuss further?",
        },
        {
          name: "Enterprise",
          description:
            "For specialized needs such as e-commerce, web apps, or custom systems tailored to your business.",
          features: [
            "All Business features",
            "E-Commerce / Web Application",
            "Payment Gateway Integration",
            "Custom Features as Needed",
            "API Development",
            "Database & Cloud Hosting",
            "Priority Support 24/7",
            "6 Months Free Support",
            "Training & Documentation",
          ],
          cta: "Let's Talk",
          waMessage:
            "Hi, I'm interested in the Enterprise package. Can we discuss my custom requirements?",
        },
      ],
      waCta: {
        badge: "Free Consultation via WhatsApp",
        title: "Not Sure Which Package?",
        subtitle1:
          "No worries! Our team is ready to help you choose the package that best fits your business needs and budget.",
        subtitle2:
          "Free consultation, no commitment. Tell us your needs and get the best recommendation from our expert team.",
        button: "Chat on WhatsApp Now",
        waMessage:
          "Hi, I'd like to consult about building a website. Can you help me choose the right package?",
      },
    },
    contact: {
      badge: "Contact Us",
      titlePart1: "Let's",
      titleHighlight: "Talk",
      subtitle:
        "Ready to start your digital project? Our expert team is ready to help bring your business vision to life.",
      info: [
        { title: "Phone", description: "Mon - Fri, 09:00 - 18:00" },
        { title: "Email", description: "Reply within 24 hours" },
        { title: "Address", description: "Online consultation available" },
        { title: "Office Hours", description: "Mon - Fri" },
      ],
      formTitle: "Send Message",
      successTitle: "Message sent",
      successDesc: "Thank you! Our team will reach out to you shortly.",
      labels: {
        name: "Full Name *",
        email: "Email *",
        subject: "Subject *",
        message: "Message *",
      },
      placeholders: {
        name: "Enter your full name",
        email: "name@email.com",
        subject: "Briefly describe your message topic",
        message: "Tell us about the project you have in mind...",
      },
      submit: "Send Message",
      submitting: "Sending...",
      defaultError: "Failed to send message",
    },
    footer: {
      description:
        "Helping SMEs and enterprises with digital transformation through professional and innovative web solutions.",
      servicesTitle: "Services",
      services: [
        "Company Profile Website",
        "E-Commerce Development",
        "Web Application",
        "SEO Optimization",
        "UI/UX Design",
        "Maintenance & Support",
      ],
      menuTitle: "Menu",
      quickLinks: [
        { name: "Home", href: "/" },
        { name: "Services", href: "/#services" },
        { name: "About Us", href: "/#about" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/#contact" },
      ],
      newsletterTitle: "Newsletter",
      newsletterDesc: "Get the latest tips and updates on web technology.",
      emailPlaceholder: "Your email",
      followUs: "Follow Us",
      copyright: "All rights reserved.",
      legal: ["Privacy Policy", "Terms of Service", "Sitemap"],
    },
  },
}
