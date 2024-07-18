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
    // params for the query with player name being the only thing we get from queryStringParameters
    let params = {
        TableName: "gamePlay",
        KeyConditionExpression: "player = :player",
        ExpressionAttributeValues: {
            ":player":event.queryStringParameters.player
        }
    }
    // query the database
    let result = await docClient.query(params)
    .promise();

    return {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(result.Items)
    }
}

//Testing Code
let result = await handler({
    queryStringParameters: {
        player: "kyle"
    }
});

console.log(JSON.stringify(result.body));