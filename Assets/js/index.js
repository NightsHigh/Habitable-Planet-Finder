document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('/api/planets');
    const planets = await response.json();
    displayPlanets(planets);
});

function displayPlanets(planets) {
    const planetsContainer = document.getElementById('container-planets');
    planetsContainer.innerHTML = ''; // Clear previous results

    planets.forEach((planet) => {
        const planetElement = document.createElement('div');
        planetElement.classList.add('planet');

        const planetHTML = `
            <div class="planet-details">
                <h2 class="planet-title">${planet.kepler_name}</h2>
                <div class="planet-meta">
                    <span class="planet-temperature"><strong>Temperature:</strong> ${planet.koi_insol}</span>
                    <span class="planet-size"><strong>Size:</strong> ${planet.koi_prad} * Earth's radius</span>
                </div>
            </div>
        `;

        planetElement.innerHTML = planetHTML;
        planetsContainer.appendChild(planetElement);
    });
}
