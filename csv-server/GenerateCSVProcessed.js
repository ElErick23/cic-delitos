const csv = require('csv-parser');
const fs = require('fs');

let results = [];

let pathDelitosGeneroPreprocesadoInput = './input/Delitos_Violentos_Prep_Rango.csv';
let pathDelitosGeneroPreprocesadoOutput = 'output/Delitos_Violentos_Procesado.json';

fs.createReadStream(pathDelitosGeneroPreprocesadoInput)
    .pipe(csv())
    .on('data', (row) => {
        console.log(row);
        results.push(row);


    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        fs.writeFileSync(pathDelitosGeneroPreprocesadoOutput, JSON.stringify(results), 'utf8', function (err) {
            if (err) {
                console.log(err);
            }
        });
    });