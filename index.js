const readline = require('readline-sync');
const fs = require('fs');

function login(){
    const username = readline.question("userName/Phone Number:- ");
    const password = readline.question("password:- ");
    return "Loged in Successfully";
}

function address(){
    const address = readline.question("Your current location:- ");
    return address;
}

function food(){
    const data = fs.readFileSync('food.json');
    const food = JSON.parse(data);
    food.forEach(element => {
        console.log(element.foodItems[0].foodType);
    });
    return typeof food;
}

// console.log(login());
// console.log(address());

food();
