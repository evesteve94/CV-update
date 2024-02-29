document.addEventListener("DOMContentLoaded", function() {
    const skillDiv = document.getElementById('skillDiv');

    // Fetch data from skills.json
    fetch('./data/skills.json')
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
        // Fetch additional data for the skill modal
        fetch('./data/skills.json')
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

