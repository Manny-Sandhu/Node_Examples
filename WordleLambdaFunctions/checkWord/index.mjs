// check if the current letter is contained in the word
// seperated out of the main function for clearity 
function checkGuess(guess, word){
    // initialize array to be all incorrect
    let result_array = Array(5).fill("incorrect");
    // empty count object to keep track the number each of same letters
    let count = {};
    // if the current letter is in the correct space then it is labeled correct otherwise
    // incremented to the count object 
    for (let i = 0; i < guess.length; i++) {
        if (word[i] === guess[i]){
            result_array[i] = 'correct';
        } else {
            [wordcount[i]] = (count[word[i]] || 0) + 1;
        }
    }
    // if the letter is correct or incorrect do nothing otherwise
    // decrement the count number for that letter and label the array as contains
    for (let i = 0; i < guess.length; i++) {
        if (word[i] === guess[i] || !count[guess[i]]) {
            continue;
        }
        count[guess[i]]--;
        result_array[i] = 'contains';
    }

    return result_array;
}

export const handler = async (event) => {
    // convert the queryStringParameters into variables
    let guess = event.queryStringParameters.guess;
    let word = event.queryStringParameters.word;
       
    // create a result object to send to the body 
    let result = {result: checkGuess(guess, word)};
    
    return {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(result)
    }
}


// Testing Code
// let result = handler({
//     queryStringParameters: {
//         word: "moses",
//         guess: "guess"
//     }
// })