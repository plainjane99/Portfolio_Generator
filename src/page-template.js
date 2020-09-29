// this code is modularized by moving the code to its own file

// the return statement is usually needed to explicitly state the return value
// but in this special case, the return statement is implied
// use template literals to embed javascript expressions into the string
// template literals are enclosed by backticks
// we wrap the string in backticks
// carriage returns in the code displays line breaks in the display
const generatePage = (name, github) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Portfolio Demo</title>
    </head>

    <body>
        <h1>${name}</h1>
        <h2><a href="https://github.com/${github}">Github</a></h2>
    </body>
    </html>
    `;
};

// this is the source file so we use module.exports at the bottom
// to make it available to other files
module.exports = generatePage;