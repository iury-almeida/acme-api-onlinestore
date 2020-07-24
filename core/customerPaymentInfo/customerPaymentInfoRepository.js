'use strict';

const db = require('../../config/database');

module.exports = {
    createByCustomerId,
    updateByCustomerId,
    selectByCustomerId
}

async function createByCustomerId(params) {

    try {

        //link and adding customer payment info
        let paymentInfoResult;

        for (let i = 0; i < params.paymentInfo.length; i++) {

            paymentInfoResult = await db.query(`
                INSERT INTO store.paymentInfo(
                    name, 
                    card,
                    "number"
                )
                VALUES(
                    '${params.paymentInfo[i].name}',
                    ${params.paymentInfo[i].card || false},
                    ${+params.paymentInfo[i].number}
                )

                RETURNING id;
            `);

            await db.query(`
                INSERT INTO store.customerpaymentinfo(
                    idcustomer,
                    idpaymentinfo
                )
                VALUES(
                    ${+params.id},
                    ${+paymentInfoResult.rows[0].id}
                )
            `);

        };

        return params.id;
    } catch (error) {
        return error;
    }
}

async function updateByCustomerId(params) {
    try {

         //link and adding customer payment info which is not in db 
         let paymentInfoResult;

         for (let i = 0; i < params.paymentInfo.length; i++) {
 
             if (!params.paymentInfo[i].id) {
 
                 paymentInfoResult = await db.query(`
                    INSERT INTO store.paymentInfo(
                        name, 
                        card,
                        "number"
                    )
                    VALUES(
                        '${params.paymentInfo[i].name}',
                        ${params.paymentInfo[i].card || false},
                        ${+params.paymentInfo[i].number}
                    )

                    RETURNING id;
                 `);
                 params.paymentInfo[i].id = paymentInfoResult.rows[0].id;
 
                 await db.query(`
                    INSERT INTO store.customerpaymentinfo(
                        idcustomer,
                        idpaymentinfo
                    )
                    VALUES(
                        ${+params.id},
                        ${+paymentInfoResult.rows[0].id}
                    )
                 `);
             }
             else {
                 await db.query(`
                     UPDATE store.paymentinfo
                     SET 
                         name = '${params.paymentInfo[i].name}',
                         card = ${params.paymentInfo[i].card || false},
                         number = ${params.paymentInfo[i].number}
                     WHERE id = ${params.paymentInfo[i].id}
                 `)
             }
 
         };
 
         //unlinking customer payment info 
         let paymentInfoIds = [];
 
         params.paymentInfo.map(x => {
             paymentInfoIds.push(x.id);
         });
 
         await db.query(`
             DELETE FROM store.customerpaymentinfo 
             WHERE idcustomer = ${params.id} AND idpaymentinfo NOT IN (${paymentInfoIds});
         `);
        return params.id;
    
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
                (SELECT json_agg(x) as "paymentInfo" FROM(
                    SELECT DISTINCT
                        pi.id,
                        pi.name,
                        pi.card,
                        pi.number
                    FROM store.paymentInfo pi
                    INNER JOIN store.customerpaymentinfo cpi
                        ON cpi.idpaymentinfo = pi.id
                    INNER JOIN crm.customer c
                        ON ${params.id} = cpi.idcustomer
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
