const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const db = require('./database');
const tratarErroValidacao = require('./middleware/tratarErroValidacao')

const app = express();
app.use(express.json());

app.use(cors());

db.hasConnection();

app.use(express.json())

app.use(routes)

app.use(tratarErroValidacao)


app.listen(3000, () => console.log("Server ON na PORT: 4000"));