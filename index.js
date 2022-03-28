const express = require('express');
const {Config: {port}} = require('./src/config/index');
const ProductsApiRouter = require('./src/routes/ProductRouter');
const UsersApiRouter = require('./src/routes/UserRouter');
const controlApiRouter = require('./src/routes/ControlRouter');

const app = express();
app.use(express.json());

// routes
app.use('/api/products', ProductsApiRouter);
app.use('/api/users', UsersApiRouter);
app.use('/', controlApiRouter);

app.listen(port, ()=> {
    console.log(`listening on [${port}] port`);
});