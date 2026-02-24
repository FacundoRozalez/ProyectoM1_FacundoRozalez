# ProyectoM1_FacundoRozalez

# Colorfly Studio - Generación de Paletas de Colores

## Descripción
**Colorfly Studio** es una aplicación web diseñada para generar, visualizar y gestionar paletas de colores de manera interactiva.

Permite crear combinaciones cromáticas aleatorias, copiar códigos de color al portapapeles y guardar paletas en el almacenamiento local del navegador.

La aplicación está orientada a diseñadores, desarrolladores y cualquier usuario interesado en el trabajo con identidad visual y branding.

---

## Manual de usuario

### 🔹 Acceder a la Aplicación
  1. Abrir un navegador web.
  2. En la barra de direcciones, escribir o pegar:

      https://facundorozalez.github.io/ProyectoM1_FacundoRozalez/

  3. Presionar Enter para cargar la aplicación.

### 🔹 Generar una paleta
  1. Seleccionar la **cantidad de colores** deseada.
    - 6
    - 8
    - 9
  2. Elegir el **formato de color**:
    - HEX
    - HSL
  3. Presionar el botón **"Generar paleta"**.

### 🔹 Bloquear un color
  - Presionar el botón 🔒 **Bloquear** dentro de un bloque de color.
  - Los colores bloqueados se mantendrán al generar una nueva paleta.

### 🔹 Ampliar una paleta existente
  1. Generar una paleta con la cantidad de colores deseada.
  2. Bloquear todos los colores de la paleta con el boton Bloquear.
  3. Cambiar la cantidad de colores.
  4. Presionar nuevamente el botón "Generar paleta".
  - Los colores bloqueados se mantendrán sin cambios.
  - Se agregarán automáticamente nuevos colores hasta completar la nueva cantidad seleccionada.
  
### 🔹 Reducir una paleta existente
  1. Generar una paleta con la cantidad de colores deseada.
  2. Bloquear los colores que se desean conservar.
  3. Cambiar la cantidad de colores a un número menor.
  4. Presionar nuevamente el botón "Generar paleta".
  5. Los colores bloqueados se mantendrán sin cambios.
  6. La paleta se reducirá automáticamente eliminando los colores que superen la nueva cantidad seleccionada.
  7. La reducción se realiza conservando el orden visual de los colores de izquierda a derecha.(Se eliminan los colores que estan a la derecha de la paleta).

### 🔹 Copiar un color
  - Hacer clic sobre el bloque de color para copiar el código HEX al portapapeles.

### 🔹 Visualizar formato activo
  - Al alternar entre HEX y HSL, el código correspondiente de la paleta generada se resaltará automáticamente indicando el formato seleccionado como activo.

### 🔹 Guardar paleta
  - Presionar el botón **Guardar paleta** para almacenar la paleta actual (con sus colores y códigos en formato HEX o HSL).
  - El sistema permite guardar un máximo de **3 paletas**.
  - Las paletas se almacenan en `LocalStorage`.

### 🔹 Eliminar paleta guardada
  - Dentro de las paletas guardadas, presionar el botón 🗑️ **Eliminar**.

---

## Decisiones técnicas

### Arquitectura
  - La aplicación está construida con:

    - HTML para la estructura semántica del contenido.
    - CSS para estilos, animaciones y diseño responsive.
    - JavaScript para la lógica dinámica del sistema y manipulación del DOM.

### Generación de colores en dos formatos(HSL/HEX)
  - Se utiliza el modelo **HSL** para la generación aleatoria de colores.
  - Conversión interna de **HSL → HEX** para compatibilidad.

### Persistencia de datos
  - Se utiliza `LocalStorage` del navegador para:
    - Guardar paletas.
    - Recuperar paletas guardadas.
    - Limitar almacenamiento a 3 paletas.

### Interacción UI/UX
  - Animaciones suaves mediante CSS.
  - Toasts de microfeedback para mejorar la experiencia del usuario.
  - Diseño responsive para dispositivos móviles.

---

## Pasos para ejecutar la aplicación en local

### Requisitos
  - Navegador web.

### Ejecución
#### Opción 1: Descargar el proyecto
  1. Descargar el proyecto desde GitHub:
     - Entrar al repositorio del proyecto en GitHub:

        https://github.com/facundorozalez/ProyectoM1_FacundoRozalez

     - Hacer clic en el botón verde que dice "Code".
     - Seleccionar la opción "Download ZIP".
     - Se descargará un archivo comprimido en tu computadora.

  2. Extraer el archivo:
     - Buscar el archivo descargado (generalmente está en la carpeta Descargas).
     - Hacer clic derecho sobre el archivo.
     - Seleccionar "Extraer todo" o "Descomprimir".
     - Se creará una nueva carpeta con el proyecto.

#### Opción 2: Clonar el repositorio.

  1. Abrir una terminal.
  2. Ejecutar el siguiente comando:

git clone https://github.com/facundorozalez/ProyectoM1_FacundoRozalez

#### Abrir la aplicación (luego de Descargar o Clonar):
  - Entrar a la carpeta que se creó.
  - Buscar el archivo llamado:

     index.html

  - Hacer doble clic sobre ese archivo.
  - La aplicación se abrirá automáticamente en tu navegador.

### Nota
  - No es necesario instalar ningún programa adicional.
  - No se necesita servidor.
  - No se requiere configuración.
  - La aplicación funciona directamente al abrir el archivo.

---

## Pasos para desplegar la aplicación en Github

🔹 Paso 1: Crear un repositorio en GitHub
  - Ingresar a GitHub.
  - Iniciar sesión con una cuenta.
  - Hacer clic en el botón New para crear un nuevo repositorio.
  - Asignar un nombre al proyecto.
  - Marcar la opción Public.
  - Presionar Create repository.

🔹 Paso 2: Subir los archivos del proyecto
  - Opción 1: Subir desde la web (recomendado para principiantes)
    1. Abrir el repositorio creado.
    2. Hacer clic en Add file → Upload files.
    3. Arrastrar la carpeta del proyecto o seleccionar los archivos manualmente.
    4. Presionar Commit changes para confirmar la subida.

  - Opción 2: Subir usando Git (opción avanzada) 
    - Si tenés instalado Git, podés usar la terminal:

      - git init
      - git add .
      - git commit -m "Subida del proyecto"
      - git branch -M main
      - git remote add origin URL_DEL_REPOSITORIO
      - git push -u origin main

🔹 Paso 3: Configurar el despliegue
  En la sección Build and deployment:
  - En Source, seleccionar la rama principal del proyecto (generalmente main o master).
  - En Folder, elegir la carpeta raíz del proyecto.

🔹 Paso 4: Guardar y publicar
  - Presionar el botón Save.
  - Esperar unos minutos mientras GitHub genera el enlace público de la aplicación.
  - Copiar la URL generada para acceder al sitio web desde cualquier navegador.

---

## Autor
Facundo Rozalez
