/**
 * TASK MANAGER - APLICACIÓN PRINCIPAL
 * Versión: 1.4.0 (HU-005) - VERSIÓN FINAL
 */

'use strict';

const TaskManager = {
    version: '1.4.0',
    initialized: false,
    
    /**
     * Inicializa la aplicación
     */
    init() {
        console.log('=================================');
        console.log('   TASK MANAGER v' + this.version);
        console.log('   PROYECTO COMPLETO ✅          ');
        console.log('=================================');
        
        // Cargar tareas desde localStorage
        TasksController.loadTasks();
        
        // Inicializar controladores
        UIController.init();
        FormController.init();
        FiltersController.init();
        
        this.initialized = true;
        
        console.log('✅ Aplicación completamente inicializada');
        console.log('');
        console.log('📋 Funcionalidades implementadas:');
        console.log('   ✅ HU-001: Interfaz principal');
        console.log('   ✅ HU-002: Crear tareas');
        console.log('   ✅ HU-003: Visualizar tareas');
        console.log('   ✅ HU-004: Gestionar estados');
        console.log('   ✅ HU-005: Filtros y búsqueda');
        console.log('');
        console.log('🚀 Proyecto desarrollado con Git y GitHub');
        console.log('=================================');
    },
    
    /**
     * Obtiene información de la aplicación
     */
    getInfo() {
        return {
            name: 'Task Manager',
            version: this.version,
            status: 'Completo',
            initialized: this.initialized,
            features: [
                'Crear tareas',
                'Visualizar tareas',
                'Completar tareas',
                'Eliminar tareas',
                'Filtrar por estado',
                'Filtrar por categoría',
                'Filtrar por prioridad',
                'Búsqueda en tiempo real',
                'Persistencia en localStorage'
            ]
        };
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    TaskManager.init();
    
    // Actualizar año en footer
    const footerText = document.querySelector('.footer p:first-child');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.textContent = `© ${currentYear} Proyecto de Control de Versiones con Git y GitHub`;
    }
});

// Exponer TaskManager globalmente para debugging
window.TaskManager = TaskManager;