const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const queue = new Map();
const ytdl = require('ytdl-core');
const { RichEmbed } = require('discord.js')
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

client.once('ready', () => {
	const path = './debug.flag'
	return;
try {
  if (fs.existsSync(path)) {
	//file exists
	global.sessionid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	global.dateTime = date+' '+time;
	const exampleEmbed = new Discord.RichEmbed()
	.setColor('#f8f8ff')
	.setTitle('Debug Mode')
	.addField('Test session ID', sessionid)
	.addField('Current date/time', dateTime)
	.addField('---', 'The session has started.')

	client.channels.get(`683751300063690885`).send(exampleEmbed);


  }
} catch(err) {
  console.error(err)
}
})

//uh oh something went wrong
client.on('error', error => {
	console.error('an error has occured', error);
});


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