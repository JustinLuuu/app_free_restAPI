const express = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { ProductController:
{ getProductsAction, getProductAction, createProductAction, deleteProductAction } }
= require('../controllers/ProductController');
const { checkExistFields } = require('../middlewares/check-exist-fields');

const routerProducts = express.Router();

// endpoints for products 
routerProducts.get('/', getProductsAction);
routerProducts.get('/:id', getProductAction);
routerProducts.delete('/:id', deleteProductAction);
routerProducts.post('/', [    
    checkExistFields('name', 'price', 'amount'),
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'Name must have at least 3 characters').isLength({min: 3}),
    check('price', 'Price field is numeric').isNumeric(),
    check('price', 'Price must be greater than or equal to 1').isFloat({min: 1}),
    check('amount', 'Amount field is numeric').isNumeric(),
    check('amount', 'Amount must be greater than or equal to 0').isInt({min: 0}),
    validateFields
], createProductAction);

module.exports = routerProducts;