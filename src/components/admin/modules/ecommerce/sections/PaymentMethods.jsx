// ========================================
// MÉTODOS DE PAGO - Configuración de Pasarelas
// ========================================

import React, { useState, useEffect } from 'react'
import {
  CreditCard,
  Settings,
  Key,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  TrendingUp,
  DollarSign,
  Shield,
  BarChart3,
  RotateCcw,
  Clock
} from 'lucide-react'

const PaymentMethods = () => {
  const [activeMethod, setActiveMethod] = useState('stripe')
  const [showKeys, setShowKeys] = useState({})
  const [autoRotation, setAutoRotation] = useState({
    stripe: { enabled: true, interval: 90 }, // días
    paypal: { enabled: false, interval: 90 },
    mercadopago: { enabled: true, interval: 60 },
    oxxo: { enabled: false, interval: 90 }
  })
  const [keyHistory, setKeyHistory] = useState({
    stripe: [
      { key: 'pk_test_51234567890abcdef', rotatedAt: '2024-01-01', status: 'active' },
      { key: 'pk_test_old1234567890', rotatedAt: '2023-12-01', status: 'inactive' }
    ]
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const paymentMethods = [
    {
      id: 'stripe',
      name: 'Stripe México',
      description: 'Tarjetas de crédito/débito',
      icon: '💳',
      enabled: true,
      publicKey: 'pk_test_51234567890abcdef',
      privateKey: 'sk_test_51234567890abcdef',
      mode: 'sandbox',
      commission: 3.6,
      transactionLimit: 50000,
      apiLimit: 100000,
      successRate: 98.5,
      monthlyTransactions: 1250
    },
    {
      id: 'paypal',
      name: 'PayPal México',
      description: 'Cuenta PayPal, tarjetas',
      icon: '🅿️',
      enabled: true,
      publicKey: 'client_id_paypal_12345',
      privateKey: 'client_secret_paypal_67890',
      mode: 'production',
      commission: 4.4,
      transactionLimit: 100000,
      apiLimit: 200000,
      successRate: 96.2,
      monthlyTransactions: 890
    },
    {
      id: 'mercadopago',
      name: 'MercadoPago',
      description: 'Tarjetas, efectivo, transferencias',
      icon: '🟢',
      enabled: true,
      publicKey: 'APP_USR_1234567890',
      privateKey: 'APP_USR_SECRET_1234567890',
      mode: 'production',
      commission: 4.99,
      transactionLimit: 75000,
      apiLimit: 150000,
      successRate: 97.8,
      monthlyTransactions: 650
    },
    {
      id: 'oxxo',
      name: 'OXXO Pay',
      description: 'Pagos en efectivo en tiendas',
      icon: '🏪',
      enabled: false,
      publicKey: 'oxxo_public_key_123',
      privateKey: 'oxxo_private_key_456',
      mode: 'sandbox',
      commission: 2.5,
      transactionLimit: 10000,
      apiLimit: 50000,
      successRate: 95.0,
      monthlyTransactions: 320
    }
  ]

  const activeMethodData = paymentMethods.find(m => m.id === activeMethod)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount)
  }

  // Funciones de interacción
  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key)
    alert('Clave copiada al portapapeles')
  }

  const handleSaveChanges = () => {
    alert(`Cambios guardados para ${activeMethodData.name}`)
  }

  const handleRotateKeys = () => {
    if (confirm('¿Estás seguro de que quieres rotar las claves? Esta acción no se puede deshacer.')) {
      const newKey = `pk_test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setKeyHistory({
        ...keyHistory,
        [activeMethod]: [
          { key: newKey, rotatedAt: new Date().toISOString(), status: 'active' },
          ...(keyHistory[activeMethod] || []).map(k => ({ ...k, status: 'inactive' }))
        ]
      })
      alert('Claves rotadas exitosamente')
    }
  }

  const handleToggleMethod = (methodId) => {
    alert(`Método ${methodId} ${paymentMethods.find(m => m.id === methodId).enabled ? 'desactivado' : 'activado'}`)
  }

  const handleViewReport = () => {
    alert('Generando reporte de comisiones...')
  }

  const handleUpdateStats = () => {
    alert('Actualizando estadísticas en tiempo real...')
  }

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden min-w-0">
      {/* Estilos de animación avanzados */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .method-card {
          animation-delay: calc(var(--index) * 0.1s);
        }
        
        .card-hover-effect {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-hover-effect:hover {
          transform: translateY(-6px) scale(1.03);
        }
      `}</style>

      {/* Lista de Métodos de Pago */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {paymentMethods.map((method, index) => (
          <button
            key={method.id}
            onClick={() => setActiveMethod(method.id)}
            className={`
              p-4 rounded-xl border transition-all text-left method-card card-hover-effect ${isVisible ? 'animate-fadeInUp' : ''}
              ${activeMethod === method.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400'
                : 'bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15'
            }`}
            style={{ '--index': index }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{method.icon}</span>
              {method.enabled ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <h3 className={`font-semibold mb-1 ${activeMethod === method.id ? 'text-white' : 'text-white'}`}>
              {method.name}
            </h3>
            <p className={`text-xs ${activeMethod === method.id ? 'text-white/80' : 'text-white/60'}`}>
              {method.description}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded ${
                method.mode === 'production' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {method.mode === 'production' ? 'Producción' : 'Sandbox'}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Configuración del Método Seleccionado */}
      {activeMethodData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuración Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Credenciales API */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Key size={20} />
                  Credenciales API
                </h3>
                <button
                  onClick={() => setShowKeys({ ...showKeys, [activeMethod]: !showKeys[activeMethod] })}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                >
                  {showKeys[activeMethod] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Clave Pública</label>
                  <div className="flex gap-2">
                    <input
                      type={showKeys[activeMethod] ? 'text' : 'password'}
                      value={activeMethodData.publicKey}
                      readOnly
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                    />
                    <button 
                      onClick={() => handleCopyKey(activeMethodData.publicKey)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20"
                    >
                      Copiar
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Clave Privada</label>
                  <div className="flex gap-2">
                    <input
                      type={showKeys[activeMethod] ? 'text' : 'password'}
                      value={activeMethodData.privateKey}
                      readOnly
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                    />
                    <button 
                      onClick={() => handleCopyKey(activeMethodData.publicKey)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20"
                    >
                      Copiar
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Modo</label>
                  <select
                    defaultValue={activeMethodData.mode}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="sandbox" className="bg-gray-800">Sandbox (Pruebas)</option>
                    <option value="production" className="bg-gray-800">Producción (Real)</option>
                  </select>
                </div>

                <button 
                  onClick={handleSaveChanges}
                  className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Guardar Cambios
                </button>
              </div>
            </div>

            {/* Rotación Automática de Claves */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <RotateCcw size={20} />
                  Rotación Automática de Claves
                </h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-white font-medium">Rotación Automática</p>
                      <p className="text-white/60 text-xs mt-1">
                        Las claves se rotan automáticamente según el intervalo configurado
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoRotation[activeMethod]?.enabled || false}
                        onChange={(e) => setAutoRotation({
                          ...autoRotation,
                          [activeMethod]: {
                            ...autoRotation[activeMethod],
                            enabled: e.target.checked
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
                    </label>
                  </div>

                  {autoRotation[activeMethod]?.enabled && (
                    <div className="mt-4">
                      <label className="text-white/70 text-sm mb-2 block">Intervalo de Rotación (días)</label>
                      <input
                        type="number"
                        value={autoRotation[activeMethod]?.interval || 90}
                        onChange={(e) => setAutoRotation({
                          ...autoRotation,
                          [activeMethod]: {
                            ...autoRotation[activeMethod],
                            interval: parseInt(e.target.value) || 90
                          }
                        })}
                        min="30"
                        max="365"
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                      />
                      <p className="text-white/50 text-xs mt-1">
                        Las claves se rotarán cada {autoRotation[activeMethod]?.interval} días
                      </p>
                    </div>
                  )}
                </div>

                {/* Historial de Rotación */}
                {keyHistory[activeMethod] && (
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Historial de Rotación</label>
                    <div className="space-y-2">
                      {keyHistory[activeMethod].map((item, idx) => (
                        <div key={idx} className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-mono truncate">{item.key}</p>
                            <p className="text-white/60 text-xs mt-1">
                              Rotada el {new Date(item.rotatedAt).toLocaleDateString('es-MX')}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            item.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {item.status === 'active' ? 'Activa' : 'Inactiva'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  onClick={handleRotateKeys}
                  className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  <RotateCcw size={18} />
                  Rotar Claves Manualmente
                </button>
              </div>
            </div>

            {/* Gestión de Comisiones */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
                <DollarSign size={20} />
                Gestión de Comisiones
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/70 text-sm mb-1">Comisión Actual</p>
                    <p className="text-2xl font-bold text-white">{activeMethodData.commission}%</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/70 text-sm mb-1">Cálculo Automático</p>
                    <p className="text-lg font-semibold text-green-400">Activo</p>
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Desglose por Método</label>
                  <div className="bg-white/5 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Comisión base</span>
                      <span className="text-white">{activeMethodData.commission}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Comisión variable</span>
                      <span className="text-white">+0.5%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Reportes Mensuales</label>
                  <button 
                    onClick={handleViewReport}
                    className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 flex items-center justify-center gap-2"
                  >
                    <BarChart3 size={18} />
                    Ver Reporte de Comisiones
                  </button>
                </div>
              </div>
            </div>

            {/* Monitoreo y Alertas */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
                <Shield size={20} />
                Monitoreo y Alertas
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Límite de Transacción</label>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white text-lg font-semibold">
                      {formatCurrency(activeMethodData.transactionLimit)}
                    </p>
                    <p className="text-white/60 text-xs mt-1">Por transacción individual</p>
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Límite de API</label>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white text-lg font-semibold">
                      {formatCurrency(activeMethodData.apiLimit)}
                    </p>
                    <p className="text-white/60 text-xs mt-1">Límite mensual de API</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/70 text-sm mb-1">Tasa de Éxito</p>
                    <p className="text-2xl font-bold text-green-400">{activeMethodData.successRate}%</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/70 text-sm mb-1">Transacciones/Mes</p>
                    <p className="text-2xl font-bold text-white">{activeMethodData.monthlyTransactions}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white/70 text-sm block">Alertas Configuradas</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-white/80 text-sm">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Alertas de fallos de pago
                    </label>
                    <label className="flex items-center gap-2 text-white/80 text-sm">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Monitoreo de límites de API
                    </label>
                    <label className="flex items-center gap-2 text-white/80 text-sm">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Estadísticas de éxito por método
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas Laterales */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">Estadísticas</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-white/70 text-xs mb-1">Transacciones del Mes</p>
                  <p className="text-2xl font-bold text-white">{activeMethodData.monthlyTransactions}</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">Tasa de Éxito</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${activeMethodData.successRate}%` }}
                      />
                    </div>
                    <span className="text-white text-sm font-semibold">{activeMethodData.successRate}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">Optimización</h3>
              <p className="text-white/70 text-sm mb-4">
                El sistema optimiza automáticamente los métodos de pago según costo y tasa de éxito.
              </p>
              <button 
                onClick={handleUpdateStats}
                className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Actualizar Estadísticas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentMethods

