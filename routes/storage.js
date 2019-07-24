var express = require('express');
var router = express.Router();

const os = require('os');

const influxDB = require('../config/influxDB');
const influx = require('influx');

router.post('/battery', (req, res, next) => {
});

module.exports = router;