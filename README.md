# React Decameron

Este proyecto es de prueba para practicar nuevos conocimientos, proyecto de busqueda, posteo de empleos de desarrollo.

## Instalación

Clona este repositorio y ejecuta `npm install` para instalar las dependencias.

## Uso y pruebas desarrollo

Ejecuta `npm run dev` para levantar un servidor de desarrollo en `http://localhost:5173` o quizas en `http://localhost:5174`.

Crea un archivo `.env.local` y establece `VITE_API_URL=url_base` en él para configurar la URL base de la API. Ejemplo en mi localhost: `VITE_API_URL=http://decameron.test` ya que esta app es solo el front y se conecta con la api hecha en laravel.

## Despliegue a producción

1. Ejecuta `npm run build` para compilar el proyecto.

2. Copia el contenido de la carpeta `dist` a tu servidor o hosting.

NOTA: Despues del despliegue del front y back, para acceder desde el inicio de sesión usa estos datos de demo: `email: test.decameron@test.com, password: deca.2468@`

## Desarrollo

El proyecto esta desarrollado con React, Vite, TailwindCSS y Axios.

## Documentación

- [Documentación de Vite](https://vitejs.dev/guide/api-plugin.html)
- [Documentación de React](https://reactjs.org/docs/getting-started.html)
- [Documentación de TailwindCSS](https://tailwindcss.com/docs/installation)
- [Documentación de Axios](https://axios-http.com/docs/intro)

## Desarrollador

- [Alejandro Villegas](https://github.com/Alekuoshu)

## Estructura del proyecto

- `src`: Contiene el código fuente de la aplicación.
  - `components`: Componentes de React.
  - `config`: Configuración axios de la aplicación.
  - `context`: Contexto de la aplicación.
  - `data`: Datos de la aplicación.
  - `hooks`: Hooks de la aplicación.
  - `layouts`: Layouts de la aplicación.
  - `views`: Vistas de la aplicación.
  - `index.css`: Estilos de la aplicación.
  - `main.jsx`: El punto de entrada de la App.
  - `router.jsx`: Rutas de la aplicación.
- `public`: Contiene los archivos estáticos de la aplicación.
- `docs`: Contiene la documentación de la aplicación.

## Contribución

Si deseas contribuir a este proyecto, puedes hacerlo de las siguientes maneras:

- Reportar bugs o errores en el repositorio.
- Crear un pull request con una nueva característica o mejora.
- Ayudar a mejorar la documentación.

## Licencia

Este proyecto está bajo la licencia MIT.
