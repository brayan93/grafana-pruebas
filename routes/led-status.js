var express = require('express');
var router = express.Router();

const os = require('os');

const influxDB = require('../config/influxDB');
const influx = require('influx');

let table = 'led_status';

router.get('/list', async (req, res, next) => {
    const registers = await influxDB.query(`
        select * from ${table}
        order by time desc
    `);
    if (!registers) {
        return res.render('index', {
            title: 'Inicio',
            errors: [
                { message: 'Ocurrio un error al obtener los registros' }
            ]
        });
    }
    res.render('listLedStatus', {
        title: 'Estado Led',
        registers
    });
})

router.get('/form', async (req, res, next) => {
    res.render('formLedStatus', {
        title: 'Estado Led',
    });
});

router.post('/form', async (req, res, next) => {
    let { status } = req.body;
    if (!status || status === '') {
        return res.redirect('/ledStatus/list');
    }
    const resp = await influxDB.writePoints([
        {
            measurement: `${table}`,
            fields: { status }
        }
    ]);
    res.redirect('/ledStatus/list');
});

module.exports = router;