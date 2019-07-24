const Influx = require('influx');

const Speed = {
    measurement: 'news',
    fields: {
        value: Influx.FieldType.STRING
    },
    tags: []
}

module.exports = Speed;