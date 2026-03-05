import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ClientsCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 3 }
    }
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const clients = [
    { id: 1, name: "Vitro Hogar", logo: "/1_1755120479070.webp" },
    { id: 2, name: "Super Pollo", logo: "/2_1755120479071.webp" },
    { id: 3, name: "Funeraria Carrillo", logo: "/3_1755120479067.webp" },
    { id: 4, name: "Peekon", logo: "/4_1755122411696.webp" },
    { id: 5, name: "La Huerta", logo: "/5_1755120479069.webp" },
    { id: 6, name: "Universidad Panamericana", logo: "/6_1755120479068.webp" },
    { id: 7, name: "Rotary Club", logo: "/7_1755120479056.webp" },
    { id: 8, name: "Deco Garden", logo: "/9_1755120479072.webp" },
    { id: 9, name: "HESA", logo: "/10_1755120479063.webp" },
    { id: 10, name: "Electro Urquiza", logo: "/11_1755122411695.webp" },
    { id: 11, name: "Dilusa", logo: "/12_1755120479067.webp" },
    { id: 12, name: "Tecnológico de Monterrey", logo: "/13_1755120479058.webp" },
    { id: 13, name: "Ford Country", logo: "/14_1755122411691.webp" },
    { id: 14, name: "SoniGas", logo: "/15_1755122411686.webp" },
    { id: 15, name: "Soft Restaurant", logo: "/16_1755120479066.webp" },
    { id: 16, name: "Inmobiliaria PHG", logo: "/18_1755120479065.webp" },
    { id: 17, name: "Mesón del Taco", logo: "/19_1755120479066.webp" },
    { id: 18, name: "Cliente Premium", logo: "/20_1755122411679.webp" },
    { id: 19, name: "Triana", logo: "/21_1755120479068.webp" },
    { id: 20, name: "9 Three", logo: "/22_1755120479062.webp" },
    { id: 21, name: "MTEP", logo: "/23_1755120479061.webp" },
    { id: 22, name: "Impulsa", logo: "/24_1755120479060.webp" },
    { id: 23, name: "G&A", logo: "/25_1755120479060.webp" },
    { id: 24, name: "Genesys Contractors", logo: "/26_1755120479059.webp" }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Auto scroll functionality
  useEffect(() => {
    if (!emblaApi) return;
    
    const autoScroll = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    const stopAutoScrollOnInteraction = () => {
      clearInterval(autoScroll);
    };

    emblaApi.on('pointerDown', stopAutoScrollOnInteraction);
    
    return () => {
      clearInterval(autoScroll);
    };
  }, [emblaApi]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Clientes que <span className="text-blue-600">Confían</span> en Nosotros
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empresas líderes que han transformado sus equipos de ventas con nuestros programas de capacitación
          </p>
        </motion.div>

        <motion.div 
          className="relative max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Navigation buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full bg-white shadow-lg hover:shadow-xl border-gray-200 hover:border-blue-300"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full bg-white shadow-lg hover:shadow-xl border-gray-200 hover:border-blue-300"
              onClick={scrollNext}
              disabled={!canScrollNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {clients.map((client) => (
                <div key={client.id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_33.333%] px-4">
                  <motion.div 
                    className="bg-gray-50 rounded-2xl p-8 h-40 flex items-center justify-center group hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)" 
                    }}
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-20 max-w-full object-contain transition-all duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.setAttribute('style', 'display: block');
                      }}
                    />
                    <div className="text-gray-400 font-semibold hidden">
                      {client.name}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(clients.length / 3) }).map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 hover:bg-blue-600 transition-colors duration-200"
                onClick={() => emblaApi?.scrollTo(index * 3)}
              />
            ))}
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default ClientsCarousel;