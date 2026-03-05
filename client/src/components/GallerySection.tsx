import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X } from "lucide-react";

// Import gallery images
import galeria1 from "@assets/galeria_1_1754327523215.png";
import galeria2 from "@assets/galeria_2_1754327523220.png";
import galeria3 from "@assets/galeria_3_1754327523217.png";
import galeria4 from "@assets/galeria_4_1754327523218.png";
import galeria5 from "@assets/galeria_5_1754327523219.png";
import galeria6 from "@assets/galeria_6_1754327523217.png";

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: galeria1,
      alt: "Sesión de capacitación empresarial en sala de conferencias",
      title: "Capacitación Empresarial"
    },
    {
      src: galeria2,
      alt: "Grupo de participantes al final del curso de liderazgo",
      title: "Curso de Liderazgo"
    },
    {
      src: galeria3,
      alt: "Foto grupal con participantes del programa de neuroventas",
      title: "Programa de Neuroventas"
    },
    {
      src: galeria4,
      alt: "Presentación magistral sobre técnicas de ventas",
      title: "Conferencia de Ventas"
    },
    {
      src: galeria5,
      alt: "Taller interactivo de desarrollo personal y ventas",
      title: "Taller de Desarrollo"
    },
    {
      src: galeria6,
      alt: "Sesión práctica con ejercicios de role-play",
      title: "Sesión Práctica"
    }
  ];

  return (
    <section id="galeria" className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mb-4">
            Galería de <span className="text-primary">Experiencias</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Momentos capturados durante nuestros cursos, talleres y conferencias. 
            Descubre el ambiente de aprendizaje y crecimiento que vivimos juntos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                        <i className="fas fa-search-plus text-2xl mb-2"></i>
                        <p className="font-semibold">{image.title}</p>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0">
                  <DialogTitle className="sr-only">{image.title}</DialogTitle>
                  <DialogDescription className="sr-only">{image.alt}</DialogDescription>
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                      <h3 className="font-semibold text-lg">{image.title}</h3>
                      <p className="text-sm text-gray-200">{image.alt}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary/10 rounded-full p-3">
                <i className="fas fa-camera text-primary text-2xl"></i>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ¿Quieres ser parte de la próxima galería?
            </h3>
            <p className="text-gray-600 mb-6">
              Únete a nuestros cursos y vive la experiencia de transformación que han vivido 
              más de 5000 alumnos satisfechos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#cursos"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300"
              >
                <i className="fas fa-graduation-cap mr-2"></i>
                Ver Cursos Disponibles
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <i className="fas fa-envelope mr-2"></i>
                Solicitar Información
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;