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

module.exports = { createProduct, searchName };