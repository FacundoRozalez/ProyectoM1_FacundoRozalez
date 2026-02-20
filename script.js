/* ================================
   VARIABLES GLOBALES
================================ */
const selectCantidad = document.getElementById("cantidad-paleta");
const selectFormato = document.getElementById("formato-color");
const btnGenerar = document.getElementById("btn-generar");
const btnGuardar = document.getElementById("btn-guardar");
const contenedor = document.getElementById("paleta-generada");
const contenedorGuardadas = document.getElementById("paletas-guardadas");
const toast = document.getElementById("toast");

let paletaActual = [];
const MAX_PALETAS = 3;

/* ================================
   EVENTOS PRINCIPALES
================================ */
btnGenerar.addEventListener("click", generarPaleta);
btnGuardar.addEventListener("click", guardarPaleta);
selectFormato.addEventListener("change", function() {
    for (let i = 0; i < contenedor.children.length; i++) {
        actualizarFormatoBloque(i);
    }
});

/* ================================
   FUNCIONES DE GENERACIÓN
================================ */
function generarPaleta() {
    const cantidad = Number(selectCantidad.value);
    const formato = selectFormato.value;

    paletaActual = generarPaletaAleatoria(cantidad);
    mostrarPaleta(paletaActual);
    mostrarToast("Paleta generada correctamente 🎨");

    const contenedorPaletas = document.getElementById("contenedor-paletas");
    contenedorPaletas.style.display = "block";
    btnGuardar.style.display = "inline-block";

    mostrarPaletasGuardadas(); 
}

function generarPaletaAleatoria(n) {
    const paleta = [];
    for (let i = 0; i < n; i++) {
        if (paletaActual[i] && paletaActual[i].bloqueado) {
            paleta.push(paletaActual[i]);
            continue;
        }

        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 100);
        const l = Math.floor(Math.random() * 100);

        const hslValue = `hsl(${h}, ${s}%, ${l}%)`; 
        const hexValue = hslAHex(h, s, l);          

        const hslText = `HSL(${h}, ${s}%, ${l}%)`; 
        const hexText = `HEX(${hexValue})`;        

        paleta.push({
            hsl: hslValue,   
            hex: hexValue,   
            hslText: hslText, 
            hexText: hexText, 
            bloqueado: false
        });
    }
    return paleta;
    
}
/* ================================
   RENDERIZADO DINÁMICO
================================ */
function mostrarPaleta(paleta) {
    contenedor.innerHTML = "";
    contenedor.style.display = "flex";
    for (let i = 0; i < paleta.length; i++) crearBloqueColor(paleta[i], i);
}

function crearBloqueColor(color, index) {

    // CONTENEDOR GENERAL
    const contenedorColor = document.createElement("div");
    contenedorColor.className = "contenedor-color";

    // BLOQUE SOLO COLOR
    const bloque = document.createElement("div");
    bloque.className = "bloque-color";
    bloque.style.backgroundColor = color.hsl;
    bloque.style.animation = "fadeIn 0.4s ease";

    // BOTÓN BLOQUEO
    const btnLock = document.createElement("button");
    btnLock.className = "btn-lock";
    btnLock.innerHTML = color.bloqueado ? "🔒 Desbloquear" : "🔓 Bloquear";

    btnLock.addEventListener("click", function(e) {
        e.stopPropagation();
        paletaActual[index].bloqueado = !paletaActual[index].bloqueado;

        if (paletaActual[index].bloqueado) {
            btnLock.innerHTML = "🔒 Desbloquear";
        } else {
            btnLock.innerHTML = "🔓 Bloquear";
        }
    });

    bloque.appendChild(btnLock);

    // COPIAR AL PORTAPAPELES
    bloque.addEventListener("click", function() {
    copiarAlPortapapeles(color.hex);
});


    // CÓDIGOS DEBAJO
    let contCodigos = document.createElement("div");
    contCodigos.className = "codigos-color";

    const etiquetaHex = document.createElement("div");
    etiquetaHex.className = "codigo-hex";
    etiquetaHex.textContent = color.hexText; 

    const etiquetaHSL = document.createElement("div");
    etiquetaHSL.className = "codigo-hsl";
    etiquetaHSL.textContent = color.hslText; 

    contCodigos.appendChild(etiquetaHex);
    contCodigos.appendChild(etiquetaHSL);

    contenedorColor.appendChild(bloque);
    contenedorColor.appendChild(contCodigos);

    contenedor.appendChild(contenedorColor);

    actualizarFormatoBloque(index);
}


function actualizarFormatoBloque(index) {
    const bloque = contenedor.children[index];
    if (!bloque) return;

    const formato = selectFormato.value;
    const etiquetaHex = bloque.querySelector(".codigo-hex");
    const etiquetaHSL = bloque.querySelector(".codigo-hsl");

    if (formato === "hex") {
        etiquetaHex.classList.add("seleccionado");
        etiquetaHex.classList.remove("no-seleccionado");

        etiquetaHSL.classList.add("no-seleccionado");
        etiquetaHSL.classList.remove("seleccionado");
    } else {
        etiquetaHSL.classList.add("seleccionado");
        etiquetaHSL.classList.remove("no-seleccionado");

        etiquetaHex.classList.add("no-seleccionado");
        etiquetaHex.classList.remove("seleccionado");
    }
}


/* ================================
   COPIAR AL PORTAPAPELES
================================ */
function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto);
    mostrarToast("Copiado " + texto + " al portapapeles");
}

/* ================================
   GUARDADO EN LOCALSTORAGE
================================ */
function guardarPaleta() {
    if (!paletaActual.length) {
        mostrarToast("No hay paleta para guardar");
        return;
    }

    let guardadas = JSON.parse(localStorage.getItem("paletas")) || [];
    if (guardadas.length >= MAX_PALETAS) guardadas.shift();
    guardadas.push(paletaActual);
    localStorage.setItem("paletas", JSON.stringify(guardadas));

    mostrarPaletasGuardadas();
    mostrarToast("Paleta guardada correctamente 💾");
}

/* ================================
   MOSTRAR PALETAS GUARDADAS
================================ */
function mostrarPaletasGuardadas() {

    const guardadas = JSON.parse(localStorage.getItem("paletas")) || [];
    contenedorGuardadas.innerHTML = "";

     
    const tituloGuardadas = document.getElementById("titulo-guardadas");
    if (guardadas.length > 0) {
        tituloGuardadas.style.display = "block";
    } else {
        tituloGuardadas.style.display = "none";
        return; 
    }

    guardadas.forEach(function(paleta, i) {

        const contenedorPaleta = document.createElement("div");
        contenedorPaleta.className = "paleta-guardada-completa";

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "🗑️ Eliminar";
        btnEliminar.className = "btn-eliminar";

        btnEliminar.addEventListener("click", function() {
            eliminarPaleta(i);
        });

        
        const fila = document.createElement("div");
        fila.className = "fila-guardada";

        paleta.forEach(function(color) {

            const bloque = document.createElement("div");
            bloque.className = "bloque-color bloque-guardado";
            bloque.style.backgroundColor = color.hsl;

            const contCodigos = document.createElement("div");
            contCodigos.className = "codigos-color";
            
            const etiquetaHex = document.createElement("div");
            etiquetaHex.className = "codigo-hex";
            etiquetaHex.textContent = color.hexText;

            const etiquetaHSL = document.createElement("div");
            etiquetaHSL.className = "codigo-hsl";
            etiquetaHSL.textContent = color.hslText;
            
            contCodigos.appendChild(etiquetaHex);
            contCodigos.appendChild(etiquetaHSL);

            bloque.appendChild(contCodigos);
            fila.appendChild(bloque);
        });
        
        contenedorPaleta.appendChild(fila);
        contenedorPaleta.appendChild(btnEliminar);
        contenedorGuardadas.appendChild(contenedorPaleta);
    });
}

/* ================================
   ELIMINAR PALETA
================================ */
function eliminarPaleta(index) {
    let guardadas = JSON.parse(localStorage.getItem("paletas")) || [];
    guardadas.splice(index, 1);
    localStorage.setItem("paletas", JSON.stringify(guardadas));
    mostrarPaletasGuardadas();
    mostrarToast("Paleta eliminada 🗑️");
}

/* ================================
   MICROFEEDBACK (TOAST)
================================ */
function mostrarToast(mensaje) {
    toast.textContent = mensaje;
    toast.classList.add("mostrar");

    setTimeout(function() {
        toast.classList.remove("mostrar");
    }, 2500);
}


/* ================================
   CONVERSIÓN HSL → HEX
================================ */
function hslAHex(h, s, l) {
    s /= 100; l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16).slice(1).toUpperCase();
}

