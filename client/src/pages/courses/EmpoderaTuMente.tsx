import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ContactFormModal from "@/components/modals/ContactFormModal";
import ShareButtons from "@/components/ShareButtons";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EmpoderaTuMente: React.FC = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const temario = [
    "Introducción",
    "¿En qué enfocamos nuestra mente?",
    "Comunicación interna y externa",
    "Epigenética",
    "Pensamientos y sentimientos",
    "¿En qué tiempo vives?",
    "El miedo y el estrés",
    "Mente consciente e inconsciente",
    "Creencias",
    "Herramientas para cambiar nuestra vida",
    "Fuentes de energía",
    "Ejercicios de respiración, meditación, mente inconsciente, etc."
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
              Empodera Tu Mente
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Aprende a controlar tus pensamientos y emociones para vivir mejor y vender más
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 mr-2" />
                <span>5 horas de contenido</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-5 h-5 mr-2" />
                <span>Calidad de vida laboral</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 mr-2" />
                <span>Certificado en Coaching</span>
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
                    Según la revista Newsweek para el año 2020 la depresión fue la primera causa de discapacidad en México, 
                    y según investigaciones científicas recientes el 90% de las enfermedades son originadas por nuestra mente.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Por otra parte, de acuerdo a la norma 035-STPS te exige calidad de vida para tu empleado.
                  </p>
                  <p className="text-gray-600 mb-4">
                    De aquí nace Empodera Tu Mente, un curso taller que nos enseña en qué nos enfocamos y como estos pensamientos 
                    generan nuestra realidad, además de entender cómo se originan nuestros miedos y se activa el mecanismo del estrés, 
                    qué le pasa a mi cuerpo cuando me siento así además de darnos herramientas para enfrentar estas situaciones como 
                    son técnicas de respiración, meditación, dormir mejor, etc., además de revisar algunas fuentes de energía para vivir mejor.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Este curso va dirigido a todos los niveles de organizaciones, instituciones y empresas, ya que los continuos cambios 
                    que vivimos en los ámbitos económicos, sociales, políticos, etc no van acompañados del crecimiento en la parte humana 
                    y en un tiempo muy cercano se verán los impactos de ello.
                  </p>
                  <p className="text-gray-600">
                    Desarrollado por Javier Díaz entrenador certificado en temas de Coaching personal y empresarial, Neuroventas, 
                    PNL, y Desarrollo Humano con Joe Dispenza y con más de 5 años de experiencia continua.
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
                    src="/Empodera_Tu_Mente.webp"
                    alt="Empodera Tu Mente"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-600">Duración: 3 horas</p>
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
                      5 horas de contenido especializado
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Cumple norma 035-STPS
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Técnicas de meditación y respiración
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Certificado en Coaching y PNL
                    </li>
                  </ul>
                </div>
                
                <ShareButtons
                  title="Empodera Tu Mente - Curso de Javier Díaz"
                  description="Aprende a controlar tus pensamientos y emociones para vivir mejor y vender más. Cumple norma 035-STPS."
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
        title="Solicitar información - Empodera Tu Mente"
        description="Completa el formulario y te contactaremos para brindarte información detallada sobre este curso."
        type="info"
      />
      
      <ContactFormModal
        open={isDownloadModalOpen}
        onOpenChange={setIsDownloadModalOpen}
        title="Descargar temario - Empodera Tu Mente"
        description="Déjanos tus datos para enviarte el temario completo del curso."
        type="download"
      />
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default EmpoderaTuMente;