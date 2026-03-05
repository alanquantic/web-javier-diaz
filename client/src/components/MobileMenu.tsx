import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const handleLinkClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white">
      <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
        <a 
          href="/#inicio" 
          className="text-gray-800 hover:text-primary font-medium py-2"
          onClick={handleLinkClick}
        >
          Inicio
        </a>
        <a 
          href="/#cursos" 
          className="text-gray-800 hover:text-primary font-medium py-2"
          onClick={handleLinkClick}
        >
          Cursos
        </a>
        <a 
          href="/#servicios" 
          className="text-gray-800 hover:text-primary font-medium py-2"
          onClick={handleLinkClick}
        >
          Servicios
        </a>
        <a 
          href="/#testimonios" 
          className="text-gray-800 hover:text-primary font-medium py-2"
          onClick={handleLinkClick}
        >
          Testimonios
        </a>
        <a 
          href="/blog" 
          className="text-gray-800 hover:text-primary font-medium py-2"
          onClick={handleLinkClick}
        >
          Blog
        </a>
        <a 
          href="/#contacto" 
          className="text-gray-800 hover:text-primary font-medium py-2"
          onClick={handleLinkClick}
        >
          Contacto
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;
