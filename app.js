
//Allows me to interface with csgo servers
const ssq = require('node-ssq');    //'ssq' was not updated to latest from github repo, manually copied it over from 'https://github.com/gpittarelli/node-ssq' as 'node-ssq'

//Data relating to the csgo server being tested
const serverinfo = require('./info.json');

//Sets the timeout to 2000ms (default)
ssq.set_timeout(2000);

//Variable to store the data recieved from the server
var serverdata;

//Should get the server data json
ssq.info(serverinfo.serverip, serverinfo.serverport, (err, data) => {
  console.error(err);
  serverdata = data;
  
  console.log(`Playercount: ${serverdata.numplayers}/${serverdata.maxplayers} on ${serverdata.map}`);

  console.log(serverdata);
});