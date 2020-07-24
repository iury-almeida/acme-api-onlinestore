'use strict';

const service = require('./checkoutService');

module.exports = {
    create,
    selectByCustomerId
}

async function create(req, res) {
    try {
        let result = await service.create(req.body);
        res.status(201);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

async function selectByCustomerId(req, res) {
    try {
        let result = await service.selectByCustomerId(req.params);
        res.status(200);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}
