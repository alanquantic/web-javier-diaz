import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ContactFormModal from "@/components/modals/ContactFormModal";
import ShareButtons from "@/components/ShareButtons";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LiderazgoPersonal: React.FC = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const temario = [
    "¿Qué son los hábitos?",
    "¿Por qué son tan importantes en nuestra vida?",
    "Los cambios que queremos en nuestra vida",
    "El poder de las creencias",
    "¿Cómo influyen en el tiempo que queremos?",
    "El éxito y el crecimiento",
    "El enfoque como base del cambio",
    "Las 6 necesidades humanas que dirigen nuestras vidas",
    "Las 4 etapas de los hábitos",
    "Plan de acción masiva",
    "Los malos hábitos y cómo dejarlos",
    "Consideraciones importantes de los hábitos"
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
              Liderazgo Personal
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              El verdadero liderazgo comienza contigo. Desarrolla hábitos para el crecimiento personal
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 mr-2" />
                <span>6 horas de contenido</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-5 h-5 mr-2" />
                <span>Metodología práctica</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 mr-2" />
                <span>Transformación consciente</span>
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
                    El verdadero liderazgo comienza contigo. En este curso exploraremos el poder de los hábitos 
                    como herramienta fundamental para el crecimiento personal y la transformación consciente.
                  </p>
                  <p className="text-gray-600 mb-4">
                    A través de una metodología práctica y reflexiva, aprenderás cómo tus hábitos diarios 
                    moldean tus resultados, cómo identificar patrones que te limitan y qué hacer para 
                    reemplazarlos por acciones que te acerquen a tus metas.
                  </p>
                  <p className="text-gray-600">
                    Este curso está diseñado para ayudarte a tomar el control de tu vida, fortalecer tu 
                    liderazgo personal y avanzar con claridad hacia una versión más plena de ti mismo.
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
                    src="/Liderazgo_Personal.webp"
                    alt="Liderazgo Personal"
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
                      6 horas de contenido práctico
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Metodología reflexiva
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Plan de acción masiva
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Herramientas de transformación
                    </li>
                  </ul>
                </div>
                
                <ShareButtons
                  title="Liderazgo Personal - Curso de Javier Díaz"
                  description="El verdadero liderazgo comienza contigo. Desarrolla hábitos para el crecimiento personal y transformación consciente."
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
        title="Solicitar información - Liderazgo Personal"
        description="Completa el formulario y te contactaremos para brindarte información detallada sobre este curso."
        type="info"
      />
      
      <ContactFormModal
        open={isDownloadModalOpen}
        onOpenChange={setIsDownloadModalOpen}
        title="Descargar temario - Liderazgo Personal"
        description="Déjanos tus datos para enviarte el temario completo del curso."
        type="download"
      />
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default LiderazgoPersonal;