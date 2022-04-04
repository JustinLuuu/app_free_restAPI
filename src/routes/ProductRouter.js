const express = require('express');
const { check, body } = require('express-validator');
const { checkInvalidFields } = require('../middlewares/check-invalid-fields');
const { checkUnexpectedFields } = require('../middlewares/check-unexpected-fields');
const { checkEmptyRequestBody } = require('../middlewares/check-empty-body');
const { checkValidBsonId } = require('../middlewares/check-valid-bsonidjs');
const { ProductController: { getProductsAction, getProductAction, createProductAction, 
updateProductAction, deleteProductAction } } = require('../controllers/ProductController');


const routerProducts = express.Router();

// endpoints for products 
routerProducts.get('/', getProductsAction);
routerProducts.get('/:id', checkValidBsonId, getProductAction);
routerProducts.delete('/:id', checkValidBsonId, deleteProductAction);

routerProducts.post('/', [
    checkEmptyRequestBody,
    checkUnexpectedFields('name', 'price', 'amount'),

    check('name', 'Name field is required').not().isEmpty()
    .isLength({min:3}).withMessage('Name field must have at least 3 characters'),

    check('price', 'Price field is required').not().isEmpty()
    .isNumeric().withMessage('Price field is numeric')
    .isInt({min:1}).withMessage('Price field must be greater than or equal to 1'),

    check('amount', 'Amount field is required').not().isEmpty()
    .isNumeric().withMessage('Amount field is numeric')
    .isInt({min:0}).withMessage('Amount field must be greater than or equal to 0'),

    checkInvalidFields
], createProductAction);

routerProducts.put('/:id', [
    checkValidBsonId,
    checkEmptyRequestBody,
    checkUnexpectedFields('name', 'price', 'amount'),

    check('name', 'Name field is required').if(body('name').exists()).not().isEmpty()
    .isLength({min: 3}).withMessage('Name field must have at least 3 characters'),

    check('price', 'Price field is required').if(body('price').exists()).not().isEmpty()
    .isNumeric().withMessage('Price field is numeric')
    .isFloat({min: 1}).withMessage('Price field must be greater than or equal to 1'),

    check('amount', 'Amount field is required').if(body('amount').exists()).not().isEmpty()
    .isNumeric().withMessage('Amount field is numeric')
    .isInt({min: 0}).withMessage('Amount field must be greater than or equal to 0'),

    checkInvalidFields
], updateProductAction);

routerProducts.all('/', (_, res)=> {res.status(405).send('Method not allowed')})

module.exports = routerProducts;