function compararYCompararArrays(array1, array2) {
    while (true){
        let longitudMinima = Math.min(array1.length, array2.length);
        for (let i = 0; i < longitudMinima; i++) {
            if (array1[i] !== array2[i]){
                console.log(`Diferentes en la posición ${i}: ${array1[i]} y ${array2[i]}`);
                return;
            }
        }
        if(array1.length === array2.length){
            console.log("Los arrays son iguales");


            let nuevoElemento = array1.length + 1;
            array1.push(nuevoElemento);
            console.log(`Se añade el elemento ${nuevoElemento} al array 1`);

            array2.length = 0;
            console.log("Se limpia el array 2");

            console.log("Estado actual:");
            console.log("array1:", array1);
            console.log("array2:", array2);
        } else {
            console.log("Los arrays tienen longitudes diferentes");
            return;
        }
    };
}

let array1 = [1, 2, 3, 4, 5, 6, 7, 8];
let array2 = [1, 2, 3, 4, 5, 92, 7, 8];
compararYCompararArrays(array1, array2);