'use strict';

const customerPaymentInfo = require('./customerPaymentInfoController');

module.exports = (app) => {
    app.post('/customer-payment-info', customerPaymentInfo.createByCustomerId);
    app.put('/customer-payment-info/:id', customerPaymentInfo.updateByCustomerId);
    app.get('/customer-payment-info/:id', customerPaymentInfo.selectByCustomerId);
    app.get('/ping', (req, res) => {
        res.send(new Date());
    });
}