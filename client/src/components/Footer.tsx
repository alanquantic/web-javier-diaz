import Logo from "@/assets/icons/Logo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Logo variant="white" />
              <h3 className="text-xl font-bold ml-2">Javier Díaz</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Transformamos vendedores ordinarios en extraordinarios profesionales de las ventas.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/javierdiazpoder" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-200">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/javierdiazpoder" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-200">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-gray-400 hover:text-white transition duration-200">Inicio</a></li>
              <li><a href="#cursos" className="text-gray-400 hover:text-white transition duration-200">Cursos</a></li>
              <li><a href="#servicios" className="text-gray-400 hover:text-white transition duration-200">Servicios</a></li>
              <li><a href="#testimonios" className="text-gray-400 hover:text-white transition duration-200">Testimonios</a></li>
              <li><a href="#blog" className="text-gray-400 hover:text-white transition duration-200">Blog</a></li>
              <li><a href="#contacto" className="text-gray-400 hover:text-white transition duration-200">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Servicios personalizados</h3>
            <ul className="space-y-2">
              <li><a href="#servicios" className="text-gray-400 hover:text-white transition duration-200">Coaching en Ventas</a></li>
              <li><a href="#servicios" className="text-gray-400 hover:text-white transition duration-200">Workshops Especializados</a></li>
              <li><a href="#servicios" className="text-gray-400 hover:text-white transition duration-200">Consultoría Empresarial</a></li>
              <li><a href="#servicios" className="text-gray-400 hover:text-white transition duration-200">Conferencias Motivacionales</a></li>
              <li><a href="#servicios" className="text-gray-400 hover:text-white transition duration-200">Entrenamientos In-House</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-primary"></i>
                <span className="text-gray-400">Av. Aguascalientes Nte 613, Parras, 20157 Aguascalientes, Ags.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-primary"></i>
                <span className="text-gray-400">javier@javierdiaz.com.mx</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3 text-primary"></i>
                <span className="text-gray-400">+52 449 186 6213</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Javier Díaz. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white transition duration-200">
              Términos y condiciones
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition duration-200">
              Política de privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
