const connection = require('./connection');

// envia query para criar um produto na DB
const createProduct = async (name, quantity) => {
  const [product] = await connection.query(
    'INSERT INTO products (name, quantity) VALUES (?, ?);', [name, quantity],
    );
    
  return { id: product.insertId };
};

// envia query para pesquisar um produto por nome da DB
const searchName = async (name) => {
  const product = await connection.query(
    'SELECT name from products WHERE name LIKE ? LIMIT 1;', [name],
);

  return product[0];
};

// envia query para exibir todos os produtos da DB
const getAll = async () => {
  const [products] = await connection.query(
    'SELECT * FROM products;',
  );

  return products;
};

// envia query para pesquisar um produto por ID da DB
const getById = async (id) => {
  const [product] = await connection.query(
    'SELECT * FROM StoreManager.products WHERE id=?;', [id],
  );
  
  return product;
};

// envia query para atualizar um produto da DB
const updateProduct = async (id, name, quantity) => {
  const [product] = await connection.query(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?;',
    [name, quantity, id],
  );
  
  return { id: product.insertId, name, quantity };
};

// envia query para deletar um produto na DB
const deleteProduct = async (id) => {
  const [product] = await connection.query(
    'DELETE FROM products WHERE id = ?', [id],
  );
  
  console.log('productModel', product);
  return product;
};

module.exports = { 
  createProduct, 
  searchName,
  getAll,
  getById,
  updateProduct,
  deleteProduct, 
};