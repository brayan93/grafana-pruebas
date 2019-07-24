const Influx = require('influx');

const Battery = require('../model/Battery');
const Led = require('../model/Led');
const LedStatus = require('../model/LedStatus');
const Speed = require('../model/Speed');

// led-status
const led1 = require('../model/led-status1')
const led2 = require('../model/led-status2')
const led3 = require('../model/led-status3')

const influx  = new Influx.InfluxDB({
    // host: 'localhost',
    host: '167.99.235.83',
    database: 'geolocation-map',
    schema: [
        {
            measurement: 'speed-n-location',
            fields: {
                lon: Influx.FieldType.FLOAT,
                lat: Influx.FieldType.FLOAT,
                value: Influx.FieldType.INTEGER
            },
            tags: []
        },
        Battery,
        Led,
        Speed,
        LedStatus,
        led1,
        led2,
        led3
    ]
});

module.exports = influx;