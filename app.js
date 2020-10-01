const path = require('path')
const express = require('express')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const publicHtmlPath = path.join(__dirname, './public')

app.use(express.static(publicHtmlPath))

app.get('/weather', (req, res) => {
    res.send("Weather")
})

app.get('/products', (req, res) => {


    const address = req.query.search

    if (!address)
        res.send('No search string provided')
    else
        geocode(address, (error, { latitude, longitude, location }) => {
            if (error) {
                res.send('The address is not valid')
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    res.send('Some error error occured during weather lookup ...')
                }
                res.send({
                    Location: location,
                    Forecast: forecastData
                })

            })
        })
})



app.listen(3000, () => {
    console.log('Server is up and running on 3000')
})

