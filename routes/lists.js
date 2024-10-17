const express = require('express');
const router = express.Router();
const Joi = require('joi'); // Para validação de dados
const List = require('../models/List'); // Modelo da Lista
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticação

// Esquema de validação para as listas usando Joi
const listSchema = Joi.object({
  name: Joi.string().min(1).required(),
});

// Criar uma lista (POST)
router.post('/', authMiddleware.protect, async (req, res) => {
  const { error } = listSchema.validate(req.body); // Valida o corpo da requisição
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newList = new List({
      name: req.body.name,
      userId: req.user.id, // Associa a lista ao usuário autenticado
    });
    const savedList = await newList.save();
    res.status(201).json(savedList);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar lista' });
  }
});

// Listar todas as listas do usuário (GET)
router.get('/', authMiddleware.protect, async (req, res) => {
    try {
      // Certifique-se de que o usuário está autenticado
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Usuário não autorizado' });
      }
  
      // Busca as listas associadas ao usuário autenticado
      const lists = await List.find({ userId: req.user.id });
      
      // Retorna as listas no formato JSON
      res.json(lists);
    } catch (err) {
      console.error('Erro ao buscar listas:', err.message);
      res.status(500).json({ message: 'Erro ao buscar listas', error: err.message });
    }
  });
  

// Atualizar uma lista (PUT)
router.put('/:id', authMiddleware.protect, async (req, res) => {
  const { error } = listSchema.validate(req.body); // Valida o corpo da requisição
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedList = await List.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedList) {
      return res.status(404).json({ message: 'Lista não encontrada' });
    }
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar lista' });
  }
});

// Deletar uma lista (DELETE)
router.delete('/:id', authMiddleware.protect, async (req, res) => {
  try {
    const deletedList = await List.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedList) {
      return res.status(404).json({ message: 'Lista não encontrada' });
    }
    res.json({ message: 'Lista deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar lista' });
  }
});

module.exports = router;
