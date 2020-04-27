/*
 * Discord Bot invite link
 * https://discordapp.com/oauth2/authorize?client_id=507957137465540629&scope=bot&permissions=470019159
 */


// Variables

const ssq = require('ssq');              //Allows me to interface with csgo servers
//'ssq' was not updated to latest from github repo, manually copied it over from 'https://github.com/gpittarelli/node-ssq' as 'node-ssq'
//?????????
const Discord = require('discord.js');        //Discord bot API
const client = new Discord.Client();          //Discord bot client


const serverinfo = require('./info.json');    //Data relating to the csgo server being tested
const config = require('./config.json');      //Data relating to the discord bot


// Initialization

//Sets the ssq timeout to 2000ms (default)
ssq.set_timeout(2000);

//Triggered when the bot is started up.
client.on('ready', () => {
	console.log('-----Starting Bot-----');
	//Prints when the bot connects and its name
	console.log('Connected as ' + client.user.tag + '\n');
	client.user.setActivity(`0/0 Players on MAP`);
});



// Main

//Triggered when the someone sends a message in a server that the bot is active in.
client.on('message', (message) => {
	//Prevents the bot from responding to messages from bots or ones that do not start with the prefix.
	if (message.author.bot)
	{return;}

	//Tests to see if a message starts with the prefix
	if (message.content.startsWith(config.prefix))
	{
		//Main command processing.
		let msg = message.content.substr(1).split(' '); //Removes the ! and splits based on each space
		let cmd = msg[0].toLowerCase(); // The first word directly after the exclamation is the command
		let args = msg.slice(1); // All other words are arguments/parameters/options for the command

		console.log('Command received: ' + cmd);
		console.log('Arguments: ' + args); // There may not be any arguments

		switch (cmd)
		{
      case "test":
			case 'ping':
				message.author.send('Pong!')
					.then(console.log)
					.catch(console.error);
				break;
			case 'github':
				message.channel.send('https://github.com/chrisblammo123/CSGO-Server-Stats-Testing')
					.then(console.log)
					.catch(console.error);
				break;
			case 'info':
      case 'help':
      case 'commands':
				message.channel.send(`Custom Discord Bot made to read CS:GO server information and export it to Discord\nTo use the bot, type \'${config.prefix}status\' or \'${config.prefix}server\'`)
					.then(console.log)
					.catch(console.error);
        break;
      case "status":
      case "server":
        //Gets server data formatted as an object.
        ssq.info(serverinfo.serverip, serverinfo.serverport, (err, data) => {
          //Error reporting
          console.error(err);
          //Variable to store the data recieved from the server
          var serverdata = data;

          //Couple of example test commands
          message.channel.send(`Player Count: ${serverdata.numplayers}/${serverdata.maxplayers} on ${serverdata.map}`);
					//console.log(`Server is running ${serverdata.gamedirectory} (id: ${serverdata.appid}) on version ${serverdata.gameversion}`)
					client.user.setActivity(`${serverdata.numplayers}/${serverdata.maxplayers} Players on ${serverdata.map}`);

          //Outputs entire object
          console.log(serverdata);
        });
        break;
			default:
				message.channel.send(`Invalid command, try ${config.prefix}info|help|commands or use ${config.prefix}status|server`)
					.then(console.log)
					.catch(console.error);
				break;
		}
	}
});

//Secret token for the bot, defined in the config.json file.
client.login(config.token);





/*

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

*/