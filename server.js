const mongoose = require('mongoose');
const cors = require('cors');



// Conectar ao MongoDB local
mongoose.connect('mongodb://localhost:27017/lista-compras')
  .then(() => {
    console.log('Conectado ao MongoDB local');
  })
  .catch((error) => {
    console.log('Erro ao conectar ao MongoDB:', error);
  });


// Configurar o Express
const express = require('express');
const app = express();
const port = 3000;

app.use(cors({
  origin: '*', // Permite todas as origens, altere conforme necessário
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));
// Middleware para ler JSON
app.use(express.json());

// Importar as rotas de itens
const itemRoutes = require('./routes/items');
app.use('/items', itemRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

