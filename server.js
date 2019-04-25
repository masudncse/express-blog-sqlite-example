const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const app = express();

// some environment variables
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({ secret: 'krunal', saveUninitialized: false, resave: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.post('/', function (req, res) {
    let title = req.body.name;
    req.checkBody('title', 'Title is required').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('/');
    }
    else {
        req.session.success = true;
        res.redirect('/');
    }
});

app.get('/about', function (req, res) {
    res.render('pages/about');
});

const server = app.listen(3000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});