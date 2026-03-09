import { Button } from "./ui/button";

export default function ActionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Imagen */}
        <div className="w-full md:w-1/2">
          <img 
            src="/assets/tu-imagen.jpg" 
            alt="Acción" 
            className="rounded-2xl shadow-xl w-full object-cover"
          />
        </div>
        {/* Contenido y Botones */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-6">Impulsa tu éxito hoy</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button className="bg-blue-600 px-6 py-4">Ver Cursos</Button>
            <Button variant="outline" className="px-6 py-4">Asesoría</Button>
            <Button variant="ghost" className="px-6 py-4">Saber Más</Button>
          </div>
        </div>
      </div>
    </section>
  );
}