'use strict';

const db = require('../../config/database');

module.exports = {
    create,
    update,
    select,
    selectById
}

async function create(params) {

    try {

            let result = await db.query(`
                INSERT INTO store.serviceproduct(
                    name,
                    value,
                    occurredat
                )
                VALUES(
                    '${params.name}', 
                    ${params.value}, 
                    (to_timestamp(${Date.now()} / 1000))
                )
                RETURNING id;
        `);

        return result.rows[0];
    } catch (error) {
        return error;
    }
}

async function update(params) {

    try {

            await db.query(`
                UPDATE store.serviceproduct
                SET
                    name = '${params.name}',
                    value = ${params.value}
                WHERE id = ${params.id};     
        `);

        return params.id;
    } catch (error) {
        return error;
    }
}

async function select(params) {
    try {
        let result = await db.query(
            `
            SELECT 
                sp.id,
                sp.name,
                sp.value,
                sp.occurredat AS "occurredAt"
            FROM store.serviceproduct sp
            ORDER BY id asc;
        `
        );

        return result.rows;
    } catch (error) {
        return error;
    }
}


async function selectById(params) {
    try {
        let result = await db.query(
            `
            SELECT 
                sp.id,
                sp.name,
                sp.value,
                sp.occurredat AS "occurredAt"
            FROM store.serviceproduct sp
            WHERE sp.id = ${params.id};
        `
        );

        return result.rows[0];
    } catch (error) {
        return error;
    }
}