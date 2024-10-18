// routes/auth.js

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();
    
    console.log('Usuário salvo:', savedUser);

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: savedUser._id, name: savedUser.name, email: savedUser.email } });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Rota para login de usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  console.log('dentro do auth login', password);
  console.log('dentro do auth email', email);
  
  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    console.log('E-mail normalizado:', normalizedEmail);
    
    const user = await User.findOne({ email: normalizedEmail });

    console.log('Usuário encontrado no banco de dados:', user);

    if (!user) {
      console.log('Usuário não encontrado');
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    console.log('Comparando senha enviada:', password, 'com senha armazenada:', user.password);

    if (user.password !== password) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});
//Rotas ok
module.exports = router;
