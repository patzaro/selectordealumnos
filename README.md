# Selector de Alumnos por Curso

![Vista previa de la aplicación](https://github.com/patzaro/selectordealumnos/blob/main/assets/screenshot.png)

## Descripción

Esta es una aplicación web interactiva construida con React y TypeScript que permite gestionar y visualizar alumnos distribuidos en diferentes cursos. La aplicación comienza con la carga de una lista de alumnos desde un archivo de texto, los asigna a cursos predefinidos y ofrece una interfaz sencilla para seleccionarlos y realizar un seguimiento de sus "confirmaciones".

## Características Principales

-   **Carga de Alumnos Dinámica**: La aplicación no utiliza datos estáticos. El usuario debe cargar un archivo `.txt` con un nombre de alumno por línea para poblar la aplicación.
-   **Distribución Automática**: Una vez cargados, los alumnos son distribuidos equitativamente entre los cursos disponibles.
-   **Interfaz de Selección Anidada**: Permite al usuario seleccionar primero un curso y luego un alumno de la lista de matriculados en ese curso.
-   **Visualización de Perfil**: Muestra una tarjeta de perfil para el alumno seleccionado, incluyendo su nombre, curso, una imagen de perfil generada aleatoriamente y un contador.
-   **Sistema de Confirmación**: Incluye una funcionalidad para "confirmar" a un alumno. Cada confirmación incrementa un contador visible en su perfil.
-   **Diseño Moderno y Responsivo**: Creada con Tailwind CSS para una interfaz limpia, moderna y adaptable a diferentes tamaños de pantalla.

## Cómo Usar

1.  **Cargar el archivo**: Al iniciar la aplicación, se te pedirá que subas un archivo `.txt`. Puedes arrastrarlo y soltarlo en el área designada o hacer clic para seleccionarlo. El archivo debe contener un nombre de alumno por cada línea.
2.  **Seleccionar un Curso**: Una vez que los alumnos se han cargado, utiliza el primer menú desplegable para elegir un curso.
3.  **Seleccionar un Alumno**: El segundo menú desplegable se activará, mostrando solo los alumnos matriculados en el curso que seleccionaste. Elige un alumno.
4.  **Ver y Confirmar**: Aparecerá una tarjeta con los detalles del alumno. Para incrementar su contador de confirmaciones, marca la casilla y pulsa el botón "Confirmar".
