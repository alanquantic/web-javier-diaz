import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/icons/Logo";
import MobileMenu from "./MobileMenu";
import { Menu } from "lucide-react";
import javierDiazLogo from "@/assets/images/jd-blue-text.png";

import JD__LOGO2 from "@assets/JD _LOGO2.png";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
          <img src={JD__LOGO2} alt="Javier Díaz" className="h-6 md:h-9 ml-2" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/#inicio" className="text-gray-800 hover:text-primary font-medium transition duration-200">
            Inicio
          </a>
          <a href="/#cursos" className="text-gray-800 hover:text-primary font-medium transition duration-200">
            Cursos
          </a>
          <a href="/#servicios" className="text-gray-800 hover:text-primary font-medium transition duration-200">
            Servicios
          </a>
          <a href="/#testimonios" className="text-gray-800 hover:text-primary font-medium transition duration-200">
            Testimonios
          </a>
          <a href="/blog" className="text-gray-800 hover:text-primary font-medium transition duration-200">
            Blog
          </a>
          <a href="/#contacto" className="text-gray-800 hover:text-primary font-medium transition duration-200">
            Contacto
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-600 hover:text-primary"
          aria-label="Toggle mobile menu"
        >
          <Menu size={24} />
        </button>
      </div>
      {/* Mobile Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};

export default Navbar;
