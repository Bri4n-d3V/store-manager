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

module.exports = router;