/**
 * TASK MANAGER - SISTEMA DE FILTROS
 * Versión: 1.4.0 (HU-005)
 * Descripción: Filtrado y búsqueda de tareas
 */

'use strict';

const FiltersController = {
    // Estado actual de los filtros
    currentFilters: {
        status: 'todas',
        category: 'todas',
        priority: 'todas',
        searchQuery: ''
    },
    
    elements: {
        filterStatus: null,
        filterCategory: null,
        filterPriority: null,
        searchInput: null,
        clearFiltersBtn: null,
        resultsCount: null
    },
    
    /**
     * Inicializa el sistema de filtros
     */
    init() {
        this.cacheElements();
        this.attachEventListeners();
        console.log('✅ Sistema de filtros inicializado');
    },
    
    /**
     * Cachea elementos del DOM
     */
    cacheElements() {
        this.elements.filterStatus = document.getElementById('filter-status');
        this.elements.filterCategory = document.getElementById('filter-category');
        this.elements.filterPriority = document.getElementById('filter-priority');
        this.elements.searchInput = document.getElementById('search-input');
        this.elements.clearFiltersBtn = document.getElementById('clear-filters');
        this.elements.resultsCount = document.getElementById('results-count');
    },
    
    /**
     * Adjunta event listeners
     */
    attachEventListeners() {
        // Filtro por estado
        if (this.elements.filterStatus) {
            this.elements.filterStatus.addEventListener('change', (e) => {
                this.currentFilters.status = e.target.value;
                this.applyFilters();
            });
        }
        
        // Filtro por categoría
        if (this.elements.filterCategory) {
            this.elements.filterCategory.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.applyFilters();
            });
        }
        
        // Filtro por prioridad
        if (this.elements.filterPriority) {
            this.elements.filterPriority.addEventListener('change', (e) => {
                this.currentFilters.priority = e.target.value;
                this.applyFilters();
            });
        }
        
        // Búsqueda en tiempo real
        if (this.elements.searchInput) {
            this.elements.searchInput.addEventListener('input', (e) => {
                this.currentFilters.searchQuery = e.target.value.trim().toLowerCase();
                this.applyFilters();
            });
        }
        
        // Limpiar filtros
        if (this.elements.clearFiltersBtn) {
            this.elements.clearFiltersBtn.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }
    },
    
    /**
     * Aplica todos los filtros activos
     */
    applyFilters() {
        let tasks = TasksController.getAllTasks();
        
        // Filtrar por estado
        tasks = this.filterByStatus(tasks);
        
        // Filtrar por categoría
        tasks = this.filterByCategory(tasks);
        
        // Filtrar por prioridad
        tasks = this.filterByPriority(tasks);
        
        // Filtrar por búsqueda
        tasks = this.filterBySearch(tasks);
        
        // Renderizar tareas filtradas
        this.renderFilteredTasks(tasks);
        
        // Actualizar contador de resultados
        this.updateResultsCount(tasks.length);
        
        // Actualizar estado del botón limpiar
        this.updateClearButton();
        
        console.log(`🔍 Filtros aplicados. ${tasks.length} tareas encontradas`);
    },
    
    /**
     * Filtra tareas por estado
     */
    filterByStatus(tasks) {
        const status = this.currentFilters.status;
        
        if (status === 'todas') {
            return tasks;
        }
        
        if (status === 'pendientes') {
            return tasks.filter(task => !task.completed);
        }
        
        if (status === 'completadas') {
            return tasks.filter(task => task.completed);
        }
        
        return tasks;
    },
    
    /**
     * Filtra tareas por categoría
     */
    filterByCategory(tasks) {
        const category = this.currentFilters.category;
        
        if (category === 'todas') {
            return tasks;
        }
        
        return tasks.filter(task => task.category === category);
    },
    
    /**
     * Filtra tareas por prioridad
     */
    filterByPriority(tasks) {
        const priority = this.currentFilters.priority;
        
        if (priority === 'todas') {
            return tasks;
        }
        
        return tasks.filter(task => task.priority === priority);
    },
    
    /**
     * Filtra tareas por búsqueda
     */
    filterBySearch(tasks) {
        const query = this.currentFilters.searchQuery;
        
        if (!query) {
            return tasks;
        }
        
        return tasks.filter(task => {
            const titleMatch = task.title.toLowerCase().includes(query);
            const descMatch = task.description.toLowerCase().includes(query);
            return titleMatch || descMatch;
        });
    },
    
    /**
     * Renderiza las tareas filtradas
     */
    renderFilteredTasks(tasks) {
        const container = document.getElementById('tasks-container');
        
        if (!container) return;
        
        // Limpiar contenedor
        container.innerHTML = '';
        
        // Si no hay resultados
        if (tasks.length === 0) {
            this.showNoResults();
            return;
        }
        
        // Ordenar tareas
        const sortedTasks = [...tasks].sort((a, b) => {
            if (a.completed === b.completed) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return a.completed ? 1 : -1;
        });
        
        // Renderizar cada tarea
        sortedTasks.forEach(task => {
            const taskHTML = UIController.createTaskCardHTML(task);
            container.insertAdjacentHTML('beforeend', taskHTML);
        });
        
        // Agregar event listeners
        UIController.attachAllTaskCardListeners();
    },
    
    /**
     * Muestra mensaje de "sin resultados"
     */
    showNoResults() {
        const container = document.getElementById('tasks-container');
        
        container.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">🔍</span>
                <p>No se encontraron tareas</p>
                <p class="empty-subtitle">
                    Intenta ajustar los filtros o la búsqueda
                </p>
            </div>
        `;
    },
    
    /**
     * Actualiza el contador de resultados
     */
    updateResultsCount(count) {
        if (!this.elements.resultsCount) return;
        
        const total = TasksController.getAllTasks().length;
        
        if (this.hasActiveFilters()) {
            this.elements.resultsCount.textContent = `Mostrando ${count} de ${total} tareas`;
            this.elements.resultsCount.style.display = 'block';
        } else {
            this.elements.resultsCount.style.display = 'none';
        }
    },
    
    /**
     * Verifica si hay filtros activos
     */
    hasActiveFilters() {
        return this.currentFilters.status !== 'todas' ||
               this.currentFilters.category !== 'todas' ||
               this.currentFilters.priority !== 'todas' ||
               this.currentFilters.searchQuery !== '';
    },
    
    /**
     * Actualiza el estado del botón limpiar filtros
     */
    updateClearButton() {
        if (!this.elements.clearFiltersBtn) return;
        
        if (this.hasActiveFilters()) {
            this.elements.clearFiltersBtn.disabled = false;
            this.elements.clearFiltersBtn.classList.remove('disabled');
        } else {
            this.elements.clearFiltersBtn.disabled = true;
            this.elements.clearFiltersBtn.classList.add('disabled');
        }
    },
    
    /**
     * Limpia todos los filtros
     */
    clearAllFilters() {
        // Resetear valores
        this.currentFilters = {
            status: 'todas',
            category: 'todas',
            priority: 'todas',
            searchQuery: ''
        };
        
        // Resetear elementos del DOM
        if (this.elements.filterStatus) {
            this.elements.filterStatus.value = 'todas';
        }
        if (this.elements.filterCategory) {
            this.elements.filterCategory.value = 'todas';
        }
        if (this.elements.filterPriority) {
            this.elements.filterPriority.value = 'todas';
        }
        if (this.elements.searchInput) {
            this.elements.searchInput.value = '';
        }
        
        // Aplicar (mostrar todas)
        this.applyFilters();
        
        console.log('🧹 Filtros limpiados');
    },
    
    /**
     * Obtiene estadísticas de filtrado
     */
    getFilterStats() {
        let tasks = TasksController.getAllTasks();
        
        return {
            total: tasks.length,
            pendientes: tasks.filter(t => !t.completed).length,
            completadas: tasks.filter(t => t.completed).length,
            trabajo: tasks.filter(t => t.category === 'trabajo').length,
            personal: tasks.filter(t => t.category === 'personal').length,
            estudio: tasks.filter(t => t.category === 'estudio').length,
            otros: tasks.filter(t => t.category === 'otros').length,
            alta: tasks.filter(t => t.priority === 'alta').length,
            media: tasks.filter(t => t.priority === 'media').length,
            baja: tasks.filter(t => t.priority === 'baja').length
        };
    }
};