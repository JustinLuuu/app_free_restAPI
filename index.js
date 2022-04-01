const express = require('express');
const {Config: {port}} = require('./src/config/config');
const ProductsApiRouter = require('./src/routes/ProductRouter');
const UsersApiRouter = require('./src/routes/UserRouter');
const controlApiRouter = require('./src/routes/ControlRouter');

const app = express();
app.use(express.json());

// routes
app.use('/api/products', ProductsApiRouter);
app.use('/api/users', UsersApiRouter);
app.use('/', controlApiRouter);

// settings
app.set('view engine', 'ejs');

app.listen(port, ()=> {
    console.log(`listening on [${port}] port`);
});