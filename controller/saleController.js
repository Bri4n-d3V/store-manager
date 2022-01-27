const express = require('express');

const router = express.Router();
const saleService = require('../service/saleService');

router.post('/', async (req, res) => {
  const products = req.body;

  const newSale = await saleService.createSale(products);
  console.log('saleController', newSale);

  if (typeof newSale.message === 'string') {
    return res.status(newSale.status).json({ message: newSale.message }); 
  }

  return res.status(201).json(newSale);
});

router.get('/', async (req, res) => {
  const allSales = await saleService.getAllSales();
  console.log('saleController allSales', allSales);

  return res.status(200).json(allSales);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const saleById = await saleService.saleById(id);

  if (typeof saleById.message === 'string') {
    return res.status(saleById.status).json({ message: saleById.message });
  }

  return res.status(200).json(saleById);
});

module.exports = router;