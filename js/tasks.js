/**
 * TASK MANAGER - GESTIÓN DE TAREAS
 * Versión: 1.1.0 (HU-002)
 * Descripción: Lógica para crear y gestionar tareas
 */

'use strict';

/**
 * Clase Task - Representa una tarea individual
 */
class Task {
    constructor(title, description, category, priority) {
        this.id = this.generateId();
        this.title = title;
        this.description = description || '';
        this.category = category || 'otros';
        this.priority = priority || 'media';
        this.completed = false;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }
    
    /**
     * Genera un ID único para la tarea
     */
    generateId() {
        return 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    /**
     * Marca la tarea como completada/pendiente
     */
    toggleComplete() {
        this.completed = !this.completed;
        this.updatedAt = new Date().toISOString();
    }
    
    /**
     * Convierte la tarea a objeto plano
     */
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            category: this.category,
            priority: this.priority,
            completed: this.completed,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

/**
 * TasksController - Controlador de tareas
 */
const TasksController = {
    tasks: [],
    
    /**
     * Crea una nueva tarea
     */
    createTask(title, description, category, priority) {
        // Validar título
        if (!title || title.trim() === '') {
            throw new Error('El título es obligatorio');
        }
        
        // Crear nueva tarea
        const task = new Task(
            title.trim(),
            description ? description.trim() : '',
            category,
            priority
        );
        
        // Agregar a la lista
        this.tasks.push(task);
        
        // Guardar en localStorage
        StorageManager.saveTasks(this.tasks);
        
        console.log('✅ Tarea creada:', task.title);
        return task;
    },
    
    /**
     * Obtiene todas las tareas
     */
    getAllTasks() {
        return this.tasks;
    },
    
    /**
     * Obtiene una tarea por ID
     */
    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    },
    
    /**
     * Obtiene tareas pendientes
     */
    getPendingTasks() {
        return this.tasks.filter(task => !task.completed);
    },
    
    /**
     * Obtiene tareas completadas
     */
    getCompletedTasks() {
        return this.tasks.filter(task => task.completed);
    },
    
    /**
     * Obtiene estadísticas
     */
    getStats() {
        return {
            total: this.tasks.length,
            pending: this.getPendingTasks().length,
            completed: this.getCompletedTasks().length
        };
    },
    
    /**
     * Carga las tareas desde localStorage
     */
    loadTasks() {
        const savedTasks = StorageManager.loadTasks();
        this.tasks = savedTasks.map(taskData => {
            const task = new Task(
                taskData.title,
                taskData.description,
                taskData.category,
                taskData.priority
            );
            // Restaurar propiedades
            task.id = taskData.id;
            task.completed = taskData.completed;
            task.createdAt = taskData.createdAt;
            task.updatedAt = taskData.updatedAt;
            return task;
        });
        console.log(`✅ ${this.tasks.length} tareas cargadas desde localStorage`);
    }
};

/**
 * FormController - Controlador del formulario
 */
const FormController = {
    form: null,
    
    /**
     * Inicializa el controlador del formulario
     */
    init() {
        this.form = document.getElementById('task-form');
        if (!this.form) {
            console.error('❌ Formulario no encontrado');
            return;
        }
        
        this.attachEventListeners();
        console.log('✅ Controlador de formulario inicializado');
    },
    
    /**
     * Adjunta event listeners al formulario
     */
    attachEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    },
    
    /**
     * Maneja el envío del formulario
     */
    handleSubmit() {
        try {
            // Obtener valores del formulario
            const formData = new FormData(this.form);
            const title = formData.get('title');
            const description = formData.get('description');
            const category = formData.get('category');
            const priority = formData.get('priority');
            
            // Crear la tarea
            const task = TasksController.createTask(title, description, category, priority);
            
            // Renderizar la tarea
            UIController.renderTask(task);
            
            // Actualizar contadores
            UIController.updateCounters();
            
            // Limpiar formulario
            this.clearForm();
            
            // Mostrar mensaje de éxito
            this.showSuccessMessage();
            
        } catch (error) {
            console.error('❌ Error al crear tarea:', error);
            alert('Error: ' + error.message);
        }
    },
    
    /**
     * Limpia el formulario
     */
    clearForm() {
        this.form.reset();
        // Volver a seleccionar valores por defecto
        document.getElementById('task-category').value = 'trabajo';
        document.getElementById('task-priority').value = 'media';
    },
    
    /**
     * Muestra mensaje de éxito
     */
    showSuccessMessage() {
        const titleInput = document.getElementById('task-title');
        const originalPlaceholder = titleInput.placeholder;
        titleInput.placeholder = '✅ ¡Tarea agregada exitosamente!';
        titleInput.classList.add('success-flash');
        
        setTimeout(() => {
            titleInput.placeholder = originalPlaceholder;
            titleInput.classList.remove('success-flash');
        }, 2000);
    }
};