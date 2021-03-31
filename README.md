# Serverless TODO

This project is a simple Invoice application using AWS Lambda and Serverless framework. 
The application helps user keep track of aluminum goods items being sold.
Search for "aluminum proflie" in google to see the picture of what this product looks like

# Functionality of the application

This application will allow creating/fetching/searching INVOICE items. 
Each INVOICE have atLeast one ORDER item. Each user only has access to INVOICE items that he/she has created as well as for other users of the app as well.
An ORDER item represents the goods being sold. 

# INVOICE item

The application store INVOICE items, and each INVOICE contains the following fields:

* `id` (string) - a unique id for an item
* `date` (string) - date and time when an item was created
* `orders` (string) - An array of ORDER. Each Item represents the aluminum good being sold.
* `soldTo` (string) - who the goods was sold to
* `billTo` (boolean) - who the payment for the invoce was billed to
* `paymentStatus` (string) - The status of the Invoice and Payment. Fir eg: if the orders has been supplied but no payment yet? 
* `paymentType` (string) - The way the payment was made. It could be Cash or Cheque.
* `total` (number) - The total amount for all ordered items
* `amountPaid` (number) - The total amount the customer payed
* `salesPerson` (number) - The fullname user who recoreded the invocie. It would has been better to store the "sub" value. But this will do :)


# ORDER item
* `index` (string) - a unique id for an item
* `productCode` (string) - The uniqueID in short form use to represent an aluminum good item (e.g. "1132", "1127", "5001", etc)
* `productType` (string) - The section the good belongs to (e.g. "Economy", "Local", "Foreign")
* `productColor` (string) - The color of the aluminum good (e.g. "blue", "Milk", "Red", etc)
* `quantity` (number) - The quantity of the good item
* `price` (number) - The Original price for the good
* `discount` (number) - The discount percentage being applied to the amount
* `amount` (number) - The amount for this order item. This is gotten by quantity multiplied by price

# Functions to be implemented
* `searchInvoicesES` - this function implement retrning search results from Elastic Search.

* `addInvoiceHandler` - It receives a new Invocice Item and returns success or error message based on if the item is inserted successfully.

It receives a new TODO item to be created in JSON format that looks like this:

```json
{
    "id": "I73ERT09YT",
    "date": "2019-07-27T20:01:45.424Z",
    "orders": [
        {
          "productCode": "1132",
	        "productType": "Foreign",
	        "productColor": "Dark",
	        "quantity": 4,
	        "price": 2000,
	        "discount": 0,
	        "amount": 8000,
        },
        {
          "productCode": "11227",
	        "productType": "Local",
	        "productColor": "LightBronze",
	        "quantity": 2,
	        "price": 1000,
	        "discount": 0,
	        "amount": 2000,
        }
    ],
    "soldTo": "Cash Customer",
    "billTo": "Cash Customer",
    "paymentStatus": "PaidSupplied",
    "paymentType": "Cash",
    "total": 10000,
    "amountPaid": 10000,
}
```

* `getInvoices` - returns the list of invoices recorded in this app.

* `getUsers` - returns the list of users registered in the app.

* `postConfirmation` - this function implement adding the signed up user to the Admin user group in AWS Cognito as well adding the user sub to the database. It receives event from post confirmation trigger by Cognito

* `connect` - adds the connectionId of the user in the websockets database when they log into the app. When the user successfuly login to our app, they invoke the websocket url.

* `disconnect` - removes the connectionId of the user that was saved when the user connects to our webocket.

* `elasticSearchSync` - should delete a TODO item created by a current user. Expects an id of a TODO item to remove.

* `sendInvoiceNotifications` - Sends the newly inserted invoice data to the users connected in realtime. It gets all the connectionIds of the users online and sends data to the individually.

# Frontend

The `front-end` folder contains a web application that can use the API developed in the project.

## Authentication

We created a Cognito application and used [AWS Amplify](https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#recommended-usage) to easily implement the client side of the Authentication in for our application. I provisoned the Cognito resource with the Serverless framework nd [imported](https://docs.amplify.aws/cli/auth/import) the auth resouce in the front-end to use it in my app

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd back-end
npm install
sls deploy -v
```

## Frontend

run the following commands:

```
cd front-end
npm install or yarn install
npm run start or yarn start
```

This should start a development server with the React application that will interact with the serverless INVOICE application.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

If you choose not to run the app locally, i have deployed the front-end in S# and expose it through cloudFront. got to [https://udacityslscapstone.tk/](https://udacityslscapstone.tk/)

## To test the app

Feel free to sign up. make sure you have access to the email so that you can verify or confirm your email 
OR you can use the is user 
```json
{
  "Email": "test@gmail.com",
  "password": "longpassword1"
}
```
I already have the user confirmed for testing

Go to the [addInvoice page](https://udacityslscapstone.tk/invoice/add) create an invoice. Feel free to use:
```json
{
    "orders": [
        {
          "productCode": "1132",
	        "productType": "Foreign",
	        "productColor": "Dark",
	        "quantity": 4,
	        "price": 2000,
	        "discount": 0,
	        "amount": 8000,
        },
        {
          "productCode": "11227",
	        "productType": "Local",
	        "productColor": "LightBronze",
	        "quantity": 2,
	        "price": 1000,
	        "discount": 0,
	        "amount": 2000,
        }
    ],
    "soldTo": "Cash Customer",
    "billTo": "Cash Customer",
    "paymentStatus": "PaidSupplied",
    "paymentType": "Cash",
}
```
Other values you is automatically generated by the page. PLEASE NOTE: i did not empty the form page after the data is suceesfully set nor disable the button so that you dont submit twice. I could have handled this situation but i was quick to submit this. But know that if there was en error, submitting the data, you will be alerted in this page for sure!!
The project was not about front-end or UX design so my fornt-end is just too simple

Then you then navigate to [transaction Report](https://udacityslscapstone.tk/transactionReports) page, you will see two tabs where you can see other invoices recorded as well as invice you recoreded on the other tab

You can test the Elastic Search by searching for invoice based on the attributes

You can sign out. And that it!!

You could test the websocket but you will need to to have to accounts logged in and see the other use get the notification of the newly inserted data in the database by another user. I tested this out and it works :)
