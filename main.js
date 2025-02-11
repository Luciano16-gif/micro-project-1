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

        // If array2 is shorter than array1, add elements to array2
        while (array2.length < array1.length) {
            let newElement = /* array1[array2.length] */ generateRandomNumber();
            array2.push(newElement);
            console.log(`Element ${newElement} was added to array2.`);
            if (areEqual) {
                console.log("All common elements are equal.");
            }

            // Check if the new element is equal in both arrays
            if (array2[array2.length - 1] !== array1[array2.length - 1]) {
                console.log(`Different at position ${array2.length - 1}: ${array1[array2.length - 1]} and ${array2[array2.length - 1]}`);
                return; // Exit if there are differences
            }
        }

        // If the arrays have the same length and are equal
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
    }


    // Show the current state of the arrays
    console.log("Current state:");
    console.log("array1:", array1);
    console.log("array2:", array2);
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 4);
}

// Example usage:
let array1 = [1, 2, 3];
let array2 = [1];
compareArrays(array1, array2);
console.log(array1);
console.log(array2);