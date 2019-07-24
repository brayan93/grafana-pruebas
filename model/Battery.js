const Influx = require('influx');

const Battery = {
    measurement: 'battery',
    fields: {
        value: Influx.FieldType.FLOAT
    },
    tags: []
}

module.exports = Battery;