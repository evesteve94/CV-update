document.addEventListener("DOMContentLoaded", function() {
    // Function to toggle visibility based on isEnglish value
    function toggleLanguageVisibility(isEnglish) {
        const portfolioDiv = document.getElementById('portfolioDiv');
        portfolioDiv.innerHTML = ''; // Clear existing content

        const projectsJSON = isEnglish ? './data/projects.json' : './data/projekt.json';

        fetch(projectsJSON)
            .then(response => response.json())
            .then(data => {
                data.forEach((project, index) => {
                    const projectTile = createProjectTile(project, index);
                    projectTile.addEventListener('click', () => displayProjectContent(project));
                    portfolioDiv.appendChild(projectTile);
                });
            })
            .catch(error => console.error('Error fetching projects:', error));
    }

    // Check if localStorage is supported
    if (typeof(Storage) !== "undefined") {
        // Check if 'isEnglish' is already set in localStorage
        if (localStorage.getItem('isEnglish') === null) {
            // Set 'isEnglish' to true if it's not set
            localStorage.setItem('isEnglish', 'true');
        }

        // Initial toggle based on isEnglish value
        const isEnglish = localStorage.getItem('isEnglish') === 'true';
        toggleLanguageVisibility(isEnglish);

        // Add click event listeners to the language images to toggle language
        const engImg = document.querySelector('.eng');
        const sweImg = document.querySelector('.swe');

        engImg.addEventListener('click', function() {
            localStorage.setItem('isEnglish', 'true');
            toggleLanguageVisibility(true);
        });

        sweImg.addEventListener('click', function() {
            localStorage.setItem('isEnglish', 'false');
            toggleLanguageVisibility(false);
        });
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
});


function createProjectTile(project, index) {
    const projectTile = document.createElement('div');
    projectTile.classList.add('project-tile');
    projectTile.innerHTML = `<h5 class="tile-title">${project.title}</h5><img alt="${project.alt}" src="${project.image}" alt="${project.title}">`;
    projectTile.setAttribute('data-index', index);
    return projectTile;
}

function displayProjectContent(project) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // This makes the scrolling smooth
    });
    const displayDiv = document.getElementById('display-div');
    displayDiv.innerHTML = `<h2>${project.title}</h2>
    <img alt="${project.alt}" class="display-img" src="${project.image}">
    <h3>Course: ${project.course}</h3>
    <h3>Languages: ${project.tech}</h3>
    <p class="display-description">${project.description}</p>
    <p class="display-description">${project.details}</p>
    <a href="${project.link}" target="_blank" class="inside-card-btn">TAKE ME THERE!</a>
    <a href="${project.gitHubLink}" target="_blank" class="inside-card-btn">GitHub</a>`
    ;
}

