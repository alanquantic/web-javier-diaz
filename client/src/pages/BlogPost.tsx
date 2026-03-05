import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useRoute } from "wouter";
import ShareButtons from "@/components/ShareButtons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
// import { SEOSchemas } from "@/components/SEOSchemas";

// COMPLETE BLOG POSTS DATA - All articles from the blog with full content
const blogPosts = [
  {
    image: "/diez_miedos_que_todo_vendedor_enfrenta_y_nadie_se_atreve_a_contar_1749740862170.webp",
    title: "Diez miedos que todo vendedor enfrenta (y nadie se atreve a contar)",
    category: "Psicología",
    categoryColor: "blue",
    date: "2025-01-15",
    readTime: "8 min",
    description: "Los temores reales que enfrentamos en ventas y cómo empezar a superarlos para transformar tu carrera comercial.",
    content: `<h2>Los Miedos Más Comunes en las Ventas</h2><p>En el mundo de las ventas, existen miedos universales que afectan tanto a vendedores novatos como experimentados. Reconocer estos miedos es el primer paso para superarlos.</p><h3>1. Miedo al Rechazo</h3><p>El miedo al rechazo es probablemente el más común. Muchos vendedores evitan hacer llamadas o presentaciones por temor a escuchar un "no".</p><h3>2. Miedo a No Ser Suficiente</h3><p>La inseguridad sobre nuestras habilidades puede paralizarnos. Es importante recordar que la confianza se construye con práctica y preparación.</p><h3>3. Miedo al Fracaso</h3><p>El temor a no alcanzar las metas puede crear ansiedad paralizante. La clave está en ver cada "no" como un paso más cerca del "sí".</p><h3>Estrategias para Superar los Miedos</h3><ul><li>Preparación exhaustiva antes de cada presentación</li><li>Práctica constante de técnicas de venta</li><li>Desarrollo de una mentalidad de crecimiento</li><li>Celebración de pequeños logros</li><li>Apoyo y mentoría de vendedores experimentados</li></ul><p>Recuerda: el miedo es natural, pero no debe controlarte. Con las estrategias correctas, puedes convertir tus miedos en fortalezas.</p>`
  },
  {
    image: "/inteligencia_artificial_y_el_futuro_de_las_ventas_estas_preparado_1749740862170.webp",
    title: "Inteligencia Artificial y el futuro de las ventas: ¿Estás preparado?",
    category: "Tecnología",
    categoryColor: "purple",
    date: "2025-01-12",
    readTime: "10 min",
    description: "Cómo la IA está revolucionando el panorama comercial y las claves para mantenerte competitivo.",
    content: `<h2>La Revolución de la Inteligencia Artificial en Ventas</h2><p>La inteligencia artificial está transformando radicalmente el mundo de las ventas, creando nuevas oportunidades y desafíos para los profesionales del sector.</p><h3>Cómo la IA está Cambiando las Ventas</h3><ul><li>Automatización de tareas repetitivas</li><li>Análisis predictivo de comportamiento del cliente</li><li>Personalización masiva de comunicaciones</li><li>Optimización de rutas y territorios</li><li>Scoring automático de leads</li></ul><h3>Herramientas de IA para Vendedores</h3><p><strong>CRM Inteligente:</strong> Sistemas que aprenden de tus patrones y sugieren próximos pasos.</p><p><strong>Chatbots Avanzados:</strong> Asistentes que califican leads 24/7 y programan reuniones.</p><p><strong>Análisis de Conversaciones:</strong> IA que analiza llamadas para identificar patrones de éxito.</p><h3>Adaptándose al Futuro</h3><p>Los vendedores exitosos del futuro serán aquellos que combinen la tecnología con habilidades humanas irreemplazables como la empatía, la creatividad y el pensamiento estratégico.</p><p>La clave no es competir contra la IA, sino aprender a trabajar con ella para multiplicar tu efectividad.</p>`
  },
  {
    image: "/3_tecnicas_cierre_para_vender_mas_1749740862161.webp",
    title: "3 técnicas de cierre para vender más",
    category: "Técnicas",
    categoryColor: "green",
    date: "2025-01-09",
    readTime: "6 min",
    description: "Estrategias probadas para reducir el tiempo de decisión del cliente y aumentar tus ventas.",
    content: `<h2>Las 3 Técnicas de Cierre Más Efectivas</h2><p>El momento del cierre es crucial en cualquier proceso de venta. Estas tres técnicas han demostrado ser extraordinariamente efectivas.</p><h3>1. Cierre por Asunción</h3><p>Actúa como si el cliente ya hubiera decidido comprar. En lugar de preguntar "¿quiere comprarlo?", pregunta "¿prefiere la entrega el lunes o el martes?"</p><h3>2. Cierre por Alternativa</h3><p>Ofrece dos opciones donde ambas implican la compra: "¿Prefiere el paquete básico o el premium?" Esto facilita la decisión al cliente.</p><h3>3. Cierre por Urgencia</h3><p>Crea una razón legítima para actuar ahora: "Esta promoción termina el viernes" o "Solo me quedan 2 unidades en stock".</p><h3>Cuándo Usar Cada Técnica</h3><p><strong>Cierre por Asunción:</strong> Cuando el cliente ha mostrado múltiples señales de compra.</p><p><strong>Cierre por Alternativa:</strong> Cuando el cliente está indeciso entre opciones.</p><p><strong>Cierre por Urgencia:</strong> Cuando el cliente está convencido pero procrastina la decisión.</p><p>Recuerda: el mejor cierre es aquel que surge naturalmente de una presentación bien estructurada.</p>`
  },
  {
    image: "/5_consejos_para_vender_mas_con_whatsapp_1749740862165.webp",
    title: "5 consejos para vender más con WhatsApp",
    category: "Digital",
    categoryColor: "green",
    date: "2025-01-07",
    readTime: "5 min",
    description: "Maximiza tus ventas usando WhatsApp de manera efectiva y profesional con estos consejos clave.",
    content: `<h2>WhatsApp: Tu Herramienta de Ventas Más Poderosa</h2><p>WhatsApp se ha convertido en una herramienta indispensable para las ventas modernas. Aprende a usarla profesionalmente.</p><h3>1. Crea un Perfil Profesional</h3><p>Tu foto de perfil debe ser profesional, tu estado debe comunicar tu propuesta de valor, y tu nombre debe ser claro y reconocible.</p><h3>2. Usa WhatsApp Business</h3><p>Las funciones de catálogo, respuestas automáticas y etiquetas te permitirán gestionar mejor tus conversaciones de venta.</p><h3>3. Personaliza Cada Mensaje</h3><p>Evita los mensajes genéricos. Menciona el nombre del cliente y referencia conversaciones previas para crear conexión.</p><h3>4. Aprovecha los Medios</h3><p>Las imágenes, videos y notas de voz pueden explicar mejor tu producto que mil palabras. Úsalos estratégicamente.</p><h3>5. Establece Horarios Profesionales</h3><p>Comunica claramente tus horarios de atención y respeta los tiempos del cliente. La disponibilidad 24/7 no es profesional.</p><h3>Errores a Evitar</h3><ul><li>Enviar mensajes a horas inapropiadas</li><li>Agregar personas a grupos sin permiso</li><li>Usar un lenguaje demasiado informal</li><li>No usar las funciones de WhatsApp Business</li></ul><p>WhatsApp bien usado puede aumentar significativamente tus conversiones y mejorar la experiencia del cliente.</p>`
  },
  {
    image: "/5_tips_para_vender_mas_en_menos_tiempo_1749740862166.webp",
    title: "5 tips para vender más en menos tiempo",
    category: "Productividad",
    categoryColor: "orange",
    date: "2025-01-05",
    readTime: "7 min",
    description: "Optimiza tu proceso comercial y aumenta tu efectividad con estas estrategias de eficiencia.",
    content: `<h2>Maximiza tu Productividad en Ventas</h2><p>El tiempo es el recurso más valioso de un vendedor. Estos 5 tips te ayudarán a vender más en menos tiempo.</p><h3>1. Califica Mejor a tus Prospectos</h3><p>Usa el método BANT (Budget, Authority, Need, Timeline) para enfocar tu tiempo solo en leads calificados.</p><h3>2. Automatiza Tareas Repetitivas</h3><p>Usa herramientas CRM para automatizar seguimientos, recordatorios y reportes básicos.</p><h3>3. Prepara Templates Personalizables</h3><p>Crea plantillas de emails, propuestas y presentaciones que puedas personalizar rápidamente.</p><h3>4. Bloquea Tiempo para Prospección</h3><p>Dedica bloques específicos del día exclusivamente a prospección sin interrupciones.</p><h3>5. Mide y Optimiza tu Embudo</h3><p>Identifica dónde pierdes más tiempo y optimiza esos puntos específicos del proceso.</p><p>La eficiencia en ventas no es trabajar más horas, sino trabajar de manera más inteligente.</p>`
  },
  {
    image: "/como_hacer_mas_ventas_a_la_hora_de_emprender_1749740862166.webp",
    title: "Cómo hacer más ventas a la hora de emprender",
    category: "Emprendimiento",
    categoryColor: "blue",
    date: "2025-01-03",
    readTime: "8 min",
    description: "Estrategias específicas para emprendedores que buscan maximizar sus ventas desde el inicio.",
    content: `<h2>Ventas para Emprendedores: De Cero a Facturación</h2><p>Emprender requiere habilidades de venta desde el día uno. Estos consejos te ayudarán a generar ingresos rápidamente.</p><h3>1. Valida tu Mercado Antes de Invertir</h3><p>Vende antes de producir. Usa pre-órdenes, MVP o landing pages para validar demanda real.</p><h3>2. Enfócate en el Primer Cliente</h3><p>No trates de vender a todos. Encuentra tu primer cliente ideal y entiende exactamente qué valora.</p><h3>3. Usa tu Red Personal</h3><p>Tus primeras ventas probablemente vendrán de contactos existentes. No subestimes el poder del networking.</p><h3>4. Sé Ágil en Precios y Ofertas</h3><p>Como emprendedor puedes ajustar precios y crear ofertas especiales más rápido que las grandes empresas.</p><h3>5. Documenta todo tu Proceso</h3><p>Desde el primer cliente, documenta qué funciona para poder replicarlo y escalarlo.</p><p>El emprendimiento exitoso combina visión a largo plazo con ejecución táctica en ventas.</p>`
  },
  {
    image: "/como_mejorar_tus_resultados_en_ventas_el_poder_del_enfoque_1749740862167.webp",
    title: "Cómo mejorar tus resultados en ventas: El poder del enfoque",
    category: "Mentalidad",
    categoryColor: "purple",
    date: "2025-01-01",
    readTime: "6 min",
    description: "Descubre cómo el enfoque mental y las metas claras pueden transformar completamente tus resultados.",
    content: `<h2>El Enfoque: Tu Ventaja Competitiva en Ventas</h2><p>La diferencia entre vendedores promedio y excepcionales no son las técnicas, sino el nivel de enfoque y claridad mental.</p><h3>Define Metas Específicas y Medibles</h3><p>En lugar de "vender más", define "cerrar 5 nuevos clientes de $10,000 cada uno este trimestre".</p><h3>Elimina Distracciones</h3><p>Identifica y elimina las actividades que no contribuyen directamente a tus objetivos de venta.</p><h3>Desarrolla Rutinas Ganadoras</h3><p>Crea rutinas diarias que te pongan en el estado mental correcto para vender con confianza.</p><h3>Visualiza el Éxito</h3><p>Dedica tiempo diario a visualizar tus metas cumplidas y el proceso para llegar ahí.</p><h3>Revisa y Ajusta Constantemente</h3><p>El enfoque no es rígido. Revisa semanalmente qué está funcionando y qué necesitas ajustar.</p><p>El enfoque transformará no solo tus resultados en ventas, sino tu carrera profesional completa.</p>`
  },
  {
    image: "/como_superar_las_objeciones_mas_comunes_en_ventas_1749740862167.webp",
    title: "Cómo superar las objeciones más comunes en ventas",
    category: "Técnicas",
    categoryColor: "red",
    date: "2024-12-28",
    readTime: "9 min",
    description: "Las 5 objeciones más frecuentes en ventas B2B y cómo convertirlas en oportunidades de cierre.",
    content: `<h2>Convirtiendo Objeciones en Oportunidades</h2><p>Las objeciones no son rechazos, son señales de interés que requieren más información o clarificación.</p><h3>1. "Es muy caro"</h3><p>Respuesta: "Entiendo tu preocupación por la inversión. ¿Qué presupuesto habías considerado?" Luego enfócate en el ROI y valor a largo plazo.</p><h3>2. "No tenemos presupuesto"</h3><p>Respuesta: "¿Cuándo proyectan revisar el presupuesto?" Mantén el contacto y demuestra valor mientras tanto.</p><h3>3. "Lo tengo que consultar"</h3><p>Respuesta: "Perfecto, ¿con quién más necesitas consultarlo? ¿Te ayudo a preparar la información que necesitan?"</p><h3>4. "No es el momento"</h3><p>Respuesta: "¿Qué tendría que cambiar para que fuera el momento correcto?" Identifica triggers específicos.</p><h3>5. "Funciona bien lo que tenemos"</h3><p>Respuesta: "Me da gusto que funcione. ¿Qué los haría considerar un cambio en el futuro?"</p><h3>Técnica Universal: Feel, Felt, Found</h3><p>"Entiendo cómo te sientes, otros clientes se han sentido igual, pero han encontrado que..."</p><p>Recuerda: cada objeción es una oportunidad para demostrar valor adicional.</p>`
  },
  {
    image: "/consejos_para_maximizar_el_poder_del_precio_en_las_ventas_1749740862169.webp",
    title: "Consejos para maximizar el poder del precio en las ventas",
    category: "Estrategia",
    categoryColor: "yellow",
    date: "2024-12-25",
    readTime: "8 min",
    description: "Cómo establecer precios estratégicos que maximicen tus ganancias sin perder competitividad.",
    content: `<h2>La Psicología del Precio en Ventas</h2><p>El precio no es solo un número, es una herramienta estratégica que comunica valor y posiciona tu oferta en el mercado.</p><h3>1. Ancla el Precio Alto</h3><p>Siempre presenta primero tu opción premium. Esto hace que las otras opciones parezcan más razonables.</p><h3>2. Usa Precios Charm</h3><p>$99 se percibe significativamente más barato que $100, aunque la diferencia sea mínima.</p><h3>3. Ofrece Tres Opciones</h3><p>Básico, estándar y premium. La mayoría elegirá el del medio, que debe ser tu objetivo de margen.</p><h3>4. Enfócate en Valor, No en Costo</h3><p>No hables del precio hasta haber establecido completamente el valor que recibirán.</p><h3>5. Usa Comparaciones Favorables</h3><p>"Por menos de lo que gastas en café al mes, puedes tener..."</p><h3>6. Crea Urgencia Genuina</h3><p>Ofertas limitadas en tiempo o cantidad generan acción inmediata.</p><h3>7. Bundling Estratégico</h3><p>Agrupa productos/servicios para aumentar el ticket promedio y percepción de valor.</p><p>El precio correcto no es el más bajo, sino el que mejor comunica y entrega valor.</p>`
  },
  {
    image: "/consideraciones_importantes_de_los_grandes_vendedores_1749740862169.webp",
    title: "Consideraciones importantes de los grandes vendedores",
    category: "Liderazgo",
    categoryColor: "blue",
    date: "2024-12-22",
    readTime: "10 min",
    description: "Las mejores prácticas que los vendedores más exitosos enseñan para acortar el proceso de ventas.",
    content: `<h2>Los Secretos de los Vendedores de Elite</h2><p>Los vendedores excepcionales no nacen, se hacen. Estos son los principios que los distinguen del resto.</p><h3>Mentalidad de Servicio</h3><p>Los grandes vendedores ven cada venta como una oportunidad de resolver un problema real del cliente.</p><h3>Preparación Obsesiva</h3><p>Investigan exhaustivamente antes de cada reunión: industria, competencia, desafíos específicos, historia de la empresa.</p><h3>Escucha Activa Profunda</h3><p>Hacen más preguntas que afirmaciones. Entienden que vender es 80% escuchar y 20% hablar.</p><h3>Manejo de Emociones</h3><p>Controlan sus propias emociones y saben leer e influir en las emociones de sus clientes.</p><h3>Persistencia Inteligente</h3><p>No se rinden fácilmente, pero saben cuándo cambiar de estrategia o timing.</p><h3>Construcción de Relaciones</h3><p>Invierten en relaciones a largo plazo, no solo en transacciones de corto plazo.</p><h3>Aprendizaje Continuo</h3><p>Estudian constantemente nuevas técnicas, industrias y metodologías de venta.</p><h3>Gestión del Pipeline</h3><p>Mantienen un pipeline robusto y diversificado para reducir la presión sobre cada prospecto individual.</p><p>La excelencia en ventas es el resultado de pequeñas acciones consistentes aplicadas durante largos períodos.</p>`
  },
  {
    image: "/convierte_tu_producto_o_servicio_en_unico_para_tus_clientes_1749740862170.webp",
    title: "Convierte tu producto o servicio en único para tus clientes",
    category: "Diferenciación",
    categoryColor: "purple",
    date: "2024-12-20",
    readTime: "7 min",
    description: "Estrategias para diferenciarte en un mercado competitivo y crear valor genuino para tus clientes.",
    content: `<h2>La Importancia de la Diferenciación</h2><p>En mercados cada vez más competitivos, la diferenciación no es opcional, es esencial para la supervivencia y el crecimiento.</p><h3>¿Qué Hace Único a un Producto o Servicio?</h3><p>La unicidad no siempre viene de características técnicas. Puede surgir de:</p><ul><li>Experiencia del cliente extraordinaria</li><li>Servicio postventa excepcional</li><li>Personalización profunda</li><li>Valores de marca auténticos</li><li>Innovación constante</li></ul><h3>Estrategias de Diferenciación Efectivas</h3><p><strong>Conoce Profundamente a tu Cliente:</strong> La diferenciación real viene de entender necesidades no cubiertas del mercado.</p><p><strong>Crea una Propuesta de Valor Clara:</strong> Debe ser fácil de entender y comunicar en menos de 30 segundos.</p><p><strong>Mantén la Consistencia:</strong> Tu diferenciación debe reflejarse en cada punto de contacto con el cliente.</p><h3>Casos de Éxito</h3><p>Las empresas más exitosas no compiten en precio, compiten en valor. Estudia casos como Apple, Tesla, o Amazon para entender cómo la diferenciación impulsa el crecimiento.</p><p>Recuerda: ser único no significa ser raro, significa ser indispensable para tu mercado objetivo.</p>`
  },
  {
    image: "/dominar_el_juego_comercial_estrategias_para_lideres_visionarios_1749740862170.webp",
    title: "Dominar el juego comercial: estrategias para líderes visionarios",
    category: "Liderazgo",
    categoryColor: "red",
    date: "2024-12-18",
    readTime: "12 min",
    description: "Insights de directores comerciales de grandes marcas mexicanas sobre el éxito comercial empresarial.",
    content: `<h2>El Liderazgo Comercial en la Era Digital</h2><p>Los líderes comerciales de hoy enfrentan desafíos únicos que requieren estrategias innovadoras y una visión clara del futuro.</p><h3>Características del Líder Comercial Visionario</h3><ul><li>Pensamiento estratégico a largo plazo</li><li>Adaptabilidad a los cambios del mercado</li><li>Capacidad de inspirar y motivar equipos</li><li>Enfoque en resultados medibles</li><li>Innovación constante en procesos</li></ul><h3>Estrategias Clave para el Éxito</h3><p><strong>1. Desarrollo de Equipos de Alto Rendimiento:</strong> Invierte en la formación continua de tu equipo. Un equipo preparado es tu mayor activo.</p><p><strong>2. Implementación de Tecnología:</strong> Utiliza herramientas CRM, análisis de datos y automatización para optimizar procesos.</p><p><strong>3. Cultura de Rendimiento:</strong> Establece metas claras, métricas de seguimiento y sistemas de reconocimiento.</p><h3>El Futuro del Liderazgo Comercial</h3><p>Los líderes del futuro serán aquellos que combinen la experiencia tradicional con las nuevas tecnologías, manteniendo siempre el enfoque en las relaciones humanas.</p><p>El éxito comercial no es solo sobre números, es sobre construir equipos que crean en la misión y ejecuten con excelencia.</p>`
  },
  {
    image: "/los_5_errores_mas_comunes_de_un_vendedor_profesional_1749740862170.webp",
    title: "Los 5 errores más comunes de un vendedor profesional",
    category: "Errores",
    categoryColor: "red",
    date: "2024-12-15",
    readTime: "8 min",
    description: "Evita estos errores frecuentes que rompen la relación a largo plazo con tus clientes.",
    content: `<h2>Errores que Todo Vendedor Debe Evitar</h2><p>Incluso los vendedores experimentados pueden caer en estos errores comunes que sabotean sus resultados a largo plazo.</p><h3>1. No Escuchar Activamente</h3><p>Hablar demasiado y escuchar poco. Los clientes necesitan sentirse escuchados antes de estar listos para comprar.</p><h3>2. No Hacer Seguimiento</h3><p>El 80% de las ventas requieren 5 o más contactos, pero la mayoría de vendedores se rinde después del segundo intento.</p><h3>3. Enfocar solo en el Precio</h3><p>Competir únicamente en precio convierte tu producto en commodity y erosiona márgenes.</p><h3>4. No Calificar Prospectos</h3><p>Perder tiempo con prospects que no tienen presupuesto, autoridad o necesidad real.</p><h3>5. Prometer en Exceso</h3><p>Crear expectativas que no puedes cumplir daña la confianza y la relación a largo plazo.</p><h3>Cómo Evitar Estos Errores</h3><p>La clave está en la preparación, la disciplina y el enfoque en construir relaciones genuinas basadas en valor mutuo.</p><p>Recuerda: es mejor perder una venta que perder un cliente para siempre por no cumplir promesas.</p>`
  },
  {
    image: "/las_objeciones_oportunidades_para_vender_mas_1749740862170.webp",
    title: "Las objeciones, oportunidades para vender más",
    category: "Técnicas",
    categoryColor: "blue",
    date: "2024-12-12",
    readTime: "7 min",
    description: "Convierte las objeciones de tus clientes en oportunidades de ventas futuras y relaciones duraderas.",
    content: `<h2>Cambiando la Perspectiva sobre las Objeciones</h2><p>Las objeciones no son muros, son puertas que requieren la llave correcta para abrirse.</p><h3>Por Qué las Objeciones son Buenas Señales</h3><ul><li>Indican interés genuino en tu propuesta</li><li>Revelan las verdaderas preocupaciones del cliente</li><li>Te permiten demostrar expertise y conocimiento</li><li>Crean oportunidades para personalizar tu oferta</li></ul><h3>Estrategias para Convertir Objeciones en Oportunidades</h3><p><strong>Anticipa las Objeciones:</strong> Prepara respuestas para las 5 objeciones más comunes en tu industria.</p><p><strong>Usa la Técnica del Boomerang:</strong> Convierte la objeción en una razón para comprar.</p><p><strong>Haz Preguntas Clarificadoras:</strong> "¿Qué te hace sentir que es muy caro?" para entender la objeción real.</p><h3>Tipos de Objeciones y Respuestas</h3><p><strong>Objeciones de Precio:</strong> Enfócate en valor y ROI, no en justificar el costo.</p><p><strong>Objeciones de Tiempo:</strong> Ayuda a priorizar y muestra el costo de no actuar.</p><p><strong>Objeciones de Autoridad:</strong> Involucra a los tomadores de decisión en el proceso.</p><p>Las objeciones bien manejadas fortalecen la relación y aumentan las probabilidades de cierre.</p>`
  },
  {
    image: "/los_principales_retos_de_los_directores_de_ventas_1749740862171.webp",
    title: "Los principales retos de los directores de ventas",
    category: "Liderazgo",
    categoryColor: "purple",
    date: "2024-12-10",
    readTime: "10 min",
    description: "Desafíos comunes que enfrentan los líderes comerciales y estrategias para superarlos efectivamente.",
    content: `<h2>Navegando los Desafíos del Liderazgo Comercial</h2><p>Ser director de ventas requiere balancear múltiples responsabilidades mientras se mantienen los resultados consistentes.</p><h3>Reto 1: Gestión del Talento</h3><p>Reclutar, desarrollar y retener vendedores de alto rendimiento en un mercado competitivo por talento.</p><p><strong>Solución:</strong> Invierte en desarrollo continuo y crea un ambiente donde los vendedores puedan crecer profesionalmente.</p><h3>Reto 2: Adaptación Tecnológica</h3><p>Implementar nuevas herramientas sin interrumpir la productividad del equipo.</p><p><strong>Solución:</strong> Adopción gradual con entrenamiento intensivo y soporte continuo.</p><h3>Reto 3: Presión por Resultados</h3><p>Cumplir metas trimestrales mientras se construye crecimiento sostenible a largo plazo.</p><p><strong>Solución:</strong> Balancea métricas de actividad con métricas de resultado, enfócate en leading indicators.</p><h3>Reto 4: Cambios en el Comportamiento del Cliente</h3><p>Los clientes están más informados y el proceso de compra es más complejo.</p><p><strong>Solución:</strong> Entrena al equipo en venta consultiva y personalización avanzada.</p><p>El éxito como director de ventas requiere visión estratégica combinada con ejecución táctica diaria.</p>`
  },
  {
    image: "/networking_estrategia_para_vender_mas_y_crecer_1749740862171.webp",
    title: "Networking: Estrategia para vender más y crecer",
    category: "Networking",
    categoryColor: "green",
    date: "2024-12-08",
    readTime: "9 min",
    description: "Cómo crear redes de contacto efectivas para agilizar la prospección y cerrar más negocios.",
    content: `<h2>El Poder del Networking Estratégico</h2><p>El networking efectivo no es coleccionar tarjetas, es construir relaciones mutuamente beneficiosas que impulsen el crecimiento.</p><h3>Tipos de Networking para Vendedores</h3><p><strong>Networking Horizontal:</strong> Conexiones con otros vendedores y profesionales de tu nivel.</p><p><strong>Networking Vertical:</strong> Relaciones con personas en posiciones más altas que pueden abrir puertas.</p><p><strong>Networking de Referencia:</strong> Cultivar relaciones que generen recomendaciones constantes.</p><h3>Estrategias de Networking Efectivo</h3><p><strong>1. Da Antes de Pedir:</strong> Ofrece valor, conexiones o conocimiento antes de solicitar favores.</p><p><strong>2. Sé Genuino:</strong> Las relaciones auténticas superan las transaccionales en el largo plazo.</p><p><strong>3. Mantén Contacto Regular:</strong> Un sistema para mantenerte en la mente de tu red sin ser invasivo.</p><p><strong>4. Asiste con Propósito:</strong> Elige eventos donde estén tus prospectos ideales.</p><h3>Networking Digital</h3><p>LinkedIn, Twitter y otras plataformas permiten networking escalable cuando se usan estratégicamente.</p><p>El networking efectivo es una inversión a largo plazo que puede transformar completamente tu pipeline de ventas.</p>`
  },
  {
    image: "/por_que_es_tan_importante_saber_vender_1749740862171.webp",
    title: "¿Por qué es tan importante saber vender?",
    category: "Fundamentos",
    categoryColor: "blue",
    date: "2024-12-05",
    readTime: "6 min",
    description: "La importancia fundamental de las ventas en cualquier empresa y en el desarrollo personal profesional.",
    content: `<h2>Ventas: La Habilidad Universal del Éxito</h2><p>Saber vender no es solo para vendedores. Es una habilidad fundamental que todo profesional necesita dominar.</p><h3>Por Qué Todos Necesitamos Saber Vender</h3><ul><li><strong>Emprendedores:</strong> Deben vender su visión a inversionistas, empleados y clientes</li><li><strong>Empleados:</strong> Venden sus ideas, proyectos y su propio valor en la empresa</li><li><strong>Líderes:</strong> Venden la visión organizacional y motivan equipos</li><li><strong>Freelancers:</strong> Su sustento depende de vender sus servicios constantemente</li></ul><h3>Ventas = Comunicación Persuasiva</h3><p>En esencia, vender es la capacidad de comunicar valor de manera que inspire acción. Esta habilidad es fundamental en:</p><ul><li>Negociaciones salariales</li><li>Presentaciones de proyectos</li><li>Búsqueda de trabajo</li><li>Relaciones personales</li></ul><h3>El Costo de No Saber Vender</h3><p>Profesionales talentosos que no saben comunicar su valor a menudo son superados por otros menos talentosos pero más persuasivos.</p><h3>Cómo Empezar a Desarrollar Habilidades de Venta</h3><p>Comienza escuchando más, haciendo mejores preguntas y enfocándote en entender las necesidades antes de proponer soluciones.</p><p>La capacidad de vender es la diferencia entre tener grandes ideas y hacer que esas ideas generen impacto real.</p>`
  },
  {
    image: "/que_hacer_cuando_los_clientes_ya_no_te_contestan_1749740862172.webp",
    title: "Qué hacer cuando los clientes ya no te contestan",
    category: "Seguimiento",
    categoryColor: "orange",
    date: "2024-12-03",
    readTime: "8 min",
    description: "Estrategias efectivas para reactivar clientes que han dejado de responder a tus comunicaciones.",
    content: `<h2>Reactivando Clientes Silenciosos</h2><p>El silencio de un cliente no siempre significa desinterés. A menudo significa que necesitas cambiar tu estrategia de comunicación.</p><h3>Por Qué los Clientes Dejan de Responder</h3><ul><li>Sobrecarga de información o comunicaciones</li><li>Cambio de prioridades internas</li><li>Falta de urgencia percibida</li><li>Comunicaciones poco relevantes</li><li>Mal timing en el proceso de compra</li></ul><h3>Estrategias de Reactivación</h3><p><strong>1. Cambia el Canal:</strong> Si usabas email, prueba llamada telefónica o mensaje directo.</p><p><strong>2. Ofrece Valor Nuevo:</strong> Comparte información relevante, estudios de caso o insights de industria.</p><p><strong>3. Usa la Técnica del Break-up:</strong> "Parece que no es el momento correcto, ¿debo seguir en contacto en el futuro?"</p><p><strong>4. Involucra a Terceros:</strong> Referencias, colegas o conexiones mutuas pueden ayudar a reconectar.</p><p><strong>5. Crea Eventos de Reactivación:</strong> Webinars, eventos o promociones especiales pueden despertar interés renovado.</p><h3>Señales para Parar el Seguimiento</h3><p>Si después de 7-8 intentos variados en 3 meses no hay respuesta, es momento de pausar y revisitar en 6 meses.</p><p>La persistencia inteligente diferencia a los vendedores exitosos de los pesados.</p>`
  }
];

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  
  if (!match || !params?.slug) {
    return <div>Artículo no encontrado</div>;
  }

  // Find the blog post by slug
  const post = blogPosts.find(p => {
    const postSlug = p.title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters but keep spaces
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single
    return postSlug === params.slug;
  });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artículo no encontrado</h1>
          <a href="/blog" className="text-[#0B4CAF] hover:underline">
            Volver al blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#0B4CAF] to-[#E51A00] text-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </button>
              
              <div className="max-w-4xl">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 bg-${post.categoryColor}-500`}>
                  {post.category}
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} lectura</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Javier Díaz</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Article Content */}
        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Featured Image */}
              <motion.div
                className="mb-12 rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </motion.div>

              {/* Article Body */}
              <motion.div
                className="prose prose-lg max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share Section */}
              <motion.div
                className="mt-12 pt-8 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Compartir artículo
                  </h3>
                  <ShareButtons
                    title={post.title}
                    description={post.description}
                    url={window.location.href}
                  />
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                className="mt-16 bg-gradient-to-r from-[#0B4CAF] to-[#E51A00] rounded-xl p-8 text-white text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <h3 className="text-2xl font-bold mb-4">
                  ¿Te gustó este artículo?
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Descubre nuestros cursos completos de ventas y lleva tus habilidades al siguiente nivel
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="/#cursos"
                    className="bg-white text-[#0B4CAF] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Ver Cursos
                  </a>
                  <a
                    href="/blog"
                    className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                  >
                    Más Artículos
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </article>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}