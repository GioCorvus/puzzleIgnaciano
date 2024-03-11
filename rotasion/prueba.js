// Función para aplicar una rotación aleatoria a la imagen
function aplicarRotacionAleatoria() {
    // Selecciona la imagen por su ID
    let imagen = document.getElementById("miImagen");
    // Genera un ángulo aleatorio entre 0 y 3 (0, 90, 180 o 270 grados)
    let anguloAleatorio = Math.floor(Math.random() * 4) * 90;
    // Aplica la rotación aleatoria a la imagen
    imagen.style.transform = "rotate(" + anguloAleatorio + "deg)";
    // Verifica si la imagen está centrada
    if (anguloAleatorio % 360 === 0) {
        console.log("La imagen está centrada");
    }
    // Agrega un evento de doble clic a la imagen para rotarla 90 grados a la derecha
    imagen.addEventListener("dblclick", function() {
        // Obtiene el ángulo actual de rotación de la imagen
        let anguloActual = anguloAleatorio;
        // Calcula el nuevo ángulo de rotación (90 grados a la derecha)
        let nuevoAngulo = (anguloActual + 90) % 360;
        // Aplica la rotación a la imagen
        imagen.style.transform = "rotate(" + nuevoAngulo + "deg)";
        // Actualiza el ángulo aleatorio para futuras rotaciones
        anguloAleatorio = nuevoAngulo;
        
        // Verifica si la imagen está centrada después de la rotación
        if (nuevoAngulo % 360 === 0) {
            console.log("La imagen está centrada");
        }
    });
}

// Llama a la función para aplicar la rotación aleatoria cuando se cargue la página
window.onload = function() {
    aplicarRotacionAleatoria();
};
