'use strict';

const db = require('../../config/database');

module.exports = {
    create,
    selectByCustomerId
}

async function create(params) {

    try {

        for (let i = 0; i < params.serviceProduct.length; i++) {

            await db.query(`
                INSERT INTO store.customerserviceproduct(
                    idcustomer, 
                    idserviceproduct, 
                    idpaymentinfo,
                    boughtat
                )
                VALUES(
                    ${params.idCustomer}, 
                    ${params.serviceProduct[i].id}, 
                    ${params.idPaymentInfo},
                    (to_timestamp(${Date.now()} / 1000))
                )
                RETURNING id;
        `);

        }

        await db.query(`
            UPDATE crm.customer
            SET
                haveallreadybought = true
            WHERE id = ${params.idCustomer};
        `);

        return params.idCustomer;
    } catch (error) {
        return error;
    }
}


async function selectByCustomerId(params) {
    try {
        let result = await db.query(
            `
            SELECT 
                c.id,
                c.name,
                (SELECT json_agg(x) as "serviceProduct" FROM(
                    SELECT DISTINCT
                        sp.id,
                        csp.id AS "idCustomerServiceProduct",
                        sp.name,
                        sp.value,
                        csp.boughtat AS "boughtAt",
                        pi.id AS "idPayment",
                        pi.name AS "paymentName",
                        pi.card
                    FROM store.serviceproduct sp
                    INNER JOIN store.customerserviceproduct csp
                        ON csp.idserviceproduct = sp.id
                    INNER JOIN store.paymentInfo pi
                        ON pi.id = csp.idpaymentInfo
                    INNER JOIN crm.customer c
                        ON ${params.id} = csp.idcustomer
                )x)
            FROM crm.customer c
            WHERE c.id = ${params.id}
        `
        );

        return result.rows[0];
    } catch (error) {
        return error;
    }
}
