import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 gradient-bg text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            ¿Buscas empleo o mejores oportunidades?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Accede a nuestra bolsa de trabajo y conecta con empresas para encontrar trabajo más rápido y colocarte en el mercado laboral.
          </p>
          <div className="flex justify-center">
            <Button variant="white" size="xl" asChild>
              <a href="#contacto">
                Solicitar información
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
