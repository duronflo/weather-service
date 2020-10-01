const request = require('request')
const math = require('math')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/edf7e470c00ce4805d459e989b0c24a9/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
              callback(undefined, body.daily.data[0].summary + ' It is currently ' + math.floor((body.currently.temperature - 32 ) * (5/9)) + ' °C. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}


module.exports = forecast