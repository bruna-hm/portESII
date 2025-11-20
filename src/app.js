const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "..", 'views'));

app.use('/static', express.static(path.join(__dirname, "..", 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/', routes);

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));