const express = require('express');
const hbs = require('hbs')
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs')

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + "\n", (err) => {
		if(err) {
			console.log('Unable to append to server log.');
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs', {
// 		pageTitle: 'Maintenance',
// 		currentYear: new Date().getFullYear(),
// 	})
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		currentYear: new Date().getFullYear(),
		welcomeMessage: "Welcome home buddy"
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: "Error, yo"
	});
})

app.listen(3000, () => {
	console.log('Server is up');
});