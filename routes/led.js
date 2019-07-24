var express = require('express');
var router = express.Router();

const os = require('os');

const influxDB = require('../config/influxDB');
const influx = require('influx');

let table = 'led';

router.get('/ledList', async (req, res, next) => {
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
    res.render('ledList', {
        title: 'Led',
        registers
    });
})

router.get('/form', async (req, res, next) => {
    res.render('formLed', {
        title: 'Led',
    });
});

router.post('/form', async (req, res, next) => {
    let { status } = req.body;
    if (!status || status === '') {
        return res.redirect('/led/ledList');
    }
    const resp = await influxDB.writePoints([
        {
            measurement: `${table}`,
            fields: { status }
        }
    ]);
    res.redirect('/led/ledList');
});

module.exports = router;