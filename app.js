var express = require('express');
var app = express();
var path = require('path');
var html = {
  body: 'testing'
};

app.use(express.static(path.join(__dirname + '/')));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

var mqtt = require('mqtt');

client = mqtt.connect('mqtt://localhost:1883');

client.subscribe('presence');

var expectedClients = ['client1', 'client2', 'client3', 'client4', 'client5'];
var clients = [];

client.on('message', (topic, message) => {
  clients.push(message.toString());
  console.log(message.toString());
});

app.get('/roll_call', (req, res) => {
  rollCall(() => {
    setTimeout(() => {
      var errors = 0;
      clients.sort();
      clients.forEach((client, index) => {
        if (clients.length < expectedClients.length || clients[index] !== expectedClients[index]) {
          errors += 1;
        }
      });
      if (errors !== 0) {
        console.log('something is wrong!', clients);
      } else {
        console.log('everybody is here!', clients);
      }
      res.json(clients);
    }, 2000);
  });
  clients = [];
})

app.get('*', (req, res) => {
  res.sendFile('index.html');
});


app.listen(3000, () => {
  console.log('app listening on port 3000');
});

function rollCall(cb) {
  client.publish('rollCall', 'sound off!');
  return cb();
}
