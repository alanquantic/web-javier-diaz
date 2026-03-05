import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cómo sé que este entrenamiento realmente me ayudará a vender más?",
    answer: "Método probado con más de 3,000 vendedores. Estrategias validadas, resultados medibles y herramientas aplicables desde el primer día."
  },
  {
    question: "¿Funciona para cualquier tipo de producto o servicio?",
    answer: "Absolutamente. Nuestras técnicas son adaptables a cualquier industria, desde bienes raíces hasta software, productos físicos o servicios profesionales."
  },
  {
    question: "¿Necesito experiencia previa en ventas?",
    answer: "No. Tenemos cursos para todos los niveles, desde principiantes absolutos hasta vendedores experimentados que quieren perfeccionar sus técnicas."
  },
  {
    question: "¿Cuánto tiempo necesito dedicar a los cursos?",
    answer: "Cada curso requiere entre 3-5 horas semanales para obtener los mejores resultados. El contenido está diseñado para ser práctico y aplicable de inmediato."
  },
  {
    question: "¿Qué pasa si después de tomar el curso no veo mejoras en mis ventas?",
    answer: "Implementación garantizada con resultados medibles. Si aplicas las estrategias correctamente, verás cambios en tus cierres. Además, ofrecemos seguimiento y ajustes en tu proceso para asegurarnos de que cada técnica se traduzca en más ventas."
  },
  {
    question: "¿Ofrecen seguimiento o asesoría después del curso?",
    answer: "Dependiendo del plan que elijas, puedes acceder a asesoría personalizada y sesiones de ajuste. No solo aprendes, sino que te acompañamos en la implementación para maximizar tu éxito."
  }
];

const FAQSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            ¿Tienes Dudas? <span className="text-primary">Aquí están las Respuestas</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Respondemos a las preguntas más frecuentes para que puedas tomar una decisión informada.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="mb-12">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-xl font-bold text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pl-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <motion.div 
          className="bg-white p-8 rounded-xl shadow-md mt-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-4 text-center">¿No encuentras respuesta a tu pregunta?</h3>
          <p className="text-gray-600 text-center mb-6">Contáctanos directamente y te responderemos a la brevedad.</p>
          <div className="text-center">
            <Button size="lg" asChild>
              <a href="#contacto">
                <i className="fas fa-question-circle mr-2"></i> Hacer una pregunta
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
