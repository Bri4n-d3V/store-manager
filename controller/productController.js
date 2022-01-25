const express = require('express');

const router = express.Router();
const productService = require('../service/productService');

router.post('/products', async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.createProduct(name, quantity);
  // console.log('status', newProduct.status, 'message', newProduct.message);

  if (typeof newProduct.message === 'string') {
    return res.status(newProduct.status).json({ message: newProduct.message }); 
}

  return res.status(newProduct.status).json(newProduct.message);
});

router.get('/products', async (_req, res) => {
  const products = await productService.getAll();

  return res.status(200).json(products);
});

router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  console.log('id', id);

  const product = await productService.getById(+id);
  console.log('productController', product);

if (!product) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(product[0]);
});

module.exports = router;
