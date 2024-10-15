const express = require('express');
const router = express.Router();
const Joi = require('joi'); // Importando Joi para validação
const Item = require('../models/Item');

// Esquema de validação usando Joi
const itemSchema = Joi.object({
  name: Joi.string().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
  purchased: Joi.boolean().optional(),
});

// Itm POST
router.post('/', async (req, res) => {
  console.log('Recebendo requisição POST para criar um item:', req.body);

  const { error } = itemSchema.validate(req.body); // Validação
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newItem = new Item({
      name: req.body.name,
      quantity: req.body.quantity,
      purchased: req.body.purchased || false
    });
    const savedItem = await newItem.save();
    console.log('Item criado com sucesso:', savedItem);
    res.status(201).json(savedItem);
  } catch (err) {
    console.error('Erro ao criar item:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// Listar todos os itens (GET)
router.get('/', async (req, res) => {
  console.log('Recebendo requisição GET para listar itens'); // Log da requisição

  try {
    const items = await Item.find();
    console.log('Itens encontrados:', items); // Log dos itens encontrados
    res.json(items);
  } catch (err) {
    console.error('Erro ao buscar itens:', err.message); // Log do erro
    res.status(500).json({ message: err.message });
  }
});

// Atualizar um item (PUT)
router.put('/:id', async (req, res) => {
  console.log(`Recebendo requisição PUT para atualizar item com ID: ${req.params.id}`);

  const { error } = itemSchema.validate(req.body); // Validação
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log('Item atualizado:', updatedItem);
    res.json(updatedItem);
  } catch (err) {
    console.error('Erro ao atualizar item:', err.message);
    res.status(400).json({ message: err.message });
  }
});
// Deletar um item (DELETE)
router.delete('/:id', async (req, res) => {
  console.log(`Recebendo requisição DELETE para item com ID: ${req.params.id}`); // Log da requisição

  try {
    await Item.findByIdAndDelete(req.params.id);
    console.log('Item deletado com sucesso'); // Log da exclusão
    res.json({ message: 'Item deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar item:', err.message); // Log do erro
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;