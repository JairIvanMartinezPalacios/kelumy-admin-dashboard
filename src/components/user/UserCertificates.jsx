// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

import React, { useState } from 'react';
import { 
  Award,           // Icono de certificado
  Download,        // Icono de descarga
  Share2,          // Icono de compartir
  Eye,             // Icono de ver
  Calendar,        // Icono de calendario
  Clock,           // Icono de reloj
  BookOpen,        // Icono de libro
  Star,            // Icono de estrella
  CheckCircle,     // Icono de completado
  ExternalLink,    // Icono de enlace externo
  Filter,          // Icono de filtro
  Search,          // Icono de búsqueda
  Grid,            // Icono de grid
  List,            // Icono de lista
  Trophy,          // Icono de trofeo
  Target,          // Icono de objetivo
  TrendingUp,      // Icono de progreso
  Users,           // Icono de usuarios
  BarChart3        // Icono de estadísticas
} from 'lucide-react';

// ========================================
// COMPONENTE USERCERTIFICATES - Gestión de certificados del usuario
// ========================================

const UserCertificates = ({ user }) => {
  // ========================================
  // ESTADO DEL COMPONENTE
  // ========================================
  
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [sortBy, setSortBy] = useState('recientes');

  // ========================================
  // DATOS ESTÁTICOS - Certificados del usuario
  // ========================================
  
  const certificates = [
    {
      id: 1,
      title: 'Diseño UX/UI Moderno',
      courseId: 3,
      courseTitle: 'Diseño UX/UI Moderno',
      instructor: 'Diseñadora Ana López',
      description: 'Certificado de finalización del curso de Diseño UX/UI Moderno',
      thumbnail: '/api/placeholder/300/200',
      issuedDate: '2024-01-05',
      expiryDate: null, // Certificado permanente
      grade: 'A+',
      score: 95,
      totalScore: 100,
      duration: '10h 45min',
      level: 'Principiante',
      category: 'Diseño',
      skills: ['Figma', 'Adobe XD', 'Prototipado', 'User Research', 'Design Thinking'],
      verificationCode: 'KEL-CERT-2024-001',
      isVerified: true,
      isDownloaded: false,
      isShared: false,
      downloadUrl: '/certificates/kel-cert-2024-001.pdf',
      shareUrl: 'https://kelumy.com/verify/kel-cert-2024-001'
    },
    {
      id: 2,
      title: 'JavaScript Fundamentos',
      courseId: 1,
      courseTitle: 'JavaScript Avanzado',
      instructor: 'Dr. María González',
      description: 'Certificado de finalización del módulo de fundamentos de JavaScript',
      thumbnail: '/api/placeholder/300/200',
      issuedDate: '2023-12-15',
      expiryDate: '2025-12-15', // Certificado con expiración
      grade: 'A',
      score: 88,
      totalScore: 100,
      duration: '6h 30min',
      level: 'Intermedio',
      category: 'Programación',
      skills: ['JavaScript', 'ES6+', 'DOM Manipulation', 'Async Programming'],
      verificationCode: 'KEL-CERT-2023-045',
      isVerified: true,
      isDownloaded: true,
      isShared: false,
      downloadUrl: '/certificates/kel-cert-2023-045.pdf',
      shareUrl: 'https://kelumy.com/verify/kel-cert-2023-045'
    },
    {
      id: 3,
      title: 'React Hooks Básicos',
      courseId: 2,
      courseTitle: 'React Hooks Profundo',
      instructor: 'Ing. Carlos Ruiz',
      description: 'Certificado de finalización del módulo de React Hooks básicos',
      thumbnail: '/api/placeholder/300/200',
      issuedDate: '2023-11-20',
      expiryDate: null,
      grade: 'A+',
      score: 92,
      totalScore: 100,
      duration: '4h 15min',
      level: 'Intermedio',
      category: 'Programación',
      skills: ['React', 'Hooks', 'useState', 'useEffect', 'Custom Hooks'],
      verificationCode: 'KEL-CERT-2023-038',
      isVerified: true,
      isDownloaded: false,
      isShared: true,
      downloadUrl: '/certificates/kel-cert-2023-038.pdf',
      shareUrl: 'https://kelumy.com/verify/kel-cert-2023-038'
    }
  ];

  const categories = [
    'todas',
    'Programación',
    'Diseño',
    'Data Science',
    'Marketing',
    'Negocios',
    'Idiomas'
  ];

  // ========================================
  // FUNCIONES DE UTILIDAD
  // ========================================
  
  const filteredCertificates = certificates.filter(certificate => {
    const matchesSearch = certificate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         certificate.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         certificate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'todas' || certificate.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (certificate) => {
    // Simular descarga
    console.log('Descargando certificado:', certificate.title);
    // En una implementación real, aquí se descargaría el archivo PDF
  };

  const handleShare = (certificate) => {
    // Simular compartir
    console.log('Compartiendo certificado:', certificate.title);
    if (navigator.share) {
      navigator.share({
        title: certificate.title,
        text: certificate.description,
        url: certificate.shareUrl
      });
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(certificate.shareUrl);
      alert('Enlace copiado al portapapeles');
    }
  };

  const handleView = (certificate) => {
    // Simular ver certificado
    console.log('Viendo certificado:', certificate.title);
    window.open(certificate.shareUrl, '_blank');
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'from-green-500 to-emerald-500';
      case 'A': return 'from-blue-500 to-cyan-500';
      case 'B+': return 'from-yellow-500 to-orange-500';
      case 'B': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  // ========================================
  // RENDERIZADO DE TARJETAS DE CERTIFICADO
  // ========================================
  
  const renderCertificateCard = (certificate) => (
    <div key={certificate.id} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 group">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 right-4 flex space-x-2">
          {certificate.isVerified && (
            <div className="p-2 bg-green-500/20 backdrop-blur-sm rounded-full">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
          )}
          {isExpiringSoon(certificate.expiryDate) && (
            <div className="p-2 bg-orange-500/20 backdrop-blur-sm rounded-full">
              <Clock className="w-4 h-4 text-orange-400" />
            </div>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getGradeColor(certificate.grade)} text-white`}>
            {certificate.grade} ({certificate.score}%)
          </div>
        </div>
        <div className="absolute bottom-4 right-4">
          <button 
            onClick={() => handleView(certificate)}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
              {certificate.title}
            </h3>
            <p className="text-white/70 text-sm mb-2">por {certificate.instructor}</p>
            <p className="text-white/60 text-sm line-clamp-2">{certificate.description}</p>
          </div>
        </div>

        {/* Información del certificado */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm text-white/70">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Emitido: {new Date(certificate.issuedDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{certificate.duration}</span>
            </div>
          </div>

          {certificate.expiryDate && (
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>Expira: {new Date(certificate.expiryDate).toLocaleDateString()}</span>
              {isExpiringSoon(certificate.expiryDate) && (
                <span className="text-orange-400 text-xs font-medium">¡Expira pronto!</span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Código: {certificate.verificationCode}</span>
            <span className="px-2 py-1 bg-white/10 rounded text-xs">{certificate.level}</span>
          </div>
        </div>

        {/* Habilidades */}
        <div className="mb-4">
          <p className="text-white/70 text-sm mb-2">Habilidades obtenidas:</p>
          <div className="flex flex-wrap gap-1">
            {certificate.skills.map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button 
              onClick={() => handleDownload(certificate)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                certificate.isDownloaded 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>{certificate.isDownloaded ? 'Descargado' : 'Descargar'}</span>
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => handleShare(certificate)}
              className={`p-2 rounded-lg transition-colors ${
                certificate.isShared 
                  ? 'bg-blue-600 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleView(certificate)}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ========================================
  // RENDERIZADO PRINCIPAL
  // ========================================
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Mis Certificados</h1>
          <p className="text-white/70">Tus logros y certificaciones en KELUMY</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium">Total Certificados</p>
                <p className="text-2xl font-bold text-white mt-1">{certificates.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium">Promedio de Calificación</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {Math.round(certificates.reduce((acc, cert) => acc + cert.score, 0) / certificates.length)}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium">Habilidades Obtenidas</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {new Set(certificates.flatMap(cert => cert.skills)).size}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium">Certificados Compartidos</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {certificates.filter(cert => cert.isShared).length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
                <Share2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Búsqueda */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Buscar certificados..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filtros */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gray-800">
                    {category === 'todas' ? 'Todas las categorías' : category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="recientes" className="bg-gray-800">Más recientes</option>
                <option value="calificacion" className="bg-gray-800">Por calificación</option>
                <option value="alfabetico" className="bg-gray-800">Alfabético</option>
                <option value="expiracion" className="bg-gray-800">Por expiración</option>
              </select>

              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de certificados */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {filteredCertificates.length > 0 ? (
            filteredCertificates.map(renderCertificateCard)
          ) : (
            <div className="col-span-full text-center py-12">
              <Award className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No se encontraron certificados</h3>
              <p className="text-white/70">Intenta ajustar tus filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCertificates;
