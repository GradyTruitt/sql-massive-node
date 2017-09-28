const create = (req, res, next) => {
    const db = req.app.get('db');
    const { name, description, price, imageurl } = req.body;
    db.createProduct([ name, description, price, imageurl ]).then( result => {
        res.json(result);
    });
};

const getOne = (req, res, next) => {
    const db = req.app.get('db');
    const { params } = req; 
    db.readProduct( [params.id] ).then( result => {
        res.json(result);
    });
};

const getAll = (req, res, next) => {
    const db = req.app.get('db');
    db.readProducts().then( result => {
        res.json(result);
    });
};

const updateProduct = (req, res, next) => {
    const db = req.app.get('db');
    const { params, query } = req;
    db.updateProduct([ params.id, query.desc ]).then( result => {
        res.json(result);
    });
};

const deleteProduct = (req, res, next) => {
    const db = req.app.get('db');
    const { params } = req;
    db.deleteProduct([params.id]).then( result => {
        res.json(result);
    });
};

module.exports = {
    create,
    getOne,
    getAll,
    updateProduct,
    deleteProduct
};