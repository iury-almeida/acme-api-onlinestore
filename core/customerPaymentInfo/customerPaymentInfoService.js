'use strict';

const repository = require('./customerPaymentInfoRepository');

module.exports = {
    createByCustomerId,
    updateByCustomerId,
    selectByCustomerId
}

async function createByCustomerId(params) {
    try {
        let result = await repository.createByCustomerId(params);
        return {
            result: result,
            message: "Customer payment info created"
        };
    } catch (error) {
        return error;
    }
}

async function updateByCustomerId(params) {
    try {
        let result = await repository.updateByCustomerId(params);
        return {
            result: result,
            message: "Customer payment info updated"
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
            message: "Customer payment info found"
        };
    } catch (error) {
        return error;
    }
}

