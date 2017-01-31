var mqtt = require('mqtt');

client = mqtt.connect('mqtt://localhost:1883');

client.subscribe('rollCall');

client.on('message', function(topic, msg) {
  console.log(topic, msg.toString());
  console.log('Client 2 publishing.. ');
  client.publish('presence', 'client2');
});
