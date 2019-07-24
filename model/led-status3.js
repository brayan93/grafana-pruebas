const Influx = require('influx');

const Led = {
    measurement: 'led-status3',
    fields: {
        value: Influx.FieldType.STRING
    },
    tags: []
}

module.exports = Led;