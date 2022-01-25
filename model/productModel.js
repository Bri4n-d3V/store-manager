const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const [product] = await connection.query(
    'INSERT INTO products (name, quantity) VALUES (?, ?);', [name, quantity],
    );
    
  return { id: product.insertId };
};

const searchName = async (name) => {
  const product = await connection.query(
    'SELECT name from products WHERE name LIKE ? LIMIT 1;', [name],
);

  return product[0];
};

const getAll = async () => {
  const [products] = await connection.query(
    'SELECT * FROM products;',
  );

  return products;
};

const getById = async (id) => {
  const [product] = await connection.query(
    'SELECT * FROM StoreManager.products WHERE id=?;', [id],
  );

  console.log('productModel', product);
  return product;
};

module.exports = { createProduct, searchName, getAll, getById };