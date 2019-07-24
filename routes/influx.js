var express = require('express');
var router = express.Router();

const os = require('os');
const Influx = require('influx');
const influx = require('../config/influxDB');

router.get('/', (req, res, next) => {
    influx.query(`
        select * from gps_location
        order by time desc
        limit 10
    `).then(result => {
        res.json(result);
    }).catch(err => {
        res.status(500).send(err.stack);
    });
});

router.get('/list', async (req, res, next) => {
    const registers = await influx.query(`
        select * from gps_location
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
    res.render('register', {
        title: 'Registros',
        registers
    });
});

router.get('/form', async (req, res, next) => {
    res.render('formTime', {
        title: 'Crear Registro'
    });
});

router.post('/form', async (req, res, next) => {
    const start = Date.now();
    let { longitude, latitude } = req.body;
    longitude = parseFloat(longitude);
    latitude = parseFloat(latitude);
    const resp = await influx.writePoints([
        {
            measurement: 'gps_location',
            tags: { host: os.hostname() },
            fields: { longitude, latitude },
        }
    ])
    console.log(parseFloat(longitude), parseFloat(latitude));
    res.render('index', {
        title: 'Inicio'
    });
});
module.exports = router;