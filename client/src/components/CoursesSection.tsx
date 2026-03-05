import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import ContactFormModal from "./modals/ContactFormModal";

const courses = [
  {
    image: "/Cierra_la_Venta_Ya.webp",
    badge: "Popular",
    badgeColor: "blue",
    duration: "6-7 horas",
    title: "Cierra la Venta Ya",
    description: "Domina las técnicas más efectivas para cerrar ventas y superar objeciones con confianza.",
    price: "Disponible próximamente",
    featured: true,
    slug: "cierra-la-venta-ya"
  },
  {
    image: "/El_Poder_de_las_Neuroventas.webp",
    badge: "Avanzado",
    badgeColor: "green",
    duration: "6 horas",
    title: "El Poder de las Neuroventas",
    description: "Aprende a vender desde la neurociencia y la psicología del consumidor.",
    price: "Disponible próximamente",
    featured: false,
    slug: "el-poder-de-las-neuroventas"
  },
  {
    image: "/Liderazgo_Personal.webp",
    badge: "Fundamental",
    badgeColor: "purple",
    duration: "6 horas",
    title: "Liderazgo Personal",
    description: "El verdadero liderazgo comienza contigo. Desarrolla hábitos para el crecimiento personal.",
    price: "Disponible próximamente",
    featured: false,
    slug: "liderazgo-personal"
  },
  {
    image: "/Empodera_Tu_Mente.webp",
    badge: "Bienestar",
    badgeColor: "orange",
    duration: "3 horas",
    title: "Empodera Tu Mente",
    description: "Aprende a controlar tus pensamientos y emociones para vivir mejor y vender más.",
    price: "Disponible próximamente",
    featured: false,
    slug: "empodera-tu-mente"
  },
  {
    image: "/Energizate_y_Cambia_Tu_Vida.webp",
    badge: "Transformación",
    badgeColor: "red",
    duration: "6 horas",
    title: "Energízate y Cambia Tu Vida",
    description: "Eleva tus niveles de energía física, mental y espiritual para lograr la plenitud.",
    price: "Disponible próximamente",
    featured: false,
    slug: "energizate-y-cambia-tu-vida"
  },
];

const services = [
  {
    icon: "fas fa-user-tie",
    title: "Coaching 1 a 1 para Vendedores y Emprendedores",
    description: "Sesiones personalizadas para abordar tus desafíos específicos y potenciar tus habilidades.",
  },
  {
    icon: "fas fa-users",
    title: "Mentoría para Equipos Comerciales",
    description: "Programas de capacitación para equipos completos, enfocados en objetivos comunes.",
  },
  {
    icon: "fas fa-microphone-alt",
    title: "Conferencias para Empresas y Eventos",
    description: "Charlas motivacionales y formativas para eventos corporativos y convenciones.",
  },
  {
    icon: "fas fa-building",
    title: "Talleres Empresariales In Company",
    description: "Workshops prácticos diseñados a medida para las necesidades de tu empresa.",
  },
  {
    icon: "fas fa-chart-line",
    title: "Consultoría Estratégica Comercial",
    description: "Revisión y optimización de procesos de venta, discurso comercial, seguimiento, y más.",
  },
  {
    icon: "fas fa-robot",
    title: "Estrategia de Redes Sociales basado en inteligencia artificial",
    description: "Implementación de estrategias digitales avanzadas usando IA para maximizar tu presencia en redes.",
  },
];

const CoursesSection: React.FC = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  
  return (
    <section id="cursos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Productos y Servicios <span className="text-primary">que Ofrecemos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Desarrollamos programas pensados para cada etapa de tu carrera comercial, desde principiantes hasta líderes de ventas experimentados.
          </p>
        </motion.div>

        <h3 className="text-2xl font-bold mb-8">Cursos y Programas de Entrenamiento</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-48 overflow-hidden relative">
                {course.featured && (
                  <div className="absolute top-4 right-4 bg-destructive text-white text-sm font-bold py-1 px-3 rounded-full">
                    Más popular
                  </div>
                )}
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className={`bg-${course.badgeColor}-100 text-${course.badgeColor}-800 text-xs font-semibold px-3 py-1 rounded-full`}>
                    {course.badge}
                  </span>
                  <span className="text-gray-500 text-sm">{course.duration}</span>
                </div>
                <h4 className="text-xl font-bold mb-2">{course.title}</h4>
                <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
                <div className="flex justify-end">
                  <Button size="sm" asChild>
                    <a href={`/courses/${course.slug}`}>Ver detalles</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-8">Servicios Personalizados</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-xl flex hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mr-5 mt-1">
                <div className="bg-primary text-white p-3 rounded-full flex items-center justify-center w-12 h-12">
                  <i className={`${service.icon} text-xl`}></i>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">{service.title}</h4>
                <p className="text-gray-600 mb-3">{service.description}</p>
                <button 
                  onClick={() => setIsInfoModalOpen(true)}
                  className="text-primary font-semibold hover:underline flex items-center bg-transparent border-none cursor-pointer"
                >
                  Más información <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Button 
              variant="destructive" 
              size="lg"
              onClick={() => setIsInfoModalOpen(true)}
            >
              <i className="fas fa-calendar-check mr-2"></i> Solicitar información
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setIsQuestionModalOpen(true)}
            >
              <i className="fas fa-question-circle mr-2"></i> Hacer pregunta
            </Button>
          </div>
        </div>
        
        {/* Modals */}
        <ContactFormModal
          open={isInfoModalOpen}
          onOpenChange={setIsInfoModalOpen}
          title="Solicitar información personalizada"
          description="Completa el formulario y te contactaremos para brindarte información detallada sobre nuestros servicios y programas."
          type="info"
        />
        
        <ContactFormModal
          open={isQuestionModalOpen}
          onOpenChange={setIsQuestionModalOpen}
          title="Hacer una pregunta"
          description="¿Tienes dudas sobre nuestros servicios? Completa el formulario y te responderemos a la brevedad."
          type="question"
        />
        

      </div>
    </section>
  );
};

export default CoursesSection;
