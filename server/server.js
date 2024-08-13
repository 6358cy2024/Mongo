const express = require('express');
const path = require('path');
const db = require('./config/connection');
const client = new MongoClient(url);
const api_routes = require('./routes/api_routes.js');
const app = express();
const PORT = 3331;

app.use(express.static('../client'));

app.use(express.json());

app.use('/api', api_routes);

//send back the index.html file for all other req routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

db.once('open', () => {
    console.log('DB connected established');
    app.listen(PORT, () => {
        console.log('Express server started on port', PORT);
    })
});

