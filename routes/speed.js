var express = require('express');
var router = express.Router();

const os = require('os');

const influxDB = require('../config/influxDB');
const influx = require('influx');

let table = 'speed';

router.get('/speedRegister', async (req, res, next) => {
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
    res.render('speedRegister', {
        title: 'Velocidad',
        registers
    });
})

router.get('/form', async (req, res, next) => {
    res.render('formSpeed', {
        title: 'Velocidad',
    });
});

router.post('/form', async (req, res, next) => {
    let { speed } = req.body;
    speed = parseFloat(speed);
    if (!speed) {
        return res.redirect(`/speed/${table}Register`);
    }
    const resp = await influxDB.writePoints([
        {
            measurement: `${table}`,
            fields: { speed }
        }
    ]);
    res.redirect(`/speed/${table}Register`);
});

module.exports = router;