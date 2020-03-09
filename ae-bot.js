const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const queue = new Map();
const ytdl = require('ytdl-core');
const { MessageEmbed } = require('discord.js')
const version = 'version'

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


client.once('ready', () => {
	console.log('Ready!');
});

//uh oh something went wrong
client.on('error', error => {
	const errorembed = new Discord.MessageEmbed()
	.setColor('#ff0000')
	.setTitle('Debug Mode Error')
	.setDescription('Something went wrong while running the bot.')
	.addFields(
		{ name: 'Session ID', value: sessionid, inline: true },
		{ name: 'Current date/time(PST): ', value: dateTime, inline: true },
		{ name: 'Error', value: error, inline: false },
	)
	.setTimestamp()
	.setFooter('Bot written by Daniel C');
	const channeldebug = client.channels.cache.get('686326260758216713');
	channeldebug.send(errorembed);
	console.error('an error has occured', error);
});

//Check for direct messages

client.on('message', message => {
	if (message.author.bot) return;
	if (message.channel.type == "dm") {
		if (message.content.startsWith != prefix){
			message.channel.send('Got it! ')
		}
	}

})

// login to Discord with your app's token
client.login(token);;

// Set the bot's presence (activity and status)
client.on("ready", () => {
    client.user.setPresence({
        game: { 
            name: 'Apple Explained | .help',
            type: 'WATCHING'
        },
        status: 'online'
    })
})

client.on('message', message => {
	if (message.author.bot) return;
	const fs = require('fs');
	const args = message.content.slice(prefix.length).split(/ +/);
	const argscorrect = args.join(' ')
    fs.appendFileSync('./logs/' + message.author.id + '-messages.log', '\n\n' + argscorrect);
})

//debug launch
client.once('ready', () => {
	const path = './debug.flag'
try {
  if (fs.existsSync(path)) {
	//file exists
	global.sessionid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	global.dateTime = date+' '+time;
	const debugembed = new Discord.MessageEmbed()
	.setColor('#00ff00')
	.setTitle('Debug Mode Activated')
	.setDescription('Bot is ready for testing.')
	.addFields(
		{ name: 'Session ID', value: sessionid, inline: true },
		{ name: 'Current date/time(PST): ', value: dateTime, inline: true },
	)
	.setTimestamp()
	.setFooter('Bot written by Daniel C');
	const channeldebug = client.channels.cache.get('686326260758216713');
	channeldebug.send(debugembed);


  }
} catch(err) {
  console.error(err)
}
})