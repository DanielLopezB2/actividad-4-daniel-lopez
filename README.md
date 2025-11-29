# Task Manager - Sistema de Gestión de Tareas

## Descripción

Aplicación web interactiva para gestionar tareas personales desarrollada como proyecto académico para demostrar el uso de Git, GitHub y trabajo colaborativo mediante historias de usuario.

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage para persistencia de datos
- GitHub Pages para despliegue

## Historias de Usuario

### HU-001: Estructura Base e Interfaz Principal

**Como** usuario
**Quiero** ver una interfaz limpia y organizada al abrir la aplicación
**Para** comenzar a gestionar mis tareas de manera efectiva

**Criterios de Aceptación:**

- Estructura HTML5 semántica (index.html)
- Header con título de la aplicación y contador de tareas
- Layout principal dividido en: formulario de entrada y área de visualización
- Estilos CSS base con diseño moderno
- Paleta de colores definida y consistente
- Diseño responsivo móvil-first

---

### HU-002: Crear y Agregar Tareas

**Como** usuario
**Quiero** poder crear nuevas tareas con información detallada
**Para** organizar mis pendientes del día

**Criterios de Aceptación:**

- Formulario con campos: título (requerido), descripción, categoría, prioridad
- Categorías disponibles: Trabajo, Personal, Estudio, Otros
- Niveles de prioridad: Alta (rojo), Media (amarillo), Baja (verde)
- Botón "Agregar Tarea" funcional
- Validación: título no puede estar vacío
- Mensaje de confirmación al agregar tarea
- Limpiar formulario después de agregar
- Archivo tasks.js con lógica de creación

---

### HU-003: Visualizar y Listar Tareas

**Como** usuario
**Quiero** ver todas mis tareas organizadas en tarjetas
**Para** tener una visión clara de mis pendientes

**Criterios de Aceptación:**

- Mostrar tareas en formato de tarjetas
- Cada tarjeta muestra: título, descripción, categoría, prioridad, fecha de creación
- Indicador visual de prioridad (color en borde o etiqueta)
- Badge/etiqueta para la categoría
- Organización por fecha (más recientes primero)
- Animación al agregar nueva tarea
- Grid responsivo (1 columna móvil, 2-3 columnas desktop)
- Archivo ui.js para renderizado de tarjetas

---

### HU-004: Gestionar Estados de Tareas

**Como** usuario
**Quiero** marcar tareas como completadas o eliminarlas
**Para** mantener actualizada mi lista de pendientes

**Criterios de Aceptación:**

- Checkbox para marcar tarea como completada
- Estilo visual diferente para tareas completadas (tachado, opacidad)
- Botón de eliminar tarea con confirmación
- Contador actualizado automáticamente (pendientes/completadas)
- Persistencia de estados en LocalStorage
- Animación al completar o eliminar tarea
- Archivo state.js para gestión de estados

---

### HU-005: Filtros y Búsqueda de Tareas

**Como** usuario
**Quiero** filtrar y buscar tareas específicas
**Para** encontrar rápidamente lo que necesito

**Criterios de Aceptación:**

- Barra de búsqueda por título o descripción
- Filtros por estado: Todas, Pendientes, Completadas
- Filtros por categoría: Todas, Trabajo, Personal, Estudio, Otros
- Filtros por prioridad: Todas, Alta, Media, Baja
- Botón "Limpiar filtros"
- Búsqueda en tiempo real (mientras se escribe)
- Mensaje cuando no hay resultados
- Archivo filters.js para lógica de filtrado

---

## Instalación y Uso

### Prerrequisitos

- Git instalado
- Navegador web moderno (Chrome, Firefox, Edge)
- Editor de código (VS Code recomendado)

### Pasos de Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/[usuario]/task-manager.git
```

2. Navegar al directorio:

```bash
cd task-manager
```

3. Abrir index.html en el navegador o usar Live Server

### Convención de Commits

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `style`: Cambios de estilos/CSS
- `refactor`: Refactorización de código
- `docs`: Documentación

## Integrantes del Equipo

- **Nombre:** Daniel Lopez Bedoya
  - **Rol:** Desarrollador Full Stack (Simulado)

## Enlaces

- **Repositorio:** https://github.com/DanielLopezB2/actividad-4-daniel-lopez
- **GitHub Pages:** https://daniellopezb2.github.io/actividad-4-daniel-lopez/

## Créditos

Desarrollado como proyecto académico para el módulo de Control de Versiones
