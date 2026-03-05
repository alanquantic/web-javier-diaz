import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ContactFormModal from "@/components/modals/ContactFormModal";
import ShareButtons from "@/components/ShareButtons";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EnergizateYCambiaTuVida: React.FC = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const temario = [
    "¿Qué es la energía y qué impacto tiene en nuestras vida?",
    "Los 3 pilares de la energía",
    "Ejercicio para cambiar en 5 minutos mi energía",
    "Resiliencia",
    "Ejercicio de niveles de energía",
    "El ciclo del éxito",
    "El poder del lenguaje",
    "El poder de las creencias",
    "Mi mente vs realidad",
    "Liberación de traumas",
    "El poder de meditar",
    "Técnicas de respiración",
    "Fisiología",
    "Bioquímica (oxigenación e hidratación)",
    "Ejercicio para medir PH",
    "El poder del ayuno",
    "Rutina Diaria para la energía"
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
      <section className="gradient-bg text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Energízate y Cambia Tu Vida
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Eleva tus niveles de energía física, mental y espiritual para lograr la plenitud
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 mr-2" />
                <span>10 horas de contenido</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-5 h-5 mr-2" />
                <span>Enfoque integral</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 mr-2" />
                <span>Técnicas probadas</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold mb-6">Descripción del curso</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600 mb-4">
                    La Energía es la base de nuestra vida, la requerimos para trabajar, hacer deporte, para relacionarnos con las personas, 
                    pareja, jugar con nuestros hijos, etc., por ello, hemos desarrollado este curso desde una perspectiva integral, 
                    elevar nuestros niveles de energía en la parte física, mental y espiritual basado en técnicas probadas y desarrolladas 
                    a nivel mundial.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Energízate y cambia tu vida es un curso práctico y muy dinámico, que nos enseña a enfocarnos hacia nuestras metas y 
                    objetivos para lograr la plenitud, Así mismo nos dota de herramientas para mejorar nuestra salud con nuevos hábitos 
                    que impactan considerablemente en nuestra vida desde la forma en que pensamos, sentimos, nos programamos y nos cuidamos.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Una persona con energía logra sus metas y objetivos de una manera más sencilla y está preparada para los retos que 
                    esto conlleva, por consecuencia es mucho más feliz.
                  </p>
                  <p className="text-gray-600">
                    Por ello te invitamos a que te unas a este curso y nos ayudes a transformar tantas vidas como sea posible.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Temario completo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {temario.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
                <div className="text-center mb-6">
                  <img 
                    src="/Energizate_y_Cambia_Tu_Vida.webp"
                    alt="Energízate y Cambia Tu Vida"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-600">Duración: 6 horas</p>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => setIsInfoModalOpen(true)}
                  >
                    <i className="fas fa-info-circle mr-2"></i>
                    Solicitar información
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={() => setIsDownloadModalOpen(true)}
                  >
                    <i className="fas fa-download mr-2"></i>
                    Descargar temario
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-bold mb-4">Este curso incluye:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      10 horas de contenido integral
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Enfoque físico, mental y espiritual
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Técnicas de respiración y meditación
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Rutinas prácticas diarias
                    </li>
                  </ul>
                </div>
                
                <ShareButtons
                  title="Energízate y Cambia Tu Vida - Curso de Javier Díaz"
                  description="Eleva tus niveles de energía física, mental y espiritual para lograr la plenitud. Enfoque integral con técnicas probadas."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modals */}
      <ContactFormModal
        open={isInfoModalOpen}
        onOpenChange={setIsInfoModalOpen}
        title="Solicitar información - Energízate y Cambia Tu Vida"
        description="Completa el formulario y te contactaremos para brindarte información detallada sobre este curso."
        type="info"
      />
      
      <ContactFormModal
        open={isDownloadModalOpen}
        onOpenChange={setIsDownloadModalOpen}
        title="Descargar temario - Energízate y Cambia Tu Vida"
        description="Déjanos tus datos para enviarte el temario completo del curso."
        type="download"
      />
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default EnergizateYCambiaTuVida;