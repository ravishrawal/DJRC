const express = require('express');
const path = require('path');
const app = express();
const db = require('./db/models/');
const port = 3002;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.send('asdfsaf');
})

app.use((err, req, res, next) => {
    res.send(err);
})

// db.sync({ force: true })
//     .then(() => {
//         console.log('synced');
        app.listen(port, () => {
            console.log(`listening on ${port}`);
        })
    // })
