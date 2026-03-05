import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ContactFormModal from "@/components/modals/ContactFormModal";
import ShareButtons from "@/components/ShareButtons";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ElPoderDeLasNeuroventas: React.FC = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const temario = [
    "Introducción a las neuroventas",
    "¿Por qué es tan importante saber vender?",
    "¿Qué es un commodity?",
    "¿Cuál es el valor simbólico de tu empresa?",
    "Tecnología de las neuroventas",
    "El valor metafórico y simbólico de las cosas",
    "Neurooratoria y ejercicio práctico",
    "Modelos de neuroventas y ejercicio práctico",
    "¿Qué te hace diferente?",
    "Los tres cerebros",
    "Neurosegmentacion",
    "Los mejores descubrimientos de neuroventas, persuasión y pnl",
    "Palabras que activan el proceso de decisión de compra",
    "El seguimiento de los clientes",
    "Los referidos"
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
              El Poder de las Neuroventas
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Aprende a vender desde la neurociencia y la psicología del consumidor
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
                <span>Metodología Jurgen Klaric</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 mr-2" />
                <span>Certificación Master Training</span>
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
                    Cada vez es más difícil diferenciarse con un producto o servicio ya que hay miles de opciones iguales a la nuestra, 
                    cuando esto sucede y nuestro cerebro no alcanza a percibir la diferencia, la opción será siempre el precio y como 
                    consecuencia una disminución en los márgenes de utilidad del negocio.
                  </p>
                  <p className="text-gray-600 mb-4">
                    De aquí nacen los modelos con validez científica de Neuroventas, que nos ayudan a buscar en la mente del consumidor 
                    cuál es el miedo (en su inconsciente) que lo activa a comprar para ser más asertivos y también porque está demostrado 
                    que el 85% de las decisiones de compra son inconscientes y solo el 15% son racionales.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Con este nuevo modelo podemos destacar que ahora las cosas valen más por lo que representan que por lo que son, 
                    podremos ver el valor simbólico de nuestros productos, las mejores prácticas de neuroventas, neurosegmentación, 
                    y otros temas que nos permiten vender más y esforzarnos menos.
                  </p>
                  <p className="text-gray-600">
                    Este curso se basa en la metodología que desarrolló Jurgen Klaric autor de los libros "Véndele a la Mente y no a la gente" 
                    y "Estamos Ciegos" entre otros, líder a nivel mundial en Neuroventas y con quien tomé el Master Training para ser 
                    entrenador certificado.
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
                    src="/El_Poder_de_las_Neuroventas.webp"
                    alt="El Poder de las Neuroventas"
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
                      6 horas de contenido avanzado
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Metodología Jurgen Klaric
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Ejercicios prácticos
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Validez científica comprobada
                    </li>
                  </ul>
                </div>
                
                <ShareButtons
                  title="El Poder de las Neuroventas - Curso de Javier Díaz"
                  description="Aprende a vender desde la neurociencia y la psicología del consumidor. Metodología certificada de Jurgen Klaric."
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
        title="Solicitar información - El Poder de las Neuroventas"
        description="Completa el formulario y te contactaremos para brindarte información detallada sobre este curso."
        type="info"
      />
      
      <ContactFormModal
        open={isDownloadModalOpen}
        onOpenChange={setIsDownloadModalOpen}
        title="Descargar temario - El Poder de las Neuroventas"
        description="Déjanos tus datos para enviarte el temario completo del curso."
        type="download"
      />
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ElPoderDeLasNeuroventas;