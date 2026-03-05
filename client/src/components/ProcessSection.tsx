import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Selecciona tu curso o servicio",
    description: "Explora nuestro catálogo y elige la opción que mejor se adapte a tus necesidades.",
  },
  {
    number: 2,
    title: "Completa tu información y pago",
    description: "Proceso seguro y rápido con múltiples métodos de pago disponibles.",
  },
  {
    number: 3,
    title: "Agenda tu cita de coaching",
    description: "Recibirás respuesta en 3 días para comenzar tu proceso de formación.",
  },
];

const ProcessSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Proceso de Compra en <span className="text-primary">3 Pasos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Simplificamos tu experiencia para que puedas empezar a mejorar tus habilidades de venta lo antes posible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-xl p-8 text-center relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white font-bold text-xl">{step.number}</span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 left-full w-16 h-4 transform -translate-x-8">
                  <ArrowRight className="text-primary h-8 w-8" />
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
