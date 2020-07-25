const request = require('request')

const geocode = (address,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGVlcGFrMzMzNiIsImEiOiJja2NzcTh3eWUwNncxMnpudDc4MzdzNXRpIn0.ZKrh00Y7B939896NDJbN_w'

    request( { url, json: true}, (error, { body }) => { //Here, we have used Object destructuring and Object property shorthand syntax
                                                    //changed url:url -> url, response.body -> { body }
        if (error) {
            callback('Unable to connect to location services',undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another',undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode