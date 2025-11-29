/**
 * TASK MANAGER - APLICACIÓN PRINCIPAL
 * Versión: 0.1.0
 * Descripción: Archivo de inicialización de la aplicación
 */

'use strict';

// Objeto principal de la aplicación
const TaskManager = {
    // Versión de la aplicación
    version: '0.1.0',
    
    // Estado de la aplicación
    initialized: false,
    
    /**
     * Inicializa la aplicación
     */
    init() {
        console.log('=================================');
        console.log('   TASK MANAGER v' + this.version);
        console.log('=================================');
        console.log('Aplicación inicializada correctamente');
        console.log('Estado: En desarrollo');
        console.log('=================================');
        
        this.initialized = true;
        this.displayWelcomeMessage();
    },
    
    /**
     * Muestra mensaje de bienvenida en consola
     */
    displayWelcomeMessage() {
        console.log('');
        console.log('👋 ¡Bienvenido al Task Manager!');
        console.log('');
        console.log('📋 Próximas funcionalidades:');
        console.log('  ✅ Crear y agregar tareas');
        console.log('  ✅ Visualizar tareas en tarjetas');
        console.log('  ✅ Marcar tareas como completadas');
        console.log('  ✅ Eliminar tareas');
        console.log('  ✅ Filtrar y buscar tareas');
        console.log('');
        console.log('🚀 Este proyecto está siendo desarrollado con Git y GitHub');
        console.log('');
    },
    
    /**
     * Obtiene información de la aplicación
     */
    getInfo() {
        return {
            name: 'Task Manager',
            version: this.version,
            status: 'En desarrollo',
            initialized: this.initialized
        };
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar la aplicación cuando el DOM esté listo
    TaskManager.init();
    
    // Agregar información adicional al footer
    updateFooterInfo();
});

/**
 * Actualiza la información del footer con datos dinámicos
 */
function updateFooterInfo() {
    const versionElement = document.querySelector('.footer .version');
    if (versionElement) {
        const currentYear = new Date().getFullYear();
        const footerText = document.querySelector('.footer p:first-child');
        if (footerText) {
            footerText.textContent = `© ${currentYear} Proyecto de Control de Versiones con Git y GitHub`;
        }
    }
}

/**
 * Función auxiliar para logging con timestamp
 */
function logWithTimestamp(message) {
    const now = new Date();
    const timestamp = now.toLocaleTimeString('es-CO');
    console.log(`[${timestamp}] ${message}`);
}

// Exportar para uso en otros módulos (si se necesita)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TaskManager;
}