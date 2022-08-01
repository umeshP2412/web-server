const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

console.log(__dirname)
console.log(path.join(__dirname, '../public/'))

const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express config
const pubDirectoryPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

//Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(pubDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Umesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Umesh',
        imgPath: 'img/1.jpg'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Umesh',
        title: 'Help',
        mobileNum: +91-9558829646,
        email: 'umeshpatil2412@gmail.com',
        msg: 'Cutomer Satisfaction is our top most priority!'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide any address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error){
            // console.log(latitude, longitude)
            return res.send({
                error: error
            });
        }

        forecast(latitude,longitude, (error, {description, location, temperature, precipation} = {}) => {

            if(error){
                return res.send({
                    error: error
                });
            }

            if(temperature !== undefined){
                res.send({
                    forecast: 'Current temperature in '+ location + ' is ' + temperature,
                    atmosephere: 'Atmosephere feels like there will be '+ description,
                    address: req.query.address
                })
            }
        })
    })

})


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'must provide Search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: [req.query.search]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Umesh',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Umesh',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running... on port '+ port)
})