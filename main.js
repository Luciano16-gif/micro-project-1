// Arrays to store values
let array1 = [1, 2, 3];
let array2 = [1];

// Get the buttons by ID
const botonVerde = document.getElementById('green');
const botonRojo = document.getElementById('red');
const botonAmarillo = document.getElementById('yellow');
const botonAzul = document.getElementById('blue');

// Assign click events to each button
botonVerde.addEventListener('click', () => agregarValor(0));
botonRojo.addEventListener('click', () => agregarValor(1));
botonAzul.addEventListener('click', () => agregarValor(2));
botonAmarillo.addEventListener('click', () => agregarValor(3));

// Function to add a value to the array
function agregarValor(valor) {
  array2.push(valor); // Add value to array
  console.log('Array actual:', array2); // Show the array in the console
  compareArrays(array1, array2);
}

function compareArrays(array1, array2) {
    let areEqual = true;


    // Compare the common elements
    for (let i = 0; i < array2.length; i++) {
        if (array1[i] !== array2[i]) {
            console.log(`Different at position ${i}: ${array1[i]} and ${array2[i]}`);
            areEqual = false;
            return; // Exit the function if there are differences
        }
    }

    // If all common elements are equal
    if (areEqual) {
        console.log("All common elements are equal.");
        if (array1.length === array2.length) {
            // If the arrays have the same length
            if (array1.length === array2.length) {
                console.log("The arrays are equal. Updating arrays...");

                // Add an element to array1
                let newElement = generateRandomNumber();
                array1.push(newElement);
                console.log(`Element ${newElement} was added to array1.`);

                // Empty array2
                array2.length = 0;
                console.log("array2 was emptied.");
            }
        }

        if (array2[array2.length - 1] !== array1[array2.length - 1]) {
            console.log(`Diferentes en la posición ${array2.length - 1}: ${array1[array2.length - 1]} y ${array2[array2.length - 1]}`);
            return; // Exit if there are diferences
        }
    }


    // Show the current state of the arrays
    console.log("Current state:");
    console.log("array1:", array1);
    console.log("array2:", array2);
    }

// Function to generate a random number
function generateRandomNumber() {
    return Math.floor(Math.random() * 4);
}

