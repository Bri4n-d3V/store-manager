const connection = require('./connection');

// envia uma query para cadastrar uma venda na tabela 'sale_product da DB
const createSaleProduct = async (saleId, productId, quantity) => {
  const [saleProduct] = await connection.query(
    `INSERT INTO sales_products (sale_id, product_id, quantity)
     VALUES ?;`,
     [saleId, productId, quantity],
  );

  return saleProduct;
};

// envia uma query para cadastrar uma venda na tabela 'sale' da DB
const createSale = async (products) => {
  const [{ insertId: id }] = await connection.query(
    `INSERT INTO sales (id, date)
     VALUES (DEFAULT, DEFAULT);`,
  );

  await createSaleProduct(products.map(
    ({ product_id: productID, quantity }) => [id, productID, quantity],
));

  return { id };
};

// envia uma query para retornar todas as vendas da DB
const getAllSales = async () => {
  const [sale] = await connection.query(
    `SELECT 
    sp.sale_id AS saleId, s.date, sp.product_id, sp.quantity
 FROM
     sales AS s
         INNER JOIN
     sales_products AS sp ON s.id = sp.sale_id;`,
  );

  console.log('saleModel', sale);
  return sale;
};

// envia uma query para retornar todas as vendas da DB filtradas por ID
const saleById = async (id) => {
  const [sale] = await connection.query(
    `SELECT 
    s.date, sp.product_id, sp.quantity
FROM
    sales AS s
        INNER JOIN
    sales_products AS sp ON s.id = sp.sale_id
WHERE
    s.id = ?;`,
    [id],
  );

  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  saleById,
};
