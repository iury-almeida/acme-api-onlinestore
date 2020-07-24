'use strict';

const checkoutController = require('./checkoutController');

module.exports = (app) => {
    app.post('/checkout', checkoutController.create);
    app.get('/checkout/:id', checkoutController.selectByCustomerId);
    app.get('/ping', (req, res) => {
        res.send(new Date());
    });
}