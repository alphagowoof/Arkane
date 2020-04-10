global.fs = require('fs');
global.Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { nopermreply, BootSuccessful, WelcomeDmFileLocation } = require('./strings.json');
const { BotManagerRoleID , ModeratorRoleID , OwnerID, MemberRoleID , UserLog, ModLog, BotLog , DebugChannel, DebugFeaturesEnabled, ProcessEndOnError, AssignMemberRoleOnJoin, CrashNotify } = require('./info.json');
global.client = new Discord.Client();
client.commands = new Discord.Collection();
client.modcommands = new Discord.Collection();
client.allcommands = new Discord.Collection();
const { MessageEmbed } = require('discord.js')
const cooldowns = new Discord.Collection();
global.version = '3.0.1'
global.footertext = 'Version '+version

//Checking ALL files
const allFiles = fs.readdirSync('./')
for (const foundfile of allFiles){
	console.log(foundfile + ' was found.')
}

//Loading commands part 1
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const modcommandFiles = fs.readdirSync('./commands').filter(modfile => modfile.endsWith('.js'));
const allcommandFiles = fs.readdirSync('./commands').filter(allfile => allfile.endsWith('.js'));
//Loading commands part 2
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
		if(!command.mod){
			client.commands.set(command.name, command);
		}
}
for (const modfile of modcommandFiles) {
	const modcommand = require(`./commands/${modfile}`);
	client.modcommands.set(modcommand.name, modcommand);
}

for (const allfile of allcommandFiles) {
	const allcommand = require(`./commands/${allfile}`);
	client.allcommands.set(allcommand.name, allcommand);
	console.log(`ALL COMMAND: The command '${allcommand.name}' was loaded.`)
}

//Loading command part 3
client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	message.channel.startTyping()

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.allcommands.get(commandName)
		|| client.allcommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
//Not a command
		if (!command) {
		message.channel.stopTyping()
		return;
	}
//Command is unstable and not debug enabled
	if (command.debug && DebugFeaturesEnabled != true){
		message.reply('you are attempting to use a feature currently in testing and that could break the bot. If you would like to enable it, edit `DebugFeaturesEnabled` to `true` in the `info.json` file.')
		message.channel.stopTyping()
		message.react('❌')
		return;
	}
//Command is for bot managers (mods too in some cases)
	if(command.botmanager == true){
		command.execute(message, args);
		message.channel.stopTyping()
		return;
	}
//Command disabled
	if (command.disable === true) {
		message.reply('this command is currently disabled and not available. Please try again later or contact the bot owner if you believe this is a mistake.')
		message.channel.stopTyping()
		message.react('❌')
		return;
	}
//Mod command and no permission
	if (command.mod && !message.member.roles.cache.some(role => role.id === `${ModeratorRoleID}`)) {
		respond('🛑 Incorrect permissions',`<@${message.author.id}>, ${nopermreply}`, message.channel) 
		message.channel.stopTyping()
		message.react('❌')
		return;
	}

//Run right away
	if (command.nodelay == true){
		command.execute(message, args);
		message.channel.stopTyping()
		return;
	}

//Normal
	try {
		setTimeout(function(){ 
			command.execute(message, args);
			message.channel.stopTyping()
		}, 1500);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
		message.channel.stopTyping()
	}

	
});

global.respond = function (title, content, sendto, color){
	var RespondEmbed = new Discord.MessageEmbed()
		RespondEmbed.setTitle(title)
		RespondEmbed.setDescription(content)
		if(color){
			RespondEmbed.setColor(color)
		}
		sendto.send(RespondEmbed)
}
global.modaction = function (RanCommand, RanBy, RanIn, FullCommand){
	const ModReportEmbed = new Discord.MessageEmbed()
		ModReportEmbed.setColor('#F3ECEC')
		ModReportEmbed.setTitle('Mod Action')
		ModReportEmbed.setDescription(`A moderation action has occurred.`)
		ModReportEmbed.addFields(
			{ name: 'Command', value: `${RanCommand}`, inline: false },
			{ name: 'Executor', value: `${RanBy}`, inline: false },
			{ name: 'Channel', value: `${RanIn}`, inline: false },
			{name: 'Full message', value: `${FullCommand}`, inline:false}
		)
		ModReportEmbed.setTimestamp()
		ModReportEmbed
		const modlogchannel = client.channels.cache.get(`${ModLog}`);
		modlogchannel.send(ModReportEmbed)
}
global.erroralert = function (err, message){
	var ErrorEmbed = new Discord.MessageEmbed()
		ErrorEmbed.setTitle('Error')
		ErrorEmbed.setDescription('An error has occurred while the bot was running.\n\n'+errorinfo)
		ErrorEmbed.setColor('FF0000')
		const errorlog = client.channels.cache.get(`${BotLog}`);
		errorlog.send(ErrorEmbed)
}



//Bot ready
client.once('ready', () => {
	console.log('Ready!');
	console.log('Version '+version)
		const path = './runstate.txt'
		if (fs.existsSync(path) && CrashNotify == true) {
			client.emit("StartupIssue")
		}else
		if(fs.existsSync(path) && CrashNotify != true){
			client.emit('StartupPassed')
		}
		else{
		  client.emit('StartupPassed')
		}
			
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

//Error
client.on('error', error => {
	console.error('an error has occured', error);
	const fs = require('fs');
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	global.dateTime = date+' '+time;
	fs.appendFileSync('./debuglogs/error.log','('+dateTime+')'+error+'\n\n');
	fs.writeFileSync('./debuglogs/lasterror.txt',error);
	if (ProcessEndOnError === true){process.exit()}
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
	fs.appendFileSync('./logs/user.log', `${member.user.tag} (${member.id}) joined at '${dateTime}'.\nAccount creation date: ${member.user.createdAt}\nCurrent guild user count: ${guild.memberCount}\n\n`)
	const MemberJoinEmbed = new Discord.MessageEmbed()
	.setColor('#00FF00')
	.setTitle('Member Join')
	.addFields(
		{ name: 'Username', value: member.user.tag, inline: false },
		{ name: 'Member ID', value: member.id, inline: false },
		{ name: 'Account creation date', value: member.user.createdAt, inline: false },
		{ name: 'Server join date', value: dateTime, inline: false },
		{ name: 'Server member count', value: `${guild.memberCount}`, inline: false },
	)
	.setTimestamp()
	channel.send(MemberJoinEmbed)
	if(AssignMemberRoleOnJoin == true){
		const role = member.guild.roles.cache.find(role => role.id === `${MemberRoleID}`);
		member.roles.add(role);
	}
	fs.readFile('./files/welcomemessage.txt', function(err, data){
		messagetosend = data.toString()
		const WelcomeEmbedDM = new Discord.MessageEmbed()
		WelcomeEmbedDM.setTitle('Welcome! 👋')
		WelcomeEmbedDM.setDescription('Welcome to the '+member.guild.name+' server!\n'+messagetosend)
		member.send(WelcomeEmbedDM)
	})
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
	fs.appendFileSync('./logs/user.log', `${member.user.tag} (${member.id}) left at '${dateTime}'.\nAccount creation date: ${member.user.createdAt}\nCurrent guild user count: ${guild.memberCount}\n\n`)
	const MemberLeaveEmbed = new Discord.MessageEmbed()
	.setColor('#ff0000')
	.setTitle('Member Leave')
	.addFields(
		{ name: 'Username', value: member.user.tag, inline: false },
		{ name: 'Member ID', value: member.user.id, inline: false },
		{ name: 'Account creation date', value: member.user.createdAt, inline: false },
		{ name: 'Server leave date', value: dateTime, inline: false },
		{ name: 'Server member count', value: `${guild.memberCount}`, inline: false },
	)
	.setTimestamp()
	channel.send(MemberLeaveEmbed)
});

//#Shot on iPhone channel auto reaction
client.on('message', message => {
if (message.author.bot)return;
if (message.channel.id != '616472674406760448')return;
const content = message.content.toLowerCase();
if (message.attachments.size != '0'){
	if (!content.includes(`iphone`)){message.reply('please specify the iPhone used to shoot the picture.');message.delete();return;}else
	{
	message.react('❤️');
	message.react('👍');
}}
})

//@Moderator ping check
client.on('message', message => {
	return;//Unknown why it won't work
	if (message.content.includes == `<@&${ModeratorRoleID}>`){
	message.react('✅')
	const ModeratorsTagged = new Discord.MessageEmbed()
	.setColor('#df8149')
	.setTitle('Moderators contacted')
	.setDescription(`Hello <@${message.author.id}>, the moderators have now been contacted and they will be here as soon as possible. Please note tagging moderators without a good reason may result in a punishment.`)
	.setTimestamp()
	message.channel.send(ModeratorsTagged)
}
})

//Profanity filter
client.on('message', message => {
	if(message.channel.type == 'dm')return;
	if(message.author.bot)return;
	const profanity = require('./profanity.json');
	const blocked = profanity.filter(word => message.content.toLowerCase().includes(word));

	if (blocked.length > 0) {
		if(blocked == ` ${blocked} `);
		console.log(`${message.author.tag} tried to use profanity.`);
		message.delete()
	  	message.reply('watch your language!')
    	const reason = message.content
    	fs.appendFileSync('./logs/' + message.author.id + '-warnings.log', 'Warning\nReason: Profanity (' + reason +')\n\n');
    	fs.appendFileSync('./logs/' + message.author.id + '-modwarnings.log', 'Warning issued by AutomatedAppleModerator \nReason: Profanity (' + message.content +')\n\n');
		message.author.send(`Hey <@${message.author.id}>, please watch your language next time. Punishment information was updated on your profile.\nYour message: ${reason}`)
		.catch(console.error);
	}
})

//Login
client.login(token);;


//Log deleted messages
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
	if (message.channel.type == 'dm')return;
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	global.dateTime = date+' '+time;
	const fs = require('fs');
	fs.appendFileSync('./logs/allmessages.log', '\n\nMessage sent by ' +message.author.username + '('+message.author.id+') in '+message.channel.name+'('+message.channel.id+')'+'\n\n' + message.content);
	fs.appendFileSync('./logs/' + message.author.id + '-messages.log', '\n\nSent in '+message.channel.name+'('+message.channel.id+')'+'\n\n' + message.content);
	fs.appendFileSync('./logs/allmessages_'+date +'.log', '\n\nMessage sent by ' +message.author.username + '('+message.author.id+') in '+message.channel.name+'('+message.channel.id+')'+'\n\n' + message.content);
})

//Message edit
client.on('messageUpdate', (oldMessage, newMessage) => {
	if (oldMessage.author.bot)return;
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	global.dateTime = date+' '+time;
	if (oldMessage === newMessage)return;
	var ref = "http://discordapp.com/channels/" + oldMessage.guild.id + "/" + oldMessage.channel.id + "/" + oldMessage.id;
	const MessageEditEmbed = new Discord.MessageEmbed()
	.setColor('#eea515')
	.setTitle('Message Edit')
	.setDescription('A message edit was detected.')
	.addFields(
		{ name: 'Current date/time: ', value: dateTime, inline: false },
		{ name: 'Channel sent: ', value: oldMessage.channel.name, inline: false },
		{ name: 'Message author', value: oldMessage.author.tag, inline: false },
		{ name: 'Old message', value: oldMessage, inline: true },
		{ name: 'Updated message', value: newMessage, inline: true },
		{ name: 'Message link', value: `[Jump](${ref})`, inline: false },
		
	)
	.setTimestamp()
	const channel = client.channels.cache.get(`${ModLog}`);
	channel.send(MessageEditEmbed);

})

//Below are client emit actions
client.on("StartupIssue", () => {
	var today = new Date();
		var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		global.dateTime = date+' '+time;
		const StartupEmbed = new Discord.MessageEmbed()
		.setColor('#ffa900')
		.setTitle('Bot Started - Issue Detected')
		.setDescription(`The bot loaded successfully, but restarted unexpectedly.`)
		.addFields(
			{ name: 'Current date/time: ', value: dateTime, inline: true },
		)
		.setTimestamp()
		.setFooter(footertext)
		global.modlog = client.channels.cache.get(`${BotLog}`);
		modlog.send(StartupEmbed);
		return
})

client.on('StartupPassed', () => {
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	global.dateTime = date+' '+time;
	const StartupEmbed = new Discord.MessageEmbed()
	.setColor('#00FF00')
	.setTitle('Bot Started')
	.setDescription(`${BootSuccessful}`)
	.addFields(
		{ name: 'Current date/time: ', value: dateTime, inline: true },
	)
	.setTimestamp()
	.setFooter(footertext)
	global.modlog = client.channels.cache.get(`${BotLog}`);
	modlog.send(StartupEmbed);
	fs.writeFileSync('./runstate.txt', 'running')
	return;
})
