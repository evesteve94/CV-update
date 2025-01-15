document.addEventListener("DOMContentLoaded", function() {
    const skillDiv = document.getElementById('skill-div');

    // Function to toggle visibility based on isEnglish value
    function toggleLanguageVisibility(isEnglish) {
        const dataFile = isEnglish ? './data/skills.json' : './data/meriter.json';
        skillDiv.innerHTML = ''; // Clear previous content
        
        // Fetch data from the appropriate JSON file
        fetch(dataFile)
            .then(response => response.json())
            .then(data => {
                // Iterate over each skill in the JSON data
                data.forEach((skill, index) => {
                    // Create a skill tile element
                    const skillTile = createSkillTile(skill, index);
                    // Append the tile to the skillDiv
                    skillDiv.appendChild(skillTile);
                });
            })
            .catch(error => console.error('Error fetching skills:', error));
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

    // Function to create a skill tile
    function createSkillTile(skill, index) {
        // Create a div element for the tile
        const tile = document.createElement('div');
        tile.classList.add('skill-tile');
        // Set unique id for each tile based on index
        tile.setAttribute('data-index', index);
        // Set onclick event to open modal
        tile.addEventListener('click', () => openModal(skill));
        // Set innerHTML of tile to display skill image
        tile.innerHTML = `<img alt="${skill.alt}" src="${skill.image}" alt="${skill.title}">`;
        return tile;
    }

    // Function to open modal with skill data
    function openModal(skill) {
        const isEnglish = localStorage.getItem('isEnglish') === 'true';
        const dataFile = isEnglish ? './data/skills.json' : './data/meriter.json';
        // Fetch additional data for the skill modal
        fetch(dataFile)
            .then(response => response.json())
            .then(data => {
                // Find the skill data that matches the clicked skill
                const selectedSkill = data.find(s => s.title === skill.title);
                if (selectedSkill) {
                    // Use selectedSkill data to populate modal content
                    const modalContent = `
                        <div class="modal" id="myModal-${selectedSkill.title.replace(/\s+/g, '-')}">
                            <div class="tile-modal-content">
                                <span class="close">&times;</span>
                                <img alt="${selectedSkill.alt}" src="${selectedSkill.image}">
                                <h4>${selectedSkill.title}</h4>                              
                                <p>Proficiency: ${selectedSkill.skill}</p>
                                <p>Course: ${selectedSkill.course}</p> 
                                <p>${selectedSkill.description}</p>
                            </div>
                        </div>
                    `;
                    // Append modal content to the document body
                    document.body.insertAdjacentHTML('beforeend', modalContent);
                    // Show the modal
                    const modal = document.getElementById(`myModal-${selectedSkill.title.replace(/\s+/g, '-')}`);
                    modal.classList.add('modal-showing');
                    // Add event listener to close the modal
                    const closeButton = modal.querySelector('.close');
                    closeButton.addEventListener('click', () => modal.remove());
                }
            })
            .catch(error => console.error('Error fetching skill details:', error));
    }
});
