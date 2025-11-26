import React, { useState, useMemo } from 'react'
import {
  MessageCircle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Calendar,
  Mail,
  Phone,
  Tag,
  Send,
  Paperclip,
  Download,
  Archive,
  Star,
  X,
  Copy,
  Share2,
  Printer,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  FileText,
  Image as ImageIcon,
  Video,
  File,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  UserPlus,
  Users,
  TrendingUp,
  BarChart3,
  MessageSquare,
  Reply,
  Forward,
  History,
  Settings,
  Zap,
  List,
  Grid
} from 'lucide-react'

const GestionTickets = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterAgent, setFilterAgent] = useState('all')
  const [sortBy, setSortBy] = useState('fecha')
  const [sortOrder, setSortOrder] = useState('desc')
  const [viewMode, setViewMode] = useState('list')
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(15)
  const [newMessage, setNewMessage] = useState('')

  const [tickets, setTickets] = useState([
    {
      id: 'TKT-001',
      subject: 'Problema con acceso al curso',
      customer: {
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        phone: '+52 55 1234 5678',
        avatar: null
      },
      status: 'open',
      priority: 'high',
      category: 'Acceso',
      assignedTo: null,
      createdAt: '2024-01-20T10:30:00',
      updatedAt: '2024-01-20T14:15:00',
      lastMessage: 'No puedo acceder al curso que compré ayer',
      messages: [
        {
          id: 1,
          sender: 'customer',
          senderName: 'Juan Pérez',
          message: 'No puedo acceder al curso que compré ayer',
          timestamp: '2024-01-20T10:30:00',
          attachments: []
        }
      ],
      tags: ['acceso', 'curso'],
      satisfaction: null,
      estimatedResolution: '2024-01-22'
    },
    {
      id: 'TKT-002',
      subject: 'Error en el pago',
      customer: {
        name: 'María García',
        email: 'maria.garcia@email.com',
        phone: '+52 55 9876 5432',
        avatar: null
      },
      status: 'in_progress',
      priority: 'medium',
      category: 'Pago',
      assignedTo: {
        id: 1,
        name: 'Ana López',
        avatar: null
      },
      createdAt: '2024-01-19T09:15:00',
      updatedAt: '2024-01-20T11:20:00',
      lastMessage: 'El pago se procesó pero no recibí confirmación',
      messages: [
        {
          id: 1,
          sender: 'customer',
          senderName: 'María García',
          message: 'El pago se procesó pero no recibí confirmación',
          timestamp: '2024-01-19T09:15:00',
          attachments: []
        },
        {
          id: 2,
          sender: 'agent',
          senderName: 'Ana López',
          message: 'Hola María, estamos revisando tu caso. Te contactaremos pronto.',
          timestamp: '2024-01-19T10:30:00',
          attachments: []
        }
      ],
      tags: ['pago', 'facturación'],
      satisfaction: null,
      estimatedResolution: '2024-01-21'
    },
    {
      id: 'TKT-003',
      subject: 'Certificado no se descarga',
      customer: {
        name: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@email.com',
        phone: '+52 55 5555 1234',
        avatar: null
      },
      status: 'resolved',
      priority: 'low',
      category: 'Certificados',
      assignedTo: {
        id: 2,
        name: 'Pedro Martínez',
        avatar: null
      },
      createdAt: '2024-01-18T14:20:00',
      updatedAt: '2024-01-19T16:45:00',
      lastMessage: 'Problema resuelto, el certificado ya se descarga correctamente',
      messages: [
        {
          id: 1,
          sender: 'customer',
          senderName: 'Carlos Rodríguez',
          message: 'No puedo descargar mi certificado',
          timestamp: '2024-01-18T14:20:00',
          attachments: []
        },
        {
          id: 2,
          sender: 'agent',
          senderName: 'Pedro Martínez',
          message: 'Hemos corregido el problema. Intenta descargarlo nuevamente.',
          timestamp: '2024-01-19T15:30:00',
          attachments: []
        },
        {
          id: 3,
          sender: 'customer',
          senderName: 'Carlos Rodríguez',
          message: 'Ya funciona, gracias!',
          timestamp: '2024-01-19T16:45:00',
          attachments: []
        }
      ],
      tags: ['certificado', 'descarga'],
      satisfaction: 5,
      estimatedResolution: '2024-01-19'
    },
    {
      id: 'TKT-004',
      subject: 'Duda sobre contenido del curso',
      customer: {
        name: 'Laura Sánchez',
        email: 'laura.sanchez@email.com',
        phone: '+52 55 4444 5678',
        avatar: null
      },
      status: 'open',
      priority: 'low',
      category: 'Contenido',
      assignedTo: null,
      createdAt: '2024-01-20T08:00:00',
      updatedAt: '2024-01-20T08:00:00',
      lastMessage: 'Tengo una pregunta sobre el módulo 3',
      messages: [
        {
          id: 1,
          sender: 'customer',
          senderName: 'Laura Sánchez',
          message: 'Tengo una pregunta sobre el módulo 3',
          timestamp: '2024-01-20T08:00:00',
          attachments: []
        }
      ],
      tags: ['contenido', 'duda'],
      satisfaction: null,
      estimatedResolution: '2024-01-23'
    },
    {
      id: 'TKT-005',
      subject: 'Solicitud de reembolso',
      customer: {
        name: 'Roberto Torres',
        email: 'roberto.torres@email.com',
        phone: '+52 55 3333 9876',
        avatar: null
      },
      status: 'in_progress',
      priority: 'high',
      category: 'Reembolsos',
      assignedTo: {
        id: 1,
        name: 'Ana López',
        avatar: null
      },
      createdAt: '2024-01-19T16:30:00',
      updatedAt: '2024-01-20T09:15:00',
      lastMessage: 'Necesito el reembolso de mi compra',
      messages: [
        {
          id: 1,
          sender: 'customer',
          senderName: 'Roberto Torres',
          message: 'Necesito el reembolso de mi compra',
          timestamp: '2024-01-19T16:30:00',
          attachments: []
        },
        {
          id: 2,
          sender: 'agent',
          senderName: 'Ana López',
          message: 'Estamos procesando tu solicitud. Te responderemos en 24-48 horas.',
          timestamp: '2024-01-20T09:15:00',
          attachments: []
        }
      ],
      tags: ['reembolso', 'urgente'],
      satisfaction: null,
      estimatedResolution: '2024-01-22'
    }
  ])

  const agents = [
    { id: 1, name: 'Ana López', email: 'ana.lopez@kelumy.com', status: 'online', tickets: 12 },
    { id: 2, name: 'Pedro Martínez', email: 'pedro.martinez@kelumy.com', status: 'online', tickets: 8 },
    { id: 3, name: 'Sofía Ramírez', email: 'sofia.ramirez@kelumy.com', status: 'away', tickets: 5 },
    { id: 4, name: 'Miguel Hernández', email: 'miguel.hernandez@kelumy.com', status: 'offline', tickets: 0 }
  ]

  const categories = ['Acceso', 'Pago', 'Certificados', 'Contenido', 'Reembolsos', 'Técnico', 'General']

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'resolved': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'closed': return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
      default: return 'bg-white/10 text-white/70 border-white/20'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'open': return 'Abierto'
      case 'in_progress': return 'En Progreso'
      case 'resolved': return 'Resuelto'
      case 'closed': return 'Cerrado'
      default: return status
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'low': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      default: return 'bg-white/10 text-white/70 border-white/20'
    }
  }

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'urgent': return 'Urgente'
      case 'high': return 'Alta'
      case 'medium': return 'Media'
      case 'low': return 'Baja'
      default: return priority
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return AlertCircle
      case 'in_progress': return Clock
      case 'resolved': return CheckCircle
      case 'closed': return CheckCircle2
      default: return MessageCircle
    }
  }

  const filteredAndSortedTickets = useMemo(() => {
    let filtered = tickets.filter(ticket => {
      const matchesSearch = 
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus
      const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority
      const matchesAgent = filterAgent === 'all' || (filterAgent === 'unassigned' && !ticket.assignedTo) || (ticket.assignedTo && ticket.assignedTo.id.toString() === filterAgent)
      
      return matchesSearch && matchesStatus && matchesPriority && matchesAgent
    })

    filtered = [...filtered].sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'fecha':
          aValue = new Date(a.updatedAt).getTime()
          bValue = new Date(b.updatedAt).getTime()
          break
        case 'prioridad':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          aValue = priorityOrder[a.priority] || 0
          bValue = priorityOrder[b.priority] || 0
          break
        case 'asunto':
          aValue = a.subject.toLowerCase()
          bValue = b.subject.toLowerCase()
          break
        case 'cliente':
          aValue = a.customer.name.toLowerCase()
          bValue = b.customer.name.toLowerCase()
          break
        default:
          aValue = new Date(a.updatedAt).getTime()
          bValue = new Date(b.updatedAt).getTime()
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    const startIndex = (currentPage - 1) * itemsPerPage
    return filtered.slice(startIndex, startIndex + itemsPerPage)
  }, [tickets, searchTerm, filterStatus, filterPriority, filterAgent, sortBy, sortOrder, currentPage, itemsPerPage])

  const totalPages = Math.ceil(
    tickets.filter(ticket => {
      const matchesSearch = 
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus
      const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority
      const matchesAgent = filterAgent === 'all' || (filterAgent === 'unassigned' && !ticket.assignedTo) || (ticket.assignedTo && ticket.assignedTo.id.toString() === filterAgent)
      return matchesSearch && matchesStatus && matchesPriority && matchesAgent
    }).length / itemsPerPage
  )

  const stats = useMemo(() => {
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress').length,
      resolved: tickets.filter(t => t.status === 'resolved').length,
      closed: tickets.filter(t => t.status === 'closed').length,
      urgent: tickets.filter(t => t.priority === 'urgent').length,
      high: tickets.filter(t => t.priority === 'high').length,
      unassigned: tickets.filter(t => !t.assignedTo).length
    }
  }, [tickets])

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket)
    setShowTicketModal(true)
  }

  const handleCreateTicket = () => {
    setShowCreateModal(true)
  }

  const handleUpdateStatus = (ticketId, newStatus) => {
    setTickets(prev => prev.map(t => 
      t.id === ticketId ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t
    ))
    alert(`Estado del ticket ${ticketId} actualizado a: ${getStatusText(newStatus)}`)
  }

  const handleAssignAgent = (ticketId, agentId) => {
    const agent = agents.find(a => a.id === agentId)
    setTickets(prev => prev.map(t => 
      t.id === ticketId ? { ...t, assignedTo: agent, updatedAt: new Date().toISOString() } : t
    ))
    alert(`Ticket ${ticketId} asignado a: ${agent?.name}`)
  }

  const handleChangePriority = (ticketId, newPriority) => {
    setTickets(prev => prev.map(t => 
      t.id === ticketId ? { ...t, priority: newPriority, updatedAt: new Date().toISOString() } : t
    ))
    alert(`Prioridad del ticket ${ticketId} actualizada a: ${getPriorityText(newPriority)}`)
  }

  const handleDeleteTicket = (ticketId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este ticket?')) {
      setTickets(prev => prev.filter(t => t.id !== ticketId))
      alert(`Ticket ${ticketId} eliminado`)
    }
  }

  const handleSendMessage = (ticketId) => {
    if (!newMessage.trim()) {
      alert('Por favor, escribe un mensaje')
      return
    }
    
    const newMsg = {
      id: Date.now(),
      sender: 'agent',
      senderName: 'Agente de Soporte',
      message: newMessage,
      timestamp: new Date().toISOString(),
      attachments: []
    }
    
    setTickets(prev => prev.map(t => 
      t.id === ticketId 
        ? { 
            ...t, 
            messages: [...t.messages, newMsg],
            lastMessage: newMessage,
            updatedAt: new Date().toISOString()
          } 
        : t
    ))
    
    setNewMessage('')
    alert('Mensaje enviado exitosamente')
  }

  const handleExportTickets = (format) => {
    alert(`Exportando tickets en formato ${format}. Total: ${tickets.length} tickets`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestión de Tickets</h2>
          <p className="text-white/70">Administra y resuelve tickets de soporte</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleExportTickets('Excel')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
          <button
            onClick={handleCreateTicket}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Ticket</span>
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <MessageCircle className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
          <p className="text-white/70 text-xs">Total</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-2xl font-bold text-red-400">{stats.open}</span>
          </div>
          <p className="text-white/70 text-xs">Abiertos</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-2xl font-bold text-yellow-400">{stats.inProgress}</span>
          </div>
          <p className="text-white/70 text-xs">En Progreso</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-green-400">{stats.resolved}</span>
          </div>
          <p className="text-white/70 text-xs">Resueltos</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <span className="text-2xl font-bold text-orange-400">{stats.urgent}</span>
          </div>
          <p className="text-white/70 text-xs">Urgentes</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-pink-400" />
            <span className="text-2xl font-bold text-pink-400">{stats.high}</span>
          </div>
          <p className="text-white/70 text-xs">Alta</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <UserPlus className="w-5 h-5 text-cyan-400" />
            <span className="text-2xl font-bold text-cyan-400">{stats.unassigned}</span>
          </div>
          <p className="text-white/70 text-xs">Sin Asignar</p>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Buscar por ID, asunto, cliente..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="all">Todos los estados</option>
            <option value="open">Abiertos</option>
            <option value="in_progress">En Progreso</option>
            <option value="resolved">Resueltos</option>
            <option value="closed">Cerrados</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => {
              setFilterPriority(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="all">Todas las prioridades</option>
            <option value="urgent">Urgente</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
          <select
            value={filterAgent}
            onChange={(e) => {
              setFilterAgent(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="all">Todos los agentes</option>
            <option value="unassigned">Sin asignar</option>
            {agents.map(agent => (
              <option key={agent.id} value={agent.id}>{agent.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-')
              setSortBy(field)
              setSortOrder(order)
            }}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="fecha-desc">Más recientes</option>
            <option value="fecha-asc">Más antiguos</option>
            <option value="prioridad-desc">Mayor prioridad</option>
            <option value="prioridad-asc">Menor prioridad</option>
            <option value="asunto-asc">Asunto A-Z</option>
            <option value="asunto-desc">Asunto Z-A</option>
          </select>
          <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1 border border-white/20">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-white/70 hover:text-white'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lista de tickets */}
      {viewMode === 'list' ? (
        <div className="space-y-3">
          {filteredAndSortedTickets.map((ticket) => {
            const StatusIcon = getStatusIcon(ticket.status)
            return (
              <div
                key={ticket.id}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                onClick={() => handleViewTicket(ticket)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)} flex items-center gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {getStatusText(ticket.status)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                        {getPriorityText(ticket.priority)}
                      </span>
                      <span className="text-white/60 text-xs font-mono">{ticket.id}</span>
                      {ticket.assignedTo && (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30">
                          {ticket.assignedTo.name}
                        </span>
                      )}
                      {!ticket.assignedTo && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs border border-gray-500/30">
                          Sin asignar
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{ticket.subject}</h3>
                    <p className="text-white/70 text-sm mb-3 line-clamp-2">{ticket.lastMessage}</p>
                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {ticket.customer.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {ticket.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(ticket.updatedAt)}
                      </span>
                      {ticket.messages.length > 0 && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {ticket.messages.length} mensajes
                        </span>
                      )}
                    </div>
                    {ticket.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {ticket.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/5 text-white/70 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleViewTicket(ticket)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4 text-white/70" />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(ticket.id, ticket.status === 'open' ? 'in_progress' : ticket.status === 'in_progress' ? 'resolved' : 'closed')}
                      className="p-2 hover:bg-green-500/20 rounded-lg transition-colors"
                      title="Actualizar estado"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </button>
                    <button
                      onClick={() => handleDeleteTicket(ticket.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedTickets.map((ticket) => {
            const StatusIcon = getStatusIcon(ticket.status)
            return (
              <div
                key={ticket.id}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                onClick={() => handleViewTicket(ticket)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`w-5 h-5 ${
                      ticket.status === 'open' ? 'text-red-400' :
                      ticket.status === 'in_progress' ? 'text-yellow-400' :
                      'text-green-400'
                    }`} />
                    <span className="text-white/60 text-xs font-mono">{ticket.id}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                    {getPriorityText(ticket.priority)}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-2 line-clamp-2">{ticket.subject}</h3>
                <p className="text-white/70 text-sm mb-3 line-clamp-2">{ticket.lastMessage}</p>
                <div className="space-y-2 text-xs text-white/60 mb-3">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span>{ticket.customer.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-3 h-3" />
                    <span>{ticket.category}</span>
                  </div>
                  {ticket.assignedTo && (
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      <span>{ticket.assignedTo.name}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-white/60 text-xs">{formatDate(ticket.updatedAt)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                    {getStatusText(ticket.status)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-white/70 text-sm">
            Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedTickets.length)} de {tickets.length} tickets
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
            >
              Anterior
            </button>
            {[...Array(Math.min(5, totalPages))].map((_, idx) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = idx + 1
              } else if (currentPage <= 3) {
                pageNum = idx + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + idx
              } else {
                pageNum = currentPage - 2 + idx
              }
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
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

      {/* Modal de Detalle de Ticket */}
      {showTicketModal && selectedTicket && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => { setShowTicketModal(false); setSelectedTicket(null); }}
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
            className="bg-gradient-to-br from-gray-900/98 via-purple-900/20 to-gray-900/98 backdrop-blur-2xl rounded-3xl border border-white/30 w-[90vw] max-w-6xl h-[85vh] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/20 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedTicket.subject}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-white/70 text-sm font-mono">{selectedTicket.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedTicket.status)}`}>
                      {getStatusText(selectedTicket.status)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedTicket.priority)}`}>
                      {getPriorityText(selectedTicket.priority)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => { setShowTicketModal(false); setSelectedTicket(null); }}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>

            {/* Contenido */}
            <div className="flex-1 overflow-hidden flex">
              {/* Columna izquierda - Conversación */}
              <div className="flex-1 flex flex-col border-r border-white/10">
                {/* Información del cliente */}
                <div className="p-4 bg-white/5 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {selectedTicket.customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{selectedTicket.customer.name}</p>
                        <p className="text-white/60 text-xs">{selectedTicket.customer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg">
                        <Phone className="w-4 h-4 text-white/70" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg">
                        <Mail className="w-4 h-4 text-white/70" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {selectedTicket.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[70%] ${msg.sender === 'customer' ? 'bg-white/10' : 'bg-gradient-to-r from-purple-600 to-pink-600'} rounded-xl p-4`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white/90 font-semibold text-sm">{msg.senderName}</span>
                          <span className="text-white/60 text-xs">{formatDate(msg.timestamp)}</span>
                        </div>
                        <p className="text-white text-sm">{msg.message}</p>
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {msg.attachments.map((att, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2 bg-white/10 rounded">
                                <File className="w-4 h-4 text-white/70" />
                                <span className="text-white/70 text-xs">{att.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input de mensaje */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex items-end gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg">
                      <Paperclip className="w-5 h-5 text-white/70" />
                    </button>
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      rows={3}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                    />
                    <button
                      onClick={() => handleSendMessage(selectedTicket.id)}
                      className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Columna derecha - Información y acciones */}
              <div className="w-80 p-4 space-y-4 overflow-y-auto custom-scrollbar">
                {/* Acciones rápidas */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-white font-semibold mb-3">Acciones Rápidas</h4>
                  <div className="space-y-2">
                    <select
                      value={selectedTicket.status}
                      onChange={(e) => handleUpdateStatus(selectedTicket.id, e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="open">Abierto</option>
                      <option value="in_progress">En Progreso</option>
                      <option value="resolved">Resuelto</option>
                      <option value="closed">Cerrado</option>
                    </select>
                    <select
                      value={selectedTicket.priority}
                      onChange={(e) => handleChangePriority(selectedTicket.id, e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                      <option value="urgent">Urgente</option>
                    </select>
                    <select
                      value={selectedTicket.assignedTo?.id || 'unassigned'}
                      onChange={(e) => handleAssignAgent(selectedTicket.id, e.target.value === 'unassigned' ? null : parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="unassigned">Sin asignar</option>
                      {agents.map(agent => (
                        <option key={agent.id} value={agent.id}>{agent.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Información del ticket */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-white font-semibold mb-3">Información</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-white/60 text-xs mb-1">Categoría</p>
                      <p className="text-white">{selectedTicket.category}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs mb-1">Creado</p>
                      <p className="text-white">{formatDate(selectedTicket.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs mb-1">Última actualización</p>
                      <p className="text-white">{formatDate(selectedTicket.updatedAt)}</p>
                    </div>
                    {selectedTicket.estimatedResolution && (
                      <div>
                        <p className="text-white/60 text-xs mb-1">Resolución estimada</p>
                        <p className="text-white">{formatDate(selectedTicket.estimatedResolution)}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                {selectedTicket.tags.length > 0 && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-3">Etiquetas</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTicket.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Acciones adicionales */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-white font-semibold mb-3">Otras Acciones</h4>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                      <Copy className="w-4 h-4" />
                      Duplicar Ticket
                    </button>
                    <button className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Compartir
                    </button>
                    <button className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                      <Printer className="w-4 h-4" />
                      Imprimir
                    </button>
                    <button className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                      <Archive className="w-4 h-4" />
                      Archivar
                    </button>
                    <button
                      onClick={() => handleDeleteTicket(selectedTicket.id)}
                      className="w-full px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Crear Ticket */}
      {showCreateModal && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => setShowCreateModal(false)}
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
            <div className="px-6 py-5 border-b border-white/20 flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Plus className="w-6 h-6 text-purple-400" />
                Nuevo Ticket
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <User className="w-4 h-4" />
                    Cliente
                  </label>
                  <input
                    type="text"
                    placeholder="Buscar cliente por nombre o email..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <FileText className="w-4 h-4" />
                    Asunto *
                  </label>
                  <input
                    type="text"
                    placeholder="Resumen del problema..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Tag className="w-4 h-4" />
                      Categoría
                    </label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <AlertTriangle className="w-4 h-4" />
                      Prioridad
                    </label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                      <option value="urgent">Urgente</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <MessageCircle className="w-4 h-4" />
                    Mensaje *
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Describe el problema o consulta..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <Users className="w-4 h-4" />
                    Asignar a
                  </label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                    <option value="">Sin asignar</option>
                    {agents.map(agent => (
                      <option key={agent.id} value={agent.id}>{agent.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      alert('Ticket creado exitosamente')
                      setShowCreateModal(false)
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Crear Ticket
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

export default GestionTickets

