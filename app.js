require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// All routes goes through this page
const adminRoutes = require('./src/routers/adminRoutes');
const userRoutes = require('./src/routers/userRoutes');

// create express app
const app = express();

// Database connection;
mongoose.connect(process.env.dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});


// Middlewares
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// All Routes define
app.use('/admin_panel', adminRoutes);
app.use('/user_panel', userRoutes);

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});