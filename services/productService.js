const productModel = require('../models/productModel');

// verifica se o nome da req cumpre alguns requisitos
const nameIsValid = async (name) => {
  if (!name) {
    return { status: 400, message: '"name" is required' }; 
}

  if (name.length < 5) {
    return { status: 422, message: '"name" length must be at least 5 characters long' }; 
}

  if (typeof name !== 'string') {
    return { status: 422, message: '"name" length must be at least 5 characters long' }; 
}

  return false;
};

// verifica se o nome da req não é repetido
const repetitiveName = async (name) => {
  const searchName = await productModel.searchName(name);
  console.log('searchName', searchName);
  if (searchName.length !== 0) return { status: 409, message: 'Product already exists' };

  return false;
};

// revifica se a quantidade da req cumpre alguns requisitos
const quantityIsValid = async (quantity) => {
  if (quantity === undefined) {
    return { status: 400, message: '"quantity" is required' }; 
  }

  if (typeof quantity !== 'number' || quantity < 1) {
    return { status: 422, message: '"quantity" must be a number larger than or equal to 1' };
  }

  return false;
};

// envia para o controller a resposta com status e json de acordo com as verificações
const createProduct = async (name, quantity) => {
  const funcNameIsValid = await nameIsValid(name);
  const funcRepetitiveName = await repetitiveName(name);
  const funcQuantityIsValid = await quantityIsValid(quantity);

  if (funcNameIsValid) return funcNameIsValid;
  if (funcRepetitiveName) return funcRepetitiveName;
  if (funcQuantityIsValid) return funcQuantityIsValid;

  const { id } = await productModel.createProduct(name, quantity);

  return {
    status: 201,
    message: { id, name, quantity },
  };
};

// envia para o controller a resposta com status e json de todos o produtos do BD
const getAll = async () => {
  const products = await productModel.getAll();

  return products;
};

// envia para o controller a resposta com status e json de um produto de acordo com o ID
const getById = async (id) => {
  const product = await productModel.getById(id);

  if (product.length === 0) return false;

  return product;
};

// envia para o controller a resposta com status e json de um produto atualizado de acordo com as verificações
const updateProduct = async (id, name, quantity) => {
  const funcNameIsValid = await nameIsValid(name);
  const funcRepetitiveName = await repetitiveName(name);
  const funcQuantityIsValid = await quantityIsValid(quantity);

  const searchID = await productModel.getById(id);
  if (searchID.length === 0) return { status: 404, message: 'Product not found' };

  if (funcNameIsValid) return funcNameIsValid;
  if (funcQuantityIsValid) return funcQuantityIsValid;
  if (funcRepetitiveName) return funcRepetitiveName;

  await productModel.updateProduct(id, name, quantity);

  return {
    status: 200,
    message: { id, name, quantity },
  };
};

// envia para o controller a resposta com status e json de um produto deletado
const deleteProduct = async (id) => {
  const searchID = await productModel.getById(id);
  if (searchID.length === 0) return false;

  const product = await productModel.deleteProduct(id);

  return product;
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
