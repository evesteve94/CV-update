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
                    projectTile.addEventListener('click', openModal.bind(null, project));
                    projectTile.addEventListener('mouseenter', () => showTooltip(projectTile, project.description));
                    projectTile.addEventListener('mouseleave', () => hideTooltip(projectTile));
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

function openModal(project) {
    const modalContent = `
        <div class="modal" id="myModal-${project.title.replace(/\s+/g, '-')}">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h4><img alt="${project.alt}" class="modal-img" src="${project.image}">${project.modalTitle}<img alt="${project.alt}" class="modal-img" src="${project.image}"></h4>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" class="inside-card-btn">TAKE ME THERE!</a>
                <a href="${project.gitHubLink}" target="_blank" class="inside-card-btn">GitHub</a>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalContent);

    const modal = document.getElementById(`myModal-${project.title.replace(/\s+/g, '-')}`);
    modal.classList.add('modal-showing');

    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.parentNode.removeChild(modal);
        });
    });
}

function showTooltip(projectTile, description) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = description;
    projectTile.appendChild(tooltip);

    // Calculate the position of the tooltip relative to the tile
    const tileRect = projectTile.getBoundingClientRect();

    // Position the tooltip 1rem under the tile
    tooltip.style.position = 'absolute';
    tooltip.style.top = `calc(${tileRect.bottom}px + 1rem)`; // Place the tooltip 1rem below the tile
    tooltip.style.left = `${tileRect.left}px`; // Align the tooltip with the left edge of the tile
}


function hideTooltip(projectTile) {
    const tooltip = projectTile.querySelector('.tooltip');
    if (tooltip) {
        tooltip.parentNode.removeChild(tooltip);
    }
}
