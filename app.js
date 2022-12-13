const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs'); //tells our Express that HBS will be in charge of rendering the HTML
app.set('views', path.join(__dirname, 'views')); //tells our Express app where to look for our views

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

// home route
app.get('/', (req, res) => {
  res.render('index');
});

// beers route
app.get('/beers', (req, res) => {
  console.log("beers route is working")
  const beersFromApi = punkAPI.getBeers()
  .then(beersFromApi => {
    console.log(beersFromApi);
    res.render('beers', {beersFromApi: beersFromApi});
  })
  .catch(err => console.log(err));
  
// random-beers route
app.get('/random-beer', (req, res)=> {
  console.log("random-beer route is working")
  const randomBeerFromApi = punkAPI.getRandom()
  .then(randomBeerFromApi => {
    console.log(randomBeerFromApi);
    res.render('randomBeer', {randomBeerFromApi: randomBeerFromApi});
  })
  .catch(err => console.log(err));
})


  // beersFromApi.then(beersFromApi => {
  //       //console.log("Beers from the database: ", beersFromApi))
  //       res.render('beers', beersFromApi);
  // })
  // beersFromApi.catch(err => console.log(err)); 
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
