import React, { useState, useMemo } from 'react'
import { 
  Award, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Star,
  FileText,
  Send,
  Settings,
  BarChart3,
  TrendingUp,
  Shield,
  Globe,
  QrCode,
  Link2,
  Key,
  Lock,
  CheckSquare,
  AlertCircle,
  Layers,
  X,
  Copy,
  Share2,
  Mail,
  Printer,
  Image as ImageIcon,
  Upload,
  Save,
  RefreshCw,
  Zap,
  BookOpen,
  Target,
  DollarSign,
  Percent,
  Activity,
  PieChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Play,
  Pause,
  RotateCcw,
  FileCheck,
  FileX,
  Archive,
  MoreVertical,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Briefcase,
  GraduationCap,
  Code,
  Camera,
  History,
  FileSearch,
  Server,
  Database,
  Network,
  ShieldCheck,
  AlertCircle as AlertCircleIcon,
  CheckCircle2 as CheckCircle2Icon,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
  Globe as GlobeIcon,
  Terminal,
  BookOpen as BookOpenIcon,
  Zap as ZapIcon
} from 'lucide-react'

const CertificacionesModule = () => {
  const [activeTab, setActiveTab] = useState('certificados')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('nombre')
  const [sortOrder, setSortOrder] = useState('asc')
  const [viewMode, setViewMode] = useState('grid') // grid o list
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedCert, setSelectedCert] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [showValidationModal, setShowValidationModal] = useState(false)
  const [showBlockchainModal, setShowBlockchainModal] = useState(false)
  const [showAPIModal, setShowAPIModal] = useState(false)
  const [showLinkedInModal, setShowLinkedInModal] = useState(false)
  const [showComplianceModal, setShowComplianceModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  
  // Estados para validación
  const [validationSearchTerm, setValidationSearchTerm] = useState('')
  const [validationFilter, setValidationFilter] = useState('all') // all, valid, invalid, pending
  const [validationSortBy, setValidationSortBy] = useState('fecha') // fecha, certificado, estudiante, resultado
  const [validationSortOrder, setValidationSortOrder] = useState('desc') // asc, desc
  const [validationPage, setValidationPage] = useState(1)
  const [validationItemsPerPage] = useState(10)
  const [validationHistory, setValidationHistory] = useState([
    {
      id: 1,
      qrCode: 'CERT-001-ABC123',
      certificado: 'Certificado en Ciencias Básicas',
      estudiante: 'Juan Pérez',
      fecha: '2024-01-20T10:30:00',
      resultado: 'valid',
      metodo: 'QR',
      ip: '192.168.1.100',
      ubicacion: 'Ciudad de México, MX',
      blockchainVerified: true
    },
    {
      id: 2,
      qrCode: 'CERT-002-XYZ789',
      certificado: 'Certificado en Programación Web',
      estudiante: 'María García',
      fecha: '2024-01-19T14:15:00',
      resultado: 'valid',
      metodo: 'API',
      ip: '192.168.1.101',
      ubicacion: 'Guadalajara, MX',
      blockchainVerified: true
    },
    {
      id: 3,
      qrCode: 'CERT-003-DEF456',
      certificado: 'Certificado en Robótica Educativa',
      estudiante: 'Carlos López',
      fecha: '2024-01-18T09:20:00',
      resultado: 'invalid',
      metodo: 'QR',
      ip: '192.168.1.102',
      ubicacion: 'Monterrey, MX',
      blockchainVerified: false,
      motivo: 'Certificado vencido'
    },
    {
      id: 4,
      qrCode: 'CERT-004-GHI789',
      certificado: 'Certificado en Inteligencia Artificial',
      estudiante: 'Ana Martínez',
      fecha: '2024-01-17T16:45:00',
      resultado: 'valid',
      metodo: 'QR',
      ip: '192.168.1.103',
      ubicacion: 'Puebla, MX',
      blockchainVerified: true
    },
    {
      id: 5,
      qrCode: 'CERT-005-JKL012',
      certificado: 'Certificado en Diseño Gráfico',
      estudiante: 'Luis Rodríguez',
      fecha: '2024-01-16T11:30:00',
      resultado: 'pending',
      metodo: 'API',
      ip: '192.168.1.104',
      ubicacion: 'Tijuana, MX',
      blockchainVerified: null
    }
  ])
  const [selectedValidation, setSelectedValidation] = useState(null)
  const [showValidationDetailModal, setShowValidationDetailModal] = useState(false)
  const [qrCodeInput, setQrCodeInput] = useState('')
  const [showQRGeneratorModal, setShowQRGeneratorModal] = useState(false)
  const [qrGeneratorData, setQrGeneratorData] = useState({
    certificadoId: '',
    cantidad: 1,
    formato: 'PNG',
    tamaño: '500x500',
    incluirLogo: true
  })
  const [validationStats, setValidationStats] = useState({
    totalValidaciones: 1247,
    validas: 1156,
    invalidas: 45,
    pendientes: 46,
    validacionesHoy: 23,
    validacionesSemana: 156,
    validacionesMes: 567
  })

  // Datos de ejemplo para certificaciones
  const [certificaciones, setCertificaciones] = useState([
    {
      id: 1,
      nombre: 'Certificado en Ciencias Básicas',
      descripcion: 'Certificación completa en matemáticas, física y química con enfoque práctico',
      categoria: 'Ciencias',
      duracion: '6 meses',
      precio: 299,
      estudiantes: 1247,
      completados: 892,
      rating: 4.8,
      estado: 'activo',
      fechaCreacion: '2024-01-15',
      fechaVencimiento: '2025-01-15',
      requisitos: ['Completar 80% del curso', 'Aprobar examen final con 70%', 'Entregar proyecto práctico'],
      habilidades: ['Matemáticas', 'Física', 'Química', 'Análisis'],
      plantilla: 'basica',
      qrCode: 'CERT-001-ABC123',
      blockchainHash: '0x1234...5678',
      validaciones: 1247,
      ingresos: 373053
    },
    {
      id: 2,
      nombre: 'Certificado en Programación Web',
      descripcion: 'Desarrollo de aplicaciones web modernas con tecnologías actuales',
      categoria: 'Tecnología',
      duracion: '4 meses',
      precio: 399,
      estudiantes: 2156,
      completados: 1834,
      rating: 4.9,
      estado: 'activo',
      fechaCreacion: '2024-02-01',
      fechaVencimiento: '2025-02-01',
      requisitos: ['Proyecto final funcional', 'Portafolio de trabajos', 'Code review aprobado'],
      habilidades: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      plantilla: 'premium',
      qrCode: 'CERT-002-XYZ789',
      blockchainHash: '0x9876...5432',
      validaciones: 2156,
      ingresos: 731766
    },
    {
      id: 3,
      nombre: 'Certificado en Robótica Educativa',
      descripcion: 'Fundamentos de robótica para educadores y formadores',
      categoria: 'Educación',
      duracion: '3 meses',
      precio: 199,
      estudiantes: 567,
      completados: 423,
      rating: 4.7,
      estado: 'borrador',
      fechaCreacion: '2024-03-10',
      fechaVencimiento: '2025-03-10',
      requisitos: ['Proyecto robótico funcional', 'Documentación completa', 'Presentación final'],
      habilidades: ['Robótica', 'Programación', 'Educación', 'STEM'],
      plantilla: 'corporativa',
      qrCode: 'CERT-003-DEF456',
      blockchainHash: null,
      validaciones: 0,
      ingresos: 0
    },
    {
      id: 4,
      nombre: 'Certificado en Inteligencia Artificial',
      descripcion: 'Machine Learning y Deep Learning aplicado',
      categoria: 'Tecnología',
      duracion: '8 meses',
      precio: 599,
      estudiantes: 892,
      completados: 654,
      rating: 4.9,
      estado: 'activo',
      fechaCreacion: '2024-01-20',
      fechaVencimiento: '2025-01-20',
      requisitos: ['Modelo entrenado', 'Dataset propio', 'Paper técnico'],
      habilidades: ['Python', 'TensorFlow', 'PyTorch', 'ML', 'DL'],
      plantilla: 'premium',
      qrCode: 'CERT-004-GHI789',
      blockchainHash: '0xABCD...EF01',
      validaciones: 892,
      ingresos: 392108
    },
    {
      id: 5,
      nombre: 'Certificado en Diseño Gráfico',
      descripcion: 'Diseño profesional con herramientas modernas',
      categoria: 'Arte',
      duracion: '5 meses',
      precio: 349,
      estudiantes: 1234,
      completados: 987,
      rating: 4.6,
      estado: 'activo',
      fechaCreacion: '2024-02-15',
      fechaVencimiento: '2025-02-15',
      requisitos: ['Portafolio de 10 trabajos', 'Proyecto final', 'Branding completo'],
      habilidades: ['Photoshop', 'Illustrator', 'Figma', 'Branding'],
      plantilla: 'basica',
      qrCode: 'CERT-005-JKL012',
      blockchainHash: '0x2345...6789',
      validaciones: 1234,
      ingresos: 344463
    },
    {
      id: 6,
      nombre: 'Certificado en Marketing Digital',
      descripcion: 'Estrategias de marketing digital y redes sociales',
      categoria: 'Negocios',
      duracion: '4 meses',
      precio: 279,
      estudiantes: 1567,
      completados: 1234,
      rating: 4.8,
      estado: 'activo',
      fechaCreacion: '2024-01-10',
      fechaVencimiento: '2025-01-10',
      requisitos: ['Campaña real ejecutada', 'Análisis de resultados', 'Reporte final'],
      habilidades: ['SEO', 'SEM', 'Social Media', 'Analytics'],
      plantilla: 'corporativa',
      qrCode: 'CERT-006-MNO345',
      blockchainHash: '0x3456...7890',
      validaciones: 1567,
      ingresos: 344193
    }
  ])

  // Calcular estadísticas dinámicamente
  const estadisticas = useMemo(() => {
    const total = certificaciones.length
    const activos = certificaciones.filter(c => c.estado === 'activo').length
    const borradores = certificaciones.filter(c => c.estado === 'borrador').length
    const vencidos = certificaciones.filter(c => c.estado === 'vencido').length
    const totalEstudiantes = certificaciones.reduce((sum, c) => sum + c.estudiantes, 0)
    const totalCompletados = certificaciones.reduce((sum, c) => sum + c.completados, 0)
    const totalIngresos = certificaciones.reduce((sum, c) => sum + c.ingresos, 0)
    const tasaCompletacion = totalEstudiantes > 0 ? (totalCompletados / totalEstudiantes * 100).toFixed(1) : 0
    const promedioRating = certificaciones.length > 0 
      ? (certificaciones.reduce((sum, c) => sum + c.rating, 0) / certificaciones.length).toFixed(1)
      : 0

    return {
      totalCertificados: total,
      certificadosActivos: activos,
      certificadosBorradores: borradores,
      certificadosVencidos: vencidos,
      estudiantesCertificados: totalCompletados,
      totalEstudiantes: totalEstudiantes,
      ingresosGenerados: totalIngresos,
      tasaCompletacion: parseFloat(tasaCompletacion),
      promedioRating: parseFloat(promedioRating),
      certificadosPendientes: borradores
  }
  }, [certificaciones])

  const tabs = [
    { id: 'certificados', label: 'Certificados', icon: Award },
    { id: 'generacion', label: 'Generación', icon: Layers },
    { id: 'validacion', label: 'Validación', icon: QrCode },
    { id: 'estadisticas', label: 'Estadísticas', icon: BarChart3 },
    { id: 'configuracion', label: 'Configuración', icon: Settings }
  ]

  // Handlers para acciones
  const handleViewCert = (cert) => {
    setSelectedCert(cert)
    setShowViewModal(true)
  }

  const handleEditCert = (cert) => {
    setSelectedCert(cert)
    setShowEditModal(true)
  }

  const handleDownloadCert = (cert) => {
    alert(`Descargando certificado: ${cert.nombre}. Aquí se generaría el PDF del certificado.`)
    // En producción, aquí se generaría y descargaría el PDF
  }

  const handleDeleteCert = (certId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este certificado?')) {
      alert(`Certificado ${certId} eliminado. En producción, aquí se eliminaría de la base de datos.`)
      // En producción, aquí se eliminaría de la base de datos
    }
  }

  const handleCreateCert = () => {
    alert('Abriendo modal para crear nuevo certificado. Aquí se implementaría el formulario completo.')
    setShowCreateModal(true)
  }

  const handleEditTemplate = (templateName) => {
    alert(`Abriendo editor de plantilla: ${templateName}. Aquí se abriría el editor visual de plantillas.`)
  }

  const handleConfigureAuto = (config) => {
    alert(`Configurando automatización: ${config}. Aquí se abriría el panel de configuración.`)
  }

  const handleGenerateQR = (certId) => {
    if (certId) {
      setQrGeneratorData({ ...qrGeneratorData, certificadoId: certId })
    }
    setShowQRGeneratorModal(true)
  }

  const handleValidateQR = () => {
    if (!qrCodeInput.trim()) {
      alert('Por favor, ingresa un código QR o ID de certificado')
      return
    }
    
    // Buscar el certificado
    const cert = certificaciones.find(c => c.qrCode === qrCodeInput || c.id.toString() === qrCodeInput)
    
    if (cert) {
      // Crear registro de validación
      const newValidation = {
        id: Date.now(),
        qrCode: cert.qrCode,
        certificado: cert.nombre,
        estudiante: 'Usuario Verificador',
        fecha: new Date().toISOString(),
        resultado: cert.estado === 'activo' ? 'valid' : 'invalid',
        metodo: 'QR',
        ip: '192.168.1.100',
        ubicacion: 'Ciudad de México, MX',
        blockchainVerified: !!cert.blockchainHash,
        motivo: cert.estado === 'activo' ? null : 'Certificado no activo'
      }
      
      setValidationHistory([newValidation, ...validationHistory])
      setSelectedValidation(newValidation)
      setShowValidationDetailModal(true)
      setQrCodeInput('')
      
      // Actualizar estadísticas
      setValidationStats(prev => ({
        ...prev,
        totalValidaciones: prev.totalValidaciones + 1,
        validas: newValidation.resultado === 'valid' ? prev.validas + 1 : prev.validas,
        invalidas: newValidation.resultado === 'invalid' ? prev.invalidas + 1 : prev.invalidas,
        validacionesHoy: prev.validacionesHoy + 1
      }))
    } else {
      alert('Código QR o ID de certificado no encontrado')
    }
  }

  const handleConfigureBlockchain = () => {
    setShowBlockchainModal(true)
  }

  const handleConfigureAPI = () => {
    setShowAPIModal(true)
  }
  
  // Nuevas funciones para validación
  const handleViewValidationDetail = (validation) => {
    setSelectedValidation(validation)
    setShowValidationDetailModal(true)
  }
  
  const handleExportValidationReport = (format) => {
    alert(`Exportando reporte de validaciones en formato ${format}. Aquí se generaría el archivo con todos los registros.`)
  }
  
  const handleBulkValidation = () => {
    alert('Abriendo herramienta de validación masiva. Aquí se podrían validar múltiples certificados a la vez.')
  }
  
  const handleGenerateQRBatch = () => {
    setShowQRGeneratorModal(true)
  }
  
  const handleSubmitQRGeneration = () => {
    if (!qrGeneratorData.certificadoId) {
      alert('Por favor, selecciona un certificado')
      return
    }
    
    alert(`Generando ${qrGeneratorData.cantidad} código(s) QR para el certificado ${qrGeneratorData.certificadoId} en formato ${qrGeneratorData.formato} de tamaño ${qrGeneratorData.tamaño}`)
    setShowQRGeneratorModal(false)
    setQrGeneratorData({
      certificadoId: '',
      cantidad: 1,
      formato: 'PNG',
      tamaño: '500x500',
      incluirLogo: true
    })
  }
  
  const handleCameraScan = () => {
    alert('Activando cámara para escanear código QR. En producción, aquí se activaría el acceso a la cámara del dispositivo.')
  }
  
  const handleVerifyBlockchain = (validationId) => {
    const validation = validationHistory.find(v => v.id === validationId)
    if (validation) {
      alert(`Verificando en blockchain para validación ${validationId}...\nHash: ${validation.blockchainVerified ? 'Verificado' : 'No verificado'}`)
    }
  }
  
  const handleDeleteValidation = (validationId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro de validación?')) {
      setValidationHistory(prev => prev.filter(v => v.id !== validationId))
      alert('Registro de validación eliminado exitosamente')
    }
  }
  
  const handleRevalidate = (validation) => {
    setQrCodeInput(validation.qrCode)
    handleValidateQR()
    setShowValidationDetailModal(false)
  }
  
  const handleShareValidation = (validation) => {
    const url = `${window.location.origin}/validar/${validation.qrCode}`
    navigator.clipboard.writeText(url)
    alert(`Enlace de validación copiado al portapapeles: ${url}`)
  }
  
  const handlePrintValidation = (validation) => {
    alert(`Generando versión imprimible del resultado de validación para: ${validation.qrCode}`)
    window.print()
  }
  
  const handleExportFullHistory = (format) => {
    alert(`Exportando historial completo de validaciones en formato ${format}. Total de registros: ${validationHistory.length}`)
  }
  
  const handleClearHistory = () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar todo el historial de validaciones? Se eliminarán ${validationHistory.length} registros.`)) {
      setValidationHistory([])
      alert('Historial de validaciones limpiado exitosamente')
    }
  }
  
  // Filtrar, ordenar y paginar historial de validaciones
  const filteredValidationHistory = useMemo(() => {
    let filtered = validationHistory.filter(v => {
      const matchesSearch = 
        v.qrCode.toLowerCase().includes(validationSearchTerm.toLowerCase()) ||
        v.certificado.toLowerCase().includes(validationSearchTerm.toLowerCase()) ||
        v.estudiante.toLowerCase().includes(validationSearchTerm.toLowerCase())
      
      const matchesFilter = 
        validationFilter === 'all' || 
        (validationFilter === 'valid' && v.resultado === 'valid') ||
        (validationFilter === 'invalid' && v.resultado === 'invalid') ||
        (validationFilter === 'pending' && v.resultado === 'pending')
      
      return matchesSearch && matchesFilter
    })

    // Ordenar
    filtered = [...filtered].sort((a, b) => {
      let aValue, bValue
      
      switch (validationSortBy) {
        case 'fecha':
          aValue = new Date(a.fecha).getTime()
          bValue = new Date(b.fecha).getTime()
          break
        case 'certificado':
          aValue = a.certificado.toLowerCase()
          bValue = b.certificado.toLowerCase()
          break
        case 'estudiante':
          aValue = a.estudiante.toLowerCase()
          bValue = b.estudiante.toLowerCase()
          break
        case 'resultado':
          aValue = a.resultado
          bValue = b.resultado
          break
        default:
          aValue = new Date(a.fecha).getTime()
          bValue = new Date(b.fecha).getTime()
      }

      if (aValue < bValue) return validationSortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return validationSortOrder === 'asc' ? 1 : -1
      return 0
    })

    // Paginación
    const startIndex = (validationPage - 1) * validationItemsPerPage
    return filtered.slice(startIndex, startIndex + validationItemsPerPage)
  }, [validationHistory, validationSearchTerm, validationFilter, validationSortBy, validationSortOrder, validationPage, validationItemsPerPage])

  const totalValidationPages = Math.ceil(
    validationHistory.filter(v => {
      const matchesSearch = 
        v.qrCode.toLowerCase().includes(validationSearchTerm.toLowerCase()) ||
        v.certificado.toLowerCase().includes(validationSearchTerm.toLowerCase()) ||
        v.estudiante.toLowerCase().includes(validationSearchTerm.toLowerCase())
      const matchesFilter = 
        validationFilter === 'all' || 
        (validationFilter === 'valid' && v.resultado === 'valid') ||
        (validationFilter === 'invalid' && v.resultado === 'invalid') ||
        (validationFilter === 'pending' && v.resultado === 'pending')
      return matchesSearch && matchesFilter
    }).length / validationItemsPerPage
  )

  const handleEditTemplateEditor = () => {
    alert('Abriendo editor visual de plantillas. Aquí se abriría el editor drag & drop.')
  }

  const handleSaveDataConfig = () => {
    alert('Guardando configuración de datos. Aquí se guardarían los campos obligatorios y formato de fecha.')
  }

  const handleConfigureLinkedIn = () => {
    alert('Abriendo configuración de LinkedIn. Aquí se configurarían las credenciales de la API de LinkedIn.')
  }

  const handleViewCompliance = (type) => {
    setShowComplianceModal(true)
    // Aquí se cargarían los detalles de cumplimiento según el tipo
  }

  // Nuevas funciones handler
  const handleExportData = (format) => {
    alert(`Exportando datos en formato ${format}. Aquí se generaría el archivo.`)
    // En producción: generar CSV, Excel o PDF
  }

  const handleDuplicateCert = (cert) => {
    const newCert = {
      ...cert,
      id: certificaciones.length + 1,
      nombre: `${cert.nombre} (Copia)`,
      estado: 'borrador',
      estudiantes: 0,
      completados: 0,
      ingresos: 0,
      validaciones: 0
    }
    setCertificaciones([...certificaciones, newCert])
    alert(`Certificado duplicado: ${newCert.nombre}`)
  }

  const handleToggleStatus = (certId) => {
    setCertificaciones(certificaciones.map(cert => 
      cert.id === certId 
        ? { ...cert, estado: cert.estado === 'activo' ? 'pausado' : 'activo' }
        : cert
    ))
  }

  const handleArchiveCert = (certId) => {
    if (window.confirm('¿Archivar este certificado?')) {
      setCertificaciones(certificaciones.map(cert => 
        cert.id === certId ? { ...cert, estado: 'archivado' } : cert
      ))
    }
  }

  const handleShareCert = (cert) => {
    const url = `${window.location.origin}/certificado/${cert.qrCode}`
    navigator.clipboard.writeText(url)
    alert(`Enlace copiado al portapapeles: ${url}`)
  }

  const handleSendEmail = (cert) => {
    alert(`Enviando certificado por email. Aquí se enviaría el certificado a los estudiantes.`)
  }

  const handlePrintCert = (cert) => {
    alert(`Generando versión imprimible del certificado: ${cert.nombre}`)
    window.print()
  }

  const handleViewAnalytics = (cert) => {
    alert(`Abriendo analíticas detalladas para: ${cert.nombre}`)
  }

  // Funciones de filtrado y ordenamiento
  const filteredAndSortedCerts = useMemo(() => {
    let filtered = certificaciones.filter(cert => {
      const matchesSearch = 
        cert.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.categoria.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = filterStatus === 'all' || cert.estado === filterStatus
      const matchesCategory = filterCategory === 'all' || cert.categoria === filterCategory
      
      return matchesSearch && matchesStatus && matchesCategory
    })

    // Ordenar
    filtered = [...filtered].sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'nombre':
          aValue = a.nombre.toLowerCase()
          bValue = b.nombre.toLowerCase()
          break
        case 'estudiantes':
          aValue = a.estudiantes
          bValue = b.estudiantes
          break
        case 'completados':
          aValue = a.completados
          bValue = b.completados
          break
        case 'rating':
          aValue = a.rating
          bValue = b.rating
          break
        case 'precio':
          aValue = a.precio
          bValue = b.precio
          break
        case 'fechaCreacion':
          aValue = new Date(a.fechaCreacion).getTime()
          bValue = new Date(b.fechaCreacion).getTime()
          break
        default:
          aValue = a.nombre
          bValue = b.nombre
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    // Paginación
    const startIndex = (currentPage - 1) * itemsPerPage
    return filtered.slice(startIndex, startIndex + itemsPerPage)
  }, [certificaciones, searchTerm, filterStatus, filterCategory, sortBy, sortOrder, currentPage, itemsPerPage])

  const totalPages = Math.ceil(
    certificaciones.filter(cert => {
      const matchesSearch = 
        cert.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || cert.estado === filterStatus
      const matchesCategory = filterCategory === 'all' || cert.categoria === filterCategory
      return matchesSearch && matchesStatus && matchesCategory
    }).length / itemsPerPage
  )

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const renderCertificados = () => (
    <div className="space-y-6">
      {/* Header con acciones */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestión de Certificados</h2>
          <p className="text-white/70">Administra y configura los certificados digitales</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleExportData('Excel')}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
          <button
            onClick={handleCreateCert}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Certificado</span>
          </button>
        </div>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total</p>
              <p className="text-2xl font-bold text-white">{estadisticas.totalCertificados}</p>
            </div>
            <Award className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Activos</p>
              <p className="text-2xl font-bold text-green-400">{estadisticas.certificadosActivos}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Completados</p>
              <p className="text-2xl font-bold text-white">{estadisticas.estudiantesCertificados}</p>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Ingresos</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(estadisticas.ingresosGenerados)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda avanzados */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
                placeholder="Buscar por nombre, descripción, categoría..."
              value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value)
                setCurrentPage(1)
              }}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="all">Todos los estados</option>
            <option value="activo">Activos</option>
            <option value="borrador">Borradores</option>
              <option value="pausado">Pausados</option>
            <option value="vencido">Vencidos</option>
              <option value="archivado">Archivados</option>
          </select>
            <select
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="all">Todas las categorías</option>
              <option value="Ciencias">Ciencias</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Educación">Educación</option>
              <option value="Arte">Arte</option>
              <option value="Negocios">Negocios</option>
            </select>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-')
                setSortBy(field)
                setSortOrder(order)
              }}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="nombre-asc">Nombre A-Z</option>
              <option value="nombre-desc">Nombre Z-A</option>
              <option value="estudiantes-desc">Más estudiantes</option>
              <option value="completados-desc">Más completados</option>
              <option value="rating-desc">Mejor rating</option>
              <option value="precio-desc">Mayor precio</option>
              <option value="fechaCreacion-desc">Más recientes</option>
            </select>
            <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1 border border-white/20">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white'}`}
              >
                <List className="w-4 h-4" />
          </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de certificados */}
      {viewMode === 'grid' ? (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedCerts.map((cert) => (
            <div key={cert.id} className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200 hover:scale-105">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{cert.nombre}</h3>
                  <p className="text-white/70 text-sm">{cert.categoria}</p>
                </div>
              </div>
                <div className="flex flex-col items-end gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  cert.estado === 'activo' 
                    ? 'bg-green-500/20 text-green-300' 
                    : cert.estado === 'borrador'
                    ? 'bg-yellow-500/20 text-yellow-300'
                      : cert.estado === 'pausado'
                      ? 'bg-orange-500/20 text-orange-300'
                      : cert.estado === 'vencido'
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-gray-500/20 text-gray-300'
                }`}>
                  {cert.estado}
                </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs font-medium">{cert.rating}</span>
                  </div>
              </div>
            </div>

            {/* Descripción */}
              <p className="text-white/70 text-sm mb-4 line-clamp-2">{cert.descripcion}</p>

            {/* Estadísticas */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-white/5 rounded-lg">
                  <p className="text-xl font-bold text-white">{cert.estudiantes.toLocaleString()}</p>
                  <p className="text-white/60 text-xs">Estudiantes</p>
              </div>
                <div className="text-center p-2 bg-white/5 rounded-lg">
                  <p className="text-xl font-bold text-green-400">{cert.completados.toLocaleString()}</p>
                  <p className="text-white/60 text-xs">Completados</p>
                </div>
                <div className="text-center p-2 bg-white/5 rounded-lg">
                  <p className="text-xl font-bold text-yellow-400">{formatCurrency(cert.ingresos)}</p>
                  <p className="text-white/60 text-xs">Ingresos</p>
              </div>
            </div>

              {/* Progreso */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-white/70 mb-1">
                  <span>Tasa de completación</span>
                  <span>{cert.estudiantes > 0 ? ((cert.completados / cert.estudiantes) * 100).toFixed(1) : 0}%</span>
              </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                    style={{ width: `${cert.estudiantes > 0 ? (cert.completados / cert.estudiantes) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Precio y duración */}
              <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                <div>
                  <p className="text-white font-bold text-lg">{formatCurrency(cert.precio)}</p>
                <p className="text-white/70 text-xs">{cert.duracion}</p>
              </div>
                {cert.qrCode && (
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <QrCode className="w-3 h-3" />
                    <span>{cert.qrCode}</span>
                  </div>
                )}
            </div>

              {/* Acciones principales */}
              <div className="flex items-center space-x-2 mb-2">
                <button 
                  onClick={() => handleViewCert(cert)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm"
                >
                <Eye className="w-4 h-4 text-white/70" />
                  <span className="text-white">Ver</span>
              </button>
                <button 
                  onClick={() => handleEditCert(cert)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm"
                >
                <Edit className="w-4 h-4 text-white/70" />
                  <span className="text-white">Editar</span>
              </button>
                <button 
                  onClick={() => handleViewAnalytics(cert)}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  title="Analíticas"
                >
                  <BarChart3 className="w-4 h-4 text-white/70" />
                </button>
              </div>

              {/* Acciones secundarias */}
              <div className="flex items-center space-x-1 pt-2 border-t border-white/10">
                <button 
                  onClick={() => handleDownloadCert(cert)}
                  className="flex-1 px-2 py-1.5 bg-white/5 rounded text-xs text-white/70 hover:bg-white/10 transition-colors flex items-center justify-center gap-1"
                  title="Descargar"
                >
                  <Download className="w-3 h-3" />
                  <span>PDF</span>
                </button>
                <button 
                  onClick={() => handleShareCert(cert)}
                  className="flex-1 px-2 py-1.5 bg-white/5 rounded text-xs text-white/70 hover:bg-white/10 transition-colors flex items-center justify-center gap-1"
                  title="Compartir"
                >
                  <Share2 className="w-3 h-3" />
                  <span>Compartir</span>
                </button>
                <button 
                  onClick={() => handleDuplicateCert(cert)}
                  className="flex-1 px-2 py-1.5 bg-white/5 rounded text-xs text-white/70 hover:bg-white/10 transition-colors flex items-center justify-center gap-1"
                  title="Duplicar"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copiar</span>
                </button>
                <button 
                  onClick={() => handleToggleStatus(cert.id)}
                  className="px-2 py-1.5 bg-white/5 rounded text-xs text-white/70 hover:bg-white/10 transition-colors"
                  title={cert.estado === 'activo' ? 'Pausar' : 'Activar'}
                >
                  {cert.estado === 'activo' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
                <button 
                  onClick={() => handleDeleteCert(cert.id)}
                  className="px-2 py-1.5 bg-white/5 rounded text-xs text-white/70 hover:bg-red-500/20 transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div className="space-y-3">
          {filteredAndSortedCerts.map((cert) => (
            <div key={cert.id} className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-white">{cert.nombre}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cert.estado === 'activo' ? 'bg-green-500/20 text-green-300' : 
                        cert.estado === 'borrador' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {cert.estado}
                      </span>
                      <span className="text-white/60 text-sm">{cert.categoria}</span>
                    </div>
                    <p className="text-white/70 text-sm mb-2">{cert.descripcion}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-white/60">{cert.estudiantes} estudiantes</span>
                      <span className="text-green-400">{cert.completados} completados</span>
                      <span className="text-yellow-400">{formatCurrency(cert.ingresos)}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-white/70">{cert.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleViewCert(cert)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20"><Eye className="w-4 h-4" /></button>
                  <button onClick={() => handleEditCert(cert)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDownloadCert(cert)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20"><Download className="w-4 h-4" /></button>
                  <button onClick={() => handleDeleteCert(cert.id)} className="p-2 bg-white/10 rounded-lg hover:bg-red-500/20"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-white/70 text-sm">
            Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedCerts.length)} de {certificaciones.length} certificados
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              Anterior
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPage === idx + 1
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  )

  const renderGeneracion = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Generación de Certificados</h2>
        <p className="text-white/70">Plantillas, automatización y configuración de seguridad</p>
        </div>
        <button
          onClick={handleEditTemplateEditor}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Plantilla</span>
        </button>
      </div>

      {/* Tres columnas principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plantillas */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              Plantillas
            </h3>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300">CORE</span>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Plantilla básica', desc: 'Diseño simple y profesional', usado: 5, icon: FileText },
              { name: 'Plantilla premium', desc: 'Diseño elegante con efectos', usado: 8, icon: Star },
              { name: 'Plantilla corporativa', desc: 'Diseño formal para empresas', usado: 3, icon: Briefcase },
              { name: 'Plantilla académica', desc: 'Diseño tradicional educativo', usado: 2, icon: GraduationCap }
            ].map((template, idx) => (
              <button 
                key={idx}
                onClick={() => {
                  setSelectedTemplate(template)
                  setShowTemplateModal(true)
                }}
                className="w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left border border-white/10 hover:border-purple-500/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/90 text-sm font-medium">{template.name}</p>
                    <p className="text-white/60 text-xs">{template.desc}</p>
                    <p className="text-white/50 text-xs mt-1">{template.usado} certificados usan esta plantilla</p>
            </div>
                  <div className="flex items-center gap-2">
                    <Edit className="w-4 h-4 text-white/50" />
            </div>
            </div>
              </button>
            ))}
            <button 
              onClick={handleEditTemplateEditor}
              className="w-full p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg hover:from-purple-500/30 hover:to-pink-500/30 transition-colors text-left border border-purple-500/30"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-purple-400" />
                <p className="text-white/90 text-sm font-medium">Crear nueva plantilla</p>
            </div>
              <p className="text-white/60 text-xs mt-1">Editor visual drag & drop</p>
            </button>
          </div>
        </div>

        {/* Generación Automática */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-green-400" />
              Automática
            </h3>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300">CORE</span>
          </div>
          <div className="space-y-3">
            {[
              { 
                title: 'Al completar 100%', 
                desc: 'Generación automática al finalizar curso',
                enabled: true,
                config: 'completar100'
              },
              { 
                title: 'Verificación requisitos', 
                desc: 'Validar que se cumplan todos los requisitos',
                enabled: true,
                config: 'verificarRequisitos'
              },
              { 
                title: 'Validación identidad', 
                desc: 'Confirmar identidad del estudiante',
                enabled: false,
                config: 'validarIdentidad'
              },
              { 
                title: 'Notificación email', 
                desc: 'Envío automático por correo electrónico',
                enabled: true,
                config: 'notificacionEmail'
              },
              { 
                title: 'Publicación LinkedIn', 
                desc: 'Publicar automáticamente en LinkedIn',
                enabled: false,
                config: 'linkedin'
              },
              { 
                title: 'Registro Blockchain', 
                desc: 'Registrar certificado en blockchain',
                enabled: false,
                config: 'blockchain'
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleConfigureAuto(item.config)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        item.enabled 
                          ? 'bg-green-500 border-green-500' 
                          : 'bg-transparent border-white/30'
                      }`}
                    >
                      {item.enabled && <CheckCircle className="w-3 h-3 text-white" />}
                    </button>
                    <p className="text-white/90 text-sm font-medium">{item.title}</p>
            </div>
                  <Settings className="w-4 h-4 text-white/50 cursor-pointer hover:text-white" onClick={() => handleConfigureAuto(item.config)} />
            </div>
                <p className="text-white/60 text-xs ml-7">{item.desc}</p>
            </div>
            ))}
          </div>
        </div>

        {/* Seguridad */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Seguridad
            </h3>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300">SECOND</span>
          </div>
          <div className="space-y-3">
            {[
              { 
                name: 'Código único', 
                desc: 'Código alfanumérico único por certificado',
                enabled: true,
                icon: Key,
                color: 'yellow'
              },
              { 
                name: 'Sello autenticidad', 
                desc: 'Sello digital de autenticidad',
                enabled: true,
                icon: Lock,
                color: 'red'
              },
              { 
                name: 'Validez temporal', 
                desc: 'Fecha de expiración configurable',
                enabled: true,
                icon: Calendar,
                color: 'cyan'
              },
              { 
                name: 'Blockchain', 
                desc: 'Registro inmutable en blockchain',
                enabled: false,
                icon: Link2,
                color: 'purple'
              },
              { 
                name: 'Firma digital', 
                desc: 'Firma digital del emisor',
                enabled: false,
                icon: FileCheck,
                color: 'green'
              },
              { 
                name: 'Encriptación', 
                desc: 'Datos encriptados en el certificado',
                enabled: true,
                icon: Shield,
                color: 'blue'
              }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div 
                  key={idx}
                  className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-${item.color}-500/20 rounded-lg`}>
                        <Icon className={`w-4 h-4 text-${item.color}-400`} />
            </div>
                      <div>
                        <p className="text-white/90 text-sm font-medium">{item.name}</p>
                        <p className="text-white/60 text-xs">{item.desc}</p>
            </div>
            </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.enabled 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {item.enabled ? 'Activo' : 'Inactivo'}
                      </span>
                      <Settings className="w-4 h-4 text-white/50 cursor-pointer hover:text-white" />
            </div>
                  </div>
                </div>
              )
            })}
            <button
              onClick={handleConfigureBlockchain}
              className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Configurar Seguridad Avanzada
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderValidacion = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Validación y Verificación</h2>
          <p className="text-white/70">Sistema QR, blockchain, API e historial completo de validaciones</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleExportValidationReport('PDF')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Reporte</span>
          </button>
          <button
            onClick={handleBulkValidation}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <ZapIcon className="w-4 h-4" />
            <span>Validación Masiva</span>
          </button>
        </div>
      </div>

      {/* Estadísticas de Validación */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-5 border border-green-500/30">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <CheckCircle2Icon className="w-6 h-6 text-green-400" />
          </div>
            <span className="text-2xl font-bold text-white">{validationStats.validas}</span>
          </div>
          <h3 className="text-white font-semibold text-sm mb-1">Válidas</h3>
          <p className="text-white/60 text-xs">{((validationStats.validas / validationStats.totalValidaciones) * 100).toFixed(1)}% del total</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl p-5 border border-red-500/30">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <span className="text-2xl font-bold text-white">{validationStats.invalidas}</span>
          </div>
          <h3 className="text-white font-semibold text-sm mb-1">Inválidas</h3>
          <p className="text-white/60 text-xs">{((validationStats.invalidas / validationStats.totalValidaciones) * 100).toFixed(1)}% del total</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-5 border border-yellow-500/30">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <ClockIcon className="w-6 h-6 text-yellow-400" />
            </div>
            <span className="text-2xl font-bold text-white">{validationStats.pendientes}</span>
          </div>
          <h3 className="text-white font-semibold text-sm mb-1">Pendientes</h3>
          <p className="text-white/60 text-xs">En proceso de verificación</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-5 border border-blue-500/30">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-white">{validationStats.totalValidaciones}</span>
          </div>
          <h3 className="text-white font-semibold text-sm mb-1">Total Validaciones</h3>
          <p className="text-white/60 text-xs">{validationStats.validacionesHoy} hoy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Validación QR */}
        <div className="lg:col-span-2 space-y-6">
          {/* Panel de Validación QR */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <QrCode className="w-6 h-6 text-green-400" />
                </div>
            <div>
                  <h3 className="text-xl font-bold text-white">Validación QR</h3>
                  <p className="text-white/60 text-sm">Escanea o ingresa código QR para verificar</p>
              </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30">CORE</span>
            </div>

            {/* Búsqueda y validación */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Ingresar código QR o ID de certificado..."
                  value={qrCodeInput}
                  onChange={(e) => setQrCodeInput(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleValidateQR()
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleValidateQR}
                  className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2 font-semibold shadow-lg"
                >
                  <QrCode className="w-5 h-5" />
                  Validar Código
                </button>
                <button
                  onClick={handleCameraScan}
                  className="px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 font-semibold"
                >
                  <Camera className="w-5 h-5" />
                  Escanear QR
                </button>
              </div>
            </div>

            {/* Características */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Generación QR
                </h4>
                <ul className="space-y-2">
                  {['Códigos únicos', 'Enlace directo', 'Datos encriptados', 'Alta resolución'].map((feature, idx) => (
                    <li key={idx} className="text-white/70 text-xs flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleGenerateQRBatch}
                  className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <QrCode className="w-4 h-4" />
                  Generar QR
                </button>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  Verificación
                </h4>
                <ul className="space-y-2">
                  {['Escaneo instantáneo', 'Tiempo real', 'Autenticidad', 'Historial completo'].map((feature, idx) => (
                    <li key={idx} className="text-white/70 text-xs flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-blue-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowValidationModal(true)}
                  className="mt-4 w-full px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <FileSearch className="w-4 h-4" />
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>

          {/* Historial de Validaciones */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <History className="w-6 h-6 text-blue-400" />
            </div>
            <div>
                  <h3 className="text-xl font-bold text-white">Historial de Validaciones</h3>
                  <p className="text-white/60 text-sm">
                    {validationHistory.filter(v => {
                      const matchesSearch = 
                        v.qrCode.toLowerCase().includes(validationSearchTerm.toLowerCase()) ||
                        v.certificado.toLowerCase().includes(validationSearchTerm.toLowerCase()) ||
                        v.estudiante.toLowerCase().includes(validationSearchTerm.toLowerCase())
                      const matchesFilter = 
                        validationFilter === 'all' || 
                        (validationFilter === 'valid' && v.resultado === 'valid') ||
                        (validationFilter === 'invalid' && v.resultado === 'invalid') ||
                        (validationFilter === 'pending' && v.resultado === 'pending')
                      return matchesSearch && matchesFilter
                    }).length} registros encontrados
                  </p>
              </div>
            </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExportFullHistory('Excel')}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-all flex items-center gap-2"
                  title="Exportar historial completo"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClearHistory}
                  className="px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm hover:bg-red-500/30 transition-all flex items-center gap-2"
                  title="Limpiar historial"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <select
                  value={validationFilter}
                  onChange={(e) => {
                    setValidationFilter(e.target.value)
                    setValidationPage(1)
                  }}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="all">Todos</option>
                  <option value="valid">Válidas</option>
                  <option value="invalid">Inválidas</option>
                  <option value="pending">Pendientes</option>
                </select>
          </div>
        </div>

            {/* Búsqueda y ordenamiento en historial */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type="text"
                  placeholder="Buscar en historial..."
                  value={validationSearchTerm}
                  onChange={(e) => {
                    setValidationSearchTerm(e.target.value)
                    setValidationPage(1)
                  }}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={validationSortBy}
                  onChange={(e) => {
                    setValidationSortBy(e.target.value)
                    setValidationPage(1)
                  }}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="fecha">Ordenar por fecha</option>
                  <option value="certificado">Ordenar por certificado</option>
                  <option value="estudiante">Ordenar por estudiante</option>
                  <option value="resultado">Ordenar por resultado</option>
                </select>
                <button
                  onClick={() => {
                    setValidationSortOrder(validationSortOrder === 'asc' ? 'desc' : 'asc')
                    setValidationPage(1)
                  }}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
                  title={validationSortOrder === 'asc' ? 'Orden descendente' : 'Orden ascendente'}
                >
                  {validationSortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Lista de validaciones */}
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {filteredValidationHistory.length > 0 ? (
                filteredValidationHistory.map((validation) => (
                  <div
                    key={validation.id}
                    onClick={() => handleViewValidationDetail(validation)}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            validation.resultado === 'valid' 
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                              : validation.resultado === 'invalid'
                              ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                              : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          }`}>
                            {validation.resultado === 'valid' ? 'Válido' : validation.resultado === 'invalid' ? 'Inválido' : 'Pendiente'}
                          </span>
                          <span className="text-white/60 text-xs">{validation.metodo}</span>
                          {validation.blockchainVerified && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              Blockchain
                            </span>
                          )}
                        </div>
                        <h4 className="text-white font-semibold mb-1">{validation.certificado}</h4>
                        <p className="text-white/70 text-sm mb-2">{validation.estudiante}</p>
                        <div className="flex items-center gap-4 text-xs text-white/60">
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            {new Date(validation.fecha).toLocaleString('es-MX')}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPinIcon className="w-3 h-3" />
                            {validation.ubicacion}
                          </span>
                        </div>
                        <p className="text-white/50 text-xs mt-2 font-mono">{validation.qrCode}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRevalidate(validation)
                          }}
                          className="p-2 hover:bg-green-500/20 rounded-lg transition-colors"
                          title="Revalidar"
                        >
                          <RefreshCw className="w-4 h-4 text-green-400" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleShareValidation(validation)
                          }}
                          className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                          title="Compartir"
                        >
                          <Share2 className="w-4 h-4 text-blue-400" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePrintValidation(validation)
                          }}
                          className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
                          title="Imprimir"
                        >
                          <Printer className="w-4 h-4 text-purple-400" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewValidationDetail(validation)
                          }}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4 text-white/60" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteValidation(validation.id)
                          }}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileSearch className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <p className="text-white/60 text-sm">No se encontraron validaciones</p>
                </div>
              )}
            </div>

            {/* Paginación */}
            {totalValidationPages > 1 && (
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
                <p className="text-white/70 text-sm">
                  Página {validationPage} de {totalValidationPages}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setValidationPage(prev => Math.max(1, prev - 1))}
                    disabled={validationPage === 1}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors text-sm"
                  >
                    Anterior
                  </button>
                  {[...Array(Math.min(5, totalValidationPages))].map((_, idx) => {
                    let pageNum
                    if (totalValidationPages <= 5) {
                      pageNum = idx + 1
                    } else if (validationPage <= 3) {
                      pageNum = idx + 1
                    } else if (validationPage >= totalValidationPages - 2) {
                      pageNum = totalValidationPages - 4 + idx
                    } else {
                      pageNum = validationPage - 2 + idx
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => setValidationPage(pageNum)}
                        className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                          validationPage === pageNum
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  <button
                    onClick={() => setValidationPage(prev => Math.min(totalValidationPages, prev + 1))}
                    disabled={validationPage === totalValidationPages}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors text-sm"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Columna derecha - Blockchain y API */}
        <div className="space-y-6">
          {/* Blockchain */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Link2 className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Blockchain</h3>
                  <p className="text-white/60 text-xs">Registro inmutable</p>
                </div>
              </div>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300">SECOND</span>
          </div>
            <div className="space-y-3 mb-4">
              {[
                { icon: Database, text: 'Registro inmutable', color: 'purple' },
                { icon: Network, text: 'Descentralizado', color: 'blue' },
                { icon: ShieldCheck, text: 'Autenticidad garantizada', color: 'green' },
                { icon: Lock, text: 'Anti-falsificación', color: 'red' }
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Icon className={`w-4 h-4 text-${item.color}-400`} />
                    <span className="text-white/80 text-sm">{item.text}</span>
                  </div>
                )
              })}
            </div>
            <button
              onClick={handleConfigureBlockchain}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 font-semibold"
            >
              <Link2 className="w-5 h-5" />
              Configurar Blockchain
            </button>
          </div>

          {/* API Verificación */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Server className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">API Verificación</h3>
                  <p className="text-white/60 text-xs">Endpoint público</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300">SECOND</span>
            </div>
            <div className="space-y-3 mb-4">
              {[
                { icon: GlobeIcon, text: 'Endpoint público', color: 'blue' },
                { icon: BookOpenIcon, text: 'Documentación completa', color: 'green' },
                { icon: Code, text: 'Integración externa', color: 'purple' },
                { icon: Shield, text: 'Rate limiting', color: 'yellow' }
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Icon className={`w-4 h-4 text-${item.color}-400`} />
                    <span className="text-white/80 text-sm">{item.text}</span>
                  </div>
                )
              })}
            </div>
            <button
              onClick={handleConfigureAPI}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 font-semibold"
            >
              <Server className="w-5 h-5" />
              Configurar API
            </button>
          </div>

          {/* Estadísticas rápidas */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Estadísticas
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/70 text-sm">Hoy</span>
                <span className="text-white font-bold">{validationStats.validacionesHoy}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/70 text-sm">Esta semana</span>
                <span className="text-white font-bold">{validationStats.validacionesSemana}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/70 text-sm">Este mes</span>
                <span className="text-white font-bold">{validationStats.validacionesMes}</span>
              </div>
            </div>
          </div>

          {/* Gráfico de distribución */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-400" />
              Distribución
            </h3>
          <div className="space-y-4">
            <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-sm">Válidas</span>
                  <span className="text-white font-semibold">
                    {((validationStats.validas / validationStats.totalValidaciones) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all"
                    style={{ width: `${(validationStats.validas / validationStats.totalValidaciones) * 100}%` }}
                  />
              </div>
            </div>
            <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-sm">Inválidas</span>
                  <span className="text-white font-semibold">
                    {((validationStats.invalidas / validationStats.totalValidaciones) * 100).toFixed(1)}%
                  </span>
              </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all"
                    style={{ width: `${(validationStats.invalidas / validationStats.totalValidaciones) * 100}%` }}
                  />
            </div>
          </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-sm">Pendientes</span>
                  <span className="text-white font-semibold">
                    {((validationStats.pendientes / validationStats.totalValidaciones) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all"
                    style={{ width: `${(validationStats.pendientes / validationStats.totalValidaciones) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEstadisticas = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Estadísticas de Certificaciones</h2>
        <p className="text-white/70">Análisis y métricas de rendimiento</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">{estadisticas.totalCertificados}</span>
          </div>
          <h3 className="text-white font-semibold mb-1 text-sm">Total Certificados</h3>
          <p className="text-white/70 text-xs">Certificados disponibles</p>
          <div className="mt-3 flex items-center gap-1 text-xs">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-green-400">+12% este mes</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">{estadisticas.estudiantesCertificados.toLocaleString()}</span>
          </div>
          <h3 className="text-white font-semibold mb-1 text-sm">Estudiantes Certificados</h3>
          <p className="text-white/70 text-xs">Total de graduados</p>
          <div className="mt-3 flex items-center gap-1 text-xs">
            <Percent className="w-3 h-3 text-blue-400" />
            <span className="text-blue-400">{estadisticas.tasaCompletacion}% tasa</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">{formatCurrency(estadisticas.ingresosGenerados)}</span>
          </div>
          <h3 className="text-white font-semibold mb-1 text-sm">Ingresos Generados</h3>
          <p className="text-white/70 text-xs">En certificaciones</p>
          <div className="mt-3 flex items-center gap-1 text-xs">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-green-400">+8% este mes</span>
        </div>
      </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">{estadisticas.promedioRating}</span>
          </div>
          <h3 className="text-white font-semibold mb-1 text-sm">Rating Promedio</h3>
          <p className="text-white/70 text-xs">Calificación promedio</p>
          <div className="mt-3 flex items-center gap-1 text-xs">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-yellow-400">Excelente</span>
          </div>
        </div>
      </div>

      {/* Gráficos y análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Certificados por Categoría</h3>
            <button
              onClick={() => handleExportData('PDF')}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Download className="w-4 h-4 text-white/70" />
            </button>
          </div>
          <div className="space-y-3">
            {[
              { categoria: 'Ciencias', cantidad: certificaciones.filter(c => c.categoria === 'Ciencias').length, porcentaje: 33, color: 'from-blue-500 to-cyan-500' },
              { categoria: 'Tecnología', cantidad: certificaciones.filter(c => c.categoria === 'Tecnología').length, porcentaje: 27, color: 'from-purple-500 to-pink-500' },
              { categoria: 'Educación', cantidad: certificaciones.filter(c => c.categoria === 'Educación').length, porcentaje: 20, color: 'from-green-500 to-emerald-500' },
              { categoria: 'Arte', cantidad: certificaciones.filter(c => c.categoria === 'Arte').length, porcentaje: 13, color: 'from-yellow-500 to-orange-500' },
              { categoria: 'Negocios', cantidad: certificaciones.filter(c => c.categoria === 'Negocios').length, porcentaje: 7, color: 'from-red-500 to-pink-500' }
            ].filter(item => item.cantidad > 0).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}></div>
                  <span className="text-white/90 font-medium">{item.categoria}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all`}
                      style={{ width: `${item.porcentaje}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-semibold min-w-[3rem] text-right">{item.cantidad}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Estado de Certificados</h3>
            <button
              onClick={() => handleExportData('Excel')}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Download className="w-4 h-4 text-white/70" />
            </button>
          </div>
          <div className="space-y-3">
            {[
              { estado: 'Activos', cantidad: estadisticas.certificadosActivos, icon: CheckCircle, color: 'green', bg: 'bg-green-500/20' },
              { estado: 'Borradores', cantidad: estadisticas.certificadosBorradores, icon: Clock, color: 'yellow', bg: 'bg-yellow-500/20' },
              { estado: 'Vencidos', cantidad: estadisticas.certificadosVencidos, icon: AlertTriangle, color: 'red', bg: 'bg-red-500/20' },
              { estado: 'Archivados', cantidad: certificaciones.filter(c => c.estado === 'archivado').length, icon: Archive, color: 'gray', bg: 'bg-gray-500/20' }
            ].map((item, index) => {
              const Icon = item.icon
              const porcentaje = estadisticas.totalCertificados > 0 
                ? (item.cantidad / estadisticas.totalCertificados * 100).toFixed(1)
                : 0
              return (
                <div key={index} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                      <div className={`p-2 ${item.bg} rounded-lg`}>
                        <Icon className={`w-5 h-5 text-${item.color}-400`} />
              </div>
                      <span className="text-white font-medium">{item.estado}</span>
            </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white/60 text-sm">{porcentaje}%</span>
                      <span className="text-white font-bold text-lg">{item.cantidad}</span>
              </div>
            </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden ml-14">
                    <div 
                      className={`h-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-full transition-all`}
                      style={{ width: `${porcentaje}%` }}
                    ></div>
              </div>
            </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Gráfico de tendencias */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Tendencias de Certificaciones (Últimos 6 meses)</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExportData('PDF')}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Download className="w-4 h-4 text-white/70" />
            </button>
            <button
              onClick={() => alert('Actualizando datos...')}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>
        <div className="h-64 flex items-end justify-between gap-2">
          {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'].map((mes, idx) => {
            const altura = [65, 75, 80, 85, 90, 95][idx]
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-white/10 rounded-t-lg relative overflow-hidden" style={{ height: `${altura}%` }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg" style={{ height: '100%' }}></div>
                </div>
                <span className="text-white/70 text-xs">{mes}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderConfiguracion = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Configuración del Sistema</h2>
        <p className="text-white/70">Editor de plantillas, integraciones y cumplimiento legal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor de Plantillas */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Edit className="w-5 h-5 text-purple-400" />
              Editor de Plantillas
            </h3>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300">SECOND</span>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-white/90 text-sm">✓ Editor drag & drop</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-white/90 text-sm">✓ Elementos personalizables</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-white/90 text-sm">✓ Preview en tiempo real</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-white/90 text-sm">✓ Biblioteca de elementos</p>
            </div>
            <button
              onClick={handleEditTemplateEditor}
              className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Abrir Editor
            </button>
          </div>
        </div>

        {/* Configuración de Datos */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            Configuración de Datos
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Campos obligatorios</label>
              <div className="space-y-2">
                {['Nombre completo', 'Email', 'Calificación', 'Fecha de emisión', 'ID único'].map((campo, idx) => (
                  <label key={idx} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer">
                    <input type="checkbox" defaultChecked={idx < 3} className="rounded" />
                    <span className="text-white/90 text-sm">{campo}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Formato de fecha</label>
              <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                <option className="bg-gray-800">DD/MM/YYYY</option>
                <option className="bg-gray-800">MM/DD/YYYY</option>
                <option className="bg-gray-800">YYYY-MM-DD</option>
                <option className="bg-gray-800">DD de MMMM de YYYY</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Idioma por defecto</label>
              <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                <option className="bg-gray-800">Español</option>
                <option className="bg-gray-800">Inglés</option>
                <option className="bg-gray-800">Francés</option>
                <option className="bg-gray-800">Portugués</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Formato de archivo</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer">
                  <input type="radio" name="formato" defaultChecked className="text-purple-600" />
                  <span className="text-white/90 text-sm">PDF (Recomendado)</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer">
                  <input type="radio" name="formato" className="text-purple-600" />
                  <span className="text-white/90 text-sm">PNG (Imagen)</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer">
                  <input type="radio" name="formato" className="text-purple-600" />
                  <span className="text-white/90 text-sm">Ambos</span>
                </label>
              </div>
            </div>
            <button
              onClick={handleSaveDataConfig}
              className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Guardar Configuración
            </button>
          </div>
        </div>
      </div>

      {/* Integración LinkedIn */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            Integración con LinkedIn
          </h3>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300">SECOND</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={handleConfigureLinkedIn}
            className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <p className="text-white/90 text-sm">API LinkedIn Learning</p>
          </button>
          <button 
            onClick={handleConfigureLinkedIn}
            className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <p className="text-white/90 text-sm">Sincronización automática</p>
          </button>
          <button 
            onClick={handleConfigureLinkedIn}
            className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <p className="text-white/90 text-sm">Verificación de perfil</p>
          </button>
          <button 
            onClick={handleConfigureLinkedIn}
            className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <p className="text-white/90 text-sm">Publicación automática</p>
          </button>
          </div>
        <button
          onClick={handleConfigureLinkedIn}
          className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Globe className="w-4 h-4" />
          Configurar Integración LinkedIn
        </button>
      </div>

      {/* Cumplimiento Legal */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" />
            Cumplimiento Legal
          </h3>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300">SECOND</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => handleViewCompliance('Regulaciones mexicanas')}
            className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <AlertCircle className="w-5 h-5 text-yellow-400 mb-2" />
            <p className="text-white/90 text-sm">Regulaciones mexicanas</p>
          </button>
          <button 
            onClick={() => handleViewCompliance('Estándares internacionales')}
            className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <Globe className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-white/90 text-sm">Estándares internacionales</p>
          </button>
          <button 
            onClick={() => handleViewCompliance('Certificaciones de calidad')}
            className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <CheckCircle className="w-5 h-5 text-green-400 mb-2" />
            <p className="text-white/90 text-sm">Certificaciones de calidad</p>
          </button>
          <button 
            onClick={() => handleViewCompliance('Auditorías')}
            className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <FileText className="w-5 h-5 text-purple-400 mb-2" />
            <p className="text-white/90 text-sm">Auditorías</p>
          </button>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'certificados': return renderCertificados()
      case 'generacion': return renderGeneracion()
      case 'validacion': return renderValidacion()
      case 'estadisticas': return renderEstadisticas()
      case 'configuracion': return renderConfiguracion()
      default: return renderCertificados()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Certificaciones</h1>
            <p className="text-white/70">Gestiona los certificados digitales y su configuración</p>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-xl rounded-lg p-1 border border-white/20">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Contenido de la tab activa */}
        {renderTabContent()}
      </div>

      {/* Modal de Ver Certificado */}
      {showViewModal && selectedCert && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => setShowViewModal(false)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
          }}
        >
          <div 
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-4xl h-[85vh] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/20 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedCert.nombre}</h3>
                  <p className="text-white/70 text-sm">{selectedCert.categoria}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowViewModal(false)}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
              <div className="space-y-6">
                {/* Información General */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-400" />
                    Descripción
                  </h4>
                  <p className="text-white/70 leading-relaxed">{selectedCert.descripcion}</p>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/60 text-xs mb-1">Duración</p>
                    <p className="text-white font-bold text-lg">{selectedCert.duracion}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/60 text-xs mb-1">Precio</p>
                    <p className="text-white font-bold text-lg">{formatCurrency(selectedCert.precio)}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/60 text-xs mb-1">Estudiantes</p>
                    <p className="text-white font-bold text-lg">{selectedCert.estudiantes.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/60 text-xs mb-1">Completados</p>
                    <p className="text-green-400 font-bold text-lg">{selectedCert.completados.toLocaleString()}</p>
                  </div>
                </div>

                {/* Progreso y Rating */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold text-sm">Tasa de Completación</h4>
                      <span className="text-white/70 text-sm">
                        {selectedCert.estudiantes > 0 ? ((selectedCert.completados / selectedCert.estudiantes) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                        style={{ width: `${selectedCert.estudiantes > 0 ? (selectedCert.completados / selectedCert.estudiantes) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold text-sm">Rating</h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-bold">{selectedCert.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`w-5 h-5 ${star <= Math.round(selectedCert.rating) ? 'text-yellow-400 fill-current' : 'text-white/20'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Fechas y Códigos */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/60 text-xs mb-1">Fecha de Creación</p>
                    <p className="text-white font-semibold">{formatDate(selectedCert.fechaCreacion)}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/60 text-xs mb-1">Fecha de Vencimiento</p>
                    <p className="text-white font-semibold">{formatDate(selectedCert.fechaVencimiento)}</p>
                  </div>
                  {selectedCert.qrCode && (
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-white/60 text-xs mb-1">Código QR</p>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-mono text-sm">{selectedCert.qrCode}</p>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedCert.qrCode)
                            alert('Código copiado')
                          }}
                          className="p-1 hover:bg-white/10 rounded"
                        >
                          <Copy className="w-4 h-4 text-white/70" />
                        </button>
                      </div>
                    </div>
                  )}
                  {selectedCert.blockchainHash && (
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-white/60 text-xs mb-1">Hash Blockchain</p>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-mono text-xs truncate">{selectedCert.blockchainHash}</p>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedCert.blockchainHash)
                            alert('Hash copiado')
                          }}
                          className="p-1 hover:bg-white/10 rounded"
                        >
                          <Copy className="w-4 h-4 text-white/70" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Requisitos */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Requisitos para Obtener el Certificado
                  </h4>
                  <ul className="space-y-2">
                    {selectedCert.requisitos.map((req, idx) => (
                      <li key={idx} className="text-white/70 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Habilidades */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    Habilidades Certificadas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.habilidades.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleEditCert(selectedCert)}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDownloadCert(selectedCert)}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Descargar PDF
                  </button>
                  <button
                    onClick={() => handleShareCert(selectedCert)}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Compartir
                  </button>
                  <button
                    onClick={() => handleSendEmail(selectedCert)}
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Enviar Email
                  </button>
                  <button
                    onClick={() => handlePrintCert(selectedCert)}
                    className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleViewAnalytics(selectedCert)}
                    className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Crear/Editar Certificado */}
      {(showCreateModal || showEditModal) && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => { setShowCreateModal(false); setShowEditModal(false); }}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
          }}
        >
          <div 
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-2xl h-[85vh] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/20 flex items-center justify-between flex-shrink-0">
              <h3 className="text-2xl font-bold text-white">
                {showEditModal ? 'Editar Certificado' : 'Nuevo Certificado'}
              </h3>
              <button 
                onClick={() => { setShowCreateModal(false); setShowEditModal(false); }}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-white/90 mb-2">
                    <Award className="w-4 h-4" />
                    Nombre del Certificado *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCert?.nombre || ''}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Ej. Certificado en Ciencias Básicas"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-white/90 mb-2">
                    <FileText className="w-4 h-4" />
                    Descripción *
                  </label>
                  <textarea
                    rows={4}
                    defaultValue={selectedCert?.descripcion || ''}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                    placeholder="Describe el certificado de manera detallada..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Categoría *</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                      <option>Ciencias</option>
                      <option>Tecnología</option>
                      <option>Educación</option>
                      <option>Arte</option>
                      <option>Negocios</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Precio (MXN) *</label>
                    <input
                      type="number"
                      defaultValue={selectedCert?.precio || ''}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      placeholder="299"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Duración</label>
                    <input
                      type="text"
                      defaultValue={selectedCert?.duracion || ''}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      placeholder="Ej. 6 meses"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Plantilla</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                      <option>Plantilla básica</option>
                      <option>Plantilla premium</option>
                      <option>Plantilla corporativa</option>
                      <option>Plantilla académica</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Requisitos (uno por línea)</label>
                  <textarea
                    rows={4}
                    defaultValue={selectedCert?.requisitos?.join('\n') || ''}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                    placeholder="Completar 80% del curso&#10;Aprobar examen final&#10;Entregar proyecto"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Habilidades (separadas por comas)</label>
                  <input
                    type="text"
                    defaultValue={selectedCert?.habilidades?.join(', ') || ''}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Matemáticas, Física, Química, Análisis"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Fecha de Creación</label>
                    <input
                      type="date"
                      defaultValue={selectedCert?.fechaCreacion || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Fecha de Vencimiento</label>
                    <input
                      type="date"
                      defaultValue={selectedCert?.fechaVencimiento || ''}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Estado</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                    <option value="activo">Activo</option>
                    <option value="borrador">Borrador</option>
                    <option value="pausado">Pausado</option>
                    <option value="vencido">Vencido</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowCreateModal(false)
                      setShowEditModal(false)
                    }}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      alert(showEditModal ? 'Certificado actualizado exitosamente.' : 'Certificado creado exitosamente.')
                      setShowCreateModal(false)
                      setShowEditModal(false)
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold"
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    {showEditModal ? 'Guardar Cambios' : 'Crear Certificado'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Plantilla */}
      {showTemplateModal && selectedTemplate && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => { setShowTemplateModal(false); setSelectedTemplate(null); }}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
          }}
        >
          <div 
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-4xl h-[85vh] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/20 flex items-center justify-between flex-shrink-0">
              <h3 className="text-2xl font-bold text-white">Editor de Plantilla: {selectedTemplate.name}</h3>
              <button 
                onClick={() => { setShowTemplateModal(false); setSelectedTemplate(null); }}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-white font-semibold mb-4">Vista Previa</h4>
                  <div className="bg-white rounded-lg p-8 shadow-lg min-h-[400px]">
                    <div className="text-center border-2 border-dashed border-gray-300 p-12">
                      <Award className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Certificado de Finalización</h3>
                      <p className="text-gray-600 mb-4">Se otorga a</p>
                      <p className="text-xl font-semibold text-gray-800 mb-2">Nombre del Estudiante</p>
                      <p className="text-gray-600">por completar exitosamente el curso</p>
                      <div className="mt-8 flex justify-center gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Fecha</p>
                          <p className="font-semibold text-gray-800">DD/MM/YYYY</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Código</p>
                          <p className="font-semibold text-gray-800">CERT-XXX-XXX</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors">
                    <Upload className="w-4 h-4 inline mr-2" />
                    Subir Logo
                  </button>
                  <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors">
                    <ImageIcon className="w-4 h-4 inline mr-2" />
                    Cambiar Fondo
                  </button>
                </div>
                <button
                  onClick={() => {
                    alert('Plantilla guardada exitosamente')
                    setShowTemplateModal(false)
                    setSelectedTemplate(null)
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Guardar Plantilla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Validación QR */}
      {showValidationModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => setShowValidationModal(false)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
          }}
        >
          <div 
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-2xl shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-white/20 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <QrCode className="w-6 h-6 text-green-400" />
                Validar Certificado
              </h3>
              <button 
                onClick={() => setShowValidationModal(false)}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar">
              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    placeholder="Ingresar código QR o ID de certificado..."
                    value={qrCodeInput}
                    onChange={(e) => setQrCodeInput(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleValidateQR()
                      }
                    }}
                  />
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                  <QrCode className="w-24 h-24 text-white/30 mx-auto mb-4" />
                  <p className="text-white/70 mb-4">O escanea el código QR con tu cámara</p>
                  <button 
                    onClick={handleCameraScan}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 mx-auto"
                  >
                    <Camera className="w-4 h-4" />
                    Activar Cámara
                  </button>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-400" />
                    Instrucciones
                  </h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Ingresa el código QR completo o el ID del certificado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Usa la cámara para escanear códigos QR físicos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>La validación se realizará en tiempo real</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={handleValidateQR}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  Validar Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Blockchain */}
      {showBlockchainModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => setShowBlockchainModal(false)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
          }}
        >
          <div 
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-3xl h-[85vh] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/20 flex items-center justify-between flex-shrink-0">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Link2 className="w-6 h-6 text-purple-400" />
                Configuración Blockchain
              </h3>
              <button 
                onClick={() => setShowBlockchainModal(false)}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-white font-semibold mb-4">Red Blockchain</h4>
                  <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white">
                    <option>Ethereum</option>
                    <option>Polygon</option>
                    <option>Binance Smart Chain</option>
                    <option>Solana</option>
                  </select>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-white font-semibold mb-4">Configuración de Wallet</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Dirección del Wallet</label>
                      <input
                        type="text"
                        placeholder="0x..."
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Clave Privada (Encriptada)</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-white font-semibold mb-4">Estado</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-2 bg-white/5 rounded-lg cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-white/90">Registrar automáticamente nuevos certificados</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-white/5 rounded-lg cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-white/90">Verificar autenticidad en tiempo real</span>
                    </label>
                  </div>
                </div>
                <button
                  onClick={() => {
                    alert('Configuración de Blockchain guardada')
                    setShowBlockchainModal(false)
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Guardar Configuración
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de API */}
      {showAPIModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => setShowAPIModal(false)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
          }}
        >
          <div 
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-3xl h-[85vh] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/20 flex items-center justify-between flex-shrink-0">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Link2 className="w-6 h-6 text-blue-400" />
                Configuración de API
              </h3>
              <button 
                onClick={() => setShowAPIModal(false)}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-white font-semibold mb-4">Endpoint de Verificación</h4>
                  <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                    <code className="text-green-400 text-sm">https://api.kelumy.com/v1/certificados/verificar/{'{id}'}</code>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('https://api.kelumy.com/v1/certificados/verificar/{id}')
                      alert('URL copiada al portapapeles')
                    }}
                    className="mt-3 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                  >
                    <Copy className="w-4 h-4 inline mr-2" />
                    Copiar URL
                  </button>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-white font-semibold mb-4">API Keys</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-white/70 mb-2">API Key Pública</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value="pk_live_1234567890abcdef"
                          readOnly
                          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm"
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText('pk_live_1234567890abcdef')
                            alert('API Key copiada')
                          }}
                          className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">API Key Privada</label>
                      <div className="flex gap-2">
                        <input
                          type="password"
                          value="sk_live_abcdef1234567890"
                          readOnly
                          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm"
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText('sk_live_abcdef1234567890')
                            alert('API Key copiada')
                          }}
                          className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert('Generando nuevas API Keys...')}
                          className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-white font-semibold mb-4">Documentación</h4>
                  <div className="space-y-2">
                    <a href="#" className="flex items-center gap-2 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white">
                      <FileText className="w-4 h-4" />
                      <span>Documentación completa de la API</span>
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </a>
                    <a href="#" className="flex items-center gap-2 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white">
                      <Code className="w-4 h-4" />
                      <span>Ejemplos de código</span>
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </a>
                    <a href="#" className="flex items-center gap-2 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white">
                      <BarChart3 className="w-4 h-4" />
                      <span>Dashboard de uso de API</span>
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de LinkedIn */}
      {showLinkedInModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => setShowLinkedInModal(false)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
          }}
        >
          <div 
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-2xl h-[85vh] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/20 flex items-center justify-between flex-shrink-0">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-400" />
                Integración LinkedIn
              </h3>
              <button 
                onClick={() => setShowLinkedInModal(false)}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-white font-semibold mb-4">Credenciales de LinkedIn</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Client ID</label>
                      <input
                        type="text"
                        placeholder="Ingresa tu Client ID"
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Client Secret</label>
                      <input
                        type="password"
                        placeholder="Ingresa tu Client Secret"
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                      />
                    </div>
                    <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      <Globe className="w-4 h-4 inline mr-2" />
                      Conectar con LinkedIn
                    </button>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-white font-semibold mb-4">Opciones de Publicación</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-2 bg-white/5 rounded-lg cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-white/90">Publicar automáticamente al emitir certificado</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-white/5 rounded-lg cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-white/90">Solicitar permiso antes de publicar</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-white/5 rounded-lg cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-white/90">Incluir imagen del certificado</span>
                    </label>
                  </div>
                </div>
                <button
                  onClick={() => {
                    alert('Configuración de LinkedIn guardada')
                    setShowLinkedInModal(false)
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Guardar Configuración
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cumplimiento Legal */}
      {showComplianceModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => setShowComplianceModal(false)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
          }}
        >
          <div 
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-4xl h-[85vh] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/20 flex items-center justify-between flex-shrink-0">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-400" />
                Cumplimiento Legal y Regulaciones
              </h3>
              <button 
                onClick={() => setShowComplianceModal(false)}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <AlertCircle className="w-8 h-8 text-yellow-400 mb-3" />
                    <h4 className="text-white font-semibold mb-2">Regulaciones Mexicanas</h4>
                    <p className="text-white/70 text-sm mb-4">Cumplimiento con la SEP y normas educativas mexicanas</p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Norma ISO 21001:2018
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Reglamento SEP
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Protección de datos (LFPDPPP)
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <Globe className="w-8 h-8 text-blue-400 mb-3" />
                    <h4 className="text-white font-semibold mb-2">Estándares Internacionales</h4>
                    <p className="text-white/70 text-sm mb-4">Cumplimiento con estándares globales</p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        ISO 9001:2015
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        GDPR (Europa)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        WCAG 2.1 (Accesibilidad)
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-white font-semibold mb-4">Certificaciones de Calidad</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['ISO 21001', 'ISO 9001', 'ISO 27001', 'GDPR'].map((cert, idx) => (
                      <div key={idx} className="text-center p-3 bg-white/5 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <p className="text-white/90 text-sm font-medium">{cert}</p>
                        <p className="text-white/60 text-xs">Vigente</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-white font-semibold mb-4">Auditorías Recientes</h4>
                  <div className="space-y-3">
                    {[
                      { fecha: '15/01/2024', tipo: 'Auditoría de Seguridad', estado: 'Aprobada', auditor: 'AuditPro S.A.' },
                      { fecha: '10/12/2023', tipo: 'Auditoría de Calidad', estado: 'Aprobada', auditor: 'QualityCert' },
                      { fecha: '05/11/2023', tipo: 'Auditoría de Cumplimiento', estado: 'Aprobada', auditor: 'ComplianceCheck' }
                    ].map((audit, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{audit.tipo}</p>
                          <p className="text-white/60 text-sm">{audit.auditor} • {audit.fecha}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">
                          {audit.estado}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    alert('Descargando reporte de cumplimiento...')
                    setShowComplianceModal(false)
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  Descargar Reporte de Cumplimiento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalle de Validación */}
      {showValidationDetailModal && selectedValidation && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => { setShowValidationDetailModal(false); setSelectedValidation(null); }}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
          }}
        >
          <div 
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-4xl h-[85vh] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-white/20 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  selectedValidation.resultado === 'valid' 
                    ? 'bg-green-500/20' 
                    : selectedValidation.resultado === 'invalid'
                    ? 'bg-red-500/20'
                    : 'bg-yellow-500/20'
                }`}>
                  {selectedValidation.resultado === 'valid' ? (
                    <CheckCircle2Icon className="w-6 h-6 text-green-400" />
                  ) : selectedValidation.resultado === 'invalid' ? (
                    <XCircle className="w-6 h-6 text-red-400" />
                  ) : (
                    <ClockIcon className="w-6 h-6 text-yellow-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Detalle de Validación</h3>
                  <p className="text-white/70 text-sm">{selectedValidation.qrCode}</p>
                </div>
              </div>
              <button 
                onClick={() => { setShowValidationDetailModal(false); setSelectedValidation(null); }}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Información Principal */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/20">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-400" />
                      Información del Certificado
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-white/60 text-xs mb-1">Certificado</p>
                        <p className="text-white font-semibold">{selectedValidation.certificado}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs mb-1">Estudiante</p>
                        <p className="text-white font-semibold">{selectedValidation.estudiante}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs mb-1">Código QR</p>
                        <p className="text-white font-mono text-sm">{selectedValidation.qrCode}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/20">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-400" />
                      Resultado de Validación
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-white/70">Estado</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedValidation.resultado === 'valid'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : selectedValidation.resultado === 'invalid'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        }`}>
                          {selectedValidation.resultado === 'valid' ? 'Válido' : selectedValidation.resultado === 'invalid' ? 'Inválido' : 'Pendiente'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-white/70">Método</span>
                        <span className="text-white font-medium">{selectedValidation.metodo}</span>
                      </div>
                      {selectedValidation.motivo && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <p className="text-white/70 text-xs mb-1">Motivo de invalidación</p>
                          <p className="text-red-300 text-sm">{selectedValidation.motivo}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Información Técnica */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/20">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-cyan-400" />
                      Fecha y Hora
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-white/60 text-xs mb-1">Fecha de validación</p>
                        <p className="text-white font-semibold">{new Date(selectedValidation.fecha).toLocaleString('es-MX', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs mb-1">Hace</p>
                        <p className="text-white/70 text-sm">
                          {Math.floor((new Date() - new Date(selectedValidation.fecha)) / (1000 * 60 * 60))} horas
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/20">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-green-400" />
                      Ubicación y Red
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-white/60 text-xs mb-1">Ubicación</p>
                        <p className="text-white font-semibold">{selectedValidation.ubicacion}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs mb-1">Dirección IP</p>
                        <p className="text-white font-mono text-sm">{selectedValidation.ip}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/20">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-purple-400" />
                      Verificación Blockchain
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-white/70">Estado Blockchain</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedValidation.blockchainVerified
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                        }`}>
                          {selectedValidation.blockchainVerified ? 'Verificado' : 'No verificado'}
                        </span>
                      </div>
                      {selectedValidation.blockchainVerified && (
                        <button
                          onClick={() => handleVerifyBlockchain(selectedValidation.id)}
                          className="w-full px-4 py-2 bg-purple-600/20 border border-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-600/30 transition-all flex items-center justify-center gap-2"
                        >
                          <Link2 className="w-4 h-4" />
                          Verificar en Blockchain
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleExportValidationReport('PDF')}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Exportar PDF
                    </button>
                    <button
                      onClick={() => handleShareValidation(selectedValidation)}
                      className="px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all"
                      title="Compartir"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handlePrintValidation(selectedValidation)}
                      className="px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all"
                      title="Imprimir"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(selectedValidation, null, 2))
                        alert('Información copiada al portapapeles')
                      }}
                      className="px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all"
                      title="Copiar"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRevalidate(selectedValidation)}
                      className="px-4 py-3 bg-green-600/20 border border-green-500/30 text-green-300 rounded-xl hover:bg-green-600/30 transition-all"
                      title="Revalidar"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Generador de QR */}
      {showQRGeneratorModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => setShowQRGeneratorModal(false)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0
          }}
        >
          <div 
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-3xl h-[85vh] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-white/20 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <QrCode className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Generador de Códigos QR</h3>
                  <p className="text-white/70 text-sm">Genera códigos QR para certificados</p>
                </div>
              </div>
              <button 
                onClick={() => setShowQRGeneratorModal(false)}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/20">
                  <label className="block text-white font-semibold mb-3">Seleccionar Certificado</label>
                  <select
                    value={qrGeneratorData.certificadoId}
                    onChange={(e) => setQrGeneratorData({ ...qrGeneratorData, certificadoId: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="">Selecciona un certificado</option>
                    {certificaciones.map(cert => (
                      <option key={cert.id} value={cert.id}>{cert.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/20">
                    <label className="block text-white font-semibold mb-3">Cantidad</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={qrGeneratorData.cantidad}
                      onChange={(e) => setQrGeneratorData({ ...qrGeneratorData, cantidad: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/20">
                    <label className="block text-white font-semibold mb-3">Formato</label>
                    <select
                      value={qrGeneratorData.formato}
                      onChange={(e) => setQrGeneratorData({ ...qrGeneratorData, formato: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="PNG">PNG</option>
                      <option value="SVG">SVG</option>
                      <option value="PDF">PDF</option>
                      <option value="JPG">JPG</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/20">
                    <label className="block text-white font-semibold mb-3">Tamaño</label>
                    <select
                      value={qrGeneratorData.tamaño}
                      onChange={(e) => setQrGeneratorData({ ...qrGeneratorData, tamaño: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="250x250">250x250 px</option>
                      <option value="500x500">500x500 px</option>
                      <option value="1000x1000">1000x1000 px</option>
                      <option value="2000x2000">2000x2000 px</option>
                    </select>
                  </div>
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/20">
                    <label className="block text-white font-semibold mb-3">Opciones</label>
                    <label className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={qrGeneratorData.incluirLogo}
                        onChange={(e) => setQrGeneratorData({ ...qrGeneratorData, incluirLogo: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-white/90 text-sm">Incluir logo</span>
                    </label>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border border-white/20">
                  <h4 className="text-white font-semibold mb-3">Vista Previa</h4>
                  <div className="bg-white rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                    <div className="text-center">
                      <QrCode className="w-32 h-32 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-sm">Vista previa del código QR</p>
                      <p className="text-gray-500 text-xs mt-2">{qrGeneratorData.tamaño} - {qrGeneratorData.formato}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowQRGeneratorModal(false)}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmitQRGeneration}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <QrCode className="w-5 h-5" />
                    Generar Códigos QR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CertificacionesModule
