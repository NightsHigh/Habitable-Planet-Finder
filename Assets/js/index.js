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
                    <span class="planet-temperature"><h4><strong>Light:</strong></h4> ${planet.kepler_name} gets ${planet.koi_insol} times the amount of the sunlight Earth gets.</span>
                    <span class="planet-size"><h4><strong>Size:</strong></h4> ${planet.koi_prad *  6378} KM in radius</span>
                </div>
            </div>
        `;

        planetElement.innerHTML = planetHTML;
        planetsContainer.appendChild(planetElement);
    });
}
