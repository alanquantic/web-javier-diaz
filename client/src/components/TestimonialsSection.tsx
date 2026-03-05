import { motion } from "framer-motion";
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Luis Rodríguez",
    position: "Asesor Inmobiliario",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    testimonial: "Después del curso, aumenté mis cierres en un 40% en solo 2 meses. ¡Increíble!"
  },
  {
    name: "Claudia Sánchez",
    position: "Emprendedora de e-commerce",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    testimonial: "Antes vendía por intuición. Hoy tengo un método claro que me da resultados reales"
  },
  {
    name: "Arturo López",
    position: "Gerente de Ventas",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    testimonial: "El entrenamiento de liderazgo me ayudó a recuperar la confianza y motivar a mi equipo."
  },
  {
    name: "Karina Méndez",
    position: "Consultora de Belleza",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    testimonial: "Gracias al coaching 1 a 1, aprendí a vender por WhatsApp sin sonar agresivo. ¡Cierro más!"
  },
  {
    name: "Héctor Salas",
    position: "Ejecutivo de Seguros",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    testimonial: "Javier no te da rollo, te da herramientas. Apliqué lo aprendido y lo vi en mi bolsillo."
  },
  {
    name: "Paola Rivas",
    position: "Representante de Ventas Industriales",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    testimonial: "El curso de objeciones me cambió el juego. Ya no me quedo sin saber qué responder."
  },
  {
    name: "Ricardo Morales",
    position: "Emprendedor de Servicios Financieros",
    image: "https://randomuser.me/api/portraits/men/38.jpg",
    testimonial: "Aumenté mis ingresos, pero también mi seguridad personal. Este entrenamiento es completo."
  },
  {
    name: "Ana Beltrán",
    position: "Networker y Líder de Multinivel",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
    testimonial: "He tomado varios cursos de ventas, pero este fue el único que me generó resultados inmediatos."
  },
  {
    name: "Daniel Ortega",
    position: "Asesor de Créditos",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    testimonial: "Aplicar neuroventas cambió cómo me ven mis clientes. Hoy cierro más y con mayor autoridad."
  },
  {
    name: "Mariana Torres",
    position: "Vendedora de Autos",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    testimonial: "Increíble cómo con pequeños cambios en mi discurso, mis ventas se dispararon."
  }
];

const videoTestimonials = [
  {
    name: "Ivette Martínez",
    position: "Educación",
    videoSrc: "/Ivette_Martinez_Educacion.mp4"
  },
  {
    name: "Jorge Durán",
    position: "Transporte Turístico",
    videoSrc: "/Jorge_Duran_Transporte_Turístico.mp4"
  },
  {
    name: "Néstor Martínez",
    position: "Logística y Exportación Animal",
    videoSrc: "/Nestor_Martinez_Logistica_y_exportacion_animal.mp4"
  },
  {
    name: "Samanta Aguilar",
    position: "Seguros e Inversiones",
    videoSrc: "/Samanta_Aguilar_Seguros_e_Inversiones.mp4"
  }
];

const TestimonialsSection: React.FC = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleVideoClick = (index: number) => {
    setPlayingVideo(playingVideo === index ? null : index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 3 < 0 ? Math.max(0, testimonials.length - 3) : prev - 3));
  };

  const visibleTestimonials = testimonials.slice(currentSlide, currentSlide + 3);

  return (
    <section id="testimonios" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Lo Que Dicen <span className="text-primary">Nuestros Clientes</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Historias reales de éxito de quienes han transformado su carrera comercial con nuestros programas.
          </p>
        </motion.div>

        <div className="relative mb-12">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
              disabled={currentSlide === 0}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
              disabled={currentSlide + 3 >= testimonials.length}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={currentSlide + index}
                className="bg-gray-50 p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="font-bold text-base">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">{testimonial.testimonial}</p>
                <div className="flex text-yellow-400">
                  <Star className="fill-current" size={16} />
                  <Star className="fill-current" size={16} />
                  <Star className="fill-current" size={16} />
                  <Star className="fill-current" size={16} />
                  <Star className="fill-current" size={16} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index * 3)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  Math.floor(currentSlide / 3) === index ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-8 text-center">Videos testimoniales</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoTestimonials.map((video, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-[9/16] cursor-pointer" onClick={() => handleVideoClick(index)}>
                {playingVideo === index ? (
                  <video 
                    className="w-full h-full object-cover rounded-t-xl"
                    controls
                    autoPlay
                    src={video.videoSrc}
                  >
                    Tu navegador no soporta la reproducción de video.
                  </video>
                ) : (
                  <div className="w-full h-full bg-gradient-to-t from-black/80 via-black/20 to-black/40 rounded-t-xl flex items-center justify-center">
                    <motion.div
                      className="bg-primary/90 text-white rounded-full p-4"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </motion.div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-800">{video.name}</h4>
                <p className="text-sm text-gray-600">{video.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
