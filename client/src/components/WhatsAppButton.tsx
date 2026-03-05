import { motion } from "framer-motion";

const WhatsAppButton: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.link/1q2983', '_blank');
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[9999]"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <i className="fab fa-whatsapp text-2xl"></i>
      </motion.button>
      
      {/* Tooltip */}
      <motion.div
        className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        ¡Escríbeme por WhatsApp!
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </motion.div>
    </motion.div>
  );
};

export default WhatsAppButton;