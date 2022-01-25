const express = require('express');

const router = express.Router();
const productService = require('../service/productService');

router.post('/products', async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.createProduct(name, quantity);
  
  if (typeof newProduct.message === 'string') {
    return res.status(newProduct.status).json({ message: newProduct.message }); 
  }
  
  console.log('productController message', newProduct.message);
  return res.status(newProduct.status).json(newProduct.message);
});

router.get('/products', async (_req, res) => {
  const products = await productService.getAll();

  return res.status(200).json(products);
});

router.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  const product = await productService.getById(+id);

if (!product) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(product[0]);
});

router.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  console.log('id', +id);
  console.log('name', name);
  console.log('quantity', quantity);

  const product = await productService.updateProduct(+id, name, quantity);
  console.log('productController status', product.status);
  console.log('productController message', product.message);

  if (typeof product.message === 'string') {
    return res.status(product.status).json({ message: product.message }); 
}

  return res.status(product.status).json(product.message);
});

module.exports = router;
