const express = require('express');
const { check } = require('express-validator');
const { checkInvalidFields } = require('../middlewares/check-invalid-fields');
const { checkUnexpectedFields } = require('../middlewares/check-unexpected-fields');
const { ProductController:
    { getProductsAction, getProductAction, createProductAction, deleteProductAction } }
    = require('../controllers/ProductController');

const routerProducts = express.Router();

// endpoints for products 
routerProducts.get('/', getProductsAction);
routerProducts.get('/:id', getProductAction);
routerProducts.delete('/:id', deleteProductAction);
routerProducts.post('/', [
    checkUnexpectedFields('name', 'price', 'amount'),
    check('name', 'Name field is required').not().isEmpty(),
    check('name', 'Name field must have at least 3 characters').isLength({ min: 3 }),
    check('price', 'Price field is required').not().isEmpty(),
    check('price', 'Price field is numeric').isNumeric(),
    check('price', 'Price field must be greater than or equal to 1').isFloat({ min: 1 }),
    check('amount', 'Amount field is required').not().isEmpty(),
    check('amount', 'Amount field is numeric').isNumeric(),
    check('amount', 'Amount field must be greater than or equal to 0').isInt({ min: 0 }),
    checkInvalidFields
], createProductAction);

module.exports = routerProducts;