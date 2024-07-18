/**
 * Simple calculator made using Node.js and Express 
 * app starts listening on localhost:3000
 * in order to calculate something use a querydting such as 
 * ?operand1="NUM"&operand2="NUM"&operator="OPERATOR"
 */
import express, { response } from 'express';
// setting up the app 
const app = express();
const port = 3000;
// setting up the end point
app.get('/', (req, res) => {
    // variables that use the querystring at the end point
    let operand1 = +req.query.operand1;
    let operand2 = +req.query.operand2;
    let operator = req.query.operator;
    // empty object to set up the response object
    var response = {};
    switch(operator){
        case '+':
            response.result = `{ result: ${operand1 + operand2}}`;
            response.statusCode = 200;
            break;
        case '-':
            response.result = `{ result: ${operand1 - operand2}}`;
            response.statusCode = 200;
            break;
        case '*':
            response.result = `{ result: ${operand1 * operand2}}`;
            response.statusCode = 200;
            break;
        case '/':
            // cannot divide by 0
            if( operand2 == 0){
                response.result = `Bad operation: cannot divide by 0`
                response.statusCode = 400;
            }else{
                response.result = `{ result: ${operand1 / operand2}}`;
                response.statusCode = 200
            }
            break;
        // default is only called on a bad operator call 
        default:
            response.result = `Bad operator: ${operator} is not a valid option`;
            response.statusCode = 400;
    }
    // send the response object as json
    res.contentType-'application/json';
    res.send(response);
});
// start listening at localhost:port
app.listen(port, 'localhost', () => {
    console.log(`Example app listening at http://localhost:${port}`);
});