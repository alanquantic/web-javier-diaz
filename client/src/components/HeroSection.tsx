import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section id="inicio" className="gradient-bg text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:space-x-8 lg:space-x-12">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat leading-tight mb-4">
              Multiplica tus Ventas. <span className="text-yellow-300">Lidera tu Vida.</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              Aprende a cerrar más, dominar tu proceso comercial y convertirte en el líder que siempre has querido ser.
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-10 rounded-lg mb-8 border border-white/20">
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-3 mr-6 mt-1">
                  <i className="fas fa-user-tie text-white"></i>
                </div>
                <div>
                  <p className="text-lg mb-3 leading-relaxed">
                    ¡Hola! Soy Javier Díaz, Entrenador Certificado en Neuroventas y Coach de Liderazgo. He enseñado a más de{" "}
                    <span className="font-bold text-yellow-300">5000 alumnos</span> a aumentar sus ventas y mejorar su vida.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button variant="destructive" size="xl" asChild>
                <a href="#cursos">
                  <i className="fas fa-rocket mr-2"></i> Empieza Ahora
                </a>
              </Button>
              <Button variant="white" size="xl" asChild>
                <a href="#contacto">
                  <i className="fas fa-headset mr-2"></i> Contáctame
                </a>
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -top-8 -left-8 bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center"
                animate={{
                  rotate: [12, -5, 12],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <span className="font-bold text-black text-sm text-center leading-tight">+5000<br/>alumnos</span>
              </motion.div>
              <img 
                src="/galeria_3.png" 
                alt="Entrenamiento de ventas con Javier Díaz" 
                className="rounded-xl shadow-2xl w-full object-cover" 
                style={{ height: "500px" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
