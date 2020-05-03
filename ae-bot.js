console.log('Loading, please wait a moment.')
global.fs = require('fs');
global.Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.modcommands = new Discord.Collection();
client.events = new Discord.Collection();
const { 
	prefix, 
	token, 
} = require('./config.json');
const { 
	nopermreply,
	BootSuccessful,
	WelcomeDmFileLocation,
 } = require('./strings.json');
const { 
	BotManagerRoleID,
	ModeratorRoleID,
	OwnerID, 
	MemberRoleID,
	UserLog, 
	ModLog, 
	BotLog,
	DebugChannel, 
	DebugFeaturesEnabled, 
	ProcessEndOnError, 
	AssignMemberRoleOnJoin, 
	CrashNotify,
	} = require('./info.json');
const {
	MessageEmbed
} = require('discord.js')
const cooldowns = new Discord.Collection();
global.version = '5.0.0'
global.footertext = 'Version '+version
global.errorcount = 0


//Checks for shutdown flag
if (fs.existsSync(`./shutdown.flag`)){
	console.log('`shutdown.flag` found. Exiting.')
	process.exit()
}else{}

//Checking ALL files
const allFiles = fs.readdirSync('./')
for (const foundfile of allFiles){
	console.log(foundfile + ' was found.')
}

//Loading commands part 1
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const modcommandFiles = fs.readdirSync('./commands').filter(modfile => modfile.endsWith('.js'));
//Loading commands part 2
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
		if(!command.mod){
			client.commands.set(command.name, command);
		}
}
for (const modfile of modcommandFiles) {
	const modcommand = require(`./commands/${modfile}`);
	console.log(`INFO: The command '${modcommand.name}' was loaded.`)
	client.modcommands.set(modcommand.name, modcommand);
}
//const events = require(`./events.js`);
//client.events.set(events)
//console.log('Events loaded.')


//Loading command part 3
client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
		message.channel.startTyping()
		const args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = client.modcommands.get(commandName)
			|| client.modcommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
//Not a command
		if (!command) {
			message.channel.stopTyping()
			return;
		}
actionlog(`Command init:  Name: \`${command.name}\`  Args: \`|${args}|\`  Launched in: \`${message.channel.name} (${message.channel.id})\``)

//Command disabled
if (command.disable == true) {
	respond('🛑 Command disabled',`<@${message.author.id}>, the command you are trying to run is disabled at the moment. Please try again later.`, message.channel) 
	message.channel.stopTyping()
	return;
}
//Bot Manager (over mod)
	if(command.botmanager == true && message.member.roles.cache.some(role => role.id === `${BotManagerRoleID}`)){
		command.execute(message, args, client);;
		message.channel.stopTyping()
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
		command.execute(message, args, client);
		message.channel.stopTyping()
		return;
	}

//Normal (with delay)
	try {
		setTimeout(function(){ 
			command.execute(message, args, client);
			message.channel.stopTyping()
		}, 1500);
	} catch (error) {
		console.error(error);
		respond('Error', 'Something went wrong.\n'+error, message.channel)
		message.channel.stopTyping()
	}

	
});

//Shot on iPhone reactions
client.on('message', message => {
	if (message.author.bot)return;
        if (message.channel.id != '616472674406760448')return;
        const content = message.content.toLowerCase();
        if (message.attachments.size != '0'){
          if (!content.includes(`iphone`)){respond('',`<@${message.author.id}>, please specify the iPhone used to shoot the picture.`, message.channel);message.delete();return;}else
          {
          message.react('❤️');
          message.react('👍');
        }}
})


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
		const modlogchannel = client.channels.cache.get(`${ModLog}`);
		modlogchannel.send(ModReportEmbed)
}
global.errorlog = function (error){
	global.errorcount = errorcount + 1
	const ErrorReportEmbed = new Discord.MessageEmbed()
		ErrorReportEmbed.setColor('#FF0000')
		ErrorReportEmbed.setTitle('Bot Error')
		ErrorReportEmbed.setDescription(`An error has occurred while the bot running.`)
		ErrorReportEmbed.addFields(
			{ name: 'Error information', value: `${error}`, inline: false },
		)
		ErrorReportEmbed.setTimestamp()
		const ErrorLog = client.channels.cache.get(`${BotLog}`);
		ErrorLog.send(ErrorReportEmbed)
}
global.actionlog = function(action){
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
	fs.appendFileSync('./bot.log',`${dateTime}\n${action}\n\n`);
}

//Bot ready
client.once('ready', () => {
	console.log('Version '+version)
	console.log('Cleaning bot log...')
	fs.writeFileSync('./bot.log','');
	console.log('Bot log cleaned.')
	console.log('Ready!');
	actionlog(`Startup: Bot started`)
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
		if (fs.existsSync(`./statusmessage.config`)){
			fs.readFile('./statusmessage.config', function(err, data){
				client.user.setActivity(data.toString(), { type: 'WATCHING' });
				if(err){errorlog(err)}
			})
			
		}
			
});

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

//Error
client.on('error', error => {
	console.error('ERROR: ', error);
	global.errorcount + 1
	const fs = require('fs');
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
	fs.appendFileSync('./debuglogs/error.log','('+dateTime+')'+error+'\n\n');
	fs.writeFileSync('./debuglogs/lasterror.txt',error);
	if (ProcessEndOnError == true){process.exit()}
});

//Member join
client.on('guildMemberAdd', member => {
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
		if (!fs.existsSync('./logs/user.log')) {
			fs.appendFileSync('./logs/user.log', `__USER LOG CREATED ${dateTime}__\n\n`)
		}
	fs.readFile('./logs/user.log', function(err, data){
		if(err){
			errorlog(err)
			console.error
		}
		
		const channel = member.guild.channels.cache.find(ch => ch.id === `${UserLog}`);
		const guild = member.guild
		const icon = member.user.displayAvatarURL()
		if (!channel) return;
			if(data.toString().includes(member.id)){
			const joinedbefore = 'True.'
			console.log(joinedbefore)
			welcomeEmbedUserLog(dateTime, channel, guild, icon, member, joinedbefore)
		}else{
			const joinedbefore = 'False.'
			console.log(joinedbefore)
			welcomeEmbedUserLog(dateTime, channel, guild, icon, member, joinedbefore)
		}
		
		fs.appendFileSync('./logs/user.log', `${member.user.tag} (${member.id}) joined at '${dateTime}'.\nAccount creation date: ${member.user.createdAt}\nCurrent guild user count: ${guild.memberCount}\n\n`)
		function welcomeEmbedUserLog(dateTime, channel, guild, icon, member, joinedbefore){
const MemberJoinEmbed = new Discord.MessageEmbed()
		.setColor('#00FF00')
		.setTitle('Member Join')
		.setThumbnail(`${icon}`)
		.addFields(
			{ name: 'Username', value: member.user.tag, inline: false },
			{ name: 'Member ID', value: member.id, inline: false },
			{ name: 'Account creation date', value: member.user.createdAt, inline: false },
			{ name: 'Joined before?', value: joinedbefore, inline: false },
			{ name: 'Server member count', value: `${guild.memberCount}`, inline: false },
		)
		.setTimestamp()
		channel.send(MemberJoinEmbed)
		}
		

		if(AssignMemberRoleOnJoin == true){
			const role = member.guild.roles.cache.find(role => role.id === `${MemberRoleID}`);
			member.roles.add(role);
		}
		fs.readFile('./logs/idbanlist.txt', function(err, data){
			if(err){
				console.log(err);
				errorlog(err)
				return;
			}
			if(data.toString().includes(member.id)){
				respond('Banned','You were banned from the Apple Explained server. (PREBAN)', member)
				respond('Banned',`${member.tag} was banned from the server. (PREBAN)`, guild.channels.cache.get(UserLog))
				member.ban({reason: 'Prebanned.'});
			}
		})
		fs.readFile('./files/welcomemessage.txt', function(err, data){
			const WelcomeEmbedDM = new Discord.MessageEmbed()
			WelcomeEmbedDM.setTitle('Welcome! 👋')
			if(err){
				WelcomeEmbedDM.setDescription('Welcome to '+member.guild.name+'!\n')
			}else{
				WelcomeEmbedDM.setDescription('Welcome to '+member.guild.name+'!\n'+data)
			}
			member.send(WelcomeEmbedDM)
		})
	})
});

//Member leave
client.on('guildMemberRemove', member => {
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
	const channel = member.guild.channels.cache.find(ch => ch.id === `${UserLog}`);
	const guild = member.guild
	const icon = member.user.displayAvatarURL({ dynamic: true })
	if (!channel) return;
	fs.appendFileSync('./logs/user.log', `${member.user.tag} (${member.id}) left at '${dateTime}'.\nAccount creation date: ${member.user.createdAt}\nCurrent guild user count: ${guild.memberCount}\n\n`)
	const MemberLeaveEmbed = new Discord.MessageEmbed()
	.setColor('#ff0000')
	.setTitle('Member Leave')
	.setThumbnail(`${icon}`)
	.addFields(
		{ name: 'Username', value: member.user.tag, inline: false },
		{ name: 'Member ID', value: member.user.id, inline: false },
		{ name: 'Account creation date', value: member.user.createdAt, inline: false },
		{ name: 'Server member count', value: `${guild.memberCount}`, inline: false },
	)
	.setTimestamp()
	channel.send(MemberLeaveEmbed)
});

//Profanity filter
client.on('message', message => {
	if(message.channel.type == 'dm')return;
	const profanity = require('./profanity.json');
	var blocked = profanity.filter(word => message.content.toLowerCase().includes(word));
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
	var dateTime = date+' '+time;
	if (blocked.length > 0) {
		if(blocked == `${blocked}`)
			console.log(`${message.author.tag} tried to use profanity. Logged word: ${blocked}`);
			message.delete()
			message.reply('please watch your language. A warning has been logged.')
    		const reason = message.content.replace(`${blocked}`, `**${blocked}**`)
	    	fs.appendFileSync('./logs/' + message.author.id + '-warnings.log', 'Warning\nReason: Profanity (' + reason +')\n\n');
    		fs.appendFileSync('./logs/' + message.author.id + '-modwarnings.log', 'Warning issued by AutomatedAppleModerator \nReason: Profanity (' + message.content +')\n\n');
			respond('Profanity Filter 🗣️',`Hey <@${message.author.id}>, please watch your language next time. Punishment information was updated on your profile.\nYour message: ${reason}`, message.author)
	}
})

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
	var dateTime = date+' '+time;
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
	var dateTime = date+' '+time;
	if (oldMessage === newMessage)return;
	var ref = "http://discordapp.com/channels/" + oldMessage.guild.id + "/" + oldMessage.channel.id + "/" + oldMessage.id;
	const MessageEditEmbed = new Discord.MessageEmbed()
	.setColor('#eea515')
	.setTitle('Message Edit')
	.setDescription('A message edit was detected.')
	.addFields(
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
		var dateTime = date+' '+time;
		const StartupEmbed = new Discord.MessageEmbed()
		.setColor('#ffa900')
		.setTitle('Bot Started - Issue Detected')
		.setDescription(`The bot loaded successfully, but restarted unexpectedly.`)
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
	var dateTime = date+' '+time;
	const StartupEmbed = new Discord.MessageEmbed()
		.setColor('#00FF00')
		.setTitle('Bot Started')
		.setDescription(`${BootSuccessful}`)
		.setTimestamp()
		.setFooter(footertext)
	global.modlog = client.channels.cache.get(`${BotLog}`);
	modlog.send(StartupEmbed);
	fs.writeFileSync('./runstate.txt', 'running')
	return;
})

//Hardcoded events

client.on('message', message => {
	return;
events.execute(message)	
})

function clean(text) {
	if (typeof(text) === "string")
	  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
  }
  client.on("message", message => {
	const args = message.content.split(" ").slice(1);
   
	if (message.content.startsWith(prefix + "eval")) {
	  if(message.author.id !== OwnerID){respond('❌ Bot Owner Command Only', 'This command can only be ran by the bot owner.', message.channel);return;}
	  try {
		const code = args.join(" ");
		let evaled = eval(code);
   
		if (typeof evaled !== "string")
		  evaled = require("util").inspect(evaled);
   
		respond('⌨️ Eval Command',clean(evaled), message.channel);
	  } catch (err) {
		respond('⌨️ Eval Command Error',`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``, message.channel);
	  }
	}
  });

//Login
client.login(token);