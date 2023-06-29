const http = require('http');
const fs = require('fs');

const apiUrl = 'http://127.0.0.1:8788/GEoolcY'; // Replace with your API endpoint URL
const outputFile = 'response_time.txt'; // Replace with the desired output file path

// Function to fetch the API and measure the response time
function fetchAPIAndWriteResponseTime() {
    const startTime = Date.now(); // Start time before making the API request

    http.get(apiUrl, (response) => {
        const endTime = Date.now(); // End time after receiving the API response
        const responseTime = endTime - startTime; // Calculate the response time in milliseconds
        fs.writeFileSync(outputFile, `${responseTime} ms`, { encoding: 'utf8' });
        return responseTime
        console.log(`Response time: ${responseTime} ms. Saved to ${outputFile}`);
    }).on('error', (error) => {
        console.error('Error:', error.message);
    });
}

// Call the function to fetch the API and write the response 

const attempt_time = 10000
async function test() {
    let sum = 0
    for (i = 0; i < attempt_time; i++) {
        const time = await fetchAPIAndWriteResponseTime();
        sum += time
    }
    return sum / attempt_time
}
