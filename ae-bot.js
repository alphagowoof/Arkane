global.fs = require('fs');
global.Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { nopermreply, BootSuccessful, WelcomeDmFileLocation } = require('./strings.json');
const { BotManagerRoleID , ModeratorRoleID , OwnerID , UserLog, ModLog, BotLog , DebugChannel, DebugFeaturesEnabled } = require('./info.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const queue = new Map();
const ytdl = require('ytdl-core');
const { MessageEmbed } = require('discord.js')
const version = 'version'
const Diff = require('diff')
const cooldowns = new Discord.Collection();
var cleanser = require('profanity-cleanser');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//const modCommandFiles = fs.readdirSync('./modcommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	if (command.mod && !message.member.roles.cache.some(role => role.id === `${ModeratorRoleID}`)) {
		message.reply(nopermreply)
		return;
	}
	if (command.disable = true) {
		message.reply('this command is currently disabled and not available. Please try again later or contact the bot owner if you believe this is a mistake.')
		return;
	}
	if (command.debug && DebugFeaturesEnabled != true){
		message.reply('you are attempting to use a feature currently in testing and that could break the bot. If you would like to enable it, edit `DebugFeaturesEnabled` to `true` in the `info.json` file.')
		return;
	}
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

	
});

client.once('ready', () => {
	console.log('Ready!');
	
		const path = './runstate.txt'

		
		  if (fs.existsSync(path)) {
			//file exists
			var today = new Date();
			var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			global.dateTime = date+' '+time;
			const StartupEmbed = new Discord.MessageEmbed()
			.setColor('#ffa900')
			.setTitle('Bot Started - Issue Detected')
			.setDescription(`The bot loaded successfully, but didn't shutdown or restart correctly. Please make sure you shutdown or restart the bot correctly next time.`)
			.addFields(
				{ name: 'Current date/time(PST): ', value: dateTime, inline: true },
			)
			.setTimestamp()
			.setFooter('Bot written by Daniel C');
			global.modlog = client.channels.cache.get(`${BotLog}`);
			modlog.send(StartupEmbed);
			return
		  }else{
		  var today = new Date();
				var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
				var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
				global.dateTime = date+' '+time;
				const StartupEmbed = new Discord.MessageEmbed()
				.setColor('#00FF00')
				.setTitle('Bot Started')
				.setDescription(`${BootSuccessful}`)
				.addFields(
					{ name: 'Current date/time(PST): ', value: dateTime, inline: true },
				)
				.setTimestamp()
				.setFooter('Bot written by Daniel C');
				global.modlog = client.channels.cache.get(`${BotLog}`);
				modlog.send(StartupEmbed);
				fs.writeFileSync('./runstate.txt', 'running')
				return;
				}
});

client.on('message', message => {
	fs.writeFileSync('./last.msg', message)
	//Logs last message for crash report
}
)

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

//uh oh something went wrong
client.on('error', error => {
	console.error('an error has occured', error);
	return;
	const fs = require('fs');
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	global.dateTime = date+' '+time;
	fs.appendFileSync('./debuglogs/'+sessionid+'-error.log','('+dateTime+')'+error+'\n\n');
	const errorembed = new Discord.MessageEmbed()
	.setColor('#ff0000')
	.setTitle('Debug Mode Error')
	.setDescription('Something went wrong while running the bot.')
	.addFields(
		{ name: 'Current date/time(PST): ', value: dateTime, inline: true },
		{ name: 'Error', value: error, inline: false },
	)
	.setTimestamp()
	.setFooter('Bot written by Daniel C');
	const channel = client.channels.cache.get('688834736554246158');
	channel.send(errorembed);	
});

//Member join
client.on('guildMemberAdd', member => {
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	global.dateTime = date+' '+time;
	const channel = member.guild.channels.cache.find(ch => ch.id === `${UserLog}`);
	const guild = member.guild
	if (!channel) return;
	const MemberJoinEmbed = new Discord.MessageEmbed()
	.setColor('#00FF00')
	.setTitle('Member Join')
	.addFields(
		{ name: 'Username', value: member.user.tag, inline: false },
		{ name: 'Account creation date', value: member.user.createdAt, inline: false },
		{ name: 'Server join date', value: dateTime, inline: false },
		{ name: 'Server member count', value: `${guild.memberCount}`, inline: false },
	)
	.setTimestamp()
	channel.send(MemberJoinEmbed)
});

//Member leave
client.on('guildMemberRemove', member => {
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	global.dateTime = date+' '+time;
	const channel = member.guild.channels.cache.find(ch => ch.id === `${UserLog}`);
	const guild = member.guild
	if (!channel) return;

	const MemberLeaveEmbed = new Discord.MessageEmbed()
	.setColor('#ff0000')
	.setTitle('Member Leave')
	.addFields(
		{ name: 'Username', value: member.user.tag, inline: false },
		{ name: 'Account creation date', value: member.user.createdAt, inline: false },
		{ name: 'Server leave date', value: dateTime, inline: false },
		{ name: 'Server member count', value: `${guild.memberCount}`, inline: false },
	)
	.setTimestamp()
	channel.send(MemberLeaveEmbed)
});

//Check for direct messages

client.on('message', message => {
	return;
	if (message.author.bot) return;
	if (message.channel.type == "dm") {
		if (message.content.startsWith == prefix) return;
			message.channel.send('Sorry')
		
	}

})

client.on('message', message => {
if (message.author.bot)return;
if (message.channel.id != '689720949527937063')return;
if (message.attachments.size != '0'){
	message.react('❤️');
	message.react('👍');
}
})

client.on('message', message => {const profanity = require('./profanity.json');
	const blocked = profanity.filter(word => message.content.toLowerCase().includes(word));

	if (blocked.length > 0) {
	  console.log(`${message.author.tag} tried to use profanity.`);
	  message.delete()
	  message.reply('watch your language!')
    const reason = message.content
    fs.appendFileSync('./logs/' + message.author.id + '-warnings.log', 'Warning\nReason: Profanity (' + reason +')\n\n');
    fs.appendFileSync('./logs/' + message.author.id + '-modwarnings.log', 'Warning issued by AutomatedAppleModerator \nReason: Profanity (' + message.content +')\n\n');
message.author.send(`Hey <@${message.author.id}>, please watch your language next time. Punishment information was updated on your profile.`)
		.catch(console.error);
	}
})

//Login
client.login(token);;

client.on('messageDelete', async message => {
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	// Since we only have 1 audit log entry in this collection, we can simply grab the first one
	const deletionLog = fetchedLogs.entries.first();

	// Let's perform a sanity check here and make sure we got *something*
	if (!deletionLog) {  console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
	const DeletionEmbed = new Discord.MessageEmbed()
	.setColor('#ff0000')
	.setTitle('Message Deleted')
	.addFields(
		{ name: 'Message sent by', value: message.author.tag, inline: false },
		{ name: 'Deleted by', value: 'Unknown - Audit log not found.', inline: false },
		{ name: 'Sent in', value: message.channel.name, inline: false },
		{ name: 'Message', value: message.content, inline: false },
	)
	.setTimestamp()
	const channel = client.channels.cache.get(`${ModLog}`);
	channel.send(DeletionEmbed)}

	// We now grab the user object of the person who deleted the message
	// Let us also grab the target of this action to double check things
	const { executor, target } = deletionLog;


	// And now we can update our output with a bit more information
	// We will also run a check to make sure the log we got was for the same author's message
	if (target.id === message.author.id) {
		console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`)
		const DeletionEmbed = new Discord.MessageEmbed()
		.setColor('#ff0000')
		.setTitle('Message Deleted')
		.addFields(
			{ name: 'Message sent by', value: message.author.tag, inline: false },
			{ name: 'Deleted by', value: executor.tag, inline: false },
			{ name: 'Sent in', value: message.channel.name, inline: false },
			{ name: 'Message', value: message.content, inline: false },
		)
		.setTimestamp()
		const channel = client.channels.cache.get(`${ModLog}`);
		channel.send(DeletionEmbed)
		return;
	}	else {
		if (target.id === message.author.id) return;
		console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`)
		const DeletionEmbed = new Discord.MessageEmbed()
		.setColor('#ff0000')
		.setTitle('Message Deleted')
		.addFields(
			{ name: 'Message sent by', value: message.author.tag, inline: false },
			{ name: 'Deleted by', value: 'Unknown - Unable to find who deleted message. - May occur when the message author erases their own message', inline: false },
			{ name: 'Sent in', value: message.channel.name, inline: false },
			{ name: 'Message', value: message.content, inline: false },
		)
		.setTimestamp()
		const channel = client.channels.cache.get(`${ModLog}`);
		channel.send(DeletionEmbed)
		return;
	}
});

//message log
client.on('message', message => {
	if (message.channel.name == 'undefined')return;
	const fs = require('fs');
	fs.appendFileSync('./logs/allmessages.log', '\n\nMessage sent by ' +message.author.username + '('+message.author.id+') in '+message.channel.name+'('+message.channel.id+')'+'\n\n' + message.content);
	fs.appendFileSync('./logs/' + message.author.id + '-messages.log', '\n\nSent in '+message.channel.name+'('+message.channel.id+')'+'\n\n' + message.content);
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
	const channeldebug = client.channels.cache.get(`${DebugChannel}`);
	channeldebug.send(debugembed);


  }
} catch(err) {
  console.error(err)
}

})

client.on('messageUpdate', (oldMessage, newMessage) => {
	if (oldMessage.author.bot)return;
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	global.dateTime = date+' '+time;
	if (oldMessage === newMessage)return;
	const MessageEditEmbed = new Discord.MessageEmbed()
	.setColor('#eea515')
	.setTitle('Message Edit')
	.setDescription('A message edit was detected.')
	.addFields(
		{ name: 'Current date/time(PST): ', value: dateTime, inline: false },
		{ name: 'Channel sent: ', value: oldMessage.channel.name, inline: false },
		{ name: 'Message author', value: oldMessage.author.tag, inline: false },
		{ name: 'Old message', value: oldMessage, inline: false },
		{ name: 'Updated message', value: newMessage, inline: true },
		
	)
	.setTimestamp()
	const channel = client.channels.cache.get(`${ModLog}`);
	channel.send(MessageEditEmbed);

})