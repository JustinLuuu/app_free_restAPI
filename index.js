const express = require('express');
const cors = require('cors');
const {Config: {port}} = require('./src/config/config');
const ProductsApiRouter = require('./src/routes/ProductRouter');
const UsersApiRouter = require('./src/routes/UserRouter');
const generalApiRouter = require('./src/routes/GeneralRouter');

const app = express();
app.use(cors());
app.use(express.json());


// routes
app.use('/api/products', ProductsApiRouter);
app.use('/api/users', UsersApiRouter);
app.use('/', generalApiRouter);

// settings
app.set('view engine', 'ejs');

app.listen(port, ()=> {
    console.log(`listening on [${port}] port`);
});