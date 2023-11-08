const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers() 
    .then(responseFromDB => {
      res.render('beers/beers.hbs', { beers: responseFromDB });
    })
    .catch(error => console.log(error));
});
app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom() // .getRandom() is the method provided by punkAPI
    .then(responseFromApi => {
      res.render('beers/random-beer.hbs', { beers: responseFromApi });

      // other way could be extracting this one beers from the array and
      // sending it as object to the random-beers view
      // but in that case we wouldn't be able to use partial, and we are aiming to use it later
      // res.render('beers/random-beer', { beer: responseFromApi[0] });
    })
    .catch(error => console.log(error));
});

app.get('/beers/:beerId', (req, res) => {
  // console.log('params:', req.params);

  punkAPI
    .getBeer(req.params.beerId)
    .then(responseFromApi => {
      //   console.log(responseFromApi);
      res.render('beers/beer-details.hbs', { beers: responseFromApi });
    })
    .catch(err => console.log(err));
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
