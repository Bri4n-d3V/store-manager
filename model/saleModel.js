const connection = require('./connection');

const createSaleProduct = async (saleId, productId, quantity) => {
  const [saleProduct] = await connection.query(
    `INSERT INTO sales_products (sale_id, product_id, quantity)
     VALUES ?;`,
     [saleId, productId, quantity],
  );
  console.log('saleProductModel', saleProduct);

  return saleProduct;
};

// envia uma query para cadastrar uma venda na DB
const createSale = async (products) => {
  const [{ insertId: id }] = await connection.query(
    `INSERT INTO sales (id, date)
     VALUES (DEFAULT, DEFAULT);`,
  );

  await createSaleProduct(products.map(
    ({ product_id: productID, quantity }) => [id, productID, quantity],
));

  console.log('saleModel', id);

  return { id };
};

module.exports = {
  createSale,
};
