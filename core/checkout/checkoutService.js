'use strict';

const repository = require('./checkoutRepository');

module.exports = {
    create,
    selectByCustomerId
}

async function create(params) {
    try {
        let result = await repository.create(params);
        return {
            result: result,
            message: "Checkout created"
        };
    } catch (error) {
        return error;
    }
}

async function selectByCustomerId(params) {
    try {
        let result = await repository.selectByCustomerId(params);
        return {
            result: result,
            message: "Checkout found"
        };
    } catch (error) {
        return error;
    }
}
