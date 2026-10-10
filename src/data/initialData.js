export const sampleResumeData = {
  personal: {
    fullName: "Alisher Usmonov",
    jobTitle: "Senior Full-Stack Engineer",
    email: "alisher.dev@example.com",
    phone: "+998 90 123 45 67",
    location: "Toshkent, O'zbekiston",
    website: "https://alisher.dev",
    github: "https://github.com/alisher-dev",
    linkedin: "https://linkedin.com/in/alisher-dev",
    telegram: "https://t.me/alisher_dev",
    summary: "6+ yillik tajribaga ega yuqori yuklamali (high-load) tizimlar, zamonaviy veb-ilova va mikroservislar arxitektori. React, Next.js, Node.js va PostgreSQL bo'yicha chuqur amaliy bilimga ega. Clean Architecture, TDD va CI/CD amaliyotlarini chuqur o'zlashtirgan.",
  },
  experience: [
    {
      id: "exp-1",
      role: "Lead Frontend Engineer",
      company: "FinTech Innovation Hub",
      location: "Toshkent",
      startDate: "2022",
      endDate: "Hozirgacha",
      current: true,
      companyUrl: "https://fintech.uz",
      description: "Oylik 1.2M+ faol foydalanuvchiga ega milliy to'lov tizimining veb ekotizimini noldan qayta loyihalash va 8 kishilik frontend jamoasini boshqarish.",
      highlights: [
        "Ilova yuklanish tezligini (LCP) 3.8 soniyadan 1.1 soniyaga tushirildi (Core Web Vitals 98+).",
        "Design System va micro-frontend arxitekturasini joriy qilib, yangi modullar chiqarish vaqtini 40% ga qisqartirdi.",
        "WebSocket asosida real-vaqt rejimida valyuta va to'lov monitoring tizimini ishlab chiqdi."
      ]
    },
    {
      id: "exp-2",
      role: "Full-Stack Developer",
      company: "DataCloud Solutions",
      location: "Toshkent",
      startDate: "2020",
      endDate: "2022",
      current: false,
      companyUrl: "https://datacloud.io",
      description: "B2B SaaS platformasi va yirik korxonalarga mo'ljallangan ERP boshqaruv panellarini ishlab chiqish.",
      highlights: [
        "PostgreSQL so'rovlarini indeksatsiya va keshlar orqali 3 barobarga tezlashtirdi.",
        "Docker va GitHub Actions orqali avtomatlashtirilgan CI/CD konveyerini yo'lga qo'ydi."
      ]
    },
    {
      id: "exp-3",
      role: "Junior Web Developer",
      company: "NextGen Software",
      location: "Samarqand",
      startDate: "2018",
      endDate: "2020",
      current: false,
      companyUrl: "https://nextgen.uz",
      description: "Mijozlar uchun adaptiv landing sahifalar, korporativ saytlar va RESTful API integratsiyalari.",
      highlights: [
        "15 dan ortiq muvaffaqiyatli loyihalarni o'z vaqtida topshirdi."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "Dasturiy Ta'minot Muhandisligi (BSc)",
      school: "Toshkent Axborot Texnologiyalari Universiteti (TATU)",
      location: "Toshkent",
      startDate: "2016",
      endDate: "2020",
      gpa: "4.8 / 5.0"
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "FastPay Gateway & Dashboard",
      role: "Creator & Architect",
      liveUrl: "https://fastpay-demo.uz",
      githubUrl: "https://github.com/alisher-dev/fastpay-gateway",
      description: "Elektron tijorat uchun ochiq manbali to'lov integratsiyasi va tahliliy boshqaruv paneli.",
      techStack: "Next.js 14, TypeScript, Tailwind CSS, PostgreSQL, Redis"
    },
    {
      id: "proj-2",
      name: "DevCollab Realtime Editor",
      role: "Lead Developer",
      liveUrl: "https://devcollab.app",
      githubUrl: "https://github.com/alisher-dev/devcollab",
      description: "Dasturchilar uchun brauzerda bir vaqtning o'zida birgalikda kod yozish va video muloqot tizimi.",
      techStack: "React, WebRTC, Socket.io, Node.js"
    }
  ],
  skills: {
    frontend: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Zustand", "HTML5/CSS3"],
    backend: ["Node.js", "Express", "NestJS", "PostgreSQL", "Redis", "Prisma ORM", "REST / GraphQL"],
    devopsAndTools: ["Docker", "Git / GitHub", "CI/CD", "Linux", "Jest", "Vite", "Figma"]
  },
  languages: [
    { id: "lang-1", name: "O'zbek tili", level: "Ona tili" },
    { id: "lang-2", name: "Ingliz tili", level: "C1 — Professional (IELTS 7.5)" },
    { id: "lang-3", name: "Rus tili", level: "Erkin so'zlashuv" }
  ],
  customization: {
    template: "modern",
    accentColor: "#2563eb",
    fontFamily: "font-sans",
  }
};

export const designerResumeData = {
  personal: {
    fullName: "Madina Karimova",
    jobTitle: "Lead Product & UI/UX Designer",
    email: "madina.design@example.com",
    phone: "+998 93 987 65 43",
    location: "Toshkent, O'zbekiston",
    website: "https://madinadesign.uz",
    github: "https://dribbble.com/madina_design",
    linkedin: "https://linkedin.com/in/madina-karimova",
    telegram: "https://t.me/madina_ux",
    summary: "5+ yillik tajribaga ega yetakchi mahsulot dizayneri. Murakkab Fintech va E-commerce ekotizimlarini qulay, sodda va foydalanuvchiga yoqadigan interfeyslarga aylantirish bo'yicha mutaxassis. Design System yaratish, UX-tadqiqotlar va A/B testlar o'tkazishda katta tajribaga ega.",
  },
  experience: [
    {
      id: "exp-des-1",
      role: "Lead UI/UX Designer",
      company: "SuperApp Global",
      location: "Toshkent",
      startDate: "2022",
      endDate: "Hozirgacha",
      current: true,
      companyUrl: "https://superapp.uz",
      description: "3 milliondan ortiq foydalanuvchiga ega moliya va riteyl mobil ilovasi hamda veb platformasining bosh dizayneri.",
      highlights: [
        "Figma Tokens va Auto-layout 5.0 asosida 400+ komponentli yagona Design System yaratib, dizayn va ishlab chiqish muddatini 50% ga tezlashtirdi.",
        "Onboarding qadamlarini qayta loyihalash orqali ro'yxatdan o'tish konversiyasini 18% ga oshirdi.",
        "50 dan ortiq chuqur kastom intervyu va foydalanish testlari (Usability testing) o'tkazdi."
      ]
    },
    {
      id: "exp-des-2",
      role: "Product Designer",
      company: "Apex Creative Agency",
      location: "Toshkent",
      startDate: "2019",
      endDate: "2022",
      current: false,
      companyUrl: "https://apexagency.uz",
      description: "Xalqaro va mahalliy brendlar uchun veb-saytlar, mobil ilovalar va SaaS panellari dizayni.",
      highlights: [
        "Red Dot Award nominatsiyasiga tavsiya etilgan 3 ta xalqaro loyihaning UX arxitekturasini tayyorladi.",
        "Mijozlar bilan bevosita ishlab, wireframe, prototip va interaktiv animatsiyalarni yetkazib berdi."
      ]
    }
  ],
  education: [
    {
      id: "edu-des-1",
      degree: "Grafik Dizayn va Raqamli San'at (BA)",
      school: "Kamolliddin Behzod nomidagi Milliy Rassomlik Instituti",
      location: "Toshkent",
      startDate: "2015",
      endDate: "2019",
      gpa: "4.9 / 5.0"
    }
  ],
  projects: [
    {
      id: "proj-des-1",
      name: "NeoBank Mobile App Redesign",
      role: "Bosh Dizayner",
      liveUrl: "https://behance.net/gallery/neobank-case",
      githubUrl: "https://figma.com/@madina_design",
      description: "Raqamli bank uchun to'liq UX tahlil, foydalanuvchi xaritasi (CJM) va interaktiv prototip keysi.",
      techStack: "Figma, Principle, ProtoPie, UserTesting"
    },
    {
      id: "proj-des-2",
      name: "Aura Design System",
      role: "Tashabbuskor",
      liveUrl: "https://auradesignsystem.dev",
      githubUrl: "https://figma.com/@aurads",
      description: "B2B SaaS mahsulotlari uchun qulay, qorong'u/yorug' rejimli ochiq manbali dizayn tizimi.",
      techStack: "Figma Tokens, Storybook, Design Tokens, Accessibility (WCAG 2.1)"
    }
  ],
  skills: {
    frontend: ["Figma & FigJam", "Design Systems", "Prototyping", "Wireframing", "UI Animation", "Micro-interactions"],
    backend: ["UX Research", "Usability Testing", "Customer Journey (CJM)", "Information Architecture", "A/B Testing"],
    devopsAndTools: ["ProtoPie", "Adobe After Effects", "Illustrator", "HTML/CSS tushunchasi", "Design Tokens", "Notion"]
  },
  languages: [
    { id: "lang-des-1", name: "O'zbek tili", level: "Ona tili" },
    { id: "lang-des-2", name: "Ingliz tili", level: "IELTS 7.0 (Professional)" },
    { id: "lang-des-3", name: "Rus tili", level: "Erkin" }
  ],
  customization: {
    template: "creative",
    accentColor: "#7c3aed",
    fontFamily: "font-sans",
  }
};

export const managerResumeData = {
  personal: {
    fullName: "Sardor Rahimov",
    jobTitle: "Senior Product Manager",
    email: "sardor.pm@example.com",
    phone: "+998 97 765 43 21",
    location: "Toshkent, O'zbekiston",
    website: "https://sardorrahimov.me",
    github: "https://notion.so/sardor-portfolio",
    linkedin: "https://linkedin.com/in/sardor-rahimov",
    telegram: "https://t.me/sardor_pm",
    summary: "Raqamli mahsulotlarni noldan bozorga chiqarish (0 to 1) va o'sish (scale) bosqichida boshqarish bo'yicha 7+ yillik tajribaga ega Product Manager. Data-driven yondashuv, unit-iqtisodiyot tahlili va kross-funksional jamoalarni (muhandislar, dizaynerlar, marketing) yagona maqsad sari birlashtirish ustasi.",
  },
  experience: [
    {
      id: "exp-pm-1",
      role: "Senior Product Manager (Payments)",
      company: "Click & Pay Solutions",
      location: "Toshkent",
      startDate: "2021",
      endDate: "Hozirgacha",
      current: true,
      companyUrl: "https://click.uz",
      description: "QR-to'lovlar va B2B to'lov shlyuzlari yo'nalishidagi 15 kishilik muhandislik jamoasining mahsulot strategiyasi va yo'l xaritasini boshqarish.",
      highlights: [
        "Yillik tranzaksiyalar aylanmasini (GMV) $140M dan $320M gacha (+128%) o'stirdi.",
        "Xatoliklarni qisqartiruvchi yangi to'lov marshrutlash algoritmini ishga tushirib, muvaffaqiyatli to'lovlar foizini (Success Rate) 91% dan 97.4% ga ko'tardi.",
        "OKRs (Objectives and Key Results) tizimini joriy qilib, sprint maqsadlariga erishish samaradorligini 35% ga oshirdi."
      ]
    },
    {
      id: "exp-pm-2",
      role: "Product Owner / Growth Lead",
      company: "FastDelivery Express",
      location: "Toshkent",
      startDate: "2018",
      endDate: "2021",
      current: false,
      companyUrl: "https://fastdelivery.uz",
      description: "Tezkor yetkazib berish xizmatining mijozlar ilovasi va kuryerlar tizimi boshqaruvi.",
      highlights: [
        "Mijozlarni qayta jalb qilish (Retention 30-day) ko'rsatkichini 22% dan 36% ga yetkazdi.",
        "Amplitude va Mixpanel orqali to'liq mahsulot analitikasini yo'lga qo'ydi."
      ]
    }
  ],
  education: [
    {
      id: "edu-pm-1",
      degree: "Biznes Boshqaruvi (BBA)",
      school: "Vestminster Xalqaro Universiteti (WIUT)",
      location: "Toshkent",
      startDate: "2014",
      endDate: "2018",
      gpa: "First Class Honours (3.9)"
    }
  ],
  projects: [
    {
      id: "proj-pm-1",
      name: "B2B Merchant Checkout V3",
      role: "Product Lead",
      liveUrl: "https://merchant.click.uz/demo",
      githubUrl: "https://notion.so/merchant-case-study",
      description: "Internet-do'konlar uchun 1 bosishda to'lov (1-click checkout) SDK va analitika kabineti.",
      techStack: "Product Discovery, SQL, Amplitude, Jira, Scrum, Figma"
    },
    {
      id: "proj-pm-2",
      name: "Product Growth Playbook",
      role: "Muallif",
      liveUrl: "https://t.me/product_uz",
      githubUrl: "https://linkedin.com/in/sardor-rahimov",
      description: "O'zbekistondagi boshlang'ich product menejerlar uchun 10k+ o'quvchiga ega amaliy yo'riqnoma.",
      techStack: "Growth Hacking, Unit Economics, Retention Analysis"
    }
  ],
  skills: {
    frontend: ["Product Roadmap", "User Stories", "Agile / Scrum / Kanban", "Feature Prioritization (RICE/MoSCoW)", "MVP Development"],
    backend: ["SQL & Data Analysis", "A/B Testing", "Unit Economics", "Amplitude / Mixpanel", "Google Analytics 4"],
    devopsAndTools: ["Jira & Confluence", "Notion", "Figma", "Tableau", "Slack", "Product Discovery"]
  },
  languages: [
    { id: "lang-pm-1", name: "O'zbek tili", level: "Ona tili" },
    { id: "lang-pm-2", name: "Ingliz tili", level: "C1 — IELTS 8.0" },
    { id: "lang-pm-3", name: "Rus tili", level: "Erkin professional" }
  ],
  customization: {
    template: "harvard",
    accentColor: "#334155",
    fontFamily: "font-serif",
  }
};

export const dataAnalystResumeData = {
  personal: {
    fullName: "Aziza Toshpo'latova",
    jobTitle: "Senior Data Analyst & BI Specialist",
    email: "aziza.data@example.com",
    phone: "+998 91 234 56 78",
    location: "Toshkent, O'zbekiston",
    website: "https://azizadata.uz",
    github: "https://github.com/aziza-data",
    linkedin: "https://linkedin.com/in/aziza-toshpulatova",
    telegram: "https://t.me/aziza_analytics",
    summary: "5 yillik tajribaga ega katta ma'lumotlar tahlilchisi (Data Analyst). Katta hajmdagi ma'lumotlarni tahlil qilish, biznes ko'rsatkichlari (KPI/LTV/CAC/Churn) bo'yicha interaktiv daxshbordlar qurish va rahbariyatga strategik qarorlar qabul qilishda data-driven xulosalar taqdim etish bo'yicha ekspert.",
  },
  experience: [
    {
      id: "exp-da-1",
      role: "Lead BI & Analytics Specialist",
      company: "Telecom Analytics Group",
      location: "Toshkent",
      startDate: "2021",
      endDate: "Hozirgacha",
      current: true,
      companyUrl: "https://telecom-data.uz",
      description: "Kompaniyaning 10M+ abonent bazasi tranzaksiyalari bo'yicha tahliliy tizimni boshqarish.",
      highlights: [
        "Abonentlarning ketib qolishini (Churn Rate) 85% aniqlikda bashorat qiluvchi machine learning modelini joriy qildi, bu yiliga $450k zararning oldini oldi.",
        "Tableau va PostgreSQL bazasida 20 dan ortiq avtomatlashtirilgan real-vaqt daxshbordlarini ishlab chiqdi.",
        "Qo'lda hisoblanadigan hisobotlarni avtomatlashtirib, tahlilchilarning haftasiga 18 soat vaqtini tejab qoldi."
      ]
    },
    {
      id: "exp-da-2",
      role: "Data Analyst",
      company: "RetailChain Market",
      location: "Toshkent",
      startDate: "2019",
      endDate: "2021",
      current: false,
      companyUrl: "https://retailchain.uz",
      description: "Chakana savdo tarmoqlari savdo dinamikasi, inventar va narx shakllanishini tahlil qilish.",
      highlights: [
        "Mahsulotlar savat tahlili (Market Basket Analysis) orqali kross-savdoni 14% ga oshirdi.",
        "SQL va Python (Pandas) orqali yirik ma'lumotlar omborini tozalash va tahlil qilishni yo'lga qo'ydi."
      ]
    }
  ],
  education: [
    {
      id: "edu-da-1",
      degree: "Amaliy Matematika va Informatika (MSc)",
      school: "O'zbekiston Milliy Universiteti (O'zMU)",
      location: "Toshkent",
      startDate: "2017",
      endDate: "2019",
      gpa: "5.0 / 5.0"
    }
  ],
  projects: [
    {
      id: "proj-da-1",
      name: "Customer Churn Prediction Model",
      role: "Muallif & ML Muhandisi",
      liveUrl: "https://huggingface.co/spaces/aziza-data/churn-demo",
      githubUrl: "https://github.com/aziza-data/churn-prediction",
      description: "Python, Scikit-learn va Streamlit yordamida mijozlarning ketish xavfini hisoblaydigan ochiq tahliliy model.",
      techStack: "Python, XGBoost, Scikit-learn, Pandas, Streamlit"
    },
    {
      id: "proj-da-2",
      name: "Executive BI Dashboard",
      role: "Lead BI Developer",
      liveUrl: "https://public.tableau.com/profile/aziza.data",
      githubUrl: "https://github.com/aziza-data/bi-sql-warehouse",
      description: "Kompaniya daromadi, mijozlar oqimi va xarajatlarini kuzatib boruvchi interaktiv Tableau platformasi.",
      techStack: "SQL, Tableau, PostgreSQL, dbt, Git"
    }
  ],
  skills: {
    frontend: ["SQL (PostgreSQL, ClickHouse)", "Python (Pandas, NumPy, Scikit-learn)", "R", "Data Modeling", "ETL Pipelines"],
    backend: ["Tableau", "Power BI", "Metabase", "Data Visualization", "Statistical Analysis"],
    devopsAndTools: ["dbt", "Git", "Airflow", "Jupyter", "Docker", "Excel (VBA, Power Query)"]
  },
  languages: [
    { id: "lang-da-1", name: "O'zbek tili", level: "Ona tili" },
    { id: "lang-da-2", name: "Ingliz tili", level: "C1 — Professional" },
    { id: "lang-da-3", name: "Rus tili", level: "Erkin" }
  ],
  customization: {
    template: "tech",
    accentColor: "#059669",
    fontFamily: "font-sans",
  }
};

export const RESUME_PRESETS = [
  {
    id: "developer",
    name: "Dasturchi (Full-Stack Engineer)",
    subtitle: "React, Next.js, Node.js, PostgreSQL",
    data: sampleResumeData,
    icon: "code"
  },
  {
    id: "designer",
    name: "UI/UX & Mahsulot Dizayneri",
    subtitle: "Figma, Design Systems, UX Research",
    data: designerResumeData,
    icon: "palette"
  },
  {
    id: "manager",
    name: "Mahsulot Menejeri (Product Manager)",
    subtitle: "Agile, Roadmapping, Growth & Metrics",
    data: managerResumeData,
    icon: "briefcase"
  },
  {
    id: "dataAnalyst",
    name: "Data Analyst & BI Mutaxassisi",
    subtitle: "SQL, Python, Tableau, Machine Learning",
    data: dataAnalystResumeData,
    icon: "chart"
  }
];

export const emptyResumeData = {
  personal: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
    telegram: "",
    summary: "",
  },
  experience: [],
  education: [],
  projects: [],
  skills: {
    frontend: [],
    backend: [],
    devopsAndTools: []
  },
  languages: [],
  customization: {
    template: "modern",
    accentColor: "#2563eb",
    fontFamily: "font-sans",
  }
};
