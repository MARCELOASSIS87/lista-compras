// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Rotas de autenticação
const itemRoutes = require('./routes/items'); // Rotas de itens
const listRoutes = require('./routes/lists'); // Rotas de listas
const dotenv = require('dotenv');

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializar o app Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware para o CORS
app.use(cors());

// Middleware para tratar JSON
app.use(express.json());
const jwt = require('jsonwebtoken');

// Função para gerar o token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // Define a expiração do token
  });
};

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lista-compras', {
  
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.log('Erro ao conectar ao MongoDB:', error));

// Definir as rotas
app.use('/auth', authRoutes); // Rotas de autenticação
app.use('/items', itemRoutes); // Rotas de itens
app.use('/lists', listRoutes); // Rotas de listas

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
