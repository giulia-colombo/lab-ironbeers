const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs'); //tells our Express that HBS will be in charge of rendering the HTML
app.set('views', `${__dirname}/views`); //tells our Express app where to look for our views

app.use(express.static(`${__dirname}/public`));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

// home route
app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
  console.log("beers route is working");
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log("Beers from the database: ", beersFromApi);
      res.render("beers", { beersFromApi : beersFromApi});
    })
    .catch(err => console.log(err))
})

// random-beers route
app.get('/random-beer', (req, res)=> {
  console.log("random beer route is working")
  // const randomBeerFromApi = punkAPI.getRandom()
  punkAPI
    .getRandom()
    .then(randomBeerFromApi => {
      console.log("random beer from API: ", randomBeerFromApi);
      res.render('random-beer', {randomBeerFromApi: randomBeerFromApi[0]});
    })
    .catch(err => console.log(err));
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
