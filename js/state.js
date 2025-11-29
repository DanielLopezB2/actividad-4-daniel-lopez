/**
 * TASK MANAGER - GESTIÓN DE ESTADOS
 * Versión: 1.3.0 (HU-004)
 * Descripción: Lógica para gestionar estados de tareas
 */

'use strict';

const StateManager = {
    
    /**
     * Alterna el estado de completado de una tarea
     */
    toggleTaskComplete(taskId) {
        try {
            const task = TasksController.getTaskById(taskId);
            
            if (!task) {
                throw new Error('Tarea no encontrada');
            }
            
            // Cambiar estado
            task.toggleComplete();
            
            // Guardar en localStorage
            StorageManager.saveTasks(TasksController.getAllTasks());
            
            console.log(`✅ Tarea ${task.completed ? 'completada' : 'marcada como pendiente'}:`, task.title);
            
            return task;
        } catch (error) {
            console.error('❌ Error al cambiar estado de tarea:', error);
            throw error;
        }
    },
    
    /**
     * Elimina una tarea
     */
    deleteTask(taskId) {
        try {
            const taskIndex = TasksController.tasks.findIndex(t => t.id === taskId);
            
            if (taskIndex === -1) {
                throw new Error('Tarea no encontrada');
            }
            
            const task = TasksController.tasks[taskIndex];
            const taskTitle = task.title;
            
            // Eliminar tarea
            TasksController.tasks.splice(taskIndex, 1);
            
            // Guardar en localStorage
            StorageManager.saveTasks(TasksController.getAllTasks());
            
            console.log('🗑️ Tarea eliminada:', taskTitle);
            
            return true;
        } catch (error) {
            console.error('❌ Error al eliminar tarea:', error);
            throw error;
        }
    },
    
    /**
     * Elimina todas las tareas completadas
     */
    deleteCompletedTasks() {
        try {
            const completedCount = TasksController.getCompletedTasks().length;
            
            if (completedCount === 0) {
                console.log('ℹ️ No hay tareas completadas para eliminar');
                return 0;
            }
            
            // Filtrar solo tareas pendientes
            TasksController.tasks = TasksController.tasks.filter(task => !task.completed);
            
            // Guardar en localStorage
            StorageManager.saveTasks(TasksController.getAllTasks());
            
            console.log(`🗑️ ${completedCount} tareas completadas eliminadas`);
            
            return completedCount;
        } catch (error) {
            console.error('❌ Error al eliminar tareas completadas:', error);
            throw error;
        }
    },
    
    /**
     * Marca todas las tareas como completadas
     */
    completeAllTasks() {
        try {
            let count = 0;
            
            TasksController.tasks.forEach(task => {
                if (!task.completed) {
                    task.toggleComplete();
                    count++;
                }
            });
            
            if (count > 0) {
                StorageManager.saveTasks(TasksController.getAllTasks());
                console.log(`✅ ${count} tareas marcadas como completadas`);
            }
            
            return count;
        } catch (error) {
            console.error('❌ Error al completar todas las tareas:', error);
            throw error;
        }
    },
    
    /**
     * Desmarca todas las tareas completadas
     */
    uncompleteAllTasks() {
        try {
            let count = 0;
            
            TasksController.tasks.forEach(task => {
                if (task.completed) {
                    task.toggleComplete();
                    count++;
                }
            });
            
            if (count > 0) {
                StorageManager.saveTasks(TasksController.getAllTasks());
                console.log(`↩️ ${count} tareas desmarcadas`);
            }
            
            return count;
        } catch (error) {
            console.error('❌ Error al desmarcar tareas:', error);
            throw error;
        }
    }
};

/**
 * ModalController - Gestión de modales de confirmación
 */
const ModalController = {
    
    /**
     * Muestra un modal de confirmación personalizado
     */
    showConfirmDialog(message, onConfirm, onCancel) {
        // Por ahora usamos confirm nativo
        // En una versión futura se puede implementar un modal personalizado
        const result = confirm(message);
        
        if (result && onConfirm) {
            onConfirm();
        } else if (!result && onCancel) {
            onCancel();
        }
        
        return result;
    },
    
    /**
     * Confirma eliminación de tarea
     */
    confirmDelete(taskTitle) {
        return this.showConfirmDialog(
            `¿Estás seguro de que deseas eliminar la tarea:\n\n"${taskTitle}"?\n\nEsta acción no se puede deshacer.`
        );
    },
    
    /**
     * Confirma eliminación de todas las tareas completadas
     */
    confirmDeleteAllCompleted(count) {
        return this.showConfirmDialog(
            `¿Estás seguro de que deseas eliminar ${count} tarea${count > 1 ? 's' : ''} completada${count > 1 ? 's' : ''}?\n\nEsta acción no se puede deshacer.`
        );
    },
    
    /**
     * Muestra mensaje de éxito
     */
    showSuccess(message) {
        // Implementación simple con alert
        // En versión futura se puede usar un toast notification
        console.log('✅ ' + message);
    },
    
    /**
     * Muestra mensaje de error
     */
    showError(message) {
        alert('❌ Error: ' + message);
        console.error('❌ ' + message);
    }
};