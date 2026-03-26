import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";
import libroCover from "@assets/Libro Javier Diaz.jpg";

const purchaseLinks = [
  { label: "Amazon — Libro", href: "https://a.co/d/0a1Y3Q3i" },
  { label: "Amazon — Libro digital", href: "https://a.co/d/0ipkwBmd" },
  { label: "Apple Books — Libro digital", href: "https://books.apple.com/mx/book/t%C3%BA-no-eres-una-buena-persona/id6759020068" },
  { label: "Google Play", href: "https://play.google.com/store/books/details?id=aNS8EQAAQBAJ" },
] as const;

const BookPromoSection: React.FC = () => {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            className="w-full lg:w-5/12 shrink-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="max-w-sm mx-auto lg:mx-0">
              <img
                src={libroCover}
                alt="Portada del libro Tú no eres una buena persona, de Javier Díaz"
                className="w-full max-h-[min(70vh,520px)] rounded-xl shadow-2xl object-contain mx-auto"
              />
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-7/12"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" />
              Nuevo libro
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mb-2">
              Tú no eres una{" "}
              <span className="text-primary">buena persona</span>
            </h2>
            <p className="text-sm text-gray-500 mb-6">Javier Díaz</p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Muchas veces y sin darnos cuenta, dependemos de lo que terceros puedan decir e ignoramos algo esencial: la autoestima y el autoconocimiento. Como respuesta a ello ha nacido esta obra donde su autor, Javier Díaz, experto en desarrollo personal, busca derribar mitos y juicios sobre lo que otros nos han hecho pensar de nosotros mismos.
            </p>
            <p className="text-sm font-semibold text-gray-800 mb-4">
              Consíguelo en:
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              {purchaseLinks.map(({ label, href }) => (
                <Button key={href} variant="border" size="lg" className="w-full sm:w-auto" asChild>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                    <ExternalLink className="ml-2 h-4 w-4 opacity-80" aria-hidden />
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookPromoSection;
