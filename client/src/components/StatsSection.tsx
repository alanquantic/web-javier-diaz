import { motion } from "framer-motion";

const stats = [
  { value: "+5,000", label: "Alumnos capacitados" },
  { value: "+30%", label: "Incremento promedio en ventas" },
  { value: "9.7/10", label: "Satisfacción de nuestros alumnos" },
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-primary text-5xl font-bold mb-2">{stat.value}</div>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
