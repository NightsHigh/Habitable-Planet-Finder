const express = require('express');
const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

const csvFilePath = path.join(__dirname, 'Kepler_Data.csv');

fs.createReadStream(csvFilePath)
    .pipe(parse({ comment: '#', columns: true }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            habitablePlanets.push(data);
        }
    })
    .on('end', () => {
        console.log(`Loaded ${habitablePlanets.length} habitable planets.`);
    });

app.use(express.static(path.join(__dirname, 'Assets')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Assets', 'index.html'));
});

app.get('/api/planets', (req, res) => {
    res.json(habitablePlanets);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
