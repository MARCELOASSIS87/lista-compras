const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Item = require('../models/Item');
const { protect } = require('../middlewares/authMiddleware'); // Importando o middleware corretamente

// Esquema de validação usando Joi
const itemSchema = Joi.object({
  name: Joi.string().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
  purchased: Joi.boolean().optional(),
});

// Criar um item (POST)
router.post('/', protect, async (req, res) => {
  console.log('Recebendo requisição POST para criar um item:', req.body);

  // Validação dos dados do item
  const { error } = itemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newItem = new Item({
      name: req.body.name,
      quantity: req.body.quantity,
      purchased: req.body.purchased || false,
      userId: req.user.id // Associa o item ao usuário autenticado
    });

    const savedItem = await newItem.save();
    console.log('Item criado com sucesso:', savedItem);
    res.status(201).json(savedItem);
  } catch (err) {
    console.error('Erro ao criar item:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Listar todos os itens do usuário autenticado (GET)
router.get('/', protect, async (req, res) => {
  console.log('Recebendo requisição GET para listar itens');

  try {
    // Busca apenas os itens do usuário autenticado
    const items = await Item.find({ userId: req.user.id });
    console.log('Itens encontrados:', items);
    res.json(items);
  } catch (err) {
    console.error('Erro ao buscar itens:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Atualizar um item (PUT)
router.put('/:id', protect, async (req, res) => {
  console.log(`Recebendo requisição PUT para atualizar item com ID: ${req.params.id}`);

  // Validação dos dados do item
  const { error } = itemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Verifica que o item pertence ao usuário autenticado antes de atualizar
    const updatedItem = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }

    console.log('Item atualizado:', updatedItem);
    res.json(updatedItem);
  } catch (err) {
    console.error('Erro ao atualizar item:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Deletar um item (DELETE)
router.delete('/:id', protect, async (req, res) => {
  console.log(`Recebendo requisição DELETE para item com ID: ${req.params.id}`);

  try {
    // Verifica que o item pertence ao usuário autenticado antes de deletar
    const deletedItem = await Item.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item não encontrado' });
    }

    console.log('Item deletado com sucesso');
    res.json({ message: 'Item deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar item:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
