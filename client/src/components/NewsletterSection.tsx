import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/newsletter', { name, email });
      
      toast({
        title: "¡Suscripción exitosa!",
        description: "Gracias por suscribirte a nuestra newsletter"
      });
      
      setName('');
      setEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo completar tu suscripción. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 md:p-10 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-10">
              <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-4">
                Suscríbete a nuestra newsletter
              </h2>
              <p className="text-gray-600 mb-4">
                Recibe consejos semanales, recursos gratuitos y ofertas exclusivas directamente en tu correo.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Tips de ventas aplicables de inmediato</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Recursos y plantillas descargables</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>Descuentos exclusivos en cursos</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-3" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Procesando..." : "Suscribirme ahora"}
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  No hacemos spam. Puedes darte de baja en cualquier momento.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
