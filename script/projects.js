document.addEventListener("DOMContentLoaded", function() {
    fetch('./data/projects.json')
        .then(response => response.json())
        .then(data => {
            const portfolioDiv = document.getElementById('portfolioDiv');
            data.forEach((project, index) => {
                const projectCard = createProjectCard(project);
                portfolioDiv.appendChild(projectCard);
            });
            
            // Initialize carousel after all cards are added
            initializeCarousel();
        })
        .catch(error => console.error('Error fetching projects:', error));

    function createProjectCard(project) {
        const card = document.createElement('div');
        card.classList.add('project-card');
        
        card.innerHTML = `
                <h5>${project.title}</h5>
                <img src="${project.image}" alt="${project.title}" class="card-image">
                <p>${project.description}</p>
                <div class="card-links">
                    <a href="${project.link}" target="_blank">TAKE ME THERE!</a>
                    <a href="${project.gitHubLink}" target="_blank">GitHub</a>
                </div>
        `;
        
        return card;
    }

    function initializeCarousel() {
        const cards = document.querySelectorAll('.project-card');
        let currentSlide = 0;

        function showSlide(index) {
            for (let i = 0; i < cards.length; i++) {
                if (i >= index && i < index + 2) {
                    cards[i].style.display = 'block';
                } else {
                    cards[i].style.display = 'none';
                }
            }
        }

        function nextSlide() {
            currentSlide = (currentSlide + 2) % cards.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 2 + cards.length) % cards.length;
            showSlide(currentSlide);
        }

        // Show first two slides initially
        showSlide(currentSlide);

        // Add event listeners for navigation
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');
        
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    }
});
