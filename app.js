var mqtt = require('mqtt');

client = mqtt.connect('mqtt://localhost:1883');

client.subscribe('presence');

var expectedClients = ['client1', 'client2', 'client3', 'client4', 'client5'];
var clients = [];

client.on('message', (topic, message) => {
  clients.push(message.toString());
  console.log(message.toString());
  client.end();
});

function rollCall(cb) {
  client.publish('rollCall', 'sound off!');
  return cb();
}

rollCall(() => {
  setTimeout(() => {
    var errors = 0;
    clients.sort();
    clients.forEach((client, index) => {
      if (clients[index] !== expectedClients[index]) {
        errors += 1;
      }
    });
    if (errors !== 0) {
      console.log('something is wrong!', clients);
    } else {
      console.log('everybody is here!', clients);
    }
  }, 2000);
});
