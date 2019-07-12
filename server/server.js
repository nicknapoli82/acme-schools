const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Lets just dump in some middleware to get things started
// Probably don't need the logger, but for now... Meh
app.use(require('morgan')('tiny'));
app.use('/', express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Lets use get some routes working now eh?
app.use('/api/schools', require('./routes/schoolRouter'));
app.use('/api/students', require('./routes/studentRouter'));

app.listen(port);
