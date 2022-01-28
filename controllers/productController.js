const express = require('express');

const router = express.Router();
const productService = require('../services/productService');

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.createProduct(name, quantity);
  
  if (typeof newProduct.message === 'string') {
    return res.status(newProduct.status).json({ message: newProduct.message }); 
  }

  return res.status(newProduct.status).json(newProduct.message);
});

router.get('/', async (_req, res) => {
  const products = await productService.getAll();

  return res.status(200).json(products);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await productService.getById(+id);

if (!product) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(product[0]);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productService.updateProduct(+id, name, quantity);

  if (typeof product.message === 'string') {
    return res.status(product.status).json({ message: product.message }); 
}

  return res.status(product.status).json(product.message);
});

router.delete('/:id/', async (req, res) => {
  const { id } = req.params;

  const product = await productService.getById(+id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' }); 
}

   res.status(200).json(product[0]);
  
   return productService.deleteProduct(+id);
});

module.exports = router;
