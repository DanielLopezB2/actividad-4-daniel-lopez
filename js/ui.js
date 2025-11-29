/**
 * TASK MANAGER - CONTROLADOR DE UI
 * Versión: 1.1.0 (HU-002)
 * Descripción: Renderizado y actualización de la interfaz
 */

'use strict';

const UIController = {
    elements: {
        tasksContainer: null,
        pendingCount: null,
        completedCount: null
    },
    
    /**
     * Inicializa el controlador de UI
     */
    init() {
        this.cacheElements();
        this.renderAllTasks();
        this.updateCounters();
        console.log('✅ Controlador de UI inicializado');
    },
    
    /**
     * Cachea elementos del DOM
     */
    cacheElements() {
        this.elements.tasksContainer = document.getElementById('tasks-container');
        this.elements.pendingCount = document.getElementById('pending-count');
        this.elements.completedCount = document.getElementById('completed-count');
    },
    
    /**
     * Renderiza una tarea individual (placeholder para HU-003)
     */
    renderTask(task) {
        // Por ahora solo actualizamos el estado vacío y contadores
        this.hideEmptyState();
        console.log('📝 Tarea renderizada (vista completa en HU-003):', task.title);
    },
    
    /**
     * Renderiza todas las tareas (placeholder para HU-003)
     */
    renderAllTasks() {
        const tasks = TasksController.getAllTasks();
        if (tasks.length === 0) {
            this.showEmptyState();
        } else {
            this.hideEmptyState();
            // En HU-003 se implementará el renderizado completo
            console.log(`📋 ${tasks.length} tareas para renderizar (implementación en HU-003)`);
        }
    },
    
    /**
     * Muestra el estado vacío
     */
    showEmptyState() {
        if (!this.elements.tasksContainer) return;
        
        this.elements.tasksContainer.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">📝</span>
                <p>No hay tareas todavía</p>
                <p class="empty-subtitle">Agrega tu primera tarea usando el formulario de arriba</p>
            </div>
        `;
    },
    
    /**
     * Oculta el estado vacío
     */
    hideEmptyState() {
        const emptyState = this.elements.tasksContainer?.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
    },
    
    /**
     * Actualiza los contadores
     */
    updateCounters() {
        const stats = TasksController.getStats();
        
        if (this.elements.pendingCount) {
            this.elements.pendingCount.textContent = stats.pending;
        }
        
        if (this.elements.completedCount) {
            this.elements.completedCount.textContent = stats.completed;
        }
    }
};