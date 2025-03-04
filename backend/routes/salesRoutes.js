const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.post('/create', salesController.createSale);
router.get('/:id', salesController.getSale);

module.exports = router;
