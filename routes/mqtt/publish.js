var express = require('express');
var router = express.Router();

const client = require('../../config/client-mqtt');

router.get('/', (req, res, next) => {
    res.render('publishMQTT', {
        title: 'Publicar'   
    })
});

module.exports = router;