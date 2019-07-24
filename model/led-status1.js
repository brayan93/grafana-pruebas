const Influx = require('influx');

const Led = {
    measurement: 'led-status1',
    fields: {
        value: Influx.FieldType.STRING
    },
    tags: []
}

module.exports = Led;