const path = require ('path');
const express = require ( 'express');
const app = express();
const session = require('express-session');

app.set ('view engine', 'ejs');
app.set ('views', path.join(__dirname, 'view'));
app.use(express.urlencoded({extended: false}));
app.use(session({
 secret: 'new secret',
 resave: false,
 saveUninitialized: true
}));
app.use((req, res, next) => {
 if (!req.session.table) {
 req.session.table = [];
 }
 next();
});
app.get('/', (req, res) => {
 res.locals.table = req.session.table;
 res.render('table');
});
app.get('/add', (req, res) => {
 res.sendFile(path.join(__dirname, 'view', 'form.html'));
});
app.post('/add', (req, res) => {
 req.session.table.push(req.body.item);
 res.redirect(302, '/');
});
app.listen(3000);