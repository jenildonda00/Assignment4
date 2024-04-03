var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
mongoose.set('strictQuery', true);
var port     = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


mongoose.connect(database.url);

var Product = require('./models/product');
 
 
//get all employee data from db
app.get('/api/product', function(req, res) {
	// use mongoose to get all todos in the database
	Product.find(function(err, product) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
		res.json(product); // return all product in JSON format
	});
});

// get a employee with ID of 1
app.get('/api/product/:product_id', function(req, res) {
	let id = req.params.product_id;
	Product.findById(id, function(err, product) {
		if (err)
			res.send(err)
 
		res.json(product);
	});
 
});


// create employee and send back all product after creation
app.post('/api/product', function(req, res) {

    // create mongose method to create a new record into collection
    console.log(req.body);

	Product.create({
		name : req.body.name,
		salary : req.body.salary,
		age : req.body.age
	}, function(err, product) {
		if (err)
			res.send(err);
 
		// get and return all the product after newly created employe record
		Product.find(function(err, product) {
			if (err)
				res.send(err)
			res.json(product);
		});
	});
 
});


// create employee and send back all product after creation
app.put('/api/product/:product_id', function(req, res) {
    let id = req.params.product_id;
    let newTitle = req.body.title;
	// save the user
	Product.findByIdAndUpdate(id, { title: newTitle }, { new: true }, function(err, product) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(product);
        }
	});
});

// delete a employee by id
app.delete('/api/product/:product_id', function(req, res) {
	console.log(req.params.product_id);
	let id = req.params.product_id;
	Product.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Product has been Deleted.');	
	});
});

app.listen(port);
console.log("App listening on port : " + port);
