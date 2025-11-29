/**
 * TASK MANAGER - GESTIÓN DE ALMACENAMIENTO
 * Versión: 1.1.0 (HU-002)
 * Descripción: Persistencia de datos en localStorage
 */

'use strict';

const StorageManager = {
    STORAGE_KEY: 'taskManager_tasks',
    
    /**
     * Guarda las tareas en localStorage
     */
    saveTasks(tasks) {
        try {
            const tasksJSON = JSON.stringify(tasks);
            localStorage.setItem(this.STORAGE_KEY, tasksJSON);
            console.log('💾 Tareas guardadas en localStorage');
            return true;
        } catch (error) {
            console.error('❌ Error al guardar tareas:', error);
            return false;
        }
    },
    
    /**
     * Carga las tareas desde localStorage
     */
    loadTasks() {
        try {
            const tasksJSON = localStorage.getItem(this.STORAGE_KEY);
            if (!tasksJSON) {
                console.log('ℹ️ No hay tareas guardadas');
                return [];
            }
            const tasks = JSON.parse(tasksJSON);
            console.log(`💾 ${tasks.length} tareas cargadas desde localStorage`);
            return tasks;
        } catch (error) {
            console.error('❌ Error al cargar tareas:', error);
            return [];
        }
    },
    
    /**
     * Elimina todas las tareas del localStorage
     */
    clearTasks() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            console.log('🗑️ Tareas eliminadas del localStorage');
            return true;
        } catch (error) {
            console.error('❌ Error al eliminar tareas:', error);
            return false;
        }
    },
    
    /**
     * Exporta las tareas como JSON
     */
    exportTasks() {
        const tasks = this.loadTasks();
        return JSON.stringify(tasks, null, 2);
    },
    
    /**
     * Importa tareas desde JSON
     */
    importTasks(tasksJSON) {
        try {
            const tasks = JSON.parse(tasksJSON);
            if (!Array.isArray(tasks)) {
                throw new Error('El formato no es válido');
            }
            this.saveTasks(tasks);
            return true;
        } catch (error) {
            console.error('❌ Error al importar tareas:', error);
            return false;
        }
    }
};