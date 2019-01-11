const express = require('express');

const app = express();

const views = require('./routes/views');

app.use('/', views);
app.use('/static', express.static('public'));

app.listen(3000, () => console.log('App listening on port 3000!'));
