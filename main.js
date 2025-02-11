
// Array para almacenar los valores
let array1 = [1, 2, 3];
let array2 = [1];

// Obtener los botones por su ID
const botonVerde = document.getElementById('green');
const botonRojo = document.getElementById('red');
const botonAmarillo = document.getElementById('yellow');
const botonAzul = document.getElementById('blue');

// Asignar eventos de clic a cada botón
botonVerde.addEventListener('click', () => agregarValor(0));
botonRojo.addEventListener('click', () => agregarValor(1));
botonAzul.addEventListener('click', () => agregarValor(2));
botonAmarillo.addEventListener('click', () => agregarValor(3));

// Función para agregar el valor al array
function agregarValor(valor) {
  array2.push(valor); // Añadir el valor al array
  console.log('Array actual:', array2); // Mostrar el array en la consola
  compararArrays(array1, array2);
}

function compararArrays(array1, array2) {
    let sonIguales = true;

    // Comparar los elementos comunes
    for (let i = 0; i < array2.length; i++) {
        if (array1[i] !== array2[i]) {
            console.log(`Diferentes en la posición ${i}: ${array1[i]} y ${array2[i]}`);
            sonIguales = false;
            return; // Salir de la función si hay diferencias
        }
    }

    // Si todos los elementos comunes son iguales
    if (sonIguales) {
        console.log("Todos los elementos comunes son iguales.");

        // Si los arrays tienen la misma longitud y son iguales
        if (array1.length === array2.length) {
            // Si los arrays tienen la misma longitud
            if (array1.length === array2.length) {
                console.log("Los arrays son iguales. Actualizando arrays...");

                // Añadir un elemento a array1
                let nuevoElemento = generarNumeroAleatorio();
                array1.push(nuevoElemento);
                console.log(`Se añadió el elemento ${nuevoElemento} a array1.`);

                // Vaciar array2
                array2.length = 0;
                console.log("array2 fue vaciado.");
        }

        if (array2[array2.length - 1] !== array1[array2.length - 1]) {
            console.log(`Diferentes en la posición ${array2.length - 1}: ${array1[array2.length - 1]} y ${array2[array2.length - 1]}`);
            return; // Salir si hay diferencias
        }
    }
}

    // Mostrar el estado actual de los arrays
    console.log("Estado actual:");
    console.log("array1:", array1);
    console.log("array2:", array2);
}

function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 4);
}