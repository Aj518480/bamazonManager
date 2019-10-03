var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});
//create the conecction with the server and load the product data
connection.connect(function(err) {
 
     if(err) {
         throw err;
     console.log("error coonect" + err.stack);
     
     }

 loadProducts()
    })

//function to load products from db
function loadProducts(){
 connection.query("SELECT * FROM products", function(err,res){

    if(err)throw err

    console.table(res);

    promptCustomerforItem(res);
 })
}
 //prompt customer for a product ID
   function promptCustomerforItem(){

   }
   //prompt customer for quantity
function promptCustomerForQuantity(){

}
   //purchase function to a buy desired item
 function makePurchase(){

 }

 //check inventory to see if the user choice exist in
 function checkInventory(){

 }

 //check to see if user wants to quit the program(optional)
 function checkItShouldExit(){

 }