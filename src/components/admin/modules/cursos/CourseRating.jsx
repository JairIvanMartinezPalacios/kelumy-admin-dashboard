// ========================================
// IMPORTS - Importaciones de dependencias
// ========================================

// Importa React y hooks para manejo de estado y optimización de funciones
import React, { useState, useCallback } from 'react'

// Importa iconos de la librería Lucide React para la interfaz de usuario
import { 
  Star,           // Icono de estrella para calificaciones
  ThumbsUp,       // Icono de pulgar arriba para útil
  ThumbsDown,     // Icono de pulgar abajo para no útil
  MessageCircle,  // Icono de mensaje para comentarios
  User,           // Icono de usuario para perfiles
  Calendar,       // Icono de calendario para fechas
  CheckCircle     // Icono de check para verificado
} from 'lucide-react'

// ========================================
// COMPONENTE PRINCIPAL - CourseRating
// ========================================

// Define el componente funcional CourseRating que gestiona el sistema de calificaciones y reseñas
// Recibe props: courseId (identificador del curso), onRatingSubmit (función para enviar calificación)
const CourseRating = ({ courseId, onRatingSubmit }) => {
  
  // ========================================
  // ESTADO DEL COMPONENTE - Hooks de React
  // ========================================
  
  // Estados para la calificación del usuario
  const [rating, setRating] = useState(0)              // Calificación seleccionada (1-5 estrellas)
  const [hoverRating, setHoverRating] = useState(0)    // Calificación temporal al hacer hover
  const [review, setReview] = useState('')             // Texto de la reseña del usuario
  
  // Estados para el proceso de envío
  const [isSubmitting, setIsSubmitting] = useState(false)  // Estado de envío en progreso
  const [showThankYou, setShowThankYou] = useState(false)  // Mostrar mensaje de agradecimiento
  
  // ========================================
  // DATOS DE EJEMPLO - Reseñas existentes
  // ========================================
  
  const existingReviews = [
    {
      id: 1,
      user: 'María González',
      rating: 5,
      review: 'Excelente curso, muy bien estructurado y el instructor explica de manera muy clara. Lo recomiendo totalmente.',
      date: '2024-01-15',
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      user: 'Carlos Rodríguez',
      rating: 4,
      review: 'Muy buen contenido, aunque me gustaría que hubiera más ejercicios prácticos. En general, cumple con las expectativas.',
      date: '2024-01-10',
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      user: 'Ana Martínez',
      rating: 5,
      review: 'Increíble curso, aprendí mucho más de lo que esperaba. Los proyectos finales son muy desafiantes pero gratificantes.',
      date: '2024-01-08',
      helpful: 15,
      verified: false
    },
    {
      id: 4,
      user: 'Luis Pérez',
      rating: 3,
      review: 'El curso está bien, pero siento que algunos temas podrían explicarse mejor. Aún así, vale la pena tomarlo.',
      date: '2024-01-05',
      helpful: 3,
      verified: true
    }
  ]
  
  // ========================================
  // FUNCIONES AUXILIARES - Lógica de negocio
  // ========================================
  
  const handleRatingClick = useCallback((selectedRating) => {
    setRating(selectedRating)
  }, [])
  
  const handleRatingHover = useCallback((hoveredRating) => {
    setHoverRating(hoveredRating)
  }, [])
  
  const handleRatingLeave = useCallback(() => {
    setHoverRating(0)
  }, [])
  
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    if (rating === 0) {
      alert('Por favor, selecciona una calificación')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simular envío de la reseña
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Aquí iría la lógica para enviar la reseña al servidor
      console.log('Enviando reseña:', { courseId, rating, review })
      
      // Llamar a la función de callback si existe
      onRatingSubmit && onRatingSubmit({ courseId, rating, review })
      
      // Mostrar mensaje de agradecimiento
      setShowThankYou(true)
      
      // Resetear el formulario
      setRating(0)
      setReview('')
      
      // Ocultar mensaje de agradecimiento después de 3 segundos
      setTimeout(() => {
        setShowThankYou(false)
      }, 3000)
      
    } catch (error) {
      console.error('Error al enviar la reseña:', error)
      alert('Hubo un error al enviar tu reseña. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }, [rating, review, courseId, onRatingSubmit])
  
  const getRatingText = useCallback((rating) => {
    switch (rating) {
      case 1: return 'Muy malo'
      case 2: return 'Malo'
      case 3: return 'Regular'
      case 4: return 'Bueno'
      case 5: return 'Excelente'
      default: return ''
    }
  }, [])
  
  const getRatingColor = useCallback((rating) => {
    if (rating <= 2) return 'text-red-500'
    if (rating === 3) return 'text-yellow-500'
    if (rating >= 4) return 'text-green-500'
    return 'text-gray-300'
  }, [])
  
  // ========================================
  // COMPONENTES INTERNOS
  // ========================================
  
  // Componente para las estrellas de calificación
  const StarRating = ({ interactive = false, rating: currentRating, onRatingChange, onHover, onLeave }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (interactive ? (onHover ? hoverRating : rating) : currentRating)
        return (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive ? () => onRatingChange(star) : undefined}
            onMouseEnter={interactive ? () => onHover(star) : undefined}
            onMouseLeave={interactive ? onLeave : undefined}
            className={`transition-colors ${
              interactive 
                ? 'hover:scale-110 transform' 
                : 'cursor-default'
            }`}
            disabled={!interactive}
          >
            <Star
              size={24}
              className={`${
                isFilled 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
  
  // Componente para el formulario de reseña
  const ReviewForm = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Deja tu reseña</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calificación *
          </label>
          <div className="flex items-center gap-3">
            <StarRating
              interactive={true}
              rating={rating}
              onRatingChange={handleRatingClick}
              onHover={handleRatingHover}
              onLeave={handleRatingLeave}
            />
            {rating > 0 && (
              <span className={`text-sm font-medium ${getRatingColor(rating)}`}>
                {getRatingText(rating)}
              </span>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reseña (opcional)
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Comparte tu experiencia con este curso..."
            maxLength={500}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {review.length}/500 caracteres
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            * Campos obligatorios
          </div>
          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Reseña'
            )}
          </button>
        </div>
      </form>
    </div>
  )
  
  // Componente para mostrar las reseñas existentes
  const ReviewsList = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Reseñas de estudiantes ({existingReviews.length})
      </h3>
      
      {existingReviews.map((review) => (
        <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-primary-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{review.user}</span>
                  {review.verified && (
                    <CheckCircle size={16} className="text-green-500" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <StarRating rating={review.rating} />
                  <span>•</span>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">{review.review}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                <ThumbsUp size={16} />
                <span>Útil ({review.helpful})</span>
              </button>
              <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                <ThumbsDown size={16} />
                <span>No útil</span>
              </button>
              <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
                <MessageCircle size={16} />
                <span>Responder</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
  
  // Componente para el mensaje de agradecimiento
  const ThankYouMessage = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 text-center max-w-md mx-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          ¡Gracias por tu reseña!
        </h3>
        <p className="text-gray-600">
          Tu opinión nos ayuda a mejorar nuestros cursos. Tu reseña será publicada después de la revisión.
        </p>
      </div>
    </div>
  )
  
  // ========================================
  // RENDERIZADO - Estructura JSX del componente
  // ========================================
  
  return (
    <div className="space-y-6">
      {/* Formulario de reseña */}
      <ReviewForm />
      
      {/* Lista de reseñas existentes */}
      <ReviewsList />
      
      {/* Mensaje de agradecimiento */}
      {showThankYou && <ThankYouMessage />}
    </div>
  )
}

export default CourseRating
