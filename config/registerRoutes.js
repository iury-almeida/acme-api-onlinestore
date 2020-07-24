'use strict';

const customerPaymentInfoRoutes = require('../core/customerPaymentInfo/customerPaymentInfoRoutes');
const checkout = require('../core/checkout/checkoutRoutes');
const serviceProduct = require('../core/serviceProduct/serviceProductRoutes');

module.exports = (app) => {
    customerPaymentInfoRoutes(app);
    checkout(app);
    serviceProduct(app);
}