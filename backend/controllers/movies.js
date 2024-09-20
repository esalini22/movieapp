const { parse } = require('csv-parse')
const fs = require('fs')
const moviesRouter = require('express').Router()

moviesRouter.get('/', async (_request, response) => {
    const rows = []

    fs.createReadStream('./datasets/Hydra-Movie-Scrape.csv')
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', function (row) {
            const newrow = {
                title: row[0],
                imdbID: row[5],
                year: row[1],
                summary: row[2],
                rating: row[8],
                poster: row[9] //eliminar imagen
            }
            rows.push(newrow)
        })
        .on('error', function(error) {
            console.log(error.message)
        })
        .on('end', function() {
            console.log('finished')
            response.json(rows)
        })
})

module.exports = moviesRouter