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
              name: "MVP",
              description: "Web app sederhana untuk validasi ide dan early traction.",
              price: "Rp 5 – 10 Juta",
              priceEn: "Rp 5 – 10 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Web app sederhana",
                "3-5 fitur inti",
                "Login & manajemen user",
                "Deploy production",
              ],
              cta: "Mulai MVP",
              waMessage:
                "Halo, saya tertarik dengan paket MVP (Application Dev). Bisa konsultasi lebih lanjut?",
            },
            {
              name: "Standard App",
              description:
                "Aplikasi mobile dengan fitur lengkap untuk operasional bisnis.",
              price: "Rp 12 – 25 Juta",
              priceEn: "Rp 12 – 25 Million",
              suffixKey: "from",
              popular: true,
              features: [
                "Mobile app (Android)",
                "5-10 fitur lengkap",
                "Notifikasi push",
                "Admin dashboard",
                "Integrasi payment",
                "3 bulan support",
              ],
              cta: "Pilih Standard",
              waMessage:
                "Halo, saya tertarik dengan paket Standard App. Bisa diskusi kebutuhan saya?",
            },
            {
              name: "Full Platform",
              description:
                "Platform aplikasi multi-channel dengan integrasi sistem dan skala besar.",
              price: "Rp 25 – 50 Juta",
              priceEn: "Rp 25 – 50 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Android + iOS",
                "Fitur kompleks custom",
                "API & third-party integration",
                "Cloud hosting setup",
                "6 bulan support",
                "Dokumentasi teknis",
              ],
              cta: "Konsultasi Platform",
              waMessage:
                "Halo, saya butuh Full Platform aplikasi. Bisa diskusi lebih lanjut?",
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
                "Landing page profesional untuk UMKM yang ingin hadir online.",
              price: "Rp 1,5 – 2,5 Juta",
              priceEn: "Rp 1.5 – 2.5 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Landing page / 1-3 halaman",
                "Desain responsif mobile",
                "Formulir kontak",
                "SSL + deploy",
              ],
              cta: "Mulai Starter",
              waMessage:
                "Halo, saya tertarik dengan paket Starter Web. Bisa konsultasi lebih lanjut?",
            },
            {
              name: "Business",
              description:
                "Website lengkap dengan CMS, SEO dasar, dan integrasi marketing.",
              price: "Rp 3,5 – 6 Juta",
              priceEn: "Rp 3.5 – 6 Million",
              suffixKey: "from",
              popular: true,
              features: [
                "5-10 halaman custom",
                "CMS / admin panel",
                "SEO on-page dasar",
                "Google Analytics",
                "WhatsApp integration",
                "2 bulan support",
              ],
              cta: "Pilih Business",
              waMessage:
                "Halo, saya tertarik dengan paket Business Web. Bisa konsultasi lebih lanjut?",
            },
            {
              name: "E-Commerce",
              description:
                "Toko online lengkap dengan payment gateway dan dashboard admin.",
              price: "Rp 7 – 15 Juta",
              priceEn: "Rp 7 – 15 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Semua fitur Business",
                "Sistem produk & order",
                "Payment gateway",
                "Dashboard admin",
                "3 bulan support",
                "PWA ready",
              ],
              cta: "Pilih E-Commerce",
              waMessage:
                "Halo, saya tertarik dengan paket E-Commerce. Bisa diskusi lebih lanjut?",
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
              name: "Data Cleaning",
              description:
                "Rapikan dan standarisasi data spreadsheet bisnis Anda.",
              price: "Rp 300 Rb – 1 Juta",
              priceEn: "Rp 300K – 1 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Rapikan data spreadsheet",
                "Hapus duplikat & error",
                "Standarisasi format",
              ],
              cta: "Mulai Cleaning",
              waMessage:
                "Halo, saya tertarik dengan paket Data Cleaning. Bisa konsultasi lebih lanjut?",
            },
            {
              name: "Dashboard",
              description:
                "Dashboard interaktif untuk memantau metrik bisnis secara real-time.",
              price: "Rp 1,5 – 4 Juta",
              priceEn: "Rp 1.5 – 4 Million",
              suffixKey: "from",
              popular: true,
              features: [
                "Dashboard interaktif",
                "Visualisasi & grafik",
                "Google Sheets / Looker",
                "Filter & drill-down",
                "Revisi 2x",
              ],
              cta: "Pilih Dashboard",
              waMessage:
                "Halo, saya tertarik dengan paket Dashboard (data). Bisa konsultasi lebih lanjut?",
            },
            {
              name: "Automation",
              description:
                "Otomatisasi alur data lintas sistem dengan script dan laporan otomatis.",
              price: "Rp 3 – 8 Juta",
              priceEn: "Rp 3 – 8 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Otomasi alur data",
                "Script Python / Apps Script",
                "Integrasi antar sistem",
                "Laporan otomatis",
                "Dokumentasi & training",
              ],
              cta: "Pilih Automation",
              waMessage:
                "Halo, saya tertarik dengan paket Automation (data). Bisa diskusi lebih lanjut?",
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
              name: "Basic",
              description:
                "Undangan digital praktis dengan template siap pakai dan share mudah.",
              price: "Rp 150 – 250 Rb",
              priceEn: "Rp 150K – 250K",
              suffixKey: "from",
              popular: false,
              features: [
                "Template siap pakai",
                "Link undangan aktif",
                "Countdown timer",
                "Share via WhatsApp",
              ],
              cta: "Pilih Basic",
              waMessage:
                "Halo, saya tertarik dengan paket Basic (undangan digital). Bisa konsultasi lebih lanjut?",
            },
            {
              name: "Premium",
              description:
                "Desain semi-custom dengan RSVP, galeri, dan integrasi maps & musik.",
              price: "Rp 350 – 600 Rb",
              priceEn: "Rp 350K – 600K",
              suffixKey: "from",
              popular: true,
              features: [
                "Desain semi-custom",
                "RSVP online",
                "Galeri foto",
                "Maps & musik",
                "QR Code tamu",
                "Revisi 2x",
              ],
              cta: "Pilih Premium",
              waMessage:
                "Halo, saya tertarik dengan paket Premium (undangan digital). Bisa konsultasi lebih lanjut?",
            },
            {
              name: "Exclusive",
              description:
                "Undangan full custom dengan animasi interaktif dan dashboard RSVP admin.",
              price: "Rp 800 Rb – 2 Juta",
              priceEn: "Rp 800K – 2 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Full custom desain",
                "Animasi interaktif",
                "Dashboard RSVP admin",
                "Domain custom",
                "Buku tamu digital",
                "Revisi unlimited",
              ],
              cta: "Pilih Exclusive",
              waMessage:
                "Halo, saya tertarik dengan paket Exclusive (undangan digital). Bisa diskusi lebih lanjut?",
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
        { name: "Tentang", href: "/#about" },
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
              name: "MVP",
              description: "Simple web app to validate your idea and earn early traction.",
              price: "Rp 5 – 10 Juta",
              priceEn: "Rp 5 – 10 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Simple web app",
                "3-5 core features",
                "Login & user management",
                "Production deployment",
              ],
              cta: "Start the MVP",
              waMessage:
                "Hi, I'm interested in the MVP (Application Dev) package. Can we discuss further?",
            },
            {
              name: "Standard App",
              description:
                "Mobile application with complete features for daily business operations.",
              price: "Rp 12 – 25 Juta",
              priceEn: "Rp 12 – 25 Million",
              suffixKey: "from",
              popular: true,
              features: [
                "Mobile app (Android)",
                "5-10 complete features",
                "Push notifications",
                "Admin dashboard",
                "Payment integration",
                "3 months support",
              ],
              cta: "Choose Standard",
              waMessage:
                "Hi, I'm interested in the Standard App package. Can we discuss my needs?",
            },
            {
              name: "Full Platform",
              description:
                "Multi-channel application platform with system integration and scale.",
              price: "Rp 25 – 50 Juta",
              priceEn: "Rp 25 – 50 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Android + iOS",
                "Complex custom features",
                "API & third-party integration",
                "Cloud hosting setup",
                "6 months support",
                "Technical documentation",
              ],
              cta: "Platform Consult",
              waMessage:
                "Hi, I need a Full Platform application. Can we discuss further?",
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
                "Professional landing page for SMEs ready to go online.",
              price: "Rp 1,5 – 2,5 Juta",
              priceEn: "Rp 1.5 – 2.5 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Landing page / 1-3 pages",
                "Mobile responsive design",
                "Contact form",
                "SSL + deploy",
              ],
              cta: "Start Starter",
              waMessage:
                "Hi, I'm interested in the Starter Web package. Can we discuss further?",
            },
            {
              name: "Business",
              description:
                "Full website with CMS, basic SEO, and marketing integrations.",
              price: "Rp 3,5 – 6 Juta",
              priceEn: "Rp 3.5 – 6 Million",
              suffixKey: "from",
              popular: true,
              features: [
                "5-10 custom pages",
                "CMS / admin panel",
                "Basic on-page SEO",
                "Google Analytics",
                "WhatsApp integration",
                "2 months support",
              ],
              cta: "Choose Business",
              waMessage:
                "Hi, I'm interested in the Business Web package. Can we discuss further?",
            },
            {
              name: "E-Commerce",
              description:
                "Online store with payment gateway and full admin dashboard.",
              price: "Rp 7 – 15 Juta",
              priceEn: "Rp 7 – 15 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Everything in Business",
                "Product & order system",
                "Payment gateway",
                "Admin dashboard",
                "3 months support",
                "PWA ready",
              ],
              cta: "Choose E-Commerce",
              waMessage:
                "Hi, I'm interested in the E-Commerce package. Can we discuss further?",
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
              name: "Data Cleaning",
              description:
                "Tidy up and standardize your business spreadsheet data.",
              price: "Rp 300 Rb – 1 Juta",
              priceEn: "Rp 300K – 1 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Spreadsheet tidy-up",
                "Remove duplicates & errors",
                "Format standardization",
              ],
              cta: "Start Cleaning",
              waMessage:
                "Hi, I'm interested in the Data Cleaning package. Can we discuss further?",
            },
            {
              name: "Dashboard",
              description:
                "Interactive dashboard for real-time business metric monitoring.",
              price: "Rp 1,5 – 4 Juta",
              priceEn: "Rp 1.5 – 4 Million",
              suffixKey: "from",
              popular: true,
              features: [
                "Interactive dashboard",
                "Visualizations & charts",
                "Google Sheets / Looker",
                "Filters & drill-down",
                "2 revisions",
              ],
              cta: "Choose Dashboard",
              waMessage:
                "Hi, I'm interested in the Dashboard (data) package. Can we discuss further?",
            },
            {
              name: "Automation",
              description:
                "Cross-system data automation with scripts and automated reporting.",
              price: "Rp 3 – 8 Juta",
              priceEn: "Rp 3 – 8 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Data flow automation",
                "Python / Apps Script",
                "Cross-system integration",
                "Automated reports",
                "Documentation & training",
              ],
              cta: "Choose Automation",
              waMessage:
                "Hi, I'm interested in the Automation (data) package. Can we discuss further?",
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
              name: "Basic",
              description:
                "Practical digital invitation with ready-made templates and easy sharing.",
              price: "Rp 150 – 250 Rb",
              priceEn: "Rp 150K – 250K",
              suffixKey: "from",
              popular: false,
              features: [
                "Ready-made template",
                "Active invitation link",
                "Countdown timer",
                "Share via WhatsApp",
              ],
              cta: "Choose Basic",
              waMessage:
                "Hi, I'm interested in the Basic (digital invite) package. Can we discuss further?",
            },
            {
              name: "Premium",
              description:
                "Semi-custom design with RSVP, gallery, and maps & music integration.",
              price: "Rp 350 – 600 Rb",
              priceEn: "Rp 350K – 600K",
              suffixKey: "from",
              popular: true,
              features: [
                "Semi-custom design",
                "Online RSVP",
                "Photo gallery",
                "Maps & music",
                "Guest QR Code",
                "2 revisions",
              ],
              cta: "Choose Premium",
              waMessage:
                "Hi, I'm interested in the Premium (digital invite) package. Can we discuss further?",
            },
            {
              name: "Exclusive",
              description:
                "Full custom invitation with interactive animations and admin RSVP dashboard.",
              price: "Rp 800 Rb – 2 Juta",
              priceEn: "Rp 800K – 2 Million",
              suffixKey: "from",
              popular: false,
              features: [
                "Full custom design",
                "Interactive animation",
                "Admin RSVP dashboard",
                "Custom domain",
                "Digital guestbook",
                "Unlimited revisions",
              ],
              cta: "Choose Exclusive",
              waMessage:
                "Hi, I'm interested in the Exclusive (digital invite) package. Can we discuss further?",
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
        { name: "About", href: "/#about" },
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
