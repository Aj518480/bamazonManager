//packages I will be using for the Customer for Bamazon

var mysql = require("mysql");
var inquirer = require('inquirer');



var connection = mysql.createConnection({
  
   host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"

});


//This function is to make sure we are connecting to our DB
//Or to throw an error if we can not connect

connection.connect(function(err) {
   if (err){
   console.log("error connect" + err.stack);
   }
// We are calling the next function

   loadProducts();

    })

//Function to load products from db

function loadProducts(){
connection.query("SELECT * FROM products", function(err,res){
   if (err) throw err;   
   console.table(res);

   promptCustomerforItem(res);
 })
}
 //prompt customer for a product ID
   function promptCustomerforItem(dbResponse){
 
      inquirer
  .prompt([
     {
    type:"input",
    name:"chooseID",
    message:"Please pick a item ID number"
     }
  ])
  .then(answers => {
    var customerChosenProduct= answers.chooseID;

    promptCustomerForQuantity(customerChosenProduct,dbResponse);
  });

   }
   //prompt customer for quantity
function promptCustomerForQuantity(customerChosenProduct,dbResponse){
   inquirer
   .prompt([
      {
     type:"input",
     name:"checkQuantity",
     message:"How many would you like?"
      }
   ])
   .then(answers => {
     var howManyTheyChose= answers.checkQuantity;
     console.log(howManyTheyChose,dbResponse.stock_quantity)
     if(howManyTheyChose > dbResponse.stock_quantity){
        console.log("Not enough in stock to purchase")
     }
     else{
      makePurchase();
      
     }
   });
}

   //purchase function to a buy desired item
 function makePurchase(){
    console.log("made purchase")

 };

//  //check inventory to see if the user choice exist in
  function checkInventory(dbResponse){

//  }

//  //check to see if user wants to quit the program(optional)
//  function checksIfUserWantsToExit(){

//     //will need to ask user by inquirer

// connection.end();//to exit sql
// process.exit(0);// to exit node
//  }
 