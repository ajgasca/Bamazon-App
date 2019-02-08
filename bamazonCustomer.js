const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Jack@Ryan92$",

    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    displayMarketplace();
})

function displayMarketplace() {
    connection.query("SELECT * FROM products WHERE stock_quantity > 0", function (error, response) {

        if (error) throw error;

        console.log("+----+------------------------------------------+----------+");
        console.log("|  # | NAME                                     | PRICE    |");
        console.log("+----+------------------------------------------+----------+");

        for (let i = 0; i < response.length; i++) {

            let item_id = response[i].item_id.toString();
            let product_name = response[i].product_name;
            let price = "$" + response[i].price;
            while (item_id.length < 2) {
                item_id = " " + item_id;
            }
            while (product_name.length < 40) {
                product_name = product_name + " ";
            }
            while (price.length < 8) {
                price = " " + price;
            }
            console.log("| " + item_id + " | " + product_name + " | " + price + " |");
        }

        console.log("+----+------------------------------------------+----------+\n");

        promptUserToBuy();
    });

}

function promptUserToBuy() {

    inquirer
        .prompt([

            {
                type: "input",
                name: "productID",
                message: "What is the ID number of the product you would like to buy?"
            },
            {
                type: "input",
                name: "numberOfUnits",
                message: "What is the number of units you would like to buy of this product?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(
            function (answer) {

                connection.query("SELECT * FROM products WHERE item_id =" + answer.productID, function (error, response) {

                    if (error) throw error;

                    let userChoice = response[0];

                    console.log(userChoice);

                    if (userChoice.stock_quantity >= parseInt(answer.numberOfUnits)) {

                        let newQuantity = parseInt(userChoice.stock_quantity) - parseInt(answer.numberOfUnits);

                        let totalPrice = parseFloat(userChoice.price) * answer.numberOfUnits;

                        connection.query(

                            "UPDATE products SET ? WHERE ?",

                            [
                                {
                                    stock_quantity: newQuantity
                                },
                                {
                                    item_id: userChoice.item_id
                                }
                            ],

                            function (error) {

                                if (error) throw error;

                                console.log("Thank you for your purchase! Your total is $" + totalPrice + ".\n");

                                connection.end();

                            }

                        );
                    }
                    else {

                        console.log("We are sorry, but we only have " + userChoice.stock_quantity + " of those.\n");

                        connection.end();

                    }
                });

            }
        )

}
