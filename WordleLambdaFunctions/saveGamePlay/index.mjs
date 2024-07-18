import AWS from 'aws-sdk';

// Set the region
AWS.config.update({
    region: "us-east-1"
});

// Create DynamoDB document client
var docClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-08-10"
});

export const handler = async (event) => {
    // create a body object with the body data from the event
    let body = JSON.parse(event.body);
    // add the new body object to the database 
    let resp;
    // try to put the body data into the database
    try {
        resp = await docClient.put(
            {
                TableName: "gamePlay",
                Item: body
            }
        ). promise();
    }
    catch (e) {
        console.log(e);
    }
    // logs for testing
    console.log(body);

    return {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(resp, null, 3)
    }
}

// Testing code
let event = {
    body: JSON.stringify(
        {
            player: "manny",
            playDate: Date.now(),
            word: "tests",
            guesses: ["guess1", "guess2", "guess3", "guess4", "guess5", "guess6"]
        }
    )
};

let response = await handler(event);
console.log(response);

// {
//     "player": "manny",
//     "playDate": Date.now(),
//     "word": "tests",
//     "guesses": ["guess1", "guess2", "guess3", "guess4", "guess5", "guess6"]
// }