/**
 * TASK MANAGER - CONTROLADOR DE UI
 * Versión: 1.2.0 (HU-003)
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
     * Crea el HTML de una tarjeta de tarea
     */
    createTaskCardHTML(task) {
        const completedClass = task.completed ? 'completed' : '';
        const checkedAttr = task.completed ? 'checked' : '';
        
        // Formatear fecha
        const date = new Date(task.createdAt);
        const formattedDate = date.toLocaleDateString('es-CO', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        
        // Iconos de categoría
        const categoryIcons = {
            trabajo: '💼',
            personal: '👤',
            estudio: '📚',
            otros: '📌'
        };
        
        // Iconos de prioridad
        const priorityIcons = {
            alta: '🔴',
            media: '🟡',
            baja: '🟢'
        };
        
        return `
            <div class="task-card priority-${task.priority} ${completedClass}" data-task-id="${task.id}">
                <div class="task-card-header">
                    <h3 class="task-card-title">${this.escapeHTML(task.title)}</h3>
                    <div class="task-card-actions">
                        <button class="btn-icon btn-delete" data-action="delete" title="Eliminar tarea">
                            🗑️
                        </button>
                    </div>
                </div>
                
                <div class="task-card-body">
                    ${task.description ? `
                        <p class="task-card-description">${this.escapeHTML(task.description)}</p>
                    ` : ''}
                </div>
                
                <div class="task-card-footer">
                    <div class="task-card-meta">
                        <span class="badge badge-category cat-${task.category}">
                            ${categoryIcons[task.category]} ${this.capitalize(task.category)}
                        </span>
                        <span class="badge badge-priority priority-${task.priority}">
                            ${priorityIcons[task.priority]} ${this.capitalize(task.priority)}
                        </span>
                        <span class="badge badge-date">
                            📅 ${formattedDate}
                        </span>
                    </div>
                    
                    <div class="task-checkbox-wrapper">
                        <input 
                            type="checkbox" 
                            class="task-checkbox" 
                            id="check-${task.id}"
                            ${checkedAttr}
                            data-action="toggle"
                        >
                        <label for="check-${task.id}" class="checkbox-label">
                            ${task.completed ? 'Completada' : 'Pendiente'}
                        </label>
                    </div>
                </div>
            </div>
        `;
    },
    
    /**
     * Renderiza una tarea individual
     */
    renderTask(task) {
        if (!this.elements.tasksContainer) return;
        
        this.hideEmptyState();
        
        const taskHTML = this.createTaskCardHTML(task);
        this.elements.tasksContainer.insertAdjacentHTML('afterbegin', taskHTML);
        
        // Agregar event listeners a la tarjeta recién creada
        const taskCard = this.elements.tasksContainer.querySelector(`[data-task-id="${task.id}"]`);
        this.attachTaskCardListeners(taskCard);
        
        console.log('✅ Tarea renderizada:', task.title);
    },
    
    /**
     * Renderiza todas las tareas
     */
    renderAllTasks() {
        const tasks = TasksController.getAllTasks();
        
        if (tasks.length === 0) {
            this.showEmptyState();
            return;
        }
        
        this.elements.tasksContainer.innerHTML = '';
        
        // Ordenar tareas: primero pendientes, luego completadas
        const sortedTasks = [...tasks].sort((a, b) => {
            if (a.completed === b.completed) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return a.completed ? 1 : -1;
        });
        
        sortedTasks.forEach(task => {
            const taskHTML = this.createTaskCardHTML(task);
            this.elements.tasksContainer.insertAdjacentHTML('beforeend', taskHTML);
        });
        
        // Agregar event listeners a todas las tarjetas
        this.attachAllTaskCardListeners();
        
        console.log(`✅ ${tasks.length} tareas renderizadas`);
    },
    
    /**
     * Adjunta event listeners a una tarjeta
     */
    attachTaskCardListeners(taskCard) {
        // Listener para eliminar
        const deleteBtn = taskCard.querySelector('[data-action="delete"]');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                const taskId = taskCard.dataset.taskId;
                this.handleDeleteTask(taskId);
            });
        }
        
        // Listener para toggle complete (se implementará en HU-004)
        const checkbox = taskCard.querySelector('[data-action="toggle"]');
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                const taskId = taskCard.dataset.taskId;
                console.log('⚠️ Toggle de tarea - Se implementará en HU-004');
                // Por ahora revertimos el cambio
                checkbox.checked = !checkbox.checked;
                alert('Esta funcionalidad se implementará en la Historia de Usuario 004');
            });
        }
    },
    
    /**
     * Adjunta event listeners a todas las tarjetas
     */
    attachAllTaskCardListeners() {
        const taskCards = this.elements.tasksContainer.querySelectorAll('.task-card');
        taskCards.forEach(card => this.attachTaskCardListeners(card));
    },
    
    /**
     * Maneja la eliminación de una tarea (placeholder para HU-004)
     */
    handleDeleteTask(taskId) {
        console.log('⚠️ Eliminación de tarea - Se implementará completamente en HU-004');
        alert('Esta funcionalidad se implementará completamente en la Historia de Usuario 004');
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
    },
    
    /**
     * Escapa HTML para prevenir XSS
     */
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    /**
     * Capitaliza la primera letra
     */
    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
};