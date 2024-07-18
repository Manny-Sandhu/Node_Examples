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
    // params for the query
    let params = {
        TableName: "Lab8_wordle_database",
        IndexName: "word-index",
        KeyConditionExpression: "word = :word",
        ExpressionAttributeValues: {
            ":word":event.queryStringParameters.word
        }
    }
    let result = await docClient.query(params)
    .promise();
    // if result.Count is larger than one it was able to find the word
    // honestly not the best way to do this but I was on a big time crunch
    if(result.Count > 0){
        result = true;
    } else{
        result = false;
    }

    return {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    },
    body: result
    }
}