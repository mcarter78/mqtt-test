### MQTT RollCall test

first run `npm install`

then run `node server.js` (this starts the mqtt server which each subsequent process connects to)

then open new terminal tabs and run `node client1.js` through `node client5.js`
each in its own tab

finally, run `node app.js` in its own tab

Browse to `http://localhost:3000/`, then click the Roll Call button.  You should get back
a list of the clients that are currently listening.

Each client is subscribed to the `'rollCall'` topic and is programmed to publish a message to the topic `'presence'`
along with its client name.  When running `app.js`, you should see each client's
response printed to the console, followed by an error if they are not all present,
or a success message if they all respond. (logic in this is still WIP, not foolproof)
