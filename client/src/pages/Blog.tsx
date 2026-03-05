import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Download, Search, Filter } from "lucide-react";
import { formatDate } from "@/lib/utils";
import ShareButtons from "@/components/ShareButtons";
import ContactFormModal from "@/components/modals/ContactFormModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BlogPostSchemas, OrganizationSchema } from "@/components/SEOSchemas";

const blogPosts = [
  {
    image: "/diez_miedos_que_todo_vendedor_enfrenta_y_nadie_se_atreve_a_contar_1749740862170.webp",
    date: "2025-01-15",
    category: "Psicología",
    categoryColor: "blue",
    title: "Diez miedos que todo vendedor enfrenta (y nadie se atreve a contar)",
    description: "Los temores reales que enfrentamos en ventas y cómo empezar a superarlos para transformar tu carrera comercial."
  },
  {
    image: "/inteligencia_artificial_y_el_futuro_de_las_ventas_estas_preparado_1749740862170.webp",
    date: "2025-01-12",
    category: "Tecnología",
    categoryColor: "purple",
    title: "Inteligencia Artificial y el futuro de las ventas: ¿Estás preparado?",
    description: "Cómo la IA está revolucionando el panorama comercial y las claves para mantenerte competitivo."
  },
  {
    image: "/3_tecnicas_cierre_para_vender_mas_1749740862161.webp",
    date: "2025-01-10",
    category: "Técnicas",
    categoryColor: "green",
    title: "3 técnicas de cierre para vender más",
    description: "Estrategias probadas para reducir el tiempo de decisión del cliente y aumentar tus ventas."
  },
  {
    image: "/5_consejos_para_vender_mas_con_whatsapp_1749740862165.webp",
    date: "2025-01-08",
    category: "Digital",
    categoryColor: "green",
    title: "5 consejos para vender más con WhatsApp",
    description: "Maximiza tus ventas usando WhatsApp de manera efectiva y profesional con estos consejos clave."
  },
  {
    image: "/5_tips_para_vender_mas_en_menos_tiempo_1749740862166.webp",
    date: "2025-01-05",
    category: "Productividad",
    categoryColor: "orange",
    title: "5 tips para vender más en menos tiempo",
    description: "Optimiza tu proceso comercial y aumenta tu efectividad con estas estrategias de eficiencia."
  },
  {
    image: "/como_hacer_mas_ventas_a_la_hora_de_emprender_1749740862166.webp",
    date: "2025-01-03",
    category: "Emprendimiento",
    categoryColor: "blue",
    title: "Cómo hacer más ventas a la hora de emprender",
    description: "Estrategias específicas para emprendedores que buscan maximizar sus ventas desde el inicio."
  },
  {
    image: "/como_mejorar_tus_resultados_en_ventas_el_poder_del_enfoque_1749740862167.webp",
    date: "2025-01-01",
    category: "Mentalidad",
    categoryColor: "purple",
    title: "Cómo mejorar tus resultados en ventas: El poder del enfoque",
    description: "Descubre cómo el enfoque mental y las metas claras pueden transformar completamente tus resultados."
  },
  {
    image: "/como_superar_las_objeciones_mas_comunes_en_ventas_1749740862167.webp",
    date: "2024-12-28",
    category: "Técnicas",
    categoryColor: "red",
    title: "Cómo superar las objeciones más comunes en ventas",
    description: "Las 5 objeciones más frecuentes en ventas B2B y cómo convertirlas en oportunidades de cierre."
  },
  {
    image: "/consejos_para_maximizar_el_poder_del_precio_en_las_ventas_1749740862169.webp",
    date: "2024-12-25",
    category: "Estrategia",
    categoryColor: "yellow",
    title: "Consejos para maximizar el poder del precio en las ventas",
    description: "Cómo establecer precios estratégicos que maximicen tus ganancias sin perder competitividad."
  },
  {
    image: "/consideraciones_importantes_de_los_grandes_vendedores_1749740862169.webp",
    date: "2024-12-22",
    category: "Liderazgo",
    categoryColor: "blue",
    title: "Consideraciones importantes de los grandes vendedores",
    description: "Las mejores prácticas que los vendedores más exitosos enseñan para acortar el proceso de ventas."
  },
  {
    image: "/convierte_tu_producto_o_servicio_en_unico_para_tus_clientes_1749740862170.webp",
    date: "2024-12-20",
    category: "Diferenciación",
    categoryColor: "purple",
    title: "Convierte tu producto o servicio en único para tus clientes",
    description: "Estrategias para diferenciarte en un mercado competitivo y crear valor genuino para tus clientes."
  },
  {
    image: "/dominar_el_juego_comercial_estrategias_para_lideres_visionarios_1749740862170.webp",
    date: "2024-12-18",
    category: "Liderazgo",
    categoryColor: "red",
    title: "Dominar el juego comercial: estrategias para líderes visionarios",
    description: "Insights de directores comerciales de grandes marcas mexicanas sobre el éxito comercial empresarial."
  },
  {
    image: "/los_5_errores_mas_comunes_de_un_vendedor_profesional_1749740862170.webp",
    date: "2024-12-15",
    category: "Errores",
    categoryColor: "red",
    title: "Los 5 errores más comunes de un vendedor profesional",
    description: "Evita estos errores frecuentes que rompen la relación a largo plazo con tus clientes."
  },
  {
    image: "/las_objeciones_oportunidades_para_vender_mas_1749740862170.webp",
    date: "2024-12-12",
    category: "Técnicas",
    categoryColor: "blue",
    title: "Las objeciones, oportunidades para vender más",
    description: "Convierte las objeciones de tus clientes en oportunidades de ventas futuras y relaciones duraderas."
  },
  {
    image: "/los_principales_retos_de_los_directores_de_ventas_1749740862171.webp",
    date: "2024-12-10",
    category: "Liderazgo",
    categoryColor: "purple",
    title: "Los principales retos de los directores de ventas",
    description: "Desafíos comunes que enfrentan los líderes comerciales y estrategias para superarlos efectivamente."
  },
  {
    image: "/networking_estrategia_para_vender_mas_y_crecer_1749740862171.webp",
    date: "2024-12-08",
    category: "Networking",
    categoryColor: "green",
    title: "Networking: Estrategia para vender más y crecer",
    description: "Cómo crear redes de contacto efectivas para agilizar la prospección y cerrar más negocios."
  },
  {
    image: "/por_que_es_tan_importante_saber_vender_1749740862171.webp",
    date: "2024-12-05",
    category: "Fundamentos",
    categoryColor: "blue",
    title: "¿Por qué es tan importante saber vender?",
    description: "La importancia fundamental de las ventas en cualquier empresa y en el desarrollo personal profesional."
  },
  {
    image: "/que_hacer_cuando_los_clientes_ya_no_te_contestan_1749740862172.webp",
    date: "2024-12-03",
    category: "Seguimiento",
    categoryColor: "orange",
    title: "Qué hacer cuando los clientes ya no te contestan",
    description: "Estrategias efectivas para reactivar clientes que han dejado de responder a tus comunicaciones."
  }
];

const categories = ["Todos", ...Array.from(new Set(blogPosts.map(post => post.category)))];

const Blog: React.FC = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <OrganizationSchema />
      <BlogPostSchemas posts={blogPosts} />
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0B4CAF] to-[#1E3A8A] py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">
              Blog de <span className="text-[#E51A00]">Ventas</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Descubre estrategias, técnicas y secretos de los vendedores más exitosos para transformar tu carrera comercial
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B4CAF] focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-[#0B4CAF] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => {
                  const slug = post.title.toLowerCase()
                    .replace(/[^a-z0-9\s]/g, '') // Remove special characters but keep spaces
                    .replace(/\s+/g, '-') // Replace spaces with hyphens
                    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
                    .replace(/-+/g, '-'); // Replace multiple hyphens with single
                  window.location.href = `/blog/${slug}`;
                }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-${post.categoryColor}-500`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-3 text-gray-900 group-hover:text-[#0B4CAF] transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 text-[#0B4CAF] hover:text-[#E51A00] transition-colors font-medium">
                      Leer más <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <ShareButtons 
                      title={post.title}
                      description={post.description}
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron artículos con los filtros seleccionados.</p>
            </div>
          )}

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button 
              onClick={() => setIsDownloadModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#E51A00] text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              Descarga Nuestro eBook Gratuito
            </button>
          </motion.div>

          <ContactFormModal
            open={isDownloadModalOpen}
            onOpenChange={setIsDownloadModalOpen}
            title="Descarga tu eBook Gratuito"
            description="Recibe estrategias avanzadas de ventas directamente en tu email"
            type="download"
          />
        </div>
      </section>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;