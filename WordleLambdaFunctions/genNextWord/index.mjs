import AWS from 'aws-sdk';

// Set the region
AWS.config.update({
    region: "us-east-1"
});

// Create DynamoDB document client
var docClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-08-10"
});

// get the full amount of words in the database
async function countWords(){
    let results = await docClient.scan({
        TableName: "Lab8_wordle_database",
        Select: "COUNT"
    }).promise();

    return results.Count;
}

export const handler = async (event) => {
    // put the total amount of words into a variable 
    let totalwords = await countWords(); 
    // pick a random number from 0-the total amount of words
    let wordnum = Math.floor(Math.random() * totalwords);
    let params = {
        TableName: "Lab8_wordle_database",
        KeyConditionExpression: "wordNumber = :wordNumber",
        ExpressionAttributeValues: {
            // the word that is being queried is the random number that was chosen 
            ":wordNumber":wordnum 
        }
    }
    // query the database with the setup params
    let results = await docClient.query(params)
    .promise();
    let body = {result: results.Items[0].word};
    //console.log(body);
    return {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
    }
}

let result = handler({});
