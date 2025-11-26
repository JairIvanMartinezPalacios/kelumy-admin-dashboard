// Script para Diagramas Kelumy

class DiagramManager {
    constructor() {
        this.currentDiagram = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showMosaic();
    }

    setupEventListeners() {
        // Event listeners para las tarjetas del mosaico
        const mosaicCards = document.querySelectorAll('.mosaic-card');
        mosaicCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const diagramId = e.currentTarget.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.showDiagram(diagramId);
            });
        });

        // Event listeners para los botones de regreso
        const backButtons = document.querySelectorAll('.back-btn');
        backButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.showMosaic();
            });
        });
    }

    showDiagram(diagramId) {
        // Ocultar todos los diagramas
        const diagrams = document.querySelectorAll('.diagram-container');
        diagrams.forEach(diagram => {
            diagram.classList.remove('active');
        });

        // Ocultar el mosaico y leyenda
        const mosaic = document.querySelector('.mosaic-menu');
        const legend = document.querySelector('.legend');
        if (mosaic) mosaic.style.display = 'none';
        if (legend) legend.style.display = 'none';

        // Mostrar el diagrama seleccionado
        const selectedDiagram = document.getElementById(diagramId);
        if (selectedDiagram) {
            selectedDiagram.classList.add('active');
            this.currentDiagram = diagramId;
            
            // Scroll suave al diagrama
            selectedDiagram.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }

    showMosaic() {
        // Ocultar todos los diagramas
        const diagrams = document.querySelectorAll('.diagram-container');
        diagrams.forEach(diagram => {
            diagram.classList.remove('active');
        });

        // Mostrar el mosaico y leyenda
        const mosaic = document.querySelector('.mosaic-menu');
        const legend = document.querySelector('.legend');
        if (mosaic) mosaic.style.display = 'grid';
        if (legend) legend.style.display = 'block';
        
        this.currentDiagram = null;

        // Scroll suave al inicio
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    }

    // Método para exportar diagrama como imagen
    exportDiagram(diagramId) {
        const diagram = document.getElementById(diagramId);
        if (!diagram) return;

        // Usar html2canvas para convertir a imagen
        if (typeof html2canvas !== 'undefined') {
            html2canvas(diagram).then(canvas => {
                const link = document.createElement('a');
                link.download = `kelumy-${diagramId}-diagram.png`;
                link.href = canvas.toDataURL();
                link.click();
            });
        }
    }

    // Método para imprimir diagrama
    printDiagram(diagramId) {
        const diagram = document.getElementById(diagramId);
        if (!diagram) return;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Kelumy - ${diagramId}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .tree { font-family: 'Courier New', monospace; }
                        .main-branch { font-weight: bold; margin: 10px 0; }
                        .function { margin-left: 20px; }
                    </style>
                </head>
                <body>
                    ${diagram.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }

    // Método para buscar en diagramas
    searchInDiagrams(searchTerm) {
        const diagrams = document.querySelectorAll('.diagram-container');
        const results = [];

        diagrams.forEach(diagram => {
            const text = diagram.textContent.toLowerCase();
            if (text.includes(searchTerm.toLowerCase())) {
                results.push(diagram.id);
            }
        });

        return results;
    }

    // Método para resaltar funciones por prioridad
    highlightByPriority(priority) {
        const badges = document.querySelectorAll(`.priority-${priority}`);
        badges.forEach(badge => {
            badge.style.animation = 'pulse 1s infinite';
        });
    }

    // Método para obtener estadísticas de funcionalidades
    getStatistics() {
        const diagrams = document.querySelectorAll('.diagram-container');
        const stats = {
            total: 0,
            core: 0,
            second: 0,
            future: 0
        };

        diagrams.forEach(diagram => {
            const functions = diagram.querySelectorAll('.function');
            stats.total += functions.length;

            const coreBadges = diagram.querySelectorAll('.priority-core');
            const secondBadges = diagram.querySelectorAll('.priority-second');
            const futureBadges = diagram.querySelectorAll('.priority-future');

            stats.core += coreBadges.length;
            stats.second += secondBadges.length;
            stats.future += futureBadges.length;
        });

        return stats;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const diagramManager = new DiagramManager();
    
    // Hacer disponible globalmente para debugging
    window.diagramManager = diagramManager;
    
    // Agregar funcionalidad de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && diagramManager.currentDiagram) {
            diagramManager.showMosaic();
        }
    });

    // Agregar funcionalidad de búsqueda
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar funcionalidades...';
    searchInput.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px;
        border: none;
        border-radius: 20px;
        background: rgba(255,255,255,0.9);
        z-index: 1000;
        width: 250px;
    `;
    
    searchInput.addEventListener('input', (e) => {
        const results = diagramManager.searchInDiagrams(e.target.value);
        console.log('Resultados de búsqueda:', results);
    });
    
    document.body.appendChild(searchInput);
});

// Funciones globales para compatibilidad
function showDiagram(diagramId) {
    if (window.diagramManager) {
        window.diagramManager.showDiagram(diagramId);
    }
}

function showMosaic() {
    if (window.diagramManager) {
        window.diagramManager.showMosaic();
    }
}

// Funciones para cambiar entre vistas
function showMapView() {
    // Esta función se ejecuta desde el botón en la vista de mapas
    // No necesita hacer nada ya que ya estamos en la vista de mapas
}

function showMindMapView() {
    // Abrir la vista de mapa mental en nueva pestaña
    window.open('mindmap-view.html', '_blank');
}

// Nueva función para cargar mapas dinámicamente usando iframe
function showMap(mapId) {
    const mosaicMenu = document.getElementById('mosaic-menu');
    const mapContainer = document.getElementById('map-container');
    const mapContent = document.getElementById('map-content');
    const legend = document.querySelector('.legend');
    
    // Ocultar el mosaico y la leyenda
    if (mosaicMenu) mosaicMenu.style.display = 'none';
    if (legend) legend.style.display = 'none';
    
    // Mostrar el contenedor del mapa
    if (mapContainer) {
        mapContainer.style.display = 'block';
        
        // Mapeo de IDs a archivos
        const mapFiles = {
            'ecommerce': 'mapa-ecommerce.html',
            'certificaciones': 'mapa-certificaciones.html',
            'cursos': 'mapa-cursos.html',
            'reportes': 'mapa-reportes.html',
            'configuracion': 'mapa-configuracion.html'
        };
        
        const fileName = mapFiles[mapId];
        
        if (fileName) {
            // Crear un iframe para cargar el mapa
            mapContent.innerHTML = '';

            const iframe = document.createElement('iframe');
            iframe.src = fileName;
            iframe.style.width = '100%';
            iframe.style.height = '100vh';
            iframe.style.border = 'none';
            iframe.style.borderRadius = '15px';
            iframe.style.background = 'transparent';

            iframe.addEventListener('load', () => {
                const doc = iframe.contentDocument || iframe.contentWindow.document;
                if (!doc) return;

                iframe.style.height = doc.body.scrollHeight + 'px';

                const elementsToHide = doc.querySelectorAll('.header, .legend, .back-btn');
                elementsToHide.forEach(element => {
                    if (element) {
                        element.style.display = 'none';
                    }
                });

                if (doc.body) {
                    doc.body.style.background = 'transparent';
                    doc.body.style.padding = '0';
                }

                const container = doc.querySelector('.container');
                if (container) {
                    container.style.maxWidth = '100%';
                    container.style.margin = '0';
                    container.style.paddingTop = '0';
                }
            });

            mapContent.appendChild(iframe);
            
            // Scroll suave al contenedor
            setTimeout(() => {
                mapContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
}

// Nueva función para volver al mosaico
function showMosaic() {
    const mosaicMenu = document.getElementById('mosaic-menu');
    const mapContainer = document.getElementById('map-container');
    const legend = document.querySelector('.legend');
    
    // Mostrar el mosaico y la leyenda
    if (mosaicMenu) mosaicMenu.style.display = 'grid';
    if (legend) legend.style.display = 'block';
    
    // Ocultar el contenedor del mapa
    if (mapContainer) {
        mapContainer.style.display = 'none';
    }
    
    // Scroll suave al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

