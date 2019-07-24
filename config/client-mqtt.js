// MQTT
const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://167.99.235.83', {
// const client = mqtt.connect('mqtt://broker.mqttdashboard.com', {
    clientId: 'clientId-WD657Kh3zm',
    clean: true,
    port: 1883
});

module.exports = client;