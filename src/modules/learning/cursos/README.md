# Sistema de Gestión de Cursos por Categorías

Este módulo implementa un sistema completo de gestión de cursos online organizados por categorías, con niveles de dificultad, sistema de valoraciones y gestión de contenido.

## 🚀 Características Principales

### 1. **Categorías de Cursos**
- **Ciencias**: Cursos de física, química, biología, etc.
- **Tecnología**: Programación, IA, desarrollo web, etc.
- **Educación**: Pedagogía, metodologías de enseñanza, etc.

### 2. **Niveles de Dificultad**
- **Básico**: Introducción y conceptos fundamentales
- **Intermedio**: Aplicaciones prácticas y casos de uso
- **Avanzado**: Temas especializados y proyectos complejos

### 3. **Sistema de Valoraciones**
- Calificación con estrellas (1-5)
- Reseñas escritas por estudiantes
- Sistema de "útil/no útil" para reseñas
- Verificación de estudiantes que completaron el curso

### 4. **Información Detallada de Cursos**
- Título y descripción
- Instructor y duración
- Número de sesiones
- Nivel educativo (Bachillerato/Universidad)
- Etiquetas y categorización
- Precio y descuentos

### 5. **Contenido por Niveles**
- Temas específicos para cada nivel
- Duración y sesiones por nivel
- Lecturas, actividades, evaluaciones y proyectos
- Sistema de contenido bloqueado hasta compra

### 6. **Gestión de Contenido**
- Editor para cada sección del curso
- Gestión de materiales y recursos
- Configuración de precios y promociones
- Metadatos y configuración avanzada

### 7. **Ordenamiento Inteligente**
- Por demanda (número de estudiantes)
- Por calificación promedio
- Por precio
- Por fecha de creación
- Configuración personalizada

## 📁 Estructura de Archivos

```
src/components/modules/cursos/
├── CourseCategories.jsx      # Componente principal de categorías
├── ContentManagement.jsx     # Módulo de gestión de contenido
├── CourseRating.jsx          # Sistema de valoraciones
├── CourseDemo.jsx           # Componente de demostración
├── CourseManagement.jsx     # Gestión general de cursos (actualizado)
└── README.md               # Esta documentación
```

## 🎯 Componentes Principales

### CourseCategories.jsx
Componente principal que maneja:
- Vista de categorías
- Lista de cursos por categoría
- Detalles del curso seleccionado
- Navegación entre niveles
- Integración con módulos de gestión

### ContentManagement.jsx
Módulo completo para editar:
- Información general del curso
- Niveles y contenido específico
- Materiales y recursos
- Actividades y evaluaciones
- Proyectos y trabajos finales
- Precios y promociones
- Metadatos y configuración

### CourseRating.jsx
Sistema de valoraciones que incluye:
- Formulario de calificación con estrellas
- Reseñas escritas
- Lista de reseñas existentes
- Sistema de votación útil/no útil
- Verificación de estudiantes

### CourseDemo.jsx
Componente de demostración que:
- Muestra las características principales
- Explica el flujo de uso
- Presenta ejemplos de cursos
- Permite iniciar la demostración completa

## 🔧 Uso

### 1. Acceder al Sistema
```jsx
import CourseCategories from './components/modules/cursos/CourseCategories'

// En tu componente principal
<CourseCategories />
```

### 2. Gestión de Contenido
```jsx
import ContentManagement from './components/modules/cursos/ContentManagement'

// Modal de gestión de contenido
<ContentManagement
  course={selectedCourse}
  onClose={() => setShowContentManagement(false)}
  onSave={(changes) => {
    // Lógica para guardar cambios
    console.log('Guardando:', changes)
  }}
/>
```

### 3. Sistema de Valoraciones
```jsx
import CourseRating from './components/modules/cursos/CourseRating'

// Componente de valoraciones
<CourseRating
  courseId={course.id}
  onRatingSubmit={(ratingData) => {
    // Lógica para guardar valoración
    console.log('Nueva valoración:', ratingData)
  }}
/>
```

## 📊 Datos de Ejemplo

El sistema incluye datos de ejemplo para demostración:

### Categorías
- Ciencias (12 cursos)
- Tecnología (18 cursos)
- Educación (8 cursos)

### Cursos de Ejemplo
1. **Física Cuántica Avanzada** (Ciencias)
   - 3 niveles: Básico, Intermedio, Avanzado
   - 60 horas, 24 sesiones
   - Precio: $599 (descuento 40%)

2. **Inteligencia Artificial y ML** (Tecnología)
   - 3 niveles con contenido específico
   - 45 horas, 18 sesiones
   - Precio: $499 (descuento 37%)

3. **Metodologías Pedagógicas** (Educación)
   - Enfoque en bachillerato
   - 30 horas, 12 sesiones
   - Precio: $299 (descuento 40%)

## 🎨 Características de Diseño

- **Responsive**: Adaptable a todos los dispositivos
- **Accesible**: Cumple estándares de accesibilidad
- **Intuitivo**: Navegación clara y fácil de usar
- **Moderno**: Diseño actual con Tailwind CSS
- **Interactivo**: Animaciones y transiciones suaves

## 🔮 Funcionalidades Futuras

- [ ] Integración con sistema de pagos
- [ ] Certificados de finalización
- [ ] Foros de discusión por curso
- [ ] Sistema de notificaciones
- [ ] Analytics avanzados
- [ ] Integración con LMS externos

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework principal
- **Tailwind CSS**: Estilos y diseño
- **Lucide React**: Iconografía
- **Vite**: Herramienta de construcción
- **JavaScript ES6+**: Lógica de la aplicación

## 📝 Notas de Desarrollo

- Todos los componentes están optimizados con `useMemo` y `useCallback`
- El sistema es completamente funcional con datos de ejemplo
- Fácil integración con APIs reales
- Código bien documentado y mantenible
- Estructura modular para fácil extensión

## 🚀 Próximos Pasos

1. Integrar con backend real
2. Implementar autenticación de usuarios
3. Agregar sistema de pagos
4. Desarrollar panel de instructor
5. Crear sistema de certificados
6. Implementar analytics avanzados

---

**Desarrollado para Kelumi Admin Dashboard**  
*Sistema de gestión de cursos online profesional y completo*
