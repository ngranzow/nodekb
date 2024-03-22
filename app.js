const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// Check connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Check for db errors
db.on('error', (err) => {
    console.log(err);
});

// Init app
const app = express();

// Bring in Models
let Article = require('./models/article');

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware: parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Home route
app.get('/', async (req, res) => {
    let articles = {};
    try {
        articles = await Article.find();
    } catch (err) {
        console.log(err);
    }
    res.render('index', {
        title: 'Articles',
        articles: articles
    })
});

// Add route
app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title:'Add Article'
    });
})

// Add Submit POST route
app.post('/articles/add', (req, res) => {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save().then((err) => {
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000...')
});