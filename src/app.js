require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on('error', (err) => {
  console.log('Erro na conexão com o banco de dados: ' + err)
});

mongoose.connection.on('disconnect', () => {
  console.log('Desconectado do banco de dados')
})

mongoose.connection.on('connected', () => {
  console.log('Conectado ao banco de dados')
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})
