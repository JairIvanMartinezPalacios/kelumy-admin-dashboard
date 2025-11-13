// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y el hook useState para manejar el estado del componente
import React, { useState } from 'react';

// Importa iconos de la librería Lucide React para la interfaz de usuario
import { 
  Eye,           // Icono de ojo abierto para mostrar contraseña
  EyeOff,        // Icono de ojo cerrado para ocultar contraseña
  Mail,          // Icono de correo para campo de email
  Lock,          // Icono de candado para campo de contraseña
  User,          // Icono de usuario para campos de nombre
  ArrowRight,    // Icono de flecha derecha para navegación
  Upload,        // Icono de subida para carga de archivos
  MapPin,        // Icono de ubicación para campos geográficos
  Phone,         // Icono de teléfono para campo de teléfono
  GraduationCap, // Icono de graduación para datos académicos
  Heart,         // Icono de corazón para campos opcionales
  Brain,         // Icono de cerebro para campos de pensamiento
  Target,        // Icono de objetivo para metas
  MessageSquare, // Icono de mensaje para comentarios
  ChevronLeft,   // Icono de chevron izquierda para navegación hacia atrás
  ChevronRight,  // Icono de chevron derecha para navegación hacia adelante
  CheckCircle    // Icono de check para elementos completados
} from 'lucide-react';

// ========================================
// COMPONENTE REGISTRATIONFORM - Formulario multi-paso de registro
// ========================================

// Define el componente funcional RegistrationForm que recibe props del componente padre
const RegistrationForm = ({ 
  formData,                    // Objeto que contiene todos los datos del formulario
  handleInputChange,          // Función para manejar cambios en los campos de entrada
  handleArrayChange,          // Función para manejar cambios en campos de tipo array
  showPassword,               // Estado que controla la visibilidad de la contraseña
  togglePasswordVisibility,   // Función para alternar la visibilidad de la contraseña
  onLogin,                    // Función para manejar el login después del registro exitoso
  onBackToLogin               // Función para volver al formulario de login
}) => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estado para controlar el paso actual del formulario multi-paso
  // Inicia en 1 (primer paso)
  const [currentStep, setCurrentStep] = useState(1);
  
  // Número total de pasos del formulario
  // Define la estructura completa del proceso de registro
  const totalSteps = 4;

  // ========================================
  // DATOS ESTÁTICOS - Opciones para dropdowns y formularios
  // ========================================
  
  // Lista de países de Latinoamérica disponibles para selección
  // Incluye todos los países de la región más una opción para otros países
  const countries = [
    'MÉXICO',                    // República mexicana
    'ARGENTINA',                 // República argentina
    'BOLIVIA',                   // Estado plurinacional de Bolivia
    'BRASIL',                    // República federativa de Brasil
    'CHILE',                     // República de Chile
    'COLOMBIA',                  // República de Colombia
    'COSTA RICA',                // República de Costa Rica
    'CUBA',                      // República de Cuba
    'ECUADOR',                   // República del Ecuador
    'EL SALVADOR',               // República de El Salvador
    'GUATEMALA',                 // República de Guatemala
    'HONDURAS',                  // República de Honduras
    'NICARAGUA',                 // República de Nicaragua
    'PANAMÁ',                    // República de Panamá
    'PARAGUAY',                  // República del Paraguay
    'PERÚ',                      // República del Perú
    'REPÚBLICA DOMINICANA',      // República Dominicana
    'URUGUAY',                   // República Oriental del Uruguay
    'VENEZUELA',                 // República Bolivariana de Venezuela
    'OTRO (Indica cuál)'         // Opción para otros países no listados
  ];

  // Lista de niveles académicos disponibles para selección
  // Incluye los niveles educativos principales en Latinoamérica
  const academicLevels = [
    'SECUNDARIA',                // Educación secundaria (12-15 años)
    'PREPARATORIA',              // Educación media superior/bachillerato (15-18 años)
    'UNIVERSIDAD',               // Educación superior/licenciatura (18+ años)
    'POSGRADO'                   // Estudios de posgrado (maestría, doctorado)
  ];

  // Lista de universidades e instituciones de educación superior
  // Incluye las principales universidades de México y Latinoamérica
  const universities = [
    'UNAM',                      // Universidad Nacional Autónoma de México
    'IPN',                       // Instituto Politécnico Nacional
    'UV',                        // Universidad Veracruzana
    'BUAP',                      // Benemérita Universidad Autónoma de Puebla
    'NAVAL',                     // Heroica Escuela Naval Militar
    'UDG',                       // Universidad de Guadalajara
    'UNPA',                      // Universidad del Papaloapan
    'ITTUX',                     // Instituto Tecnológico de Tuxtepec
    'TECNM',                     // Tecnológico Nacional de México
    'ANAHUAC',                   // Universidad Anáhuac
    'UDLAP',                     // Universidad de las Américas Puebla
    'NORMAL SUPERIOR',           // Escuela Normal Superior
    'OTRA(S) (INDICA CUÁL(ES))' // Opción para otras universidades no listadas
  ];


  // ========================================
  // CONFIGURACIÓN DE PASOS - Estructura del formulario multi-paso
  // ========================================
  
  // Array que define los pasos del formulario de registro
  // Cada objeto contiene: id (número del paso), title (título visible), icon (componente de icono)
  const steps = [
    { id: 1, title: 'Datos Personales', icon: User },           // Paso 1: Información personal básica
    { id: 2, title: 'Datos Académicos', icon: GraduationCap },  // Paso 2: Información educativa
    { id: 3, title: 'Datos del Curso', icon: MessageSquare },   // Paso 3: Expectativas y objetivos
    { id: 4, title: 'Crear Contraseña', icon: Lock }            // Paso 4: Configuración de acceso
  ];

  // ========================================
  // FUNCIONES DE NAVEGACIÓN - Control del flujo del formulario
  // ========================================
  
  // Función para avanzar al siguiente paso del formulario
  // Solo avanza si no se ha alcanzado el último paso
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Función para retroceder al paso anterior del formulario
  // Solo retrocede si no se está en el primer paso
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // ========================================
  // FUNCIÓN DE VALIDACIÓN - Verificación de campos requeridos
  // ========================================
  
  // Función que valida si un paso específico tiene todos los campos requeridos completados
  // Retorna true si el paso es válido, false si faltan campos obligatorios
  const isStepValid = (step) => {
    switch (step) {
      case 1:
        // Paso 1: Datos Personales - Valida campos obligatorios básicos
        return formData.email && formData.fullName && formData.lastName && formData.country && formData.phone;
      case 2:
        // Paso 2: Datos Académicos - Valida nivel académico obligatorio
        return formData.academicLevel;
      case 3:
        // Paso 3: Datos del Curso - Todos los campos son opcionales, siempre válido
        return true;
      case 4:
        // Paso 4: Contraseña - Valida que las contraseñas coincidan y no estén vacías
        return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
      default:
        // Paso no válido por defecto
        return false;
    }
  };

  // ========================================
  // FUNCIÓN DE RENDERIZADO - Contenido dinámico por paso
  // ========================================
  
  // Función que renderiza el contenido específico de cada paso del formulario
  // Utiliza un switch statement para mostrar diferentes campos según el paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      // ========================================
      // PASO 1 - DATOS PERSONALES
      // ========================================
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                      <label className="block text-white/90 text-xs font-medium mb-1 drop-shadow-sm">
                  1. Correo electrónico *
                </label>
                <div className="relative">
                        <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/60" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-6 pr-2 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                      <label className="block text-white/90 text-xs font-medium mb-1 drop-shadow-sm">
                  2. Nombre(s) *
                </label>
                <div className="relative">
                        <User className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/60" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-6 pr-2 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
              </div>

              <div>
                      <label className="block text-white/90 text-xs font-medium mb-1 drop-shadow-sm">
                  3. Apellidos *
                </label>
                <div className="relative">
                        <User className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/60" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full pl-6 pr-2 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="Tus apellidos"
                    required
                  />
                </div>
              </div>

              <div>
                      <label className="block text-white/90 text-xs font-medium mb-1 drop-shadow-sm">
                  4. Sube una foto para tu perfil
                </label>
                <div className="relative">
                        <Upload className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/60" />
                  <input
                    type="file"
                    name="profilePhoto"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white file:bg-transparent file:border-0 file:text-white file:mr-4 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                      <label className="block text-white/90 text-xs font-medium mb-1 drop-shadow-sm">
                  5. País *
                </label>
                <div className="relative">
                        <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/60" />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    required
                  >
                    <option value="" className="bg-gray-800">Selecciona tu país</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country} className="bg-gray-800">
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                {formData.country === 'OTRO (Indica cuál)' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      name="countryOther"
                      value={formData.countryOther}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                      placeholder="Especifica tu país"
                    />
                  </div>
                )}
              </div>

              <div>
                      <label className="block text-white/90 text-xs font-medium mb-1 drop-shadow-sm">
                  6. Estado o provincia
                  <span className="text-[#e9d1e6]"> (OPCIONAL)</span>
                </label>
                <div className="relative">
                        <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/60" />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full pl-6 pr-2 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="Tu estado o provincia"
                  />
                </div>
              </div>

              <div>
                      <label className="block text-white/90 text-xs font-medium mb-1 drop-shadow-sm">
                  7. Tu número de teléfono *
                </label>
                <div className="relative">
                        <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/60" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-6 pr-2 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="Tu teléfono"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
                      <label className="block text-white/90 text-xs font-medium mb-1 drop-shadow-sm">
                8. Nivel académico actual o cursado *
              </label>
              <div className="relative">
                        <GraduationCap className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/60" />
                <select
                  name="academicLevel"
                  value={formData.academicLevel}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="" className="bg-gray-800">Selecciona tu nivel académico</option>
                  {academicLevels.map((level, index) => (
                    <option key={index} value={level} className="bg-gray-800">
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
                      <label className="block text-white/90 text-xs font-medium mb-1 drop-shadow-sm">
                9. Grado o semestre actual
                <span className="text-[#e9d1e6]"> (OPCIONAL)</span>
              </label>
              <div className="relative">
                        <GraduationCap className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/60" />
                <input
                  type="text"
                  name="currentGrade"
                  value={formData.currentGrade}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                  placeholder="Ej: 3er año, 5to semestre, 2do semestre de maestría"
                />
              </div>
            </div>



          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
                      <label className="block text-white/90 text-xs font-medium mb-1 drop-shadow-sm">
                10. ¿Qué cambio quieres lograr en tu país con una acción de acuerdo al finalizar tu carrera profesional? 
                <span className="text-[#e9d1e6]">(OPCIONAL)</span>
              </label>
              <textarea
                name="countryChange"
                value={formData.countryChange}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-2 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Describe el cambio que quieres lograr..."
              />
            </div>

            <div>
                      <label className="block text-white/90 text-xs font-medium mb-1 drop-shadow-sm">
                11. Agrega un comentario de lo que esperas de nosotros: 
                <span className="text-[#e9d1e6]">(OPCIONAL)</span>
              </label>
              <textarea
                name="expectations"
                value={formData.expectations}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-2 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Comparte tus expectativas..."
              />
            </div>
          </div>
        );

      // ========================================
      // PASO 4 - CREAR CONTRASEÑA
      // ========================================
      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                      <label className="block text-white/90 text-xs font-medium mb-1 drop-shadow-sm">
                  Contraseña *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="Tu contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                      <label className="block text-white/90 text-xs font-medium mb-1 drop-shadow-sm">
                  Confirmar contraseña *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-6 pr-2 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    placeholder="Confirma tu contraseña"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      // ========================================
      // CASO POR DEFECTO - Paso no válido
      // ========================================
      default:
        return null;
    }
  };

  // ========================================
  // RENDERIZADO PRINCIPAL - Estructura JSX del componente
  // ========================================
  
  // Retorna el contenedor principal del formulario multi-paso
  return (
                    <div className="space-y-4">
      {/* Estilos para scroll invisible */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Contenedor Principal del Formulario con Scroll */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 overflow-hidden max-w-md w-full mx-4 shadow-2xl max-h-[480px] p-8">
        {/* Barra de Navegación Sticky */}
        <div className="sticky top-0 bg-white/10 backdrop-blur-xl border-b border-white/20 p-2 z-10 -mx-8 -mt-8 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-white drop-shadow-lg">
              Paso {currentStep} de {totalSteps}
            </h2>
            <div className="flex items-center gap-2">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-1 px-1 py-1 rounded-sm transition-all duration-300 ${
                      currentStep === step.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : currentStep > step.id
                        ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                        : 'bg-white/10 text-white/60 border border-white/20'
                    }`}
                  >
                    <Icon size={12} />
                    <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Barra de Progreso */}
          <div className="w-full bg-white/20 rounded-full h-2 mb-6">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Contenido Scrolleable del Formulario */}
        {/* altura de fondo difuminado del forms en 265px */}
        <div className="overflow-y-auto -mx-8 -mt-4 max-h-[265px] scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent"> 
          {/* Contenido del Paso Actual */}
          <div className="min-h-[150px] mb-4 px-8">
            {renderStepContent()}
          </div>

          {/* Botones de Navegación */}
          <div className="flex justify-between pt-2 border-t border-white/20 px-8 pb-4">
            <div className="flex gap-2">
              {currentStep === 1 && (
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="flex items-center gap-2 px-2 py-1 rounded-sm font-medium transition-all duration-300 bg-white/20 text-white hover:bg-white/30 hover:scale-105"
                >
                  <ChevronLeft size={14} />
                  Volver al Login
                </button>
              )}
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-2 py-1 rounded-sm font-medium transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-white/10 text-white/40 cursor-not-allowed'
                    : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
                }`}
              >
                <ChevronLeft size={14} />
                Anterior
              </button>
            </div>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className={`flex items-center gap-2 px-2 py-1 rounded-sm font-medium transition-all duration-300 ${
                  !isStepValid(currentStep)
                    ? 'bg-white/10 text-white/40 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105'
                }`}
              >
                Siguiente
                <ChevronRight size={14} />
              </button>
            ) : (
              <button
                type="submit"
                onClick={() => {
                  // Simular registro exitoso y llamar a onLogin
                  if (isStepValid(currentStep)) {
                    onLogin()
                  }
                }}
                disabled={!isStepValid(currentStep)}
                className={`flex items-center gap-2 px-2 py-1 rounded-sm font-medium transition-all duration-300 ${
                  !isStepValid(currentStep)
                    ? 'bg-white/10 text-white/40 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105'
                }`}
              >
                <CheckCircle size={20} />
                Completar Registro
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================
// EXPORTACIÓN - Exporta el componente para uso en otros archivos
// ========================================

// Exporta el componente RegistrationForm como exportación por defecto
// Esto permite importarlo en otros archivos como: import RegistrationForm from './RegistrationForm'
// El componente RegistrationForm proporciona un formulario de registro multi-paso con:
// - Navegación por pasos con validación progresiva
// - Campos organizados por categorías (personales, académicos, curso, contraseña)
// - Validación en tiempo real de campos requeridos
// - Diseño glassmorphism con efectos visuales
// - Scroll invisible para mejor experiencia de usuario
// - Responsividad completa para todos los dispositivos
// - Integración con sistema de autenticación
export default RegistrationForm;