import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, Users, Award, Calendar, CheckCircle, Star, CreditCard } from "lucide-react";
import PaymentModal from "@/components/modals/PaymentModal";
import { useState } from "react";

const FeaturedCourseSection: React.FC = () => {
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
      duration: "2 horas"
    },
    {
      date: "7 de octubre", 
      title: "Módulo 1: Introducción a las ventas profesionales",
      duration: "2 horas"
    },
    {
      date: "9 de octubre",
      title: "Módulo 1: La Imagen del Vendedor Profesional", 
      duration: "2 horas"
    },
    {
      date: "15 de octubre",
      title: "Módulo 1: Las mejores estrategias de los grandes vendedores",
      duration: "2 horas"
    },
    {
      date: "16 de octubre",
      title: "Módulo 1: Retroalimentación",
      duration: "1 hora"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 relative">
        {/* Badge superior */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4 mr-2" />
            Curso Especializado Destacado
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Escuela de Vendedores Profesionales
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Logra tus sueños, aprende a vender como un profesional para generar más ingresos en menos tiempo
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Imagen y detalles del curso */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img 
                  src="/Escuela_de_Vendedores_Profesionales.png" 
                  alt="Escuela de Vendedores Profesionales" 
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ¡Nuevo!
                </div>
              </div>

              {/* Stats del curso */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl text-center shadow-md">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-gray-900">9 horas</div>
                  <div className="text-sm text-gray-600">de contenido</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl text-center shadow-md">
                  <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="font-bold text-gray-900">4+1 sesiones</div>
                  <div className="text-sm text-gray-600">via Zoom</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl text-center shadow-md">
                  <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="font-bold text-gray-900">Diploma</div>
                  <div className="text-sm text-gray-600">certificado</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl text-center shadow-md">
                  <Calendar className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <div className="font-bold text-gray-900">Octubre</div>
                  <div className="text-sm text-gray-600">2025</div>
                </div>
              </div>
            </motion.div>

            {/* Contenido del curso */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Beneficios */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">¿Qué obtendrás?</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Sesiones */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cronograma de Sesiones</h3>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {sessions.map((session, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{session.title}</div>
                        <div className="text-xs text-gray-600">{session.date}</div>
                      </div>
                      <div className="text-xs text-blue-600 font-medium">{session.duration}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold mb-2">¿Te interesa este curso?</h3>
                  <p className="text-blue-100">Contáctanos para más información</p>
                </div>
                
                <Button 
                  className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3"
                  onClick={() => window.location.href = '/courses/escuela-de-vendedores-profesionales'}
                >
                  Más Información
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        courseName="Escuela de Vendedores Profesionales"
        coursePrice={199}
      />
    </section>
  );
};

export default FeaturedCourseSection;