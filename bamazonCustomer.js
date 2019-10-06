//packages I will be using for the Customer for Bamazon

var mysql = require("mysql");
var inquirer = require('inquirer');


//Our connection to our local host details with our SQL Port and first level of security
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


//Function to make sure we are connected to our local DB
connection.connect(function (err) {
   if (err) {
      console.log("error connect" + err.stack);
   }
   loadProducts();
})



//Function to load products from DB by using the console.table
function loadProducts() {
   connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      console.table(res);

      promptCustomerForItem(res);
   })
}



//Function to prompt the customer to pick a product but it's ID
function promptCustomerForItem(dbResponse) {

   inquirer
      .prompt([
         {
            type: "input",
            name: "chooseID",
            message: "Please pick a item ID number",
            validate: function(value) {
               if (isNaN(value) === false) {
                  
                 return true;
               }
               return false;
               
             }
         }
      ])
      .then(answers => {
         var customerChosenProduct = parseInt(answers.chooseID);

        var customerInventory= checkInventory(customerChosenProduct,dbResponse);

        //console.log(customerInventory);

         promptCustomerForQuantity(customerInventory);
      });

}




//Function to prompt asking the Customer how much of the item they would like to buy
function promptCustomerForQuantity(customerInventory) {
   inquirer
      .prompt([
         {
            type: "input",
            name: "howMany",
            message: "How many would you like?"
         }
      ])
      .then(answers => {
         var usersQuantity = parseInt(answers.howMany);
      if(usersQuantity > customerInventory.stock_quantity){
         console.log("Sorry, We don't have enough for your order.")
      }
      else{
         makePurchase(customerInventory,usersQuantity);
      }
      });
      
}

//purchase function to a buy desired item
function makePurchase(customerInventory,usersQuantity) {
   connection.query("UPDATE products SET stock_quantity = stock_quantity - ?  WHERE id = ?", [usersQuantity,customerInventory.id],
   function (err, res) {
      
      if (err) throw err;
      console.table(res);

   console.log("made purchase");
     
   })
}


   
   function checkInventory(customerChosenProduct,dbResponse) {
      for (let i = 0; i < dbResponse.length; i++) {

      
      if (dbResponse[i].id === customerChosenProduct ) {
         return dbResponse[i];
         // console.log("Not enough in stock to purchase")

      }
     
    
}
}
//  //check to see if user wants to quit the program(optional)
//  function checksIfUserWantsToExit(){

//     //will need to ask user by inquirer

// connection.end();//to exit sql
// process.exit(0);// to exit node
//  }
   