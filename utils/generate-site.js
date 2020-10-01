const fs = require('fs');
const { resolve } = require('path');

// arrow function writeFile
// accepts parameter called fileContent
const writeFile = fileContent => {
    // create a promise object with javascript keyword "new"
    // inside the promise, we provide it with a function that accepts two functions
    // as parameters (resolve and reject)
    return new Promise((resolve, reject) => {

        fs.writeFile('./dist/index.html', fileContent, err => {
            // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
                reject(err);

                // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                return;
            }

            // if promise is fulfilled, resolve the Promise and send the successful data to the `.then()` method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {

        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
              reject(err);
              return;
            }
            resolve({
                ok: true,
                message: 'Style sheet copied successfully!'
            });
        });
    });
};

// we are exporting an object
// using shorthand property names,
// property key name with the same name as the value we're associating with it
// it will understand that we're using the same name
// for both the property name and its value

module.exports = { writeFile, copyFile };