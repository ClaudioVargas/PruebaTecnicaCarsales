# Front Rick and Morty
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.8.

> Esta esta es una aplicacion informativa que te permite ver la informacion de los episodios y personajes  de Rick and Morty


## 📋 Tabla de Contenidos
- [Características](#-características)
- [Prerrequisitos](#-prerrequisitos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Comandos Disponibles](#-comandos-disponibles)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Licencia](#-licencia)
- [Parte de la pauta cubierta](#-parte-de-la-pauta-cubierta)



## ✨ Características
- **Arquitectura de Standalone Components:** Sin `NgModule`, enfocado en la simplicidad.
- **Gestión de Estado:** NgRx para un flujo de datos predecible.
- **Estilos:** CSS / Material angular.
- **Lazy Loading:** Optimización de rutas para mejor rendimiento.



## ⚙️ Prerrequisitos
Asegúrate de tener instalado lo siguiente antes de empezar:
- [Node.js](https://nodejs.org) (Versión LTS recomendada)
- [Angular CLI](https://angular.dev) (`npm install -g @angular/cli`)

## 🚀 Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/ClaudioVargas/PruebaTecnicaCarsales.git
    cd PruebaTecnicaCarsales/front
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Ejecutar la aplicación:**
    ```bash
    ng serve -o
    ```
    La aplicación estará disponible en `http://localhost:4200`.

---

## 🛠️ Comandos Disponibles
*   `ng serve`: Ejecuta el servidor de desarrollo.
*   `ng build`: Genera un paquete de produccion.
*   `ng test`: Ejecuta pruebas unitarias.
---

## 🧠 Tecnologías Utilizadas
*   [Angular 21](https://angular.dev/)
*   [RxJS](https://rxjs.dev)
*   [Angular Material](https://angular.io) (Opcional)
:
##  Parte de la pauta cubierta
*   [Angular 21](https://angular.dev/)
*   [RxJS](https://rxjs.dev)
*   [Angular Material](https://angular.io) (Opcional)

*   Registrar correctamente HttpClient en la configuración de la app, por ejemplo con provideHttpClient().
*   Implementar: búsqueda por nombre, filtro por temporada y paginación.
*   Separar visualmente los estados de carga, error y sin resultados.
*   Mostrar un mensaje de error real al usuario cuando falle la API.
*   Mostrar un estado de “sin resultados” distinto al de carga.
*   Mejorar el modal de detalle para que muestre información útil del episodio, no solo la fecha.
*   Eliminar texto placeholder tipo lorem ipsum y reemplazarlo por contenido coherente con la app.
*   Corregir o eliminar la ruta detalle si no tiene uso real.
*   Revisar la navegación para usar routing Angular de forma limpia, idealmente con routerLink en vez de href.
*   Evitar any en el dialog y tipar correctamente MAT_DIALOG_DATA.
*   Limpiar console.log, comentarios muertos y restos de pruebas o depuración.
*   Corregir los tests actuales, porque al menos algunos no coinciden con el código real.
*   Agregar al menos 1 test unitario válido sobre un componente o servicio real.
*   Reescribir el README del frontend para explicar cómo correr la app, qué hace, qué decisiones técnicas tomó y qué *   partes de la pauta cubre.
*   Como mejora de puntaje, agregar manejo global de errores con interceptor.
*   Como mejora de puntaje, considerar responsive real y alguna optimización simple como caching o lazy loading.
