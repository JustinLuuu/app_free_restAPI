const { Response } = require("../common/response");
const EntityServices = require("../services/entityServices");

const entitiesServices = new EntityServices('products');

const getProductsAction = async (req, res = res) => {
    try {
        const products = await entitiesServices.getAll();
        Response.success(res, 200, 'Product list', products);
    } catch (error) {
        console.log(error);
        Response.error(res);
    }
}

const getProductAction = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await entitiesServices.getById(id);

        Response.success(
            res,
            product ? 200 : 404,
            `${product ? `Product ${id}` : 'No product found'}`,
            product ? product : {});
    } catch (error) {
        console.log(error);
        Response.error(res);
    }
}

const createProductAction = async (req, res) => {
    try {
        const { body: productData } = req;
        const insertedId = await entitiesServices.create(productData);
        Response.success(res, 201, 'Product created', insertedId);
    } catch (error) {
        console.log(error);
        Response.error(res);
    }
}

const deleteProductAction = async (req, res) => {
    try {
        const { id } = req.params;
        const isDeleted = await entitiesServices.delete(id);
        Response.success(res, 200, `${isDeleted ?
            'Successfully deleted one product' :
            'No products matched the query. Deleted 0 products'}`);
    } catch (error) {
        console.log(error);
        Response.error(res);
    }
}


module.exports.ProductController = {
    getProductsAction, getProductAction, createProductAction, deleteProductAction
}