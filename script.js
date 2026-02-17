//ATRAPAR EL SELECT
//const select = document.getElementById("cantidad-paleta");

//select.addEventListener("change", capturarSeleccion);

//function capturarSeleccion(){

  //  const cantidad = Number(select.value);

    //console.log("Cantidad elegida", cantidad)

//}


//SIN IF ELSE Y MOSTRANDO EN EL DIV

const select = document.getElementById("cantidad-paleta");
const contenedor = document.querySelector(".paleta-generada"); // usamos la clase

select.addEventListener("change", capturarSeleccion);

function capturarSeleccion() {
    const cantidad = Number(select.value);
    if (!cantidad) return; // evita procesar la opción vacía
    // Generamos la paleta según la cantidad seleccionada
    const paleta = generarPaletaAleatoria(cantidad);

    mostrarPaleta(paleta);
}

// Genera colores HSL + HEX
function generarPaletaAleatoria(n) {
    const paleta = [];
    for (let i = 0; i < n; i++) {
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 100);
        const l = Math.floor(Math.random() * 100);
        const hsl = `hsl(${h}, ${s}%, ${l}%)`;
        const hex = hslAHex(h, s, l);
        paleta.push({ hsl, hex });
    }
    return paleta;
}

// Mostrar la paleta horizontal
function mostrarPaleta(paleta) {
    contenedor.innerHTML = ""; // limpiar paleta anterior
    contenedor.style.display = "flex";
    contenedor.style.flexDirection = "row"; // horizontal
    contenedor.style.alignItems = "flex-end";   // que los HEX queden debajo

    paleta.forEach(color => {
        // bloque contenedor para color + HEX
        const bloque = document.createElement("div");
        bloque.style.display = "flex";
        bloque.style.flexDirection = "column";  // color arriba, HEX abajo
        bloque.style.alignItems = "center";
        bloque.style.flex = "1";                // cada bloque ocupa espacio igual
        bloque.style.margin = "0";          // separador horizontal

        // div del color
        const divColor = document.createElement("div");
        divColor.style.backgroundColor = color.hsl;
        divColor.style.width = "100%";
        divColor.style.height = "279px";        // alto del color


        // etiqueta con HEX
        const etiqueta = document.createElement("div");
        etiqueta.style.textAlign = "center";
        etiqueta.style.fontSize = "12px";
        etiqueta.style.marginTop = "4px";
        etiqueta.textContent = color.hex;

        bloque.appendChild(divColor);
        bloque.appendChild(etiqueta);

        contenedor.appendChild(bloque);
    });
}

// Convertir HSL a HEX
function hslAHex(h, s, l) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
    else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}
