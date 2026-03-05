import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, Award, Calendar, CheckCircle, Star, Play, CreditCard } from "lucide-react";
import { useState } from "react";
import PaymentModal from "@/components/modals/PaymentModal";

const EscuelaDeVendedoresProfesionales: React.FC = () => {
  const [activeSession, setActiveSession] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const benefits = [
    "Conocer las diferencias entre un vendedor profesional y uno amateur",
    "¿Qué es lo que proyecto con mis clientes y como puedo conectar más con ellos para lograr más ventas?",
    "Entender perfectamente lo que vendemos y la mejor manera de trasmitirlo a nuestros clientes",
    "Técnicas de cierre de Ventas efectivas para incrementar nuestros ingresos",
    "Los mejores tips de los grandes vendedores",
    "Tips prácticos y fáciles de IA para promocionarte mejor en redes sociales",
    "Diploma",
    "Bolsa de trabajo"
  ];

  const sessions = [
    {
      date: "2 de octubre",
      title: "Módulo 1: Introducción a las ventas profesionales",
      duration: "2 horas",
      time: "5:00 PM - 7:00 PM",
      objective: "Entender la diferencia entre la venta amateur y la profesional",
      topics: [
        "Introducción a las Ventas",
        "¿Por qué es tan importante saber vender?",
        "Tu negocio ¿está creciendo?",
        "El papel de los nuevos vendedores profesionales",
        "La despersonalización de las ventas",
        "Los 3 requisitos clave que debemos cumplir",
        "Características del Vendedor Profesional",
        "Objetivos y metas",
        "La Actitud positiva",
        "La psicología del comprador",
        "Las 2 fuerzas: El dolor y el placer",
        "El papel de las emociones en la Venta"
      ]
    },
    {
      date: "7 de octubre",
      title: "Módulo 1: Introducción a las ventas profesionales",
      duration: "2 horas",
      time: "5:00 PM - 7:00 PM",
      objective: "Entender perfectamente la diferencia entre lo que vendemos y que desean nuestros clientes",
      topics: [
        "La Venta profesional en la práctica",
        "¿Qué es lo que vendes?",
        "Ejercicio práctico 3 Preguntas clave del Vendedor Profesional",
        "El valor de lo que vendemos",
        "El Gen egoísta y como impacta en los resultados",
        "Los nichos de mercado",
        "El papel de las preguntas que generen valor",
        "Las preguntas como herramienta clave del vendedor profesional",
        "Las Objeciones como oportunidad de venta",
        "El tiempo y su impacto en los resultados",
        "Herramientas de IA para que tus redes sean vendedoras"
      ]
    },
    {
      date: "9 de octubre",
      title: "Módulo 1: La Imagen del Vendedor Profesional",
      duration: "2 horas",
      time: "5:00 PM - 7:00 PM",
      objective: "Evaluar mi imagen y lo que quiero proyectar ante mis clientes para ganar mayor confianza",
      topics: [
        "Mi imagen",
        "¿Qué proyecto ante mis clientes?",
        "Energía",
        "Mi estado físico y mental",
        "¿Por qué te compra tu cliente?",
        "La comparación y percepción",
        "El impacto de mis creencias en mis resultados",
        "Frases de Encantamiento",
        "Incrementa tus resultados",
        "La prospección y las ventas",
        "Ejercicio Primming"
      ]
    },
    {
      date: "15 de octubre",
      title: "Módulo 1: Las mejores estrategias de los grandes vendedores",
      duration: "2 horas",
      time: "5:00 PM - 7:00 PM",
      objective: "Aplicar las mejores prácticas y estrategias de Ventas en los negocios",
      topics: [
        "Técnicas de Cierre",
        "¿Por qué es tan importante cerrar más rápido?",
        "Vende y conecta por Whatsapp",
        "El poder de los testimonios",
        "Técnicas de cierre de ventas más comunes",
        "El rol de los interlocutores",
        "El precio y la utilidad",
        "Las redes de negocios",
        "Consideraciones de los grandes vendedores",
        "Caso práctico"
      ]
    },
    {
      date: "16 de octubre",
      title: "Módulo 1: Retroalimentación",
      duration: "1 hora",
      time: "5:00 PM - 6:00 PM",
      objective: "Conocer dudas en la aplicación de la metodología a la vida real",
      topics: [
        "Sesión especial de preguntas y respuestas de 1 hora"
      ]
    }
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" asChild>
            <a href="/" className="flex items-center text-gray-600 hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </a>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Star className="w-4 h-4 mr-2" />
              Curso Especializado
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Escuela de Vendedores Profesionales
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Logra tus sueños, aprende a vender como un profesional para generar más ingresos en menos tiempo
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 mr-2" />
                <span>9 horas de contenido</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-5 h-5 mr-2" />
                <span>4 sesiones + 1 mentoría</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Award className="w-5 h-5 mr-2" />
                <span>Diploma certificado</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5 mr-2" />
                <span>Octubre 2025</span>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8"
                onClick={() => window.open('https://wa.me/5214491866213?text=Hola,%20me%20interesa%20el%20curso%20Escuela%20de%20Vendedores%20Profesionales', '_blank')}
              >
                <i className="fab fa-whatsapp mr-2"></i>
                Más información
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => {
                  const element = document.getElementById('contenido');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Ver contenido completo
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="contenido" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Descripción */}
                <motion.div 
                  className="bg-white p-8 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">Acerca del curso</h2>
                  <div className="text-gray-600 space-y-4">
                    <p>
                      Algunos de los retos más importantes que enfrentan los vendedores en la actualidad es el tiempo y la atención, la mayoría de los clientes o prospectos están saturados de información que les llega por diferentes medios como correos, WhatsApp, redes sociales, etc., y se han vuelto muy selectivos en aquello que les aporte valor o simplemente escuchar a su interlocutor.
                    </p>
                    <p>
                      Por lo tanto, debemos ser muy efectivos a la hora de vender, y hacerlo de manera profesional para lograr nuestros objetivos de ventas e ingresos.
                    </p>
                    <p>
                      Este curso especializado de 9 horas te dará las herramientas y técnicas necesarias para convertirte en un vendedor profesional y generar más ingresos en menos tiempo.
                    </p>
                  </div>
                </motion.div>

                {/* Beneficios */}
                <motion.div 
                  className="bg-white p-8 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">¿Qué obtendrás?</h2>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Sessions */}
                <motion.div 
                  className="bg-white p-8 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Contenido del curso</h2>
                  
                  {/* Session tabs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {sessions.map((session, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSession(index)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeSession === index 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Sesión {index + 1}
                      </button>
                    ))}
                  </div>

                  {/* Active session content */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {sessions[activeSession].title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {sessions[activeSession].date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {sessions[activeSession].duration}
                          </span>
                          <span className="flex items-center">
                            <Play className="w-4 h-4 mr-1" />
                            {sessions[activeSession].time}
                          </span>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                          <div className="text-sm font-medium text-blue-900 mb-1">Objetivo:</div>
                          <div className="text-sm text-blue-800">{sessions[activeSession].objective}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-900 mb-3">Contenido:</div>
                      {sessions[activeSession].topics.map((topic, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-600">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* CTA Card */}
                <motion.div 
                  className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-2xl text-white shadow-lg sticky top-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">¿Te interesa este curso?</h3>
                    <p className="text-blue-100">Contáctanos para más información sobre fechas, precios y disponibilidad</p>
                  </div>
                  
                  <Button 
                    className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3"
                    onClick={() => window.open('https://wa.me/5214491866213?text=Hola,%20me%20interesa%20el%20curso%20Escuela%20de%20Vendedores%20Profesionales', '_blank')}
                  >
                    <i className="fab fa-whatsapp mr-2"></i>
                    Más Información
                  </Button>
                </motion.div>

                {/* Stats */}
                <motion.div 
                  className="bg-white p-6 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-semibold text-gray-900 mb-4">Detalles del curso</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duración:</span>
                      <span className="font-medium">9 horas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sesiones:</span>
                      <span className="font-medium">4 sesiones + 1 mentoría</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modalidad:</span>
                      <span className="font-medium">Zoom</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Certificado:</span>
                      <span className="font-medium">Sí</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bolsa de trabajo:</span>
                      <span className="font-medium">Incluida</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        courseName="Escuela de Vendedores Profesionales"
        coursePrice={199}
      />
    </div>
  );
};

export default EscuelaDeVendedoresProfesionales;