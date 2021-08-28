const readline = require('readline-sync');
const fs = require('fs');

function login(){
    const username = readline.question("userName/Phone Number:- ");
    const password = readline.question("password:- ");

    const filename = 'usersDetails.json'
    const all_users_data = readJsonFile(filename);
    all_users_data.users.forEach(element=>{
        if(element.userName === username){
            if(element.password === password){
                return "Done";
            }else{
                return "Wrong Password!"
            }
        }else{
            return "UserName not exist. try signing Up(s)."
        }
    })
}

function signUp(){
    const filename = 'usersDetails.json';
    console.log("");
    const userName = readline.question("userName/Phone Number:- ");

    const all_users_data = readJsonFile(filename);
    all_users_data.users.forEach(element=>{
        if(element.userName === userName){
            console.log("hii");
            return "exist";
        }
    })
    console.log("");
    const password = readline.question("Password:- ");
    console.log("");
    const password2 = readline.question("Re-enter the password:- ");
    console.log("");

    if(password===password2){
        const location = address();
        const userDetails = {
            "userName": userName,
            "password": password2,
            "address": location
        }

        all_users_data.users.push(userDetails);

        writeJsonFile(filename, all_users_data);
        
        return "Account has been created."   
    }else{
        return "Both passwords should match."; 
    }
}

function readJsonFile(fileName){
    const data = fs.readFileSync(fileName);
    const food_data = JSON.parse(data);
    return food_data;
}

function writeJsonFile(fileName, data){
    const strData = JSON.stringify(data, null, 2);
    fs.writeFileSync(fileName, strData);
    return 'Done';
}

function address(){
    const address = readline.question("(Address) Where will you like to place your order?- ");
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
        console.log("");
        console.log("oops!!");
        console.log("Currently not available:(");
        console.log("Thanks for visiting:)");
        console.log("");
    }
}

function addToCart(){

}

function food(){

    console.log("");
    console.log(`           ****            `);
    console.log("   Eat what makes you happy :)");
    console.log("");

    const filename = 'food.json';
    const food_data = readJsonFile(filename)
    const awailableFood = foodType(food_data);

    console.log("");
    console.log(" **Welcome to Zomato**");
    const user = readline.question("what would you like to eat? ");

    findingRestaurant(food_data, user);

    return awailableFood;
}

console.log("");
const loginSingUp = readline.question("Login(L/l) or Signup(S/s) => ");
if(loginSingUp === 'l' || loginSingUp === "L"){
    if(login() === 'Done'){
        console.log("Loged in Successfully!");
        address()
        food();
    }else{
        console.log("");
        console.log("   ***");
        console.log("Apologize for the inconvenience");
        console.log("We are working on it to make things smooth for you.");
        console.log("");
        console.log("Your feedback will make us perfact.");
        readline.question("Please describe your problem in short:- ")
        console.log("");
        console.log("Have a Good Day.");
        console.log("");
    }
}else if(loginSingUp === 's' || loginSingUp === 'S'){
    if(signUp()=== 'exist'){
        console.log("already a user try different name or login.");
    }else{
        food();
    }

}else{
    console.log("Please enter l/L for Loging in and s/S for creating account.");
}

