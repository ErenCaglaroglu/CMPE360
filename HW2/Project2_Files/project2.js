// TO DO 1: Provides a 3x3 transformation matrix represented as an array containing 9 values arranged in column-major sequence.
// Initially, the transformation employs scaling, followed by rotation, and ultimately, translation.
// The specified rotation measurement is in degrees.
function GetTransform(positionX, positionY, rotation, scale) {
    // Initialize the identity matrix
    const matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    // Apply scale transformation
    matrix[0] = scale;
    matrix[4] = scale;

    // Convert rotation degrees to radians
    const angle = (rotation * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // Apply rotation transformation
    const a = matrix[0];
    const b = matrix[1];
    matrix[0] = a * cos - b * sin;
    matrix[1] = a * sin + b * cos;
    const c = matrix[3];
    const d = matrix[4];
    matrix[3] = c * cos - d * sin;
    matrix[4] = c * sin + d * cos;

    // Apply translation transformation
    matrix[6] = positionX;
    matrix[7] = positionY;

    // Return the resulting transformation matrix
    return matrix;
}


// TO DO 2:Provides a 3x3 transformation matrix represented as an array containing 9 values arranged in column-major sequence.
// The inputs consist of transformation matrices following the identical format.
// The resulting transformation initially employs trans1 and subsequently applies trans2.
function ApplyTransform(trans1, trans2) {
    // Initialize the result matrix as the identity matrix
    const result = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    // Multiply the matrices in the correct order (trans1 * trans2)
    for (let i = 0; i < 9; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        let sum = 0;
        for (let j = 0; j < 3; j++) {
            sum += trans1[row * 3 + j] * trans2[j * 3 + col];
        }
        result[i] = sum;
    }

    // Return the resulting transformation matrix
    return result;
}

