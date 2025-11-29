/**
 * TASK MANAGER - APLICACIÓN PRINCIPAL
 * Versión: 1.0.0 (HU-001)
 * Descripción: Inicialización y gestión de la interfaz
 */

'use strict';

// Objeto principal de la aplicación
const TaskManager = {
    version: '1.0.0',
    initialized: false,
    
    // Elementos del DOM
    elements: {
        taskForm: null,
        tasksContainer: null,
        pendingCount: null,
        completedCount: null
    },
    
    /**
     * Inicializa la aplicación
     */
    init() {
        console.log('=================================');
        console.log('   TASK MANAGER v' + this.version);
        console.log('=================================');
        
        // Cachear elementos del DOM
        this.cacheElements();
        
        // Inicializar event listeners
        this.initEventListeners();
        
        this.initialized = true;
        console.log('✅ Aplicación inicializada correctamente');
        console.log('📋 Interfaz principal lista');
    },
    
    /**
     * Cachea los elementos del DOM
     */
    cacheElements() {
        this.elements.taskForm = document.getElementById('task-form');
        this.elements.tasksContainer = document.getElementById('tasks-container');
        this.elements.pendingCount = document.getElementById('pending-count');
        this.elements.completedCount = document.getElementById('completed-count');
        
        console.log('✅ Elementos del DOM cacheados');
    },
    
    /**
     * Inicializa los event listeners
     */
    initEventListeners() {
        // Por ahora solo mostramos que el formulario está listo
        if (this.elements.taskForm) {
            this.elements.taskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('📝 Formulario enviado - Funcionalidad pendiente (HU-002)');
                alert('Esta funcionalidad se implementará en la Historia de Usuario 002');
            });
        }
        
        console.log('✅ Event listeners inicializados');
    },
    
    /**
     * Actualiza los contadores
     */
    updateCounters(pending = 0, completed = 0) {
        if (this.elements.pendingCount) {
            this.elements.pendingCount.textContent = pending;
        }
        if (this.elements.completedCount) {
            this.elements.completedCount.textContent = completed;
        }
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