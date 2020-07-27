const request = require('request')





const forecast = (lat,long,callback) => {

    const weatherURL = 'http://api.weatherstack.com/current?access_key=bdb489d2a8b3e2d4e276ad3931f38d74&query=' + lat + ',' + long + '&units=f'
    request( { url: weatherURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services.',undefined)
        } else if (response.body.error) {
            callback('Please check your coordinates. Unable to find weather forecast for your location. Please try again.',undefined)
        } else {
            const current = response.body.current
            callback(undefined, current.weather_descriptions[0]+'. The temperature is currently ' + response.body.current.temperature + 
            ' degrees Fahrenheit. It feels like ' + current.feelslike + 
            ' degrees Fahrenheit. There is a ' + current.precip + '% chance of rain. The humidity is '+ current.humidity + '.')
            //callback(undefined,response.body.temperature)
        }
    })
}

module.exports = forecast