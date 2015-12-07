// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
var DB_NAME = 'geo';
mongoose.connect('mongodb://localhost:27017/' + DB_NAME); // connect to our database
var Country     = require('./app/models/country');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var countryRouter = express.Router();

var logger = function(req, res, next) {
	// do logging
	console.log('Reading/Wrining Countries...');
	next();
};

// middleware to use for all requests
countryRouter.use(logger);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
countryRouter.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /geo/country
// ----------------------------------------------------
countryRouter.route('/geo/countries')
	.get(function(req, res) {
		Country
			.find({})
			.select('name continent')
				.exec(function(err, countries) {
					if (err) res.send(err);
					res.json(countries);
				});
	})
	.post(function(req, res) {
		var country = new Country();
		country.name = req.body.name;
		country.continent = req.body.continent;

		country.save(function(err) {
			if (err) res.send(err);

			res.json({ message: 'Country created!' });
		}); 
	});

// on routes that end in /geo/country/:country_id
// ----------------------------------------------------
countryRouter.route('/geo/countries/:country_id');


// REGISTER OUR ROUTES -------------------------------
app.use('/api', countryRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
