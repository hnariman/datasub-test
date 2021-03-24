Create a react app for accepting payments (ReactJS + Ant Design).
   
    React app should have a payment page with a select component labeled "Payment type" to choose one of options: Credit card, ACH, Token (by default should be Credit card) and "Amount" (decimal number field).
    
    When "ACH" payment type has been selected show text input with label 
    - "Account number" (numeric field max length 17), and text input with label 
    - "Routing number" (9 digits length).

    When "Token" payment type has been selected show alpha numeric text input with label 
    - "Token", next to the select 
    - "Payment type" with max length 32 characters.

    When "Credit card" payment type has been selected show numeric text field 
    - "Card number" with fixed length 16, text field 
    - "Expiration Date" and text field 
    - "CVV".
   
    Validate only cardNumber field (should be numeric and 16 digits length).
    Payment page should have pay button, on press button make POST request to nodejs server api "/api/payment" with JSON, after payment has been submitted and returned response, show popup with message "Payment is being processed"
   
    React app should have payments list page, all payments should be listed there (using GET /api/payments), table fields are 
    - uuid, 
    - paymentType, 
    - paymentStatus (processing, approved, declined, error), 
    - lastFour (four characters of accountNumber or cardNumber or token), 
    - amount.
   
    Here is create payment request example body:
    {
        "paymentType": "ach|cc|token",
       
        "accountNumber": "1234567890123456", // if payment type "ach" selected
        "routingNumber": "123456789", // if payment type "ach" selected
       
        "cardNumber": "1234567890123456", // if payment type "cc" (credit card) selected
        "expDate": "1224", // if payment type "cc" (credit card) selected
        "cvv": "123", // if payment type "cc" (credit card) selected
       
        "token": "token_123123123123123123", // if payment type token selected
        "amount": "1.23"
    }
   
    On server side use expressjs or other expressjs based framework (e.g. feathersjs), create route for /api/payment, let's assume like we doing here third party request to process our payment, so stub external API request with async function that consumes request data as argument and returns uuid, paymentStatus (stub function should randomly return status value one of 'approved', 'declined', 'error'), also stub function should have delay 40 seconds before return data. Now we're doing a third party request to process payment and it is executing too long, so we can't force the client to wait and the response should be returned immediately. While the third party is operating (40 sec), we should be able to see the payment on the payments list page with status 'processing'.

    Optional subtask (that would be great advantage if you able to solve):
    The other issue is limitation on third parties - you can't simultaneously do more than one request to a third party, so each extra request should be queued.
       
    Store payments data in mongodb (
        fields are :
    - paymentType,
    - paymentStatus, 
    - routingNumber, 
    - lastFour , 
    - amount and 
    - uuid
    )
       
    Code should be covered with unit tests using jest (it's not strongly required to be covered 100%, but we want to be sure that critical functionality is covered with tests).
    Using docker would be a plus.