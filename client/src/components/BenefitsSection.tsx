import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const benefits = [
  "Incremento de ventas hasta un 30% en el primer año.",
  "Métodos probados con más de 5,000 vendedores capacitados.",
  "Entrenamiento basado en neuroventas y persuasión efectiva.",
  "Implementación inmediata de estrategias prácticas.",
  "Capacitación flexible y adaptable a cualquier industria.",
  "Acceso a seguimiento y asesoría personalizada.",
  "Te ayudamos a encontrar empleo.",
];

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6">
              Beneficios de <span className="text-primary">Nuestros Servicios</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Nuestro enfoque se basa en entregar resultados medibles y transformar tu capacidad de venta con estrategias probadas.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-green-500 rounded-full p-1 mr-3 mt-1 flex items-center justify-center w-6 h-6">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span dangerouslySetInnerHTML={{ __html: benefit.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" 
              alt="Beneficios de nuestros servicios" 
              className="rounded-xl shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
