const express = require('express');
const {Config: {port}} = require('./src/config/config');
const ProductsApiRouter = require('./src/routes/ProductRouter');
const PersonsApiRouter = require('./src/routes/PersonRouter');
const generalApiRouter = require('./src/routes/GeneralRouter');

const app = express();
app.use(express.json());

// routes
app.use('/api/products', ProductsApiRouter);
app.use('/api/persons', PersonsApiRouter);
app.use('/', generalApiRouter);

// settings
app.set('view engine', 'ejs');

app.listen(port, ()=> {
    console.log(`listening on [${port}] port`);
});