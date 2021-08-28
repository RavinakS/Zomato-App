const readline = require('readline-sync');

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
    
}

console.log(login());
console.log(address());