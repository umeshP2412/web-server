const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=d25615dfb7c2705b373b0745bab31c88&query='+ latitude +','+ longitude +'&units=m';

    request({url: url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect weather Service!', undefined);
        }
        else if(body.error){
            callback(response.body.error.info, undefined);
        }
        else{
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                location: body.location.name,
                temperature: body.current.temperature,
                precipation: body.current.precip 
            })
        }
    })
}

module.exports = forecast