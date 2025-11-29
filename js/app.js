/**
 * TASK MANAGER - APLICACIÓN PRINCIPAL
 * Versión: 1.3.0 (HU-004)
 */

'use strict';

const TaskManager = {
    version: '1.3.0',
    initialized: false,
    
    /**
     * Inicializa la aplicación
     */
    init() {
        console.log('=================================');
        console.log('   TASK MANAGER v' + this.version);
        console.log('=================================');
        
        // Cargar tareas desde localStorage
        TasksController.loadTasks();
        
        // Inicializar controladores
        UIController.init();
        FormController.init();
        
        this.initialized = true;
        console.log('✅ Aplicación completamente inicializada');
        console.log('📋 Funcionalidades disponibles:');
        console.log('   ✅ Crear tareas');
        console.log('   ✅ Visualizar tareas en tarjetas');
        console.log('   ✅ Marcar tareas como completadas');
        console.log('   ✅ Eliminar tareas');
        console.log('   ✅ Persistencia en localStorage');
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