import React, { useState, useMemo, useRef, useEffect } from 'react'
import {
  MessageCircle,
  Send,
  Paperclip,
  Smile,
  Video,
  Phone,
  PhoneOff,
  User,
  Search,
  MoreVertical,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  Settings,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  Image as ImageIcon,
  File,
  Download,
  Copy,
  Trash2,
  Archive,
  Star,
  Ban,
  UserPlus,
  Users,
  Globe,
  Zap
} from 'lucide-react'

const ChatEnVivo = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all') // all, online, away, offline
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const messagesEndRef = useRef(null)

  const [chats, setChats] = useState([
    {
      id: 1,
      customer: {
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        avatar: null,
        status: 'online'
      },
      lastMessage: 'Hola, tengo una pregunta sobre mi curso',
      timestamp: '2024-01-20T14:30:00',
      unread: 2,
      status: 'active',
      agent: {
        id: 1,
        name: 'Ana López'
      },
      messages: [
        {
          id: 1,
          sender: 'customer',
          message: 'Hola, tengo una pregunta sobre mi curso',
          timestamp: '2024-01-20T14:25:00',
          read: true
        },
        {
          id: 2,
          sender: 'agent',
          message: 'Hola Juan, ¿en qué puedo ayudarte?',
          timestamp: '2024-01-20T14:26:00',
          read: true
        },
        {
          id: 3,
          sender: 'customer',
          message: 'No puedo acceder al módulo 3',
          timestamp: '2024-01-20T14:28:00',
          read: true
        },
        {
          id: 4,
          sender: 'customer',
          message: '¿Puedes ayudarme?',
          timestamp: '2024-01-20T14:30:00',
          read: false
        }
      ]
    },
    {
      id: 2,
      customer: {
        name: 'María García',
        email: 'maria.garcia@email.com',
        avatar: null,
        status: 'online'
      },
      lastMessage: 'Gracias por la ayuda!',
      timestamp: '2024-01-20T13:15:00',
      unread: 0,
      status: 'active',
      agent: {
        id: 2,
        name: 'Pedro Martínez'
      },
      messages: [
        {
          id: 1,
          sender: 'customer',
          message: 'Tengo un problema con el pago',
          timestamp: '2024-01-20T13:00:00',
          read: true
        },
        {
          id: 2,
          sender: 'agent',
          message: 'Te ayudo con eso. ¿Puedes darme más detalles?',
          timestamp: '2024-01-20T13:05:00',
          read: true
        },
        {
          id: 3,
          sender: 'customer',
          message: 'Gracias por la ayuda!',
          timestamp: '2024-01-20T13:15:00',
          read: true
        }
      ]
    },
    {
      id: 3,
      customer: {
        name: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@email.com',
        avatar: null,
        status: 'away'
      },
      lastMessage: 'Necesito ayuda con mi certificado',
      timestamp: '2024-01-20T12:00:00',
      unread: 1,
      status: 'waiting',
      agent: null,
      messages: [
        {
          id: 1,
          sender: 'customer',
          message: 'Necesito ayuda con mi certificado',
          timestamp: '2024-01-20T12:00:00',
          read: false
        }
      ]
    }
  ])

  const filteredChats = useMemo(() => {
    return chats.filter(chat => {
      const matchesSearch = 
        chat.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = 
        filterStatus === 'all' ||
        (filterStatus === 'online' && chat.customer.status === 'online') ||
        (filterStatus === 'away' && chat.customer.status === 'away') ||
        (filterStatus === 'offline' && chat.customer.status === 'offline')
      
      return matchesSearch && matchesStatus
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }, [chats, searchTerm, filterStatus])

  useEffect(() => {
    if (selectedChat) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selectedChat?.messages])

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return

    const newMsg = {
      id: Date.now(),
      sender: 'agent',
      message: message,
      timestamp: new Date().toISOString(),
      read: false
    }

    setChats(prev => prev.map(chat => 
      chat.id === selectedChat.id
        ? {
            ...chat,
            messages: [...chat.messages, newMsg],
            lastMessage: message,
            timestamp: new Date().toISOString(),
            unread: 0
          }
        : chat
    ))

    setSelectedChat(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newMsg],
      lastMessage: message,
      timestamp: new Date().toISOString()
    } : null)

    setMessage('')
    setIsTyping(false)
  }

  const handleSelectChat = (chat) => {
    setSelectedChat(chat)
    // Marcar mensajes como leídos
    setChats(prev => prev.map(c => 
      c.id === chat.id ? { ...c, unread: 0, messages: c.messages.map(m => ({ ...m, read: true })) } : c
    ))
  }

  const handleTransferChat = (chatId, agentId) => {
    alert(`Chat transferido al agente ${agentId}`)
  }

  const handleEndChat = (chatId) => {
    if (window.confirm('¿Estás seguro de que deseas finalizar este chat?')) {
      setChats(prev => prev.filter(c => c.id !== chatId))
      if (selectedChat?.id === chatId) {
        setSelectedChat(null)
      }
      alert('Chat finalizado')
    }
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ayer'
    } else {
      return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })
    }
  }

  return (
    <div className="h-[calc(100vh-200px)] flex gap-4">
      {/* Lista de chats */}
      <div className="w-80 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">Chats Activos</h3>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              <span className="text-white/70 text-xs">{isOnline ? 'En línea' : 'Desconectado'}</span>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Buscar chats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full mt-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="all">Todos</option>
            <option value="online">En línea</option>
            <option value="away">Ausente</option>
            <option value="offline">Desconectado</option>
          </select>
        </div>

        {/* Lista de conversaciones */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleSelectChat(chat)}
                className={`p-4 border-b border-white/10 cursor-pointer transition-colors ${
                  selectedChat?.id === chat.id ? 'bg-purple-500/20' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {chat.customer.name.charAt(0)}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
                      chat.customer.status === 'online' ? 'bg-green-400' :
                      chat.customer.status === 'away' ? 'bg-yellow-400' :
                      'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-semibold text-sm truncate">{chat.customer.name}</h4>
                      <span className="text-white/60 text-xs">{formatTime(chat.timestamp)}</span>
                    </div>
                    <p className="text-white/70 text-xs truncate mb-1">{chat.lastMessage}</p>
                    <div className="flex items-center gap-2">
                      {chat.unread > 0 && (
                        <span className="px-2 py-0.5 bg-purple-600 text-white rounded-full text-xs font-medium">
                          {chat.unread}
                        </span>
                      )}
                      {chat.agent && (
                        <span className="text-white/50 text-xs">Asignado a {chat.agent.name}</span>
                      )}
                      {!chat.agent && (
                        <span className="text-yellow-400 text-xs">Sin asignar</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/60 text-sm">No hay chats disponibles</p>
            </div>
          )}
        </div>
      </div>

      {/* Área de chat */}
      <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex flex-col overflow-hidden">
        {selectedChat ? (
          <>
            {/* Header del chat */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedChat.customer.name.charAt(0)}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
                    selectedChat.customer.status === 'online' ? 'bg-green-400' :
                    selectedChat.customer.status === 'away' ? 'bg-yellow-400' :
                    'bg-gray-400'
                  }`}></div>
                </div>
                <div>
                  <h3 className="text-white font-bold">{selectedChat.customer.name}</h3>
                  <p className="text-white/70 text-xs">{selectedChat.customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-white/70" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-white/70" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-white/70" />
                </button>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {selectedChat.messages.map((msg, idx) => {
                const showDate = idx === 0 || 
                  new Date(msg.timestamp).toDateString() !== new Date(selectedChat.messages[idx - 1].timestamp).toDateString()
                
                return (
                  <React.Fragment key={msg.id}>
                    {showDate && (
                      <div className="text-center my-4">
                        <span className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-xs">
                          {formatDate(msg.timestamp)}
                        </span>
                      </div>
                    )}
                    <div className={`flex ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[70%] ${msg.sender === 'customer' ? 'bg-white/10' : 'bg-gradient-to-r from-purple-600 to-pink-600'} rounded-xl p-3`}>
                        <p className="text-white text-sm">{msg.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-white/60 text-xs">{formatTime(msg.timestamp)}</span>
                          {msg.sender === 'agent' && (
                            msg.read ? (
                              <CheckCircle className="w-3 h-3 text-blue-400" />
                            ) : (
                              <Clock className="w-3 h-3 text-white/40" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )
              })}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de mensaje */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-end gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-white/70" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <ImageIcon className="w-5 h-5 text-white/70" />
                </button>
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value)
                    setIsTyping(e.target.value.length > 0)
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Escribe un mensaje..."
                  rows={2}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/70 text-lg mb-2">Selecciona un chat</p>
              <p className="text-white/50 text-sm">Elige una conversación de la lista para comenzar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatEnVivo

