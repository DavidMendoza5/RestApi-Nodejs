const pool = require('../database/connection');

let pedidosModel = {};

pedidosModel.getPedidos = (callback) => {
    if(pool){
        pool.query(
            'SELECT * FROM pedido ORDER BY id',
            (err, rows) => {
                if(err){
                    throw err;
                }else{
                    callback(null, rows);
                }
            }
        )
    }
};

pedidosModel.insertPedidos = (pedidosData, callback) => {
    if(pool){
        pool.query(
            'INSERT INTO pedido SET ?', pedidosData,
            (err, result) => {
                if(err){
                    throw err;
                }else{
                    callback(null, {
                        'insertId': result.insertId
                    })
                }
            }
        )
    }
}

pedidosModel.updatePedidos = (pedidosData, callback) => {
    if(pool){
        const sql = `
        UPDATE pedido SET
        id_pizza =  ${pool.escape(pedidosData.id_pizza)},
        id_tamano = ${pool.escape(pedidosData.id_tamano)},
        id_ingrediente = ${pool.escape(pedidosData.id_ingrediente)},
        precio = ${pool.escape(pedidosData.precio)},
        id_cliente = ${pool.escape(pedidosData.id_cliente)},
        id_empleado = ${pool.escape(pedidosData.id_empleado)}
        WHERE id = ${pool.escape(pedidosData.id)}
        `
        pool.query(sql, (err, result) => {
            if(err){
                throw err;
            }else {
                callback(null, {
                    "msg":"success"
                });
            }
        });
    }
};

pedidosModel.deletePedidos = (id, callback) => {
    if(pool){
        let sql = `
        SELECT * FROM pedido WHERE id = ${pool.escape(id)}
        `;

        pool.query(sql, (err, row) => {
            if(row){
                let sql = `
                DELETE FROM pedido WHERE id = ${id}
                `;
                pool.query(sql, (err, result) => {
                    if(err){
                        throw err;
                    }else{
                        callback(null, {
                            msg:'deleted'
                        })
                    }
                })
            }else{
                callback(null, {
                    msg: 'not exists'
                })
            }
        });
    }
};

module.exports = pedidosModel;