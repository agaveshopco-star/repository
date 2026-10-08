// ALL site copy lives here. Edit this file to change services / wording (EN + ES).
// NOTE: services below are placeholders — replace with the real list from agavemkt.com.
export type Lang = "en" | "es";

export const WHATSAPP = "https://wa.me/56979946969";

export const content = {
  en: {
    nav: { services: "Services", why: "Why us", onboarding: "Onboarding", dashboard: "Dashboard", menu: "Menu", close: "Close", signin: "Sign in" },
    hero: { eyebrow: "Marketing studio · Chile & LatAm", title: "Growth, engineered.", cta: "Start onboarding" },
    statement: { eyebrow: "What we do", title: "One studio. Every channel.", body: "Agave builds, launches and runs the marketing your business needs — in English and Spanish, from strategy to results you can measure." },
    services: {
      eyebrow: "Services",
      title: "Built to perform",
      items: [
        { id: "strategy", name: "Brand & Strategy", body: "Positioning, messaging and a clear roadmap before a single peso is spent." },
        { id: "social", name: "Social & Content", body: "Content systems for Instagram, TikTok and LinkedIn that stay consistent and on-brand." },
        { id: "paid", name: "Paid Media", body: "Meta, Google and TikTok campaigns managed against revenue, not vanity metrics." },
        { id: "web", name: "Web & Landing Pages", body: "Fast, bilingual websites and funnels designed to convert." },
        { id: "seo", name: "SEO", body: "Technical and content SEO that compounds month after month." },
        { id: "automation", name: "CRM & Automation", body: "WhatsApp, email and CRM flows that follow up so you don't have to." },
      ],
    },
    why: {
      eyebrow: "Why Agave",
      title: "Less noise. More signal.",
      points: [
        { k: "Bilingual", v: "Native EN / ES execution — copy that reads right in both markets." },
        { k: "Transparent", v: "A live dashboard shows what we are working on, always." },
        { k: "Fast", v: "Onboarding in minutes, kickoff within days." },
        { k: "Senior", v: "You work directly with the people doing the work." },
      ],
    },
    process: {
      eyebrow: "Process",
      title: "How it works",
      steps: [
        { n: "01", t: "Onboard", b: "Sign in with Google and tell us about your business." },
        { n: "02", t: "Plan", b: "We review, propose scope and agree on goals." },
        { n: "03", t: "Launch", b: "We execute. You follow progress in your dashboard." },
        { n: "04", t: "Grow", b: "We measure, optimise and scale what works." },
      ],
    },
    cta: { title: "Ready to launch?", button: "Start onboarding", whatsapp: "Talk on WhatsApp" },
    footer: { rights: "All rights reserved.", contact: "Contact" },
    login: { eyebrow: "Client access", title: "Sign in", body: "Use your Google account to onboard and access your dashboard.", note: "We only read your name, email and photo." },
    onboarding: {
      eyebrow: "Onboarding", title: "Tell us about your business",
      steps: ["You", "Business", "Goals"],
      next: "Continue", back: "Back", submit: "Submit",
      f: {
        company: "Company name", website: "Website (optional)", industry: "Industry", size: "Team size",
        phone: "WhatsApp / phone", country: "Country", services: "Services you are interested in",
        goals: "What do you want to achieve?", budget: "Monthly budget", timeline: "When do you want to start?",
        language: "Preferred language", heard: "How did you hear about us?",
      },
      sizes: ["Just me", "2–10", "11–50", "50+"],
      budgets: ["Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+", "Not sure yet"],
      timelines: ["Immediately", "Within a month", "In 1–3 months", "Just exploring"],
      required: "Required", error: "Something went wrong. Please try again.",
      doneTitle: "You're in.", doneBody: "We received your information and will be in touch shortly.", toDashboard: "Open dashboard",
    },
    dashboard: {
      eyebrow: "Client dashboard", hello: "Hello", signout: "Sign out",
      status: "Status", statuses: { received: "Received", review: "In review", kickoff: "Kickoff", active: "Active" },
      steps: "Progress", updates: "Updates", noUpdates: "No updates yet. We'll post progress here.",
      profile: "Your information", services: "Services", edit: "Update details", contact: "Message us on WhatsApp",
      notOnboarded: "You haven't completed onboarding yet.", complete: "Complete onboarding",
      admin: "Admin · leads", company: "Company", email: "Email", date: "Date",
    },
    industries: ["Retail / E-commerce", "Food & Beverage", "Real estate", "Health & Wellness", "Professional services", "Education", "Tech / SaaS", "Other"],
    heardFrom: ["Instagram", "Google", "Referral", "WhatsApp", "Other"],
  },
  es: {
    nav: { services: "Servicios", why: "Por qué nosotros", onboarding: "Onboarding", dashboard: "Dashboard", menu: "Menú", close: "Cerrar", signin: "Ingresar" },
    hero: { eyebrow: "Estudio de marketing · Chile y LatAm", title: "Crecimiento, diseñado.", cta: "Comenzar onboarding" },
    statement: { eyebrow: "Qué hacemos", title: "Un estudio. Todos los canales.", body: "Agave crea, lanza y opera el marketing que tu negocio necesita — en español e inglés, desde la estrategia hasta resultados medibles." },
    services: {
      eyebrow: "Servicios",
      title: "Hecho para rendir",
      items: [
        { id: "strategy", name: "Marca y Estrategia", body: "Posicionamiento, mensaje y una hoja de ruta clara antes de invertir un peso." },
        { id: "social", name: "Redes y Contenido", body: "Sistemas de contenido para Instagram, TikTok y LinkedIn, consistentes y fieles a tu marca." },
        { id: "paid", name: "Medios Pagados", body: "Campañas en Meta, Google y TikTok gestionadas por ingresos, no por métricas vanidosas." },
        { id: "web", name: "Web y Landing Pages", body: "Sitios y embudos bilingües, rápidos y diseñados para convertir." },
        { id: "seo", name: "SEO", body: "SEO técnico y de contenido que se acumula mes a mes." },
        { id: "automation", name: "CRM y Automatización", body: "Flujos de WhatsApp, email y CRM que hacen el seguimiento por ti." },
      ],
    },
    why: {
      eyebrow: "Por qué Agave",
      title: "Menos ruido. Más señal.",
      points: [
        { k: "Bilingüe", v: "Ejecución nativa EN / ES — textos que suenan bien en ambos mercados." },
        { k: "Transparente", v: "Un dashboard en vivo muestra en qué estamos trabajando." },
        { k: "Rápido", v: "Onboarding en minutos, inicio en pocos días." },
        { k: "Senior", v: "Trabajas directamente con quienes hacen el trabajo." },
      ],
    },
    process: {
      eyebrow: "Proceso",
      title: "Cómo funciona",
      steps: [
        { n: "01", t: "Onboarding", b: "Ingresa con Google y cuéntanos sobre tu negocio." },
        { n: "02", t: "Plan", b: "Revisamos, proponemos alcance y definimos metas." },
        { n: "03", t: "Lanzamiento", b: "Ejecutamos. Sigues el avance en tu dashboard." },
        { n: "04", t: "Crecimiento", b: "Medimos, optimizamos y escalamos lo que funciona." },
      ],
    },
    cta: { title: "¿Listo para lanzar?", button: "Comenzar onboarding", whatsapp: "Hablemos por WhatsApp" },
    footer: { rights: "Todos los derechos reservados.", contact: "Contacto" },
    login: { eyebrow: "Acceso clientes", title: "Ingresar", body: "Usa tu cuenta de Google para hacer el onboarding y acceder a tu dashboard.", note: "Solo leemos tu nombre, email y foto." },
    onboarding: {
      eyebrow: "Onboarding", title: "Cuéntanos sobre tu negocio",
      steps: ["Tú", "Negocio", "Objetivos"],
      next: "Continuar", back: "Atrás", submit: "Enviar",
      f: {
        company: "Nombre de la empresa", website: "Sitio web (opcional)", industry: "Industria", size: "Tamaño del equipo",
        phone: "WhatsApp / teléfono", country: "País", services: "Servicios que te interesan",
        goals: "¿Qué quieres lograr?", budget: "Presupuesto mensual", timeline: "¿Cuándo quieres comenzar?",
        language: "Idioma preferido", heard: "¿Cómo nos conociste?",
      },
      sizes: ["Solo yo", "2–10", "11–50", "50+"],
      budgets: ["Menos de $500", "$500 – $1.500", "$1.500 – $5.000", "$5.000+", "Aún no sé"],
      timelines: ["Inmediatamente", "En un mes", "En 1–3 meses", "Solo explorando"],
      required: "Obligatorio", error: "Algo salió mal. Inténtalo de nuevo.",
      doneTitle: "Listo.", doneBody: "Recibimos tu información y te contactaremos pronto.", toDashboard: "Abrir dashboard",
    },
    dashboard: {
      eyebrow: "Dashboard de cliente", hello: "Hola", signout: "Salir",
      status: "Estado", statuses: { received: "Recibido", review: "En revisión", kickoff: "Inicio", active: "Activo" },
      steps: "Progreso", updates: "Novedades", noUpdates: "Aún no hay novedades. Publicaremos el avance aquí.",
      profile: "Tu información", services: "Servicios", edit: "Actualizar datos", contact: "Escríbenos por WhatsApp",
      notOnboarded: "Aún no completas el onboarding.", complete: "Completar onboarding",
      admin: "Admin · leads", company: "Empresa", email: "Email", date: "Fecha",
    },
    industries: ["Retail / E-commerce", "Alimentos y bebidas", "Inmobiliario", "Salud y bienestar", "Servicios profesionales", "Educación", "Tech / SaaS", "Otro"],
    heardFrom: ["Instagram", "Google", "Recomendación", "WhatsApp", "Otro"],
  },
} as const;

export type Copy = (typeof content)["en"];
