import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ContactFormModal from "@/components/modals/ContactFormModal";
import ShareButtons from "@/components/ShareButtons";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CierraLaVentaYa: React.FC = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const temario = [
    "Estrategias de los más exitosos",
    "Somos sanadores",
    "Preguntas para encontrar los miedos del cliente",
    "Diferencia entre fracaso y éxito",
    "Ambición y deseo",
    "La confianza como base para vender",
    "Requisitos para cerrar la venta",
    "El poder de los testimonios",
    "Técnicas de cierre",
    "Técnicas para memorizar los nombres de tus clientes",
    "Determina tu tarifa por hora",
    "Ejercicio Priming",
    "El papel de la motivación"
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
              Cierra la Venta Ya
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Domina las técnicas más efectivas para cerrar ventas y superar objeciones con confianza
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 mr-2" />
                <span>6-7 horas de contenido</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-5 h-5 mr-2" />
                <span>Metodología probada</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 mr-2" />
                <span>Técnicas de expertos</span>
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
                    Una de las situaciones más penosas o difíciles para el vendedor es pedir el cierre con el cliente. 
                    Esto debido a que no queremos sentirnos rechazados o simplemente por miedo.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Este curso te ofrece herramientas que las personas más influyentes utilizan para generar confianza 
                    y ser más asertivos a la hora de vender.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Hay que entender que si no CIERRAS no vendes y hay que hacerlo rápido y sin hablar demasiado, 
                    por ello CIERRA LA VENTA te dotará de aquellas herramientas que te permitan generar más confianza, 
                    entender qué es exactamente lo que vendes y transmites en el cliente y sobre todo qué hacer cuando te dicen 
                    cosas como "No tengo dinero", "No tengo tiempo", etc.
                  </p>
                  <p className="text-gray-600">
                    Este curso se basa en la metodología que desarrolló Brian Tracy, Tony Robbins, Grant Cardone y algunos otros 
                    autores con mayor influencia en el mundo de los negocios.
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
                    src="/Cierra_la_Venta_Ya.webp"
                    alt="Cierra la Venta Ya"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-600">Duración: 6-7 horas</p>
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
                      6-7 horas de contenido
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Metodología de expertos mundiales
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Técnicas prácticas aplicables
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Ejercicios y herramientas
                    </li>
                  </ul>
                </div>
                
                <ShareButtons
                  title="Cierra la Venta Ya - Curso de Javier Díaz"
                  description="Domina las técnicas más efectivas para cerrar ventas y superar objeciones con confianza. Metodología probada de expertos mundiales."
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
        title="Solicitar información - Cierra la Venta Ya"
        description="Completa el formulario y te contactaremos para brindarte información detallada sobre este curso."
        type="info"
      />
      
      <ContactFormModal
        open={isDownloadModalOpen}
        onOpenChange={setIsDownloadModalOpen}
        title="Descargar temario - Cierra la Venta Ya"
        description="Déjanos tus datos para enviarte el temario completo del curso."
        type="download"
      />
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CierraLaVentaYa;