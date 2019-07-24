var express = require('express');
var router = express.Router();

const os = require('os');

const influxDB = require('../config/influxDB');
const influx = require('influx');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Inicio'
    });
    // // influxDB.query(`SELECT * FROM "speed-n-location" WHERE ("time" >= 1563638400000 AND "time" <= 1563647520000)`).then(resp => {
    // influxDB.query(`SELECT median("lat"), median("lon") FROM "speed-n-location" WHERE (time >= '2019-07-20T11:30:00Z' AND time <= '2019-07-20T13:00:00Z') GROUP BY time(30s)`).then(resp => {
    // // influxDB.query(`SELECT lat, lon, time FROM "speed-n-location"`).then(resp => {
    //     console.log(resp);
    //     res.send(resp);
    // });
    console.log(influx.Precision.Hours);
});

module.exports = router;