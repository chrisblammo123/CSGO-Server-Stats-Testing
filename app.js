
//Allows me to interface with csgo servers
const ssq = require('node-ssq');    //'ssq' was not updated to latest from github repo, manually copied it over from 'https://github.com/gpittarelli/node-ssq' as 'node-ssq'

//Data relating to the csgo server being tested
const serverinfo = require('./info.json');

//Sets the timeout to 2000ms (default)
ssq.set_timeout(2000);

//Should get the server data json
ssq.info(serverinfo.serverip, serverinfo.serverport, (err, data) => {
  //Error reporting
  console.error(err);
  //Variable to store the data recieved from the server
  var serverdata = data;

  //Couple of example test commands
  console.log(`Player Count: ${serverdata.numplayers}/${serverdata.maxplayers} on ${serverdata.map}`);
  console.log(`Server is running ${serverdata.gamedirectory} (id: ${serverdata.appid}) on version ${serverdata.gameversion}`)

  //Outputs entire object
  console.log(serverdata);
});