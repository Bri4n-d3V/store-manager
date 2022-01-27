const saleModel = require('../model/saleModel');

// verifica se os produtos têm ID
const validateProductId = async (products) => {
  const productIdFind = await products.find((product) => !product.product_id);
  
  if (productIdFind) return { status: 400, message: '"product_id" is required' };

  return false;
};

// verifica se as quantidades dos produtos existem
const validateQuantity = async (products) => {
  const quantity = await products.find((product) => 
  !product.quantity && product.quantity !== 0);

  if (quantity) return { status: 400, message: '"quantity" is required' };

  return false;
};

// verifica se as quantidades dos produtos estão de acordo com as especificações
const validateQuantityReq = async (products) => {
  const quantity = await products.find((product) => 
  typeof product.quantity !== 'number' || product.quantity < 1);

  if (quantity) {
 return { status: 422,
     message: '"quantity" must be a number larger than or equal to 1' }; 
}

  return false;
};

// envia para o saleConteroller a resposta da criação de uma venda já verificada
const createSale = async (products) => {
  const checkProductId = await validateProductId(products);
  const checkQuantity = await validateQuantity(products);
  const checkQuantityReq = await validateQuantityReq(products);
  console.log('checkProductId', checkProductId);
  console.log('checkQuantity', checkQuantity);
  console.log('checkQuantityReq', checkQuantityReq);

  if (checkProductId) return checkProductId;
  if (checkQuantity) return checkQuantity;
  if (checkQuantityReq) return checkQuantityReq;

  const { id } = await saleModel.createSale(products);
  console.log('saleService sale_id', id);
  console.log('saleService products', products);

  return {
    id,
    itemsSold: products,
  };
};

// envia para o saleController a resposta de todas as vendas que foram feitas
const getAllSales = async () => {
  const sales = await saleModel.getAllSales();
  console.log('saleService sales', sales);

  return sales;
};

// envia para o saleController a resposta com as vendas filtradas por ID
const saleById = async (id) => {
  const sales = await saleModel.saleById(id);
  if (sales.length === 0) return { status: 404, message: 'Sale not found' };

  return sales;
};

module.exports = {
  createSale,
  getAllSales,
  saleById,
};