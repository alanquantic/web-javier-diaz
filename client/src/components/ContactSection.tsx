// He añadido useRef a tu importación de React
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, type ReactNode } from "react"; // --- MODIFICADO ---
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ReCAPTCHA from "react-google-recaptcha"; // --- NUEVO ---

const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // --- NUEVO (Paso 1): Crear la referencia para reCAPTCHA ---
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast({
        title: "Campos obligatorios",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    // --- NUEVO (Paso 2): Obtener y validar el token de reCAPTCHA ---
    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
        toast({
            title: "Verificación requerida",
            description: "Por favor, verifica que no eres un robot.",
            variant: "destructive"
        });
        return;
    }

    setIsSubmitting(true);

    try {
      // --- MODIFICADO: Añadir el token al objeto que se envía ---
      await apiRequest('POST', '/api/contact', { 
        name, 
        email, 
        subject, 
        message,
        'g-recaptcha-response': recaptchaToken // El backend lo recibirá aquí
      });

      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Te responderemos pronto."
      });

      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      // --- NUEVO (Paso 3): Resetear el reCAPTCHA después de enviar ---
      recaptchaRef.current?.reset();

    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar tu mensaje. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Título principal */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Contáctame <span className="text-blue-600">Aquí</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ¿Tienes preguntas o necesitas asesoramiento personalizado? Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-8">
          {/* Columna izquierda - Información de contacto */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6">Información de contacto</h3>
              
              {/* Dirección */}
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-white"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Dirección</h4>
                  <p className="text-gray-600">Av. Aguascalientes Nte 613, Parras, 20157 Aguascalientes, Ags.</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-envelope text-white"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">javier@javierdiaz.com.mx</p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-phone text-white"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Teléfono</h4>
                  <p className="text-gray-600">+52 449 186 6213</p>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6">Síguenos en redes sociales</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* Botón WhatsApp */}
            <div className="w-full">
              <a href="https://wa.me/5214491866213" target="_blank" rel="noopener noreferrer" className="w-full bg-green-500 text-white py-4 px-6 rounded-lg flex items-center justify-center font-semibold hover:bg-green-600 transition-colors">
                <i className="fab fa-whatsapp mr-2 text-xl"></i>
                Contáctanos por WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Columna derecha - Formulario */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300" onSubmit={handleSubmit}>
              <h3 className="text-2xl font-bold mb-6">Envíame un mensaje</h3>

              {/* Fila de Nombre y Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full"
                    required
                  />
                </div>
              </div>

              {/* Asunto */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Asunto</label>
                <Input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Asunto de tu mensaje"
                  className="w-full"
                />
              </div>

              {/* Mensaje */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="¿En qué podemos ayudarte?"
                  className="w-full min-h-[120px]"
                  required
                />
              </div>

              {/* reCAPTCHA */}
              <div className="mb-6 flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LdqKJ8rAAAAACpzu3OPpHnYR9gdNvhqVMrUdpJR"
                />
              </div>

              {/* Botón de enviar */}
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 transition-all duration-300 hover:shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-paper-plane mr-2"></i> Enviar mensaje
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;