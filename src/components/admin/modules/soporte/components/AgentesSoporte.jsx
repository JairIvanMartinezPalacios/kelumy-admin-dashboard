import React, { useState, useMemo } from 'react'
import {
  Users,
  UserPlus,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  MessageSquare,
  Star,
  Award,
  BarChart3,
  Settings,
  X,
  Save,
  Plus,
  User,
  Shield,
  Activity,
  Calendar
} from 'lucide-react'

const AgentesSoporte = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Ana López',
      email: 'ana.lopez@kelumy.com',
      phone: '+52 55 1234 5678',
      avatar: null,
      status: 'online',
      role: 'Senior Agent',
      department: 'Soporte Técnico',
      ticketsAssigned: 12,
      ticketsResolved: 8,
      ticketsOpen: 4,
      avgResponseTime: '15 min',
      satisfaction: 4.8,
      totalTickets: 245,
      joinedDate: '2023-01-15',
      skills: ['Técnico', 'Pagos', 'Certificados'],
      availability: 'available',
      currentChats: 3
    },
    {
      id: 2,
      name: 'Pedro Martínez',
      email: 'pedro.martinez@kelumy.com',
      phone: '+52 55 9876 5432',
      avatar: null,
      status: 'online',
      role: 'Agent',
      department: 'Atención al Cliente',
      ticketsAssigned: 8,
      ticketsResolved: 6,
      ticketsOpen: 2,
      avgResponseTime: '20 min',
      satisfaction: 4.6,
      totalTickets: 189,
      joinedDate: '2023-03-20',
      skills: ['Contenido', 'Acceso', 'General'],
      availability: 'available',
      currentChats: 2
    },
    {
      id: 3,
      name: 'Sofía Ramírez',
      email: 'sofia.ramirez@kelumy.com',
      phone: '+52 55 5555 1234',
      avatar: null,
      status: 'away',
      role: 'Agent',
      department: 'Soporte Técnico',
      ticketsAssigned: 5,
      ticketsResolved: 3,
      ticketsOpen: 2,
      avgResponseTime: '25 min',
      satisfaction: 4.7,
      totalTickets: 156,
      joinedDate: '2023-05-10',
      skills: ['Técnico', 'Acceso'],
      availability: 'away',
      currentChats: 1
    },
    {
      id: 4,
      name: 'Miguel Hernández',
      email: 'miguel.hernandez@kelumy.com',
      phone: '+52 55 4444 9876',
      avatar: null,
      status: 'offline',
      role: 'Junior Agent',
      department: 'Atención al Cliente',
      ticketsAssigned: 0,
      ticketsResolved: 0,
      ticketsOpen: 0,
      avgResponseTime: '30 min',
      satisfaction: 4.5,
      totalTickets: 78,
      joinedDate: '2023-08-01',
      skills: ['General', 'Contenido'],
      availability: 'offline',
      currentChats: 0
    }
  ])

  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch = 
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.department.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = filterStatus === 'all' || agent.status === filterStatus
      
      return matchesSearch && matchesStatus
    })
  }, [agents, searchTerm, filterStatus])

  const stats = useMemo(() => {
    return {
      total: agents.length,
      online: agents.filter(a => a.status === 'online').length,
      away: agents.filter(a => a.status === 'away').length,
      offline: agents.filter(a => a.status === 'offline').length,
      totalTickets: agents.reduce((sum, a) => sum + a.ticketsAssigned, 0),
      totalResolved: agents.reduce((sum, a) => sum + a.ticketsResolved, 0),
      avgSatisfaction: (agents.reduce((sum, a) => sum + a.satisfaction, 0) / agents.length).toFixed(1)
    }
  }, [agents])

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'away': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'offline': return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
      default: return 'bg-white/10 text-white/70 border-white/20'
    }
  }

  const handleCreateAgent = () => {
    setShowCreateModal(true)
  }

  const handleEditAgent = (agent) => {
    setSelectedAgent(agent)
    setShowEditModal(true)
  }

  const handleDeleteAgent = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este agente?')) {
      setAgents(prev => prev.filter(a => a.id !== id))
      alert('Agente eliminado exitosamente')
    }
  }

  const handleToggleStatus = (id, newStatus) => {
    setAgents(prev => prev.map(a => 
      a.id === id ? { ...a, status: newStatus, availability: newStatus } : a
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Agentes de Soporte</h2>
          <p className="text-white/70">Gestiona tu equipo de soporte</p>
        </div>
        <button
          onClick={handleCreateAgent}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Nuevo Agente</span>
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
          <p className="text-white/70 text-xs">Total Agentes</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-green-400">{stats.online}</span>
          </div>
          <p className="text-white/70 text-xs">En Línea</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-2xl font-bold text-yellow-400">{stats.away}</span>
          </div>
          <p className="text-white/70 text-xs">Ausentes</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-5 h-5 text-gray-400" />
            <span className="text-2xl font-bold text-gray-400">{stats.offline}</span>
          </div>
          <p className="text-white/70 text-xs">Desconectados</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <span className="text-2xl font-bold text-purple-400">{stats.totalTickets}</span>
          </div>
          <p className="text-white/70 text-xs">Tickets Activos</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-cyan-400" />
            <span className="text-2xl font-bold text-cyan-400">{stats.totalResolved}</span>
          </div>
          <p className="text-white/70 text-xs">Resueltos</p>
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-5 h-5 text-pink-400" />
            <span className="text-2xl font-bold text-pink-400">{stats.avgSatisfaction}</span>
          </div>
          <p className="text-white/70 text-xs">Satisfacción</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Buscar agentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="all">Todos los estados</option>
            <option value="online">En línea</option>
            <option value="away">Ausente</option>
            <option value="offline">Desconectado</option>
          </select>
        </div>
      </div>

      {/* Lista de agentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map(agent => (
          <div
            key={agent.id}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {agent.name.charAt(0)}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
                    agent.status === 'online' ? 'bg-green-400' :
                    agent.status === 'away' ? 'bg-yellow-400' :
                    'bg-gray-400'
                  }`}></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{agent.name}</h3>
                  <p className="text-white/60 text-xs">{agent.role}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg">
                <MoreVertical className="w-4 h-4 text-white/70" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="w-3 h-3" />
                <span className="truncate">{agent.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="w-3 h-3" />
                <span>{agent.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Shield className="w-3 h-3" />
                <span>{agent.department}</span>
              </div>
            </div>

            <div className="mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(agent.status)}`}>
                {agent.status === 'online' ? 'En línea' : agent.status === 'away' ? 'Ausente' : 'Desconectado'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div>
                <p className="text-white font-bold">{agent.ticketsAssigned}</p>
                <p className="text-white/60 text-xs">Asignados</p>
              </div>
              <div>
                <p className="text-green-400 font-bold">{agent.ticketsResolved}</p>
                <p className="text-white/60 text-xs">Resueltos</p>
              </div>
              <div>
                <p className="text-yellow-400 font-bold">{agent.ticketsOpen}</p>
                <p className="text-white/60 text-xs">Abiertos</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white/70 text-xs">Satisfacción</span>
                <span className="text-white font-semibold text-sm">{agent.satisfaction}/5</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  style={{ width: `${(agent.satisfaction / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {agent.skills.map((skill, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-white/10">
              <button
                onClick={() => handleEditAgent(agent)}
                className="flex-1 px-3 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={() => handleDeleteAgent(agent.id)}
                className="px-3 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Crear/Editar Agente */}
      {(showCreateModal || showEditModal) && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md overflow-hidden z-[9999]"
          onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedAgent(null); }}
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
                <UserPlus className="w-6 h-6 text-purple-400" />
                {showEditModal ? 'Editar Agente' : 'Nuevo Agente'}
              </h3>
              <button
                onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedAgent(null); }}
                className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-white/70 hover:text-white hover:rotate-90 duration-300"
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <User className="w-4 h-4" />
                      Nombre *
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedAgent?.name || ''}
                      placeholder="Nombre completo"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Mail className="w-4 h-4" />
                      Email *
                    </label>
                    <input
                      type="email"
                      defaultValue={selectedAgent?.email || ''}
                      placeholder="email@ejemplo.com"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Phone className="w-4 h-4" />
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      defaultValue={selectedAgent?.phone || ''}
                      placeholder="+52 55 1234 5678"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white font-semibold mb-2">
                      <Shield className="w-4 h-4" />
                      Rol
                    </label>
                    <select
                      defaultValue={selectedAgent?.role || 'Agent'}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="Junior Agent">Junior Agent</option>
                      <option value="Agent">Agent</option>
                      <option value="Senior Agent">Senior Agent</option>
                      <option value="Supervisor">Supervisor</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <Shield className="w-4 h-4" />
                    Departamento
                  </label>
                  <select
                    defaultValue={selectedAgent?.department || ''}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="Atención al Cliente">Atención al Cliente</option>
                    <option value="Soporte Técnico">Soporte Técnico</option>
                    <option value="Ventas">Ventas</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <Award className="w-4 h-4" />
                    Habilidades (separadas por comas)
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedAgent?.skills?.join(', ') || ''}
                    placeholder="Técnico, Pagos, Certificados"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => { setShowCreateModal(false); setShowEditModal(false); setSelectedAgent(null); }}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      alert(showEditModal ? 'Agente actualizado exitosamente' : 'Agente creado exitosamente')
                      setShowCreateModal(false)
                      setShowEditModal(false)
                      setSelectedAgent(null)
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {showEditModal ? 'Guardar Cambios' : 'Crear Agente'}
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

export default AgentesSoporte

