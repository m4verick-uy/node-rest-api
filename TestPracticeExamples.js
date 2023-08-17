//Ejemplo de suma utilizando la propiedad de propagación y una funcion reductora

// Con strings la suma concatena
function concat(...nums){
    const sum = nums.reduce((total, num) => total + num, "");
    return sum;
}
const result = concat("hola", "guille", "arquitecto");
console.log(result);


//Con números suma

function add(...nums){
    const sum = nums.reduce((total, num) => total + num, 0);
    return sum;
}
const result1 = add(5, 10, 20);
console.log(result1);
