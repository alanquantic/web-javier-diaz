import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProcessSection from "@/components/ProcessSection";
import BenefitsSection from "@/components/BenefitsSection";
import ActionSection from "../components/ActionSection";
import FeaturedCourseSection from "@/components/FeaturedCourseSection";
import CoursesSection from "@/components/CoursesSection";
import FAQSection from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ClientsCarousel from "@/components/ClientsCarousel";
import GallerySection from "@/components/GallerySection";
import BlogSection from "@/components/BlogSection";
import CallToAction from "@/components/CallToAction";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { OrganizationSchema, PersonSchema, FAQSchemas, CourseSchema } from "@/components/SEOSchemas";
import { useEffect } from "react";

const Home: React.FC = () => {
  // Add smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        
        const targetId = target.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId as string);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const faqs = [
    {
      question: "¿Qué incluyen los cursos de ventas?",
      answer: "Nuestros cursos incluyen técnicas de neuroventas, estrategias de cierre, manejo de objeciones, y herramientas prácticas para incrementar tus ventas. Todos los cursos incluyen material descargable y certificado de participación."
    },
    {
      question: "¿Los cursos son presenciales o en línea?",
      answer: "Ofrecemos ambas modalidades. Tenemos cursos presenciales en Aguascalientes y también versiones en línea para que puedas estudiar desde cualquier lugar a tu propio ritmo."
    },
    {
      question: "¿Cuánto tiempo duran los cursos?",
      answer: "La duración varía según el curso. Tenemos desde workshops intensivos de 3 horas hasta programas completos como la Escuela de Vendedores Profesionales de 9 horas. Cada curso está diseñado para maximizar el aprendizaje en el menor tiempo posible."
    },
    {
      question: "¿Ofrecen certificación al completar los cursos?",
      answer: "Sí, todos nuestros cursos incluyen certificado de participación que avala las horas de capacitación y las competencias adquiridas en ventas profesionales."
    },
    {
      question: "¿Hay garantía de resultados?",
      answer: "Garantizamos que aplicando las técnicas enseñadas verás mejoras en tus resultados de ventas. Si no estás satisfecho, ofrecemos garantía de devolución dentro de los primeros 30 días."
    },
    {
      question: "¿Ofrecen capacitación empresarial?",
      answer: "Sí, brindamos servicios de capacitación empresarial personalizada, consultoría estratégica y coaching comercial para equipos de ventas de empresas de todos los tamaños."
    }
  ];

  const courses = [
    {
      title: "Escuela de Vendedores Profesionales",
      description: "Curso especializado de 9 horas para aprender a vender como un profesional y generar más ingresos en menos tiempo"
    },
    {
      title: "Cierra la Venta Ya",
      description: "Técnicas avanzadas de cierre para incrementar tu tasa de conversión"
    },
    {
      title: "El Poder de las Neuroventas",
      description: "Aplica neurociencia para conectar mejor con tus clientes"
    },
    {
      title: "Empodera Tu Mente",
      description: "Desarrolla la mentalidad ganadora del vendedor exitoso"
    },
    {
      title: "Energízate y Cambia Tu Vida",
      description: "Transforma tu energía y actitud para alcanzar el éxito"
    },
    {
      title: "Liderazgo Personal",
      description: "Desarrolla habilidades de liderazgo para dirigir equipos de ventas"
    }
  ];

  return (
    <>
      <OrganizationSchema />
      <PersonSchema />
      <FAQSchemas faqs={faqs} />
      <CourseSchema courses={courses} />
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <BenefitsSection />
        <ActionSection />     {/* AQUÍ pones tu nueva sección */}
        <FeaturedCourseSection />
        <CoursesSection />
        <ProcessSection />
        <FAQSection />
        <TestimonialsSection />
        <ClientsCarousel />
        <GallerySection />
        <BlogSection />
        <CallToAction />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Home;
