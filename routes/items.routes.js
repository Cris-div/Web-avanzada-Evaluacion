const express = require('express');
const router = express.Router();
const controller = require('../controllers/items.controller');

router.get('/items', controller.getItems);
router.get('/items/:id', controller.getItemById);
router.post('/items', controller.createItem);
router.put('/items/:id', controller.updateItem);
router.delete('/items/:id', controller.deleteItem);

// API externa
router.get('/usuarios', controller.getUsuarios);

module.exports = router;