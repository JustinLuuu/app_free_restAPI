const express = require('express');
const { ProductController:
{ getProductsAction, getProductAction, createProductAction, deleteProductAction } }
= require('./controller');

const routerProducts = express.Router();

// endpoints for products
routerProducts.get('/', getProductsAction);
routerProducts.get('/:id', getProductAction);
routerProducts.post('/', createProductAction);
routerProducts.delete('/:id', deleteProductAction);

module.exports = routerProducts;