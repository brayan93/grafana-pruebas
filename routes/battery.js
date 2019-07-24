var express = require('express');
var router = express.Router();

const os = require('os');

const influxDB = require('../config/influxDB');
const influx = require('influx');

router.get('/batteryRegister', async (req, res, next) => {
    const registers = await influxDB.query(`
        select * from battery_status
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
    res.render('batteryRegister', {
        title: 'Batería',
        registers
    });
})

router.get('/form', async (req, res, next) => {
    res.render('formBattery', {
        title: 'Batería',
    });
});

router.post('/form', async (req, res, next) => {
    let { level } = req.body;
    level = parseFloat(level);
    if (!level) {
        return res.redirect('/battery/batteryRegister');
    }
    const resp = await influxDB.writePoints([
        {
            measurement: 'battery_status',
            fields: { level }
        }
    ]);
    res.redirect('/battery/batteryRegister');
});

module.exports = router;