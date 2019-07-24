var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');

const http = require('http');
const os = require('os');
const bodyParser = require('body-parser');

const influxDB = require('./config/influxDB');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var influxRouter = require('./routes/influx');
var batteryRouter = require('./routes/battery');
var ledRouter = require('./routes/led');
var speedRouter = require('./routes/speed');
var ledStatusRouter = require('./routes/led-status');
var storageRouter = require('./routes/storage');

// MQTT
const mqtt = require('mqtt');

// VALIDATE RESPONSE MQTT CLIENT
const utils = require('./utils/sendDataBase');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/influx', influxRouter);
app.use('/battery', batteryRouter);
app.use('/led', ledRouter);
app.use('/speed', speedRouter);
app.use('/ledStatus', ledStatusRouter);
app.use('/storage', storageRouter);

influxDB.getDatabaseNames()
    .then(names => {
        if (!names.includes('geolocation-map')) {
            return influxDB.createDatabase('geolocation-map');
        }
    });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use((req, res, next) => {

    return next();
});

const client = mqtt.connect('mqtt://167.99.235.83', {
// const client = mqtt.connect('mqtt://broker.mqttdashboard.com', {
    clientId: 'clientId-WD657Kh3zm',
    clean: true,
    port: 1883
});
client.on('connect', function () {
    client.subscribe('MOWIN2/feeds/#');
    // client.subscribe('MOWIN/feeds/#');
    console.log("connected");
})
client.on('message', function (topic, message, packet) {
    // console.log(topic);
    // console.log(message);
    let string = '';
    message.forEach(data => {
        string += String.fromCharCode(data);
    });
    console.log(string);
    let resp = utils(topic, string);
    console.log(resp);
    if (resp) {
        if (resp.table === 'battery') {
            if (resp.value > 13.5) {
                client.publish('MOWIN/feeds/led-control', 'ON');
            } else {
                client.publish('MOWIN/feeds/led-control', 'OFF');
            }
        }
        if (resp.table === 'speed-n-location') {
            let conttt = 0;
            let sum = 0.001;
            let timeF
            influxDB.writePoints([{
                measurement: resp.table,
                fields: {
                    lat: resp.value.lat,
                    lon: resp.value.lon,
                    value: resp.value.value
                }
            }]);
        } else {
            let value = resp.value
            influxDB.writePoints([{
                measurement: resp.table,
                fields: {
                    value
                }
            }]);
        }
    }
});
module.exports = app;