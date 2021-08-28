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
    
    var count = 0;
    for(count; count<types_of_food.length; count++){
        if(count===4){
            console.log("");
            var user = readline.question("More options(y/n)");
            if(user==='n'){
                break;
            }
            console.log("");
            
        }
        console.log(count+1, types_of_food[count]);
    }
    return types_of_food;
}

function findingRestaurant(data, order){
    var count = 0;
    data.forEach(element=>{
        element.foodItems.forEach(element2=>{
            if(element2.foodType === order){
                count +=1;
                console.log("");
                console.log(`Restaurant ${count}:- `, element.restaurant);
                var index = 0;
                for(index; index<element2[order].length; index++){
                    console.log(`${index+1} ${element2[order][index]}`);
                }
            }
        })
    })
    if(count === 0){
        console.log("Currently not available:(");
    }
}

function addToCart()

function food(){
    const data = fs.readFileSync('food.json');
    const food = JSON.parse(data);

    const awailableFood = foodType(food);

    console.log("");
    console.log(" **Welcome to Zomato**");
    const user = readline.question("what would you like to eat? ");

    findingRestaurant(food, user);

    return awailableFood;
}

// console.log(login());
// console.log(address());
console.log("");
console.log(`           ****            `);
console.log("   Eat what makes you happy :)");
console.log("");


food();
