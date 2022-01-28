const { expect } = require("chai");
const sinon = require("sinon");

const productModel = require("../../models/productModel");
// const saleModel = require("../../models/saleModel");

const productService = require("../../services/productService");
// const saleService = require("../../services/saleService");

const product = { name: "PC GAMER RGB", quantity: 5 };


const TEST_ID = 1;

describe('Test in SERVICE', () => {
  describe('The entity "product"', () => {
    describe('The query "createProduct"', () => {
      before(async () => {
        const create = { id: TEST_ID };
        sinon.stub(productModel, "searchName").resolves([]);
        sinon.stub(productModel, "createProduct").resolves(create);
      });

      after(async () => {
        productModel.searchName.restore();
        productModel.createProduct.restore();
      });
  
      it('Create a new product as an object', async () => {
        const response = await productService.createProduct(product);
        expect(response).to.be.an("object");
      });

      it("Deve retornar o produto cadastrado com seu id", async () => {
        const response = await productService.createProduct(product.name, product.quantity);
        expect(response.message).to.be.eql({ id: TEST_ID, ...product });
      });
    });
  });
});
