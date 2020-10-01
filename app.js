// to use the file system module from node.js, must have the following:
const fs = require('fs');
// the require statement is a built-in function that is globally availabile in node.js
// it allows this app.js file to access the fs module's functions through the fs assignment

// add our local javascript utility module
// this is the destination file so it needs the "require" statement at the top
const generatePage = require('./src/page-template.js');

const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username. (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your Github Username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
  =================
  Add a New Project
  =================
  `);

    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your project? (Required)',
                validate: projectNameInput => {
                    if (projectNameInput) {
                        return true;
                    } else {
                        console.log('Please enter your Project Name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a description of the project (Required)',
                validate: descriptionInput => {
                    if (descriptionInput) {
                        return true;
                    } else {
                        console.log('Please enter a discription!');
                        return false;
                    }
                }
            },
            {
                type: 'checkbox',
                name: 'languages',
                message: 'What did you build this project with? (Check all that apply)',
                choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
            },
            {
                type: 'input',
                name: 'link',
                message: 'Enter the GitHub link to your project. (Required)',
                validate: githubLinkInput => {
                    if (githubLinkInput) {
                        return true;
                    } else {
                        console.log('Please enter a Github Link!');
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'feature',
                message: 'Would you like to feature this project?',
                default: false
            },
            {
                type: 'confirm',
                name: 'confirmAddProject',
                message: 'Would you like to enter another project?',
                default: false
            }

        ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        })
    ;

};

// answers object will be returned as a promise
// chains the functions
// only want to prompt users with the project questions after the profile questions 
promptUser()
    .then(promptProject)
    .then(portfolioData => {

        const pageHTML = generatePage(portfolioData);

        fs.writeFile('./index.html', pageHTML, err => {
          if (err) throw new Error(err);

          console.log('Page created! Check out index.html in this directory to see it!');
        });
    })
;

// process is a global object that represents everything going on with this particular app
// this object holds data providing context to where the app was executed
//
// process.argv is how we pass data from the command line to our script
// process.argv holds the data from the command line in an array
// example, we type the following into the command line:  node index.js Hello
// process.argv[0] = node
// procres.argv[1] = index.js
// process.argv[2] = Hello
//
// process.argv.slice slices everything beginning at index of 2 since we do not need the first two indexes
// const profileDataArgs = process.argv.slice(2);

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
// const [name, github] = profileDataArgs;

// shift to using inquirer instead of process.argv
// const pageHTML = generatePage(name, github);

// file system module of node.js
// file system function can create multiple file types,
// including TXT, PDF, HTML, JSON, and more
// the fs.writeFile function requires three arguments
// The first argument is the name of the file that's being created.
// The next argument is the data that will write onto the file,
// in this case the HTML template literal.
// The last parameter is a callback function that will be used for error handling.
// function of err = a callback function to run, in which err is the output from the method
// fs.writeFile('./index.html', pageHTML, err => {
//     // if err exists, an error message is displayed by creating an exception
//     // and stops the execution of the code
//     // somehow this pulls from the error object but the lesson doesn't explain how
//     if(err) throw err;

//     console.log('Portfolio complete!  Check out index.html to see the output!');
// });