const path = require('path')        //core module
const express = require('express')  //npm module
const hbs = require('hbs')          //npm module
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebar engines and views location
app.set('view engine','hbs') // to get handlebar setup
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather-app',
        name: 'RD'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'RD'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some helpful text..',
        title: 'Help',
        name: 'RD'
    }) 
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    
    geocode(req.query.address, ( error, {latitude,  longitude, location} = {} ) => {
        
            if (error) {
                return res.send({ error })   //console.log(error)
            }

            forecast(latitude, longitude, (error,forecastData) => {
                if (error) {
                    return res.send({ error }) //console.log(error)
                }
                res.send({
                    location,
                    forecastData
                })
            })
        })


})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('error-404', {
        title: 'Error: 404',
        name: 'RD',
        errorMsg: "Help article not found"
    })
})

app.get('*', (req,res) => {
    res.render('error-404', {
        title:'Error: 404',
        name:'RD',
        errorMsg: 'Page not found'
    })
})

// app.com
// app.com/help
// app.com/about

// It runs the server by listening to the port

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})