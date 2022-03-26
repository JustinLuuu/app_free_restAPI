const express = require('express');
const {Config: {port}} = require('./src/config/index');
const ProductsApiRouter = require('./src/products/index');
const UsersApiRouter = require('./src/users/index');
const controlApiRouter = require('./src/index/index');

const app = express();
app.use(express.json());

// rutas
app.use('/api/products', ProductsApiRouter);
app.use('/api/users', UsersApiRouter);
app.use('/', controlApiRouter);

app.listen(port, ()=> {
    console.log(`Servidor escuchando en el puerto ${port}`);
});