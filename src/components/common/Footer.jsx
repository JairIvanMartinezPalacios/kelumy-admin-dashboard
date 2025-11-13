// ========================================
// COMPONENTE FOOTER - Pie de página
// ========================================

import React from 'react';
import { 
  Heart,          // Icono de corazón
  Github,         // Icono de GitHub
  Twitter,        // Icono de Twitter
  Mail,           // Icono de correo
  Globe           // Icono de sitio web
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/5 backdrop-blur-sm border-t border-white/20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Información de la empresa */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <h3 className="text-xl font-bold text-white">KELUMY</h3>
            </div>
            <p className="text-white/70 text-sm mb-4 max-w-md">
              Plataforma de educación en línea que conecta estudiantes con los mejores cursos 
              y certificaciones del mundo.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/kelumy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/kelumy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contacto@kelumy.com"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://kelumy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="/courses" className="text-white/70 hover:text-white transition-colors text-sm">
                  Cursos
                </a>
              </li>
              <li>
                <a href="/certificates" className="text-white/70 hover:text-white transition-colors text-sm">
                  Certificados
                </a>
              </li>
              <li>
                <a href="/about" className="text-white/70 hover:text-white transition-colors text-sm">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="text-white font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2">
              <li>
                <a href="/help" className="text-white/70 hover:text-white transition-colors text-sm">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="/faq" className="text-white/70 hover:text-white transition-colors text-sm">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/terms" className="text-white/70 hover:text-white transition-colors text-sm">
                  Términos de Servicio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-white/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/60 text-sm">
              © {currentYear} KELUMY. Todos los derechos reservados.
            </p>
            <p className="text-white/60 text-sm mt-2 md:mt-0">
              Hecho con <Heart className="inline w-4 h-4 text-red-400" /> en México
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
