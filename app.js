// to use the file system module from node.js, must have the following:
const fs = require('fs');
// the require statement is a built-in function that globally availabile in node.js
// it allows the app.js file to access the fs module's functions through the fs assignment

// add our local module
// this is the destination file so it needs the "require" statement at the top
const generatePage = require('./src/page-template.js');

// process is a global object that represents everything going on with this particular app
// this object holds data providing context to where the app was executed
//
// the argv property of process is an array that holds exactly what was typed into the command line
// upon execution so that we can capture that data and use it in the app
// The first two indexes of process.argv represent Node.js and the file we executed
//
// process.argv.slice slices everything beginning at index of 2 since we do not need the first two indexes
const profileDataArgs = process.argv.slice(2);

// the arrow is a simplified way to write a function
// it removes the use of the function keyword, 
// the parentheses around the function parameter,
// and the curly braces used to wrap a function (when only performing a single action)
// const printProfileData = profileDataArr => {

//     // let and const are block-scoped variables meaning they are only valid within a "block" of code
//     // a "block" of code is usually within code inside a set of curly braces {} such as conditionals, loops, and functions
//     // var has function scoping meaning it only follows the above rules if created inside a function
//     for (let i = 0; i < profileDataArr.length; i += 1) {
//         console.log(profileDataArr[i]);
//     }

//     console.log('====================');

//     // forEach is an array method
//     // that accepts a function as an argument and 
//     // executes that function on each element of the array, 
//     // using the value of the element at that iteration as its argument
//     profileDataArr.forEach(profileItem => console.log(profileItem));
// };
// printProfileData(profileDataArgs);

// assignment destructuring
// assigns elements of an array to variable names in a single expression
const [name, github] = profileDataArgs;


// file system module of node.js
// file system function can create multiple file types,
// including TXT, PDF, HTML, JSON, and more
// the fs.writeFile function requires three arguments
// The first argument is the name of the file that's being created.
// The next argument is the data that will write onto the file,
// in this case the HTML template literal.
// The last parameter is a callback function that will be used for error handling.
fs.writeFile('./index.html', generatePage(name, github), err => {
    // if err exists, an error message is displayed by creating an exception
    // and stops the execution of the code
    // somehow this pulls from the error object but the lesson doesn't explain how
    if(err) throw new Error(err);

    console.log('Portfolio complete!  Check out index.html to see the output!');
});