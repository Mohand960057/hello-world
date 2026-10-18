// Generates the static English and Arabic pages, sitemap and robots.txt.
// Run with: node build.js
// Edit content in the `content` object below and company details in `site`, then rebuild.
const fs = require("fs");
const path = require("path");

// TODO: replace with the real domain and contact details before going live.
const site = {
  url: "https://www.op-pm.com",
  phone: "+966 50 000 0000",
  whatsapp: "966500000000",
  email: "info@op-pm.com",
};

// Countries we serve: Gulf / Middle East and the United States.
const areaServed = [
  { code: "SA", en: "Saudi Arabia", ar: "السعودية" },
  { code: "AE", en: "United Arab Emirates", ar: "الإمارات" },
  { code: "KW", en: "Kuwait", ar: "الكويت" },
  { code: "QA", en: "Qatar", ar: "قطر" },
  { code: "BH", en: "Bahrain", ar: "البحرين" },
  { code: "OM", en: "Oman", ar: "عُمان" },
  { code: "US", en: "United States", ar: "الولايات المتحدة" },
];

const content = {
  en: {
    dir: "ltr",
    locale: "en_US",
    brand: "OP Property Management",
    otherLang: "العربية",
    nav: { home: "Home", services: "Services", faq: "FAQ", contact: "Contact us" },
    home: {
      title: "OP Property Management | Airbnb & Booking.com Management, HubSpot, Trademarks & Online Stores",
      description: "OP Property Management serves Saudi Arabia, the Gulf and the USA: short-term rental management on Booking.com, Airbnb, Agoda and Gathern, HubSpot implementation, Saudi trademark registration, and Noon, Amazon & Trendyol store setup.",
    },
    hero: {
      eyebrow: "Saudi Arabia · Gulf (GCC) · United States",
      title: "We run the operations. You grow the business.",
      lead: "From managing your rental listings on Booking.com and Airbnb to setting up HubSpot, registering your trademark in Saudi Arabia and launching your Noon, Amazon and Trendyol stores — OP handles it end to end.",
      cta: "Get a free consultation",
      cta2: "Explore services",
      stats: [["4", "core services"], ["A→Z", "end-to-end delivery"], ["ME · US", "Middle East & USA clients"]],
    },
    servicesEyebrow: "What we do",
    servicesTitle: "Our services",
    services: [
      {
        id: "rental", icon: "home",
        title: "Short-Term Rental Property Management",
        desc: "We manage your vacation rental and holiday home listings across the major booking platforms so you earn more with less effort.",
        platforms: ["Booking.com", "Airbnb", "Agoda", "Gathern"],
        features: ["Listing creation & optimization", "Dynamic pricing & calendar management", "Guest communication & reviews", "Cleaning & check-in coordination"],
      },
      {
        id: "hubspot", icon: "hub",
        title: "HubSpot Implementation A to Z",
        desc: "A complete HubSpot CRM setup tailored to your sales and marketing process — from the first login to a fully trained team. Delivered remotely for clients in the Gulf and the USA.",
        features: ["Portal setup, users & permissions", "Data migration & CRM structure", "Pipelines, automation & workflows", "Dashboards, reports & team training"],
      },
      {
        id: "trademark", icon: "shield",
        title: "Trademark Registration in Saudi Arabia",
        desc: "Protect your brand in the Saudi market. We handle your trademark registration with the Saudi Authority for Intellectual Property (SAIP) from search to certificate.",
        features: ["Trademark availability search", "Class selection & application filing", "Follow-up with SAIP", "Registration certificate delivery"],
      },
      {
        id: "stores", icon: "bag",
        title: "Online Store Setup: Noon, Amazon & Trendyol",
        desc: "We create and launch your seller stores on the leading marketplaces and get your products live and ready to sell.",
        platforms: ["Noon", "Amazon", "Trendyol"],
        features: ["Seller account creation & verification", "Product listing & item upload", "Photos, titles & keyword-rich descriptions", "Pricing, stock & store launch"],
      },
    ],
    why: {
      eyebrow: "Why OP", title: "One partner for your whole business",
      items: [
        ["End-to-end", "We take each project from start to finish — no loose ends."],
        ["Local expertise", "We know the Saudi and Gulf markets, their platforms and their regulations."],
        ["Arabic & English", "We work with you in the language you prefer."],
        ["Results-focused", "More bookings, more sales, better-organized teams."],
      ],
    },
    process: {
      eyebrow: "How we work", title: "Simple steps, clear results",
      steps: [
        ["Consultation", "We listen to your needs and goals."],
        ["Plan & quote", "You get a clear scope, timeline and price."],
        ["Execution", "Our team does the work and keeps you updated."],
        ["Launch & support", "We deliver, hand over and stay with you."],
      ],
    },
    faqEyebrow: "FAQ",
    faqTitle: "Frequently asked questions",
    faq: [
      ["What does OP Property Management do?", "OP Property Management is a business services company that offers four services: short-term rental property management on Booking.com, Airbnb, Agoda and Gathern; HubSpot CRM implementation from A to Z; trademark registration in Saudi Arabia; and online store setup on Noon, Amazon and Trendyol."],
      ["Which countries do you serve?", "We serve clients in Saudi Arabia, the United Arab Emirates, Kuwait, Qatar, Bahrain, Oman and the United States. HubSpot implementation and Amazon store setup are delivered fully remotely."],
      ["Which booking platforms do you manage?", "We manage vacation rental listings on Booking.com, Airbnb, Agoda and Gathern, including listing setup, pricing, calendars, guest messages and reviews."],
      ["What do I need to register a trademark in Saudi Arabia?", "Usually your brand name or logo, the owner's details (for companies, the commercial registration) and the list of goods or services the mark will cover. We confirm the exact documents for your case and handle the filing and follow-up with the Saudi Authority for Intellectual Property (SAIP)."],
      ["Can you set up my store on Noon, Amazon and Trendyol?", "Yes. We create and verify your seller account, upload your products with photos, titles and descriptions, set prices and stock, and launch the store."],
      ["How much do your services cost?", "Pricing depends on the scope of each project. Contact us for a free consultation and we will send you a clear, fixed quote."],
    ],
    ctaBand: { title: "Ready to start?", text: "Tell us what you need and we’ll reply within 24 hours.", button: "Contact us" },
    contact: {
      title: "Contact OP Property Management | Saudi Arabia, Gulf & USA",
      description: "Contact OP Property Management for rental property management, HubSpot implementation, Saudi trademark registration or Noon, Amazon & Trendyol store setup. We reply within 24 hours.",
      eyebrow: "Contact us",
      heading: "Let’s talk about your project",
      lead: "Tell us which service you need and we will get back to you within 24 hours — in Arabic or English.",
      detailsTitle: "Contact details",
      whatsapp: "WhatsApp", phone: "Phone", email: "Email",
      areasTitle: "Areas we serve",
      formTitle: "Send us a message",
    },
    form: {
      name: "Full name", phone: "Phone / WhatsApp", email: "Email (optional)", country: "Country",
      service: "Service", choose: "Choose a service", message: "Message",
      send: "Send via WhatsApp", note: "Submitting opens WhatsApp with your message ready to send.",
      intro: "Hello OP Property Management, I'm interested in:",
    },
    breadcrumbContact: "Contact us",
    rights: "All rights reserved.",
  },

  ar: {
    dir: "rtl",
    locale: "ar_SA",
    brand: "OP لإدارة العقارات",
    otherLang: "English",
    nav: { home: "الرئيسية", services: "خدماتنا", faq: "الأسئلة الشائعة", contact: "تواصل معنا" },
    home: {
      title: "OP لإدارة العقارات | إدارة Airbnb وBooking.com وتطبيق HubSpot وتسجيل العلامات التجارية والمتاجر الإلكترونية",
      description: "OP لإدارة العقارات في السعودية والخليج وأمريكا: إدارة وحدات الإيجار قصير المدى على Booking.com وAirbnb وAgoda وجاذر إن، وتطبيق HubSpot، وتسجيل العلامات التجارية في السعودية، وإنشاء متاجر نون وأمازون وترينديول.",
    },
    hero: {
      eyebrow: "السعودية · دول الخليج · الولايات المتحدة",
      title: "نحن ندير العمليات، وأنت تنمّي أعمالك.",
      lead: "من إدارة وحداتك على Booking.com وAirbnb، إلى تطبيق HubSpot، وتسجيل علامتك التجارية في السعودية، وإطلاق متاجرك على نون وأمازون وترينديول — OP تتولى كل شيء من البداية للنهاية.",
      cta: "احصل على استشارة مجانية",
      cta2: "استعرض الخدمات",
      stats: [["4", "خدمات رئيسية"], ["A→Z", "تنفيذ متكامل"], ["ME · US", "عملاء في الشرق الأوسط وأمريكا"]],
    },
    servicesEyebrow: "ماذا نقدم",
    servicesTitle: "خدماتنا",
    services: [
      {
        id: "rental", icon: "home",
        title: "إدارة العقارات للإيجار قصير المدى",
        desc: "ندير شققك ووحداتك الفندقية وبيوت العطلات على أشهر منصات الحجز لتحقق دخلاً أعلى بجهد أقل.",
        platforms: ["Booking.com", "Airbnb", "Agoda", "Gathern"],
        features: ["إنشاء الإعلانات وتحسينها", "التسعير الديناميكي وإدارة التقويم", "التواصل مع الضيوف وإدارة التقييمات", "تنسيق التنظيف وتسجيل الدخول"],
      },
      {
        id: "hubspot", icon: "hub",
        title: "تطبيق HubSpot من الألف إلى الياء",
        desc: "إعداد كامل لنظام HubSpot CRM مصمم حسب عمليات المبيعات والتسويق لديك — من أول تسجيل دخول حتى تدريب فريقك بالكامل، عن بُعد لعملائنا في الخليج وأمريكا.",
        features: ["إعداد الحساب والمستخدمين والصلاحيات", "نقل البيانات وهيكلة نظام CRM", "مسارات البيع والأتمتة وسير العمل", "لوحات التحكم والتقارير وتدريب الفريق"],
      },
      {
        id: "trademark", icon: "shield",
        title: "تسجيل العلامات التجارية في السعودية",
        desc: "احمِ علامتك التجارية في السوق السعودي. نتولى تسجيلها لدى الهيئة السعودية للملكية الفكرية من البحث وحتى استلام الشهادة.",
        features: ["البحث عن توفر العلامة التجارية", "اختيار الفئة وتقديم الطلب", "المتابعة مع الهيئة السعودية للملكية الفكرية", "تسليم شهادة التسجيل"],
      },
      {
        id: "stores", icon: "bag",
        title: "إنشاء متاجر نون وأمازون وترينديول",
        desc: "ننشئ متاجرك على أكبر المنصات ونجهّز منتجاتك لتكون جاهزة للبيع.",
        platforms: ["Noon", "Amazon", "Trendyol"],
        features: ["إنشاء حساب البائع وتوثيقه", "إضافة المنتجات ورفع الأصناف", "الصور والعناوين والأوصاف بالكلمات المفتاحية", "التسعير والمخزون وإطلاق المتجر"],
      },
    ],
    why: {
      eyebrow: "لماذا OP", title: "شريك واحد لكل أعمالك",
      items: [
        ["خدمة متكاملة", "ننفذ كل مشروع من البداية حتى النهاية دون أي نقص."],
        ["خبرة محلية", "نعرف السوق السعودي والخليجي ومنصاته وأنظمته."],
        ["عربي وإنجليزي", "نتواصل معك باللغة التي تفضلها."],
        ["نركّز على النتائج", "حجوزات أكثر، مبيعات أعلى، وفرق عمل أكثر تنظيماً."],
      ],
    },
    process: {
      eyebrow: "طريقة العمل", title: "خطوات بسيطة ونتائج واضحة",
      steps: [
        ["الاستشارة", "نستمع لاحتياجاتك وأهدافك."],
        ["الخطة والتسعير", "تحصل على نطاق عمل وجدول زمني وسعر واضح."],
        ["التنفيذ", "فريقنا ينفذ العمل ويطلعك على كل جديد."],
        ["الإطلاق والدعم", "نسلّم العمل ونبقى معك بعد التسليم."],
      ],
    },
    faqEyebrow: "الأسئلة الشائعة",
    faqTitle: "أسئلة يطرحها عملاؤنا",
    faq: [
      ["ما الخدمات التي تقدمها OP لإدارة العقارات؟", "تقدم OP أربع خدمات: إدارة العقارات للإيجار قصير المدى على Booking.com وAirbnb وAgoda وجاذر إن، وتطبيق نظام HubSpot CRM من الألف إلى الياء، وتسجيل العلامات التجارية في السعودية، وإنشاء المتاجر الإلكترونية على نون وأمازون وترينديول."],
      ["في أي دول تقدمون خدماتكم؟", "نخدم العملاء في السعودية والإمارات والكويت وقطر والبحرين وعُمان والولايات المتحدة. ونقدم خدمة تطبيق HubSpot وإنشاء متاجر أمازون عن بُعد بالكامل."],
      ["ما منصات الحجز التي تديرونها؟", "ندير وحدات الإيجار على Booking.com وAirbnb وAgoda وجاذر إن، بما يشمل إنشاء الإعلان والتسعير والتقويم والرد على الضيوف والتقييمات."],
      ["ما المطلوب لتسجيل علامة تجارية في السعودية؟", "عادةً اسم العلامة أو الشعار، وبيانات المالك (السجل التجاري للشركات)، وقائمة المنتجات أو الخدمات التي ستغطيها العلامة. نؤكد لك المستندات المطلوبة لحالتك ونتولى تقديم الطلب ومتابعته مع الهيئة السعودية للملكية الفكرية."],
      ["هل تنشئون متجري على نون وأمازون وترينديول؟", "نعم. ننشئ حساب البائع ونوثقه، ونرفع منتجاتك بالصور والعناوين والأوصاف، ونضبط الأسعار والمخزون، ثم نطلق المتجر."],
      ["كم تكلفة خدماتكم؟", "تعتمد التكلفة على نطاق كل مشروع. تواصل معنا للحصول على استشارة مجانية وسنرسل لك عرض سعر واضحاً وثابتاً."],
    ],
    ctaBand: { title: "جاهز للبدء؟", text: "أخبرنا بما تحتاجه وسنرد عليك خلال 24 ساعة.", button: "تواصل معنا" },
    contact: {
      title: "تواصل مع OP لإدارة العقارات | السعودية والخليج وأمريكا",
      description: "تواصل مع OP لإدارة العقارات لخدمات إدارة وحدات الإيجار، وتطبيق HubSpot، وتسجيل العلامات التجارية في السعودية، وإنشاء متاجر نون وأمازون وترينديول. نرد خلال 24 ساعة.",
      eyebrow: "تواصل معنا",
      heading: "لنتحدث عن مشروعك",
      lead: "أخبرنا بالخدمة التي تحتاجها وسنعود إليك خلال 24 ساعة — بالعربية أو الإنجليزية.",
      detailsTitle: "بيانات التواصل",
      whatsapp: "واتساب", phone: "الجوال", email: "البريد",
      areasTitle: "المناطق التي نخدمها",
      formTitle: "أرسل لنا رسالة",
    },
    form: {
      name: "الاسم الكامل", phone: "الجوال / واتساب", email: "البريد الإلكتروني (اختياري)", country: "الدولة",
      service: "الخدمة", choose: "اختر الخدمة", message: "رسالتك",
      send: "أرسل عبر واتساب", note: "عند الإرسال يفتح واتساب ورسالتك جاهزة للإرسال.",
      intro: "مرحباً OP لإدارة العقارات، أنا مهتم بـ:",
    },
    breadcrumbContact: "تواصل معنا",
    rights: "جميع الحقوق محفوظة.",
  },
};

const icons = {
  home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  hub: '<circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="12" cy="20" r="2"/><path d="M6.5 6.5l3.5 3.5M17.5 6.5L14 10M12 15v3"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  bag: '<path d="M4 7h16l-1.5 10.5a2 2 0 0 1-2 1.5h-9a2 2 0 0 1-2-1.5z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',
};

// URL paths (relative to the site root) of every page in each language.
const paths = {
  en: { home: "", contact: "contact.html" },
  ar: { home: "ar/", contact: "ar/contact.html" },
};
const abs = (p) => `${site.url}/${p}`;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const jsonLd = (data) => `<script type="application/ld+json">\n${JSON.stringify(data, null, 2).replace(/</g, "\\u003c")}\n</script>`;

function head(lang, page, meta, schema) {
  const t = content[lang];
  const alternates = ["en", "ar"]
    .map((l) => `  <link rel="alternate" hreflang="${l}" href="${abs(paths[l][page])}">`)
    .join("\n");
  const root = lang === "ar" ? "../" : "";
  return `<!doctype html>
<html lang="${lang}" dir="${t.dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(meta.title)}</title>
  <meta name="description" content="${esc(meta.description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${abs(paths[lang][page])}">
${alternates}
  <link rel="alternate" hreflang="x-default" href="${abs(paths.en[page])}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(t.brand)}">
  <meta property="og:title" content="${esc(meta.title)}">
  <meta property="og:description" content="${esc(meta.description)}">
  <meta property="og:url" content="${abs(paths[lang][page])}">
  <meta property="og:image" content="${abs("og-image.png")}">
  <meta property="og:locale" content="${t.locale}">
  <meta property="og:locale:alternate" content="${content[lang === "en" ? "ar" : "en"].locale}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="${root}favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Kufi+Arabic:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${root}styles.css">
  ${jsonLd(schema)}
</head>`;
}

function header(lang, page) {
  const t = content[lang];
  const other = lang === "en" ? "ar" : "en";
  const root = lang === "ar" ? "../" : "";
  const link = (href, label, active) => `<a href="${href}"${active ? ' aria-current="page"' : ""}>${label}</a>`;
  const homeLink = page === "home" ? "#top" : "./";
  return `<body>
  <a class="skip-link" href="#main">${lang === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}</a>
  <header class="site-header">
    <div class="container nav">
      <a href="${homeLink}" class="brand" aria-label="${esc(t.brand)}">
        <span class="brand-mark">OP</span>
        <span class="brand-name">${t.brand}</span>
      </a>
      <nav class="nav-links" id="navLinks" aria-label="${lang === "ar" ? "القائمة الرئيسية" : "Main"}">
        ${link(homeLink, t.nav.home, false)}
        ${link(page === "home" ? "#services" : "./#services", t.nav.services, false)}
        ${link(page === "home" ? "#faq" : "./#faq", t.nav.faq, false)}
        ${link("contact.html", t.nav.contact, page === "contact")}
      </nav>
      <a class="lang-link" href="${root}${paths[other][page]}" hreflang="${other}" lang="${other}">${t.otherLang}</a>
      <button class="menu-toggle" id="menuToggle" aria-label="Menu" aria-expanded="false" aria-controls="navLinks">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;
}

function footer(lang) {
  const t = content[lang];
  const root = lang === "ar" ? "../" : "";
  return `  <footer class="site-footer">
    <div class="container footer-inner">
      <p>© <span id="year">${new Date().getFullYear()}</span> ${t.brand}. ${t.rights}</p>
      <p class="footer-areas">${areaServed.map((a) => a[lang]).join(" · ")}</p>
    </div>
  </footer>
  <script src="${root}script.js"></script>
</body>
</html>
`;
}

function organizationSchema(lang) {
  const t = content[lang];
  return {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: content.en.brand,
    alternateName: content.ar.brand,
    url: `${site.url}/`,
    logo: abs("favicon.svg"),
    image: abs("og-image.png"),
    description: t.home.description,
    email: site.email,
    telephone: site.phone,
    areaServed: areaServed.map((a) => ({ "@type": "Country", name: a.en })),
    knowsLanguage: ["ar", "en"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.phone,
      email: site.email,
      availableLanguage: ["Arabic", "English"],
      areaServed: areaServed.map((a) => a.code),
    },
  };
}

function homePage(lang) {
  const t = content[lang];
  const pageUrl = abs(paths[lang].home);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(lang),
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: `${site.url}/`, name: content.en.brand, inLanguage: ["en", "ar"], publisher: { "@id": `${site.url}/#organization` } },
      { "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: t.home.title, description: t.home.description, inLanguage: lang, isPartOf: { "@id": `${site.url}/#website` }, about: { "@id": `${site.url}/#organization` } },
      ...t.services.map((s) => ({
        "@type": "Service",
        "@id": `${pageUrl}#${s.id}`,
        name: s.title,
        description: s.desc,
        serviceType: s.title,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: s.id === "trademark"
          ? { "@type": "Country", name: "Saudi Arabia" }
          : areaServed.map((a) => ({ "@type": "Country", name: a.en })),
        inLanguage: lang,
      })),
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: lang,
        mainEntity: t.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
    ],
  };

  const services = t.services.map((s, i) => `
          <article class="service-card" id="${s.id}">
            <div class="service-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${icons[s.icon]}</svg></div>
            <span class="service-num" aria-hidden="true">0${i + 1}</span>
            <h3>${s.title}</h3>
            <p>${s.desc}</p>${s.platforms ? `
            <div class="platforms">${s.platforms.map((p) => `<span>${p}</span>`).join("")}</div>` : ""}
            <ul class="features">
              ${s.features.map((f) => `<li>${f}</li>`).join("\n              ")}
            </ul>
          </article>`).join("\n");

  return `${head(lang, "home", t.home, schema)}
${header(lang, "home")}
  <main id="main">
    <section class="hero" id="top">
      <div class="container hero-inner">
        <p class="eyebrow">${t.hero.eyebrow}</p>
        <h1>${t.hero.title}</h1>
        <p class="lead">${t.hero.lead}</p>
        <div class="hero-cta">
          <a href="contact.html" class="btn btn-primary">${t.hero.cta}</a>
          <a href="#services" class="btn btn-ghost">${t.hero.cta2}</a>
        </div>
        <ul class="hero-stats">
          ${t.hero.stats.map(([n, l]) => `<li><strong>${n}</strong><span>${l}</span></li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section id="services" class="section" aria-labelledby="services-title">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">${t.servicesEyebrow}</p>
          <h2 id="services-title">${t.servicesTitle}</h2>
        </div>
        <div class="services-grid">
${services}
        </div>
      </div>
    </section>

    <section id="why" class="section section-alt" aria-labelledby="why-title">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">${t.why.eyebrow}</p>
          <h2 id="why-title">${t.why.title}</h2>
        </div>
        <div class="why-grid">
          ${t.why.items.map(([h, p]) => `<div class="why-item"><h3>${h}</h3><p>${p}</p></div>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section id="process" class="section" aria-labelledby="process-title">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">${t.process.eyebrow}</p>
          <h2 id="process-title">${t.process.title}</h2>
        </div>
        <ol class="steps">
          ${t.process.steps.map(([h, p], i) => `<li><span class="step-num">${i + 1}</span><h3>${h}</h3><p>${p}</p></li>`).join("\n          ")}
        </ol>
      </div>
    </section>

    <section id="faq" class="section section-alt" aria-labelledby="faq-title">
      <div class="container faq-container">
        <div class="section-head">
          <p class="eyebrow">${t.faqEyebrow}</p>
          <h2 id="faq-title">${t.faqTitle}</h2>
        </div>
        <div class="faq-list">
          ${t.faq.map(([q, a], i) => `<details${i === 0 ? " open" : ""}><summary><h3>${q}</h3></summary><p>${a}</p></details>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container cta-inner">
        <div>
          <h2>${t.ctaBand.title}</h2>
          <p>${t.ctaBand.text}</p>
        </div>
        <a href="contact.html" class="btn btn-primary">${t.ctaBand.button}</a>
      </div>
    </section>
  </main>

${footer(lang)}`;
}

function contactPage(lang) {
  const t = content[lang];
  const c = t.contact;
  const f = t.form;
  const pageUrl = abs(paths[lang].contact);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(lang),
      { "@type": "ContactPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: c.title, description: c.description, inLanguage: lang, about: { "@id": `${site.url}/#organization` } },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.nav.home, item: abs(paths[lang].home) },
          { "@type": "ListItem", position: 2, name: t.breadcrumbContact, item: pageUrl },
        ],
      },
    ],
  };

  return `${head(lang, "contact", c, schema)}
${header(lang, "contact")}
  <main id="main">
    <section class="page-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="./">${t.nav.home}</a><span aria-hidden="true">/</span><span aria-current="page">${t.breadcrumbContact}</span></nav>
        <p class="eyebrow">${c.eyebrow}</p>
        <h1>${c.heading}</h1>
        <p class="lead">${c.lead}</p>
      </div>
    </section>

    <section class="section contact-section">
      <div class="container contact-grid">
        <aside class="contact-card">
          <h2>${c.detailsTitle}</h2>
          <ul class="contact-list">
            <li><span>${c.whatsapp}</span><a href="https://wa.me/${site.whatsapp}" dir="ltr">${site.phone}</a></li>
            <li><span>${c.phone}</span><a href="tel:${site.phone.replace(/\s/g, "")}" dir="ltr">${site.phone}</a></li>
            <li><span>${c.email}</span><a href="mailto:${site.email}" dir="ltr">${site.email}</a></li>
          </ul>
          <h2>${c.areasTitle}</h2>
          <ul class="area-tags">
            ${areaServed.map((a) => `<li>${a[lang]}</li>`).join("\n            ")}
          </ul>
        </aside>

        <form class="contact-form" id="contactForm" data-whatsapp="${site.whatsapp}" data-intro="${esc(f.intro)}">
          <h2>${c.formTitle}</h2>
          <label><span>${f.name}</span><input name="name" autocomplete="name" required></label>
          <div class="form-row">
            <label><span>${f.phone}</span><input name="phone" type="tel" autocomplete="tel" dir="ltr" required></label>
            <label><span>${f.email}</span><input name="email" type="email" autocomplete="email" dir="ltr"></label>
          </div>
          <div class="form-row">
            <label><span>${f.service}</span>
              <select name="service" required>
                <option value="">${f.choose}</option>
                ${t.services.map((s) => `<option value="${s.id}">${s.title}</option>`).join("\n                ")}
              </select>
            </label>
            <label><span>${f.country}</span>
              <select name="country">
                ${areaServed.map((a) => `<option value="${a.code}">${a[lang]}</option>`).join("\n                ")}
              </select>
            </label>
          </div>
          <label><span>${f.message}</span><textarea name="message" rows="5"></textarea></label>
          <button type="submit" class="btn btn-primary">${f.send}</button>
          <p class="form-note">${f.note}</p>
        </form>
      </div>
    </section>
  </main>

${footer(lang)}`;
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = ["home", "contact"].flatMap((page) =>
    ["en", "ar"].map((lang) => `  <url>
    <loc>${abs(paths[lang][page])}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${abs(paths.en[page])}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${abs(paths.ar[page])}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(paths.en[page])}"/>
  </url>`));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
}

// AI search crawlers are allowed explicitly so the site can be cited in AI answers (GEO).
const robots = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${abs("sitemap.xml")}
`;

// A plain-text summary for AI assistants and answer engines (llmstxt.org).
function llmsTxt() {
  const t = content.en;
  return `# ${t.brand}

> ${t.home.description}

Languages: Arabic and English. Countries served: ${areaServed.map((a) => a.en).join(", ")}.
Contact: WhatsApp/phone ${site.phone}, email ${site.email}.

## Services
${t.services.map((s) => `- [${s.title}](${abs("")}#${s.id}): ${s.desc}`).join("\n")}

## Pages
- [Home (English)](${abs(paths.en.home)})
- [Home (Arabic)](${abs(paths.ar.home)})
- [Contact us (English)](${abs(paths.en.contact)})
- [Contact us (Arabic)](${abs(paths.ar.contact)})

## FAQ
${t.faq.map(([q, a]) => `### ${q}\n${a}`).join("\n\n")}
`;
}

const out = (p, s) => {
  const file = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, s);
  console.log("wrote", p);
};

for (const lang of ["en", "ar"]) {
  out(lang === "en" ? "index.html" : "ar/index.html", homePage(lang));
  out(paths[lang].contact, contactPage(lang));
}
out("sitemap.xml", sitemap());
out("robots.txt", robots);
out("llms.txt", llmsTxt());
