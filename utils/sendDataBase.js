module.exports = function topicSeparate(topic = '', message = '') {
    try {
        let split = [];
        if (topic !== '') {
            split = topic.split('/');
            if (split.length > 0) {
                // if (split[0] === 'MOWIN' && split[1] === 'feeds') {
                if (split[0] === 'MOWIN2' && split[1] === 'feeds') {
                    let table = '';
                    let value;
                    table = split[2];
                    if (split[2] === 'speed-n-location') {
                        let obj = JSON.parse(message);
                        let lat = obj.lat;
                        let lon = obj.lon;
                        let lValue = obj.value;
                        value = { lat: lat, lon: lon, value: lValue };
                    } else {
                        value = message;
                    }
    
                    return { table, value }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}