const { expect } = require("chai");
const sinon = require("sinon");
const { connect } = require("../../controllers/saleController");
const connection = require("../../models/connection");

const productModel = require("../../models/productModel");
const saleModel = require("../../models/saleModel");

const productMock = [{
  id: 1,
  name: "PC GAMER RGB",
  quantity: 5,
}];

const productsList = [
  {
    id: 1,
    name: "PC GAMER RGB",
    quantity: 5,
  },
  {
    id: 2,
    name: "Dragonlore",
    quantity: 2,
  },
];
const sale = [
  {
    date: "2021-09-09T04:54:29.000Z",
    product_id: 1,
    quantity: 2,
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    product_id: 2,
    quantity: 2,
  },
];
const salesList = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    product_id: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    product_id: 2,
    quantity: 2,
  },
];

describe('Test in MODEL', () => {
  describe('On entity "product"', () => {
    describe('The query "createProduct"', () => {
      before(async () => {
        sinon.stub(connection, "query").resolves(productMock);
      });

      after(async () => {
        connection.query.restore();
      });
      it('Create a new product as an object', async () => {
        const response = await productModel.createProduct(productsList[0].name, productsList[0].quantity);
        expect(response).to.be.an("object");
      });

      it('Return the "id" of the created product', async () => {
        const response = await productModel.createProduct(productsList[1].name, productsList[1].quantity);
        expect(response).to.have.a.property("id");
      });
    });

    describe('The query "searchName"', () => {
      before(async () => {
        sinon.stub(connection, "query").resolves(productMock);
      });

      after(async () => {
        connection.query.restore();
      });

      it('Return an object', async () => {
        const response = await productModel.searchName(productMock.name);
        expect(response).to.be.an('object');
      });

      it('Return the same name of the query', async () => {
        const response = await productModel.searchName(productMock.name);
        expect(response.name).to.be.equal(productMock[0].name);
      });
    });

    describe('The query "getAll"', () => {
      before(async () => {
        sinon.stub(connection, "query").resolves([productsList]);
      });

      after(async () => {
        connection.query.restore();
      });

      it('Return an array of objects', async () => {
        const response = await productModel.getAll();
        response.map(obj => expect(obj).to.be.an('object'));
      });

      it('Return a product list', async () => {
        const response = await productModel.getAll();
        expect(response).to.be.eql(productsList);
      });
    });

     describe('The query "getById"', () => {
      before(async () => {
        sinon.stub(connection, 'query').resolves(productMock);
      });

      after(async () => {
        connection.query.restore();
      });

      it('Return an object', async () => {
        const response = await productModel.getById(1);
        expect(response).to.be.an('object');
      });

      it('Return the same "id" as the query', async () => {
        const response = await productModel.getById(1);
        expect(response.id).to.be.equal(1);
      });
    });

     describe('The query "updateProduct"', () => {
      before(async () => {
        sinon.stub(connection, 'query').resolves(productMock);
      });

      after(async () => {
        connection.query.restore();
      });

      it('Return an object', async () => {
        const response = await productModel.updateProduct(productMock.id, productMock.name, productMock.quantity);
        expect(response).to.be.an('object');
      });

      it('Change the name of the product', async () => {
        const response = await productModel.updateProduct(productMock.id, 'GTX 1050 TI', productMock.quantity);
        expect(response.name).to.be.equal('GTX 1050 TI');
      });
    });

     describe('The query "deleteProduct"', () => {
      before(async () => {
        sinon.stub(connection, 'query').resolves(productMock);
      });

      after(async () => {
        connection.query.restore();
      });

      it('Return an object', async () => {
        const response = await productModel.deleteProduct(productMock.id, productMock.name, productMock.quantity);
        expect(response).to.be.an("object");
      });

      it('Find the product to be deleted', async () => {
        const response = await productModel.deleteProduct(productMock.id);
        expect(response).to.be.equal(productMock[0]);
      }); 
     });
  });

  describe('On entity "sale"', () => {
    describe('The query "createSale"', () => {
      before(async () => {
        sinon.stub(connection, "query").resolves([1]);
      });

      after(async () => {
        connection.query.restore();
      });

      it('Create a new sale as an object', async () => {
        const response = await saleModel.createSale(sale);
        expect(response).to.be.an("object");
      });

      it('Return the "id" of the created sale', async () => {
        const response = await saleModel.createSale(sale);
        expect(response).to.have.a.property("id");
      });
    });
  });
  
});
