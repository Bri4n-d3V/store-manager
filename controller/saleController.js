const express = require('express');

const router = express.Router();
const saleService = require('../service/saleService');

router.post('/', async (req, res) => {
  const products = req.body;

  const newSale = await saleService.createSale(products);

  if (typeof newSale.message === 'string') {
    return res.status(newSale.status).json({ message: newSale.message }); 
  }

  return res.status(201).json(newSale);
});

router.get('/', async (req, res) => {
  const allSales = await saleService.getAllSales();

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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const [product] = req.body;

  const sale = await saleService.updateSale(product, +id);

  if (typeof sale.message === 'string') { 
    return res.status(sale.status).json({ message: sale.message }); 
}

  return res.status(200).json(sale);
});

module.exports = router;