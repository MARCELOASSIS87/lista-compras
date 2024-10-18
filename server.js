const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Importando JWT corretamente
const authRoutes = require('./routes/auth'); // Rotas de autenticação
const itemRoutes = require('./routes/items'); // Rotas de itens
const listRoutes = require('./routes/lists'); // Rotas de listas


// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializar o app Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware para o CORS
app.use(cors());

// Middleware para tratar JSON
app.use(express.json());

// Função para gerar o token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Define a expiração do token
  });
};

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lista-compras', {
    
  })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.log('Erro ao conectar ao MongoDB:', error));

// Definir as rotas
app.use('/auth', authRoutes); // Melhor nomear as rotas para que fiquem claras
app.use('/items', itemRoutes); // Rotas de itens
app.use('/lists', listRoutes); // Rotas de listas

console.log("depois daqui tem que mostar as rotas salvas ")

app._router.stack.forEach(function(r) {
  if (r.route && r.route.path) {
    console.log(`Rota registrada: ${r.route.path}`);
  }
});
// Rota de fallback para qualquer rota não encontrada
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
