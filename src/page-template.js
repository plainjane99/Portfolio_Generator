// this code is modularized by moving the code to its own file

// create the about section
const generateAbout = aboutText => {
    if (!aboutText) {
      return '';
    }
  
    return `
        <section class="my-3" id="about">
            <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
            <p>${aboutText}</p>
        </section>
    `;
};

// create the project section
const generateProjects = projectsArr => {
    return `
        <section class="my-3" id="portfolio">
            <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
            <div class="flex-row justify-space-between">
                ${projectsArr
                    .filter(({ feature }) => feature)
                    .map(({ name, description, languages, link }) => {
                        return `
                            <div class="col-12 mb-2 bg-dark text-light p-3">
                                <h3 class="portfolio-item-title text-light">${name}</h3>
                                <h5 class="portfolio-languages">
                                    Built With:
                                    ${languages.join(', ')}
                                </h5>
                                <p>${description}</p>
                                <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
                            </div>
                        `;
                    })
                    .join('')
                }

                ${projectsArr
                    .filter(({ feature }) => !feature)
                    .map(({ name, description, languages, link }) => {
                        return `
                            <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
                                <h3 class="portfolio-item-title text-light">${name}</h3>
                                <h5 class="portfolio-languages">
                                    Built With:
                                    ${languages.join(', ')}
                                </h5>
                                <p>${description}</p>
                                <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
                            </div>
                        `;
                    })
                    .join('')
                }
            </div>
        </section>
    `;
};

// the return statement is usually needed to explicitly state the return value
// but in this special case, the return statement is implied
// use template literals to embed javascript expressions into the string
// template literals are enclosed by backticks
// we wrap the string in backticks
// carriage returns in the code displays line breaks in the display
module.exports = templateData => {

    // destructure page data by section
    // the ... (rest operator) puts the rest of the array into an object called header
    const { projects, about, ...header } = templateData;

    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Portfolio Demo</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
                <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="style.css">
            </head>

            <body>
                <header>
                    <div class="container flex-row justify-space-between align-center py-3">
                        <h1 class="page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
                        <nav class="flex-row">
                            <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${header.github}">GitHub</a>
                        </nav>
                    </div>
                </header>
                <main class="container my-5">
                    ${generateAbout(about)}
                    ${generateProjects(projects)}
                </main>
                <footer class="container text-center py-3">
                    <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h3>
                </footer>
            </body>
        </html>
    `;
};

// this is the source file so we use module.exports at the bottom
// to make it available to other files
// module.exports = generatePage;