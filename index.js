const readline = require('readline-sync');
const fs = require('fs');
const { LOADIPHLPAPI } = require('dns');

function login(){
    const username = readline.question("userName/Phone Number:- ");
    const password = readline.question("password:- ");
    return "Loged in Successfully";
}

function address(){
    const address = readline.question("Your current location:- ");
    return address;
}


function foodType(data){
    const types_of_food = [];
    data.forEach(element =>{
        element.foodItems.forEach(element2=>{
            var exist = types_of_food.includes(element2.foodType);
            if(exist === false){
                types_of_food.push(element2.foodType);
            }
        })
    });

    return types_of_food;

}

function food(){
    const data = fs.readFileSync('food.json');
    const food = JSON.parse(data);
    console.log("");
    // food.forEach(element => {
    //     console.log(`* ${element.restaurant}`);
    // });
    // console.log("");

    console.log(foodType(food));
}

// console.log(login());
// console.log(address());

food();
