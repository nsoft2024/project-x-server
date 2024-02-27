'use strict';

const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const appRoutes = require('./routes/appRoutes');

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
    allowedHeaders: '*',
    credentials: true
}));
app.use(bodyParser.json());


app.use('/auth', authRoutes.routes);
app.use('/api', appRoutes.routes);


app.listen(config.port, () => {
    console.log('App listening on url http://localhost:' + config.port)
});