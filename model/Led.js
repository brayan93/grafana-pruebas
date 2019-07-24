const Influx = require('influx');

const Led = {
    measurement: 'led-status',
    fields: {
        value: Influx.FieldType.STRING
    },
    tags: []
}

module.exports = Led;