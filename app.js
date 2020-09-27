// process is a global object that represents everything going on with this particular app
// this object holds data providing context to where the app was executed
//
// the argv property of process is an array that holds exactly what was typed into the command line
// upon execution so that we can capture that data and use it in the app
// The first two indexes of process.argv represent Node.js and the file we executed
//
// process.argv.slice slices everything beginning at index of 2 since we do not need the first two indexes
const profileDataArgs = process.argv.slice(2, process.argv.length);
console.log(profileDataArgs);

// the arrow is a simplified way to write a function
// it removes the use of the function keyword, 
// the parentheses around the function parameter,
// and the curly braces used to wrap a function (when only performing a single action)
const printProfileData = profileDataArr => {

    // let and const are block-scoped variables meaning they are only valid within a "block" of code
    // a "block" of code is usually within code inside a set of curly braces {} such as conditionals, loops, and functions
    // var has function scoping meaning it only follows the above rules if created inside a function
    for (let i = 0; i < profileDataArr.length; i += 1) {
        console.log(profileDataArr[i]);
    }

    console.log('====================');

    // forEach is an array method
    // that accepts a function as an argument and 
    // executes that function on each element of the array, 
    // using the value of the element at that iteration as its argument
    profileDataArr.forEach(profileItem => console.log(profileItem));
};
printProfileData(profileDataArgs);
