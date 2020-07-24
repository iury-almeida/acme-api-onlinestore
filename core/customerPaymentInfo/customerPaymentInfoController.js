'use strict';

const service = require('./customerPaymentInfoService');

module.exports = {
    createByCustomerId,
    updateByCustomerId,
    selectByCustomerId
}

async function createByCustomerId(req, res) {
    try {
        let result = await service.createByCustomerId(req.body);
        res.status(201);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

async function updateByCustomerId(req, res) {
    try {
        let result = await service.updateByCustomerId(Object.assign(req.body, req.params));
        res.status(200);
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
