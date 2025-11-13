// ========================================
// MÓDULO DE CERTIFICADOS - Certificaciones Obtenidas
// ========================================

import React, { useState } from 'react'
import { Award, Download, Eye, Share, Calendar, Star } from 'lucide-react'

const CertificadosModule = () => {
  const [activeTab, setActiveTab] = useState('obtenidos')

  const certificados = [
    {
      id: 1,
      titulo: 'JavaScript Fundamentals',
      curso: 'JavaScript Avanzado',
      instructor: 'Dr. María González',
      fechaObtenido: '2024-10-15',
      calificacion: 95,
      horas: 40,
      imagen: '/img/certificado-js.jpg',
      valido: true
    },
    {
      id: 2,
      titulo: 'React Development',
      curso: 'React Fundamentals',
      instructor: 'Ing. Carlos López',
      fechaObtenido: '2024-09-28',
      calificacion: 92,
      horas: 25,
      imagen: '/img/certificado-react.jpg',
      valido: true
    },
    {
      id: 3,
      titulo: 'Git Version Control',
      curso: 'Git y GitHub',
      instructor: 'Ing. Sofía Pérez',
      fechaObtenido: '2024-08-15',
      calificacion: 88,
      horas: 12,
      imagen: '/img/certificado-git.jpg',
      valido: true
    }
  ]

  const tabs = [
    { id: 'obtenidos', label: 'Certificados Obtenidos', icon: Award, count: certificados.length },
    { id: 'proximos', label: 'Próximos', icon: Calendar, count: 2 }
  ]

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Mis Certificados</h2>
        <p className="text-white/70">Gestiona y descarga tus certificaciones</p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 mb-8 border border-white/20">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'obtenidos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificados.map((cert) => (
            <div key={cert.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
              <div className="w-full h-48 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 relative">
                <Award className="w-16 h-16 text-white" />
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  Válido
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{cert.titulo}</h3>
              <p className="text-white/70 text-sm mb-1">Curso: {cert.curso}</p>
              <p className="text-white/70 text-sm mb-1">Instructor: {cert.instructor}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-white text-sm">{cert.calificacion}%</span>
                </div>
                <span className="text-white/60 text-sm">{cert.horas}h</span>
              </div>

              <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{cert.fechaObtenido}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </button>
                <button className="p-2 text-white/70 hover:text-white transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-white/70 hover:text-white transition-colors">
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'proximos' && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-6">Próximos Certificados</h3>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-medium">Python para Data Science</h4>
              <p className="text-white/70 text-sm mb-2">Progreso: 20% - Necesitas completar 16 lecciones más</p>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-medium">Node.js Backend Development</h4>
              <p className="text-white/70 text-sm mb-2">Progreso: 0% - Curso no iniciado</p>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CertificadosModule
