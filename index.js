const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

const { dbUser, database } = require('./config');
const port = 3000;
const connectionString = `postgress://${dbUser}@localhost/${database}`;

const app = express();

/**************************************/
app.use( bodyParser.json() );
app.use( cors() );

/**************************************/
const massiveConnection = massive(connectionString)
.then(db => {
    app.set('db', db);
})
.catch(err => {
    console.log(err);
});

const productsCtrl = require('./controllers/productsCtrl');

/**************************************/
app.post('/api/product', productsCtrl.create);
app.get('/api/products', productsCtrl.getAll);
app.get('/api/product/:id', productsCtrl.getOne);
app.put('/api/product/:id', productsCtrl.updateProduct);
app.delete('/api/product/:id', productsCtrl.deleteProduct);

/**************************************/
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});