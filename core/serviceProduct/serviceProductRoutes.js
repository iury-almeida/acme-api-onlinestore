'use strict';

const serviceProductController = require('./serviceProductController');

module.exports = (app) => {
    app.post('/service-product', serviceProductController.create);
    app.put('/service-product/:id', serviceProductController.update);
    app.get('/service-product', serviceProductController.select);
    app.get('/service-product/:id', serviceProductController.selectById);
    app.get('/ping', (req, res) => {
        res.send(new Date());
    });
}