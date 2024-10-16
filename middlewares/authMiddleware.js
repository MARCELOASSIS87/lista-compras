const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization'); // Espera o token no cabeçalho Authorization
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, 'seu-segredo-jwt'); // Verifica e decodifica o token
    req.user = decoded; // Armazena os dados do usuário no req.user
    next(); // Passa para o próximo middleware/rota
  } catch (err) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
