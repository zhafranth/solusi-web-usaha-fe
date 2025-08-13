// Data dummy untuk blog posts
export const blogPosts = [
  {
    id: 1,
    title: "5 Tren Website Design 2024 yang Wajib Diketahui UMKM",
    excerpt: "Pelajari tren desain website terbaru yang dapat meningkatkan konversi dan user experience untuk bisnis UMKM Anda.",
    content: "Website design terus berkembang seiring dengan perubahan teknologi dan perilaku pengguna. Tahun 2024 membawa beberapa tren menarik yang dapat membantu UMKM meningkatkan performa online mereka...",
    author: "Tim SolusiWeb",
    publishedAt: "2024-01-15",
    category: "Design",
    tags: ["web design", "UMKM", "tren 2024", "UI/UX"],
    image: "/blog/web-design-trends-2024.jpg",
    readTime: "5 menit",
    featured: true
  },
  {
    id: 2,
    title: "Mengapa Website Mobile-First Penting untuk Bisnis Online",
    excerpt: "Lebih dari 60% traffic website berasal dari mobile. Pelajari mengapa pendekatan mobile-first adalah kunci sukses bisnis online.",
    content: "Era digital saat ini menuntut bisnis untuk mengutamakan pengalaman mobile dalam strategi online mereka. Mobile-first design bukan lagi pilihan, tetapi keharusan...",
    author: "Ahmad Rizki",
    publishedAt: "2024-01-12",
    category: "Development",
    tags: ["mobile-first", "responsive design", "SEO", "user experience"],
    image: "/blog/mobile-first-design.jpg",
    readTime: "7 menit",
    featured: false
  },
  {
    id: 3,
    title: "Panduan Lengkap SEO untuk Website Bisnis Lokal",
    excerpt: "Tingkatkan visibility bisnis lokal Anda di Google dengan strategi SEO yang tepat dan terbukti efektif.",
    content: "SEO lokal adalah kunci untuk menarik pelanggan di sekitar lokasi bisnis Anda. Dengan strategi yang tepat, bisnis lokal dapat bersaing dengan kompetitor besar...",
    author: "Sari Dewi",
    publishedAt: "2024-01-10",
    category: "SEO",
    tags: ["SEO lokal", "Google My Business", "local search", "digital marketing"],
    image: "/blog/local-seo-guide.jpg",
    readTime: "10 menit",
    featured: true
  },
  {
    id: 4,
    title: "E-commerce vs Marketplace: Mana yang Lebih Menguntungkan?",
    excerpt: "Analisis mendalam tentang kelebihan dan kekurangan memiliki toko online sendiri dibandingkan berjualan di marketplace.",
    content: "Banyak pebisnis yang bingung memilih antara membangun e-commerce sendiri atau berjualan di marketplace. Keduanya memiliki kelebihan dan tantangan masing-masing...",
    author: "Budi Santoso",
    publishedAt: "2024-01-08",
    category: "E-commerce",
    tags: ["e-commerce", "marketplace", "online business", "strategi bisnis"],
    image: "/blog/ecommerce-vs-marketplace.jpg",
    readTime: "8 menit",
    featured: false
  },
  {
    id: 5,
    title: "Cara Meningkatkan Kecepatan Loading Website untuk SEO",
    excerpt: "Website yang lambat dapat menurunkan ranking Google. Pelajari teknik optimasi untuk meningkatkan kecepatan loading website Anda.",
    content: "Kecepatan loading website adalah faktor penting dalam SEO dan user experience. Google menggunakan Core Web Vitals sebagai ranking factor...",
    author: "Rina Pratiwi",
    publishedAt: "2024-01-05",
    category: "Performance",
    tags: ["website speed", "Core Web Vitals", "SEO", "optimization"],
    image: "/blog/website-speed-optimization.jpg",
    readTime: "6 menit",
    featured: false
  },
  {
    id: 6,
    title: "Integrasi Payment Gateway untuk E-commerce Indonesia",
    excerpt: "Panduan memilih dan mengintegrasikan payment gateway yang tepat untuk toko online di Indonesia.",
    content: "Payment gateway adalah jantung dari setiap e-commerce. Pemilihan yang tepat dapat meningkatkan konversi dan kepercayaan pelanggan...",
    author: "Dedi Kurniawan",
    publishedAt: "2024-01-03",
    category: "E-commerce",
    tags: ["payment gateway", "e-commerce", "fintech", "online payment"],
    image: "/blog/payment-gateway-integration.jpg",
    readTime: "9 menit",
    featured: false
  },
  {
    id: 7,
    title: "Keamanan Website: Melindungi Bisnis Online dari Cyber Attack",
    excerpt: "Pelajari langkah-langkah penting untuk mengamankan website bisnis Anda dari berbagai ancaman cyber.",
    content: "Keamanan website adalah aspek krusial yang sering diabaikan oleh pemilik bisnis. Serangan cyber dapat merusak reputasi dan merugikan finansial...",
    author: "Agus Setiawan",
    publishedAt: "2024-01-01",
    category: "Security",
    tags: ["website security", "cyber security", "SSL", "data protection"],
    image: "/blog/website-security.jpg",
    readTime: "12 menit",
    featured: true
  },
  {
    id: 8,
    title: "Content Marketing Strategy untuk Website Bisnis",
    excerpt: "Strategi content marketing yang efektif untuk meningkatkan traffic organik dan engagement website bisnis Anda.",
    content: "Content marketing adalah salah satu strategi digital marketing paling cost-effective. Dengan konten yang berkualitas, bisnis dapat menarik dan mempertahankan pelanggan...",
    author: "Maya Sari",
    publishedAt: "2023-12-28",
    category: "Marketing",
    tags: ["content marketing", "digital marketing", "SEO content", "blog strategy"],
    image: "/blog/content-marketing-strategy.jpg",
    readTime: "11 menit",
    featured: false
  }
];

// Fungsi helper untuk mendapatkan posts
export const getFeaturedPosts = () => {
  return blogPosts.filter(post => post.featured);
};

export const getPostsByCategory = (category) => {
  return blogPosts.filter(post => post.category === category);
};

export const getRecentPosts = (limit = 5) => {
  return blogPosts
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);
};

export const getPostById = (id) => {
  return blogPosts.find(post => post.id === parseInt(id));
};

export const getAllCategories = () => {
  const categories = [...new Set(blogPosts.map(post => post.category))];
  return categories;
};

export const searchPosts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};