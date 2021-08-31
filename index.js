const readline = require('readline-sync');
const fs = require('fs');
var total_Amount = 0

function login(){
    const username = readline.question("userName/Phone Number:- ");
    const password = readline.question("password:- ");

    const filename = 'usersDetails.json'
    const all_users_data = readJsonFile(filename);
    var index = 0;
    for(index; index<=all_users_data.users.length; index++){
        if(all_users_data.users[index].userName === username){
            if(all_users_data.users[index].password === password){
                return "yes";
            }else{
                return 'No'
            }
        }
    }
    if(index===all_users_data.users.length){
        return 'no'
    }
}

function signUp(){
    const filename = 'usersDetails.json';
    console.log("");
    const userName = readline.question("userName/Phone Number:- ");

    const all_users_data = readJsonFile(filename);
    let checker = false;
    var count = 0;
    for(count; count<all_users_data.users.length; count++){
        if(all_users_data.users[count].userName === userName){
            checker = true;
            break;
        }
    }
    
    if(checker){
        return "exist";
    }else{
        console.log("");
        const password = readline.question("Password:- ");
        console.log("");
        const password2 = readline.question("Confirm password:- ");
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
            return "no"; 
        }
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
            if(user==='n' || user === 'N'){
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
                console.log(`Restaurant ${element.id} :- ${element.restaurant}`);
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
        return true;
    }
}

function addToCart(foodDetails, item){
    console.log("");
    const r_id = parseInt(readline.question("Which Restaurant you want to go with? "));

    function get_random (list) {
        return list[Math.floor((Math.random()*list.length))];
      }
      
    const prices = [250, 200, 100, 150, 130, 120, 220, 270, 240, 180, 260]
    var item_Price = get_random(prices);

    var all_item_price = [];

    foodDetails.forEach(element=>{
        if(element.id === r_id){
            element.foodItems.forEach(product=>{
                if(product.foodType === item){
                    var index = 0;
                    console.log("");
                    console.log(" id    Item = Price");
                    console.log("");
                    for(index; index<product[item].length; index++){
                        item_Price = get_random(prices)
                        console.log(`${index+1} ${product[item][index]} = ${item_Price}`);
                        all_item_price.push(item_Price);
                    }
                    try{
                        console.log("");
                        const item_id = parseInt(readline.question(`which ${item} you'll pick? (please enter the id of the ${item}) :- `));
                        console.log("");
                        total_Amount = total_Amount + all_item_price[item_id-1];
                        console.log(total_Amount);
                        console.log("");
                    }catch{
                        try{
                            const item_id = parseInt(readline.question(`please enter the id of the ${item}) :- `));
                            total_Amount = total_Amount + all_item_price[item_id-1];
                            console.log(total_Amount);
                            console.log("");
                        }catch{
                            console.log("");
                            console.log("Invalid input!!!");
                            console.log("");
                        }
                    }

                }
            })
        }
    })

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
    const user_input = readline.question("what would you like to eat? ");
    const user = user_input.toLowerCase()


    if(findingRestaurant(food_data, user)){
        return false;
    }else{
        addToCart(food_data, user);
        return awailableFood;
    }
}

function payment(amount){
    console.log("");
    console.log("    ***");
    console.log("Payment methods:");
    console.log("");
    console.log("UPI method: ");
    console.log("   1. Phone pay");
    console.log("   2. Google pay");
    console.log("   3. Paytm");
    console.log("");
    console.log("4. Cash on Delivery");
    console.log("");
    const payment = parseInt(readline.question('How will you pay:- '));
    if(payment===1 || payment===2 || payment===3){
        console.log("");
        readline.question("password:- ");
        console.log("");
        console.log(`Rs ${amount} is deducted from your account.`);
        console.log("");
        console.log("           ***");
        console.log("  Your order is getting prepaired.");
        setTimeout(function () {
            console.log("");
            console.log('Your parsel in on the way....🚴‍♀️')
          }, 5000)
        console.log("");
        console.log("💛Have a nice Day💛");
        console.log("");
    }else{
        console.log("");
        console.log("Your order is excepted.");
        console.log("Cash on Delevery.");
        console.log("");
        console.log("           ***");
        console.log("  Your order is getting prepaired.");
        setTimeout(function () {
            console.log("");
            console.log('Your parsel in on the way....🚴‍♀️')
            console.log("");
            console.log("You'll get it soon.");
            console.log("");
            console.log("💛Have a nice Day💛");
            console.log("");
          }, 5000);
    };
}


console.log("");
const loginSingUp = readline.question("Login(L/l) or Signup(S/s) => ");
if(loginSingUp === 'l' || loginSingUp === "L"){
    const zomatoUser = login();
    if(zomatoUser === 'yes'){
        console.log("");
        console.log("Loged in Successfully!");
        console.log("");
        address()
        food();

        while(true){
            const proceed = readline.question("Do you want to add any other itmes?(y/n):- ");
            if(proceed==="n" || proceed==="N"){
                console.log(`Total Amount:- ${total_Amount}`);
                payment(total_Amount);
                break;
            }else{
                food();
            }
        }
        
    }else if(zomatoUser === "No"){
        console.log("");
        console.log("Wrong Password!");
        console.log("");
    }else if(zomatoUser === "no"){
        console.log("UserName not exist. try signing Up(s).");
        console.log("");
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
    const exist = signUp();
    if(exist === 'exist'){
        console.log("");
        console.log("                ***");
        console.log("already a user try different name or login.");
    }else if(exist === 'no'){
        console.log("");
        console.log("Both passwords should match.");
    }else{
        console.log("");
        console.log(exist);
        food();
    }

}else{
    console.log("Please enter l/L for Loging in and s/S for creating account.");
}
console.log("");
