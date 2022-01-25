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

module.exports = router;
