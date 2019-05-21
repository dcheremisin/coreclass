const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 4000;
const helpers = require('./helpers');
const db = {
    increment: 1,
    values: [],
};
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'front', 'build')));

app.listen(port, () => {
    console.log('Server listen on port: ' + port);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'build', 'static', 'index.html'));
});

app.get('/notes', (req, res) => {
    return res.send(helpers.renderNotes({db: db.values}));
});

app.get('/notes/sort', (req, res) => {
    const {search, sortBy} = req.query;
    return res.send(helpers.renderNotes({sortBy, tablePage: 1, db: db.values, search}));
});

app.get('/notes/search', (req, res) => {
    const { sortBy, tablePage, search } = req.query;
    return res.send(helpers.renderNotes({db: db.values, sortBy, tablePage, search}));
});

app.get('/notes/page', (req, res) => {
    const { sortBy, tablePage, search } = req.query;
    return res.send(helpers.renderNotes({db: db.values, sortBy, tablePage, search}));
});

app.post('/note', (req, res) => {
    const {name, value, search, sortBy, tablePage} = req.query;
    db.values.push({name, value, id: db.increment});
    db.increment += 1;
    return res.send(helpers.renderNotes({db: db.values, sortBy, tablePage, search}));
});

app.delete('/note', (req, res) => {
    const {id, sortBy, tablePage, search} = req.query;
    db.values = db.values.filter(item => item.id !== Number(id));
    return res.send(helpers.renderNotes({db: db.values, sortBy, tablePage, search}));
});
