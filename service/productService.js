const productModel = require('../model/productModel');

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

const repetitiveName = async (name) => {
  const searchName = await productModel.searchName(name);
  if (searchName.length !== 0) return { status: 409, message: 'Product already exists' };

  return false;
};

const quantityIsValid = async (quantity) => {
  if (quantity === undefined) {
    return { status: 400, message: '"quantity" is required' }; 
  }

  if (typeof quantity !== 'number' || quantity < 1) {
    return { status: 422, message: '"quantity" must be a number larger than or equal to 1' };
  }

  return false;
};

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

const getAll = async () => {
  const products = await productModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await productModel.getById(id);

  if (product.length === 0) return false;

  console.log('productService', product);
  return product;
};

module.exports = {
  createProduct,
  getAll,
  getById,
};
