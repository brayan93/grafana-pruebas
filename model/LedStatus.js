const Influx = require('influx');

const LedStatus = {
    measurement: 'led-control',
    fields: {
        value: Influx.FieldType.STRING
    },
    tags: []
}

module.exports = LedStatus;