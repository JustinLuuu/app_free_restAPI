const { Response } = require("../common/response");
const EntityServices = require("../services/entityServices");

const entitiesServices = new EntityServices('products');

const getProductsAction = async (req, res) => {
    try {
        const products = await entitiesServices.getAll();
        Response(res, 200, 'Product list', products);
    } catch (error) {
        console.log(error);
        Response(res, 500, 'Internal server error');
    }
}

const getProductAction = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await entitiesServices.getById(id);

        product ? 
        Response(res, 200, `Product [${id}] `, product) : 
        Response(res, 404, `Product [${id}] not found `, product); 
    } catch (error) {
        console.log(error);
        Response(res, 500, 'Internal server error');
    }
}

const createProductAction = async (req, res) => {
    try {
        const { body: productData } = req;
        const insertedId = await entitiesServices.create(productData);

        Response(res, 201, 'Product created', insertedId);
    } catch (error) {
        console.log(error);
        Response(res, 500, 'Internal server error');
    }
}

const deleteProductAction = async (req, res) => {
    try {
        const { id } = req.params;
        const wasDeleted = await entitiesServices.delete(id);
        
        Response(res, 200, `${wasDeleted ?
        'Successfully deleted one product' :
        '0 products were deleted'}`, wasDeleted && id);
    } catch (error) {
        console.log(error);
        Response(res, 500, 'Internal server error');
    }
}


module.exports.ProductController = {
    getProductsAction, getProductAction, createProductAction, deleteProductAction
}