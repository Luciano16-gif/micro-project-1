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

        // Si array2 es más corto que array1, añadir elementos a array2
        while (array2.length < array1.length) {
            let nuevoElemento = array1[array2.length];
            array2.push(nuevoElemento);
            console.log(`Se añadió el elemento ${nuevoElemento} a array2.`);
            if (sonIguales) {
                console.log("Todos los elementos comunes son iguales.");
            }

            // Verificar si el nuevo elemento es igual en ambos arrays
            if (array2[array2.length - 1] !== array1[array2.length - 1]) {
                console.log(`Diferentes en la posición ${array2.length - 1}: ${array1[array2.length - 1]} y ${array2[array2.length - 1]}`);
                return; // Salir si hay diferencias
            }
        }

        // Si los arrays tienen la misma longitud y son iguales
        if (array1.length === array2.length) {
            // Si los arrays tienen la misma longitud
            if (array1.length === array2.length) {
                console.log("Los arrays son iguales. Actualizando arrays...");

                // Añadir un elemento a array1
                let nuevoElemento = array1.length + 1;
                array1.push(nuevoElemento);
                console.log(`Se añadió el elemento ${nuevoElemento} a array1.`);

                // Vaciar array2
                array2.length = 0;
                console.log("array2 fue vaciado.");
        }
    }
}

    // Mostrar el estado actual de los arrays
    console.log("Estado actual:");
    console.log("array1:", array1);
    console.log("array2:", array2);
}

// Ejemplo de uso:
let array1 = [1, 2, 3, 4, 5, 6, 7, 8];
let array2 = [1, 2, 3, 4, 5, 6];
compararArrays(array1, array2);