console.log('Loading, please wait a moment.')
fs = require('fs');
Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.modcommands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const { 
	prefix, 
	token, 
	BotManagerRoleID,
	ModeratorRoleID,
	OwnerID, 
	MemberRoleID,
	UserLog, 
	ModLog, 
	BotLog,
	ProcessEndOnError, 
	AssignMemberRoleOnJoin, 
	CrashNotify
} = require('./config.json');
const {
	MessageEmbed
} = require('discord.js')

version = '9.2.2'
//version = "Debug Mode"
codename = 'Medal of Honor'
footertext = 'Version '+ version +'\nCodename: '+ codename
errorcount = 0
var safemode = false

if (!fs.existsSync('./restrictions.json'))console.log('restrictions.json is missing.')
if (!fs.existsSync('./logs/userwarnings.json')){
	fs.writeFileSync('./logs/userwarnings.json', '{}')
}
if (!fs.existsSync('./logs/prebanlist.json')){
	fs.writeFileSync('./logs/prebanlist.json', '{}')
}
// Increase number of message listeners
require('events').EventEmitter.defaultMaxListeners = 20;
// Auto safe mode
if (fs.existsSync(`./errorcount.txt`)){
fs.readFile('./errorcount.txt', function(err, data){
	if (fs.existsSync(`./safe_mode.flag`)){
		console.log('WARNING: SAFE MODE ACTIVE')
	}
	console.log(err)
	console.log(data)
	console.log(Number(data.toString().replace('<', '').replace('>', '').replace('Buffer', '')))
	if(err){return}else{
		if(data)
		if(data > 3){
			var safemode = true
			fs.writeFileSync('./safe_mode.flag', (error) => {
				if(error)console.log(error)
			});
			console.log('WARNING: SAFE MODE ACTIVE')
		}
	}
})
}
// Auto sentry mode
if (fs.existsSync(`./sentry_mode.flag`)){
	var sentrymode = true
}
//Bot ready
client.once('ready', () => {
	console.log('Version '+version)
	console.log('Codename '+codename)
	console.log('Ready!');
	if (fs.existsSync(`./errorcount.txt`)){
		fs.readFile('./errorcount.txt', function(err, data){
			if(err){return}else{
				if(data)
				if (fs.existsSync(`./safe_mode.flag`)){
					safemode = true
					console.log('Safe mode found')
			var titleofstartup = 'Bot Started - Safe Mode Activated'
			var descriptionofstartup = 'The bot was unable to start normally multiple times, so it entered safe mode. To deactivate safe mode, restart using the restart command, delete these files (`errorcount.txt`, `safe_mode.flag`, `runstate.txt`), or use the exitsafemode command.'
			const StartupEmbed = new Discord.MessageEmbed()
			.setColor('#ff0000')
			.setTitle(titleofstartup)
			.setDescription(descriptionofstartup)
			.setTimestamp()
			.setFooter(footertext)
			modlog = client.channels.cache.get(`${BotLog}`);
			modlog.send(StartupEmbed);
			return;
				}
			}
		})
		}
	if (fs.existsSync(`./sentry_mode.flag`) && safemode != true){
		fs.readFile('./sentry_mode.flag', function(err, data){
			if(err){return}else{
				if(data)
				if (fs.existsSync(`./sentry_mode.flag`)){
					safemode = true
					console.log('Sentry mode found')
			var titleofstartup = 'Sentry Mode Activated'
			var descriptionofstartup = 'Bot has booted into Sentry Mode. The bot will be the moderator for you.'
			const StartupEmbed = new Discord.MessageEmbed()
			.setColor('29BF00')
			.setTitle(titleofstartup)
			.setDescription(descriptionofstartup)
			.setTimestamp()
			.setFooter("\nSentry Mode by [thomas swim]")
			modlog = client.channels.cache.get(`${BotLog}`);
			modlog.send(StartupEmbed);
			return;
				}
			}
		})
	}
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

//Checks for shutdown flag
if (fs.existsSync(`./shutdown.flag`)){
	console.log('`shutdown.flag` found. Exiting.')
	process.exit()
}else{}

//Checks for old configs and informs that it needs to be changed
if (fs.existsSync(`./info.json`)){
	console.log('WARNING: `info.json` found. Please move entries to `config.json`. Exiting.')
	process.exit()
}else{}
if (fs.existsSync(`./strings.json`)){
	console.log('NOTICE: `strings.json` found. This file is no longer used and may be deleted.')
}else{}

 respond = function (title, content, sendto, color, footer, imageurl){
	 //Title, Content, Where to send, Embed color, Footer, Image URL
	var RespondEmbed = new Discord.MessageEmbed()
		RespondEmbed.setTitle(title)
		RespondEmbed.setDescription(content)
		if(!sendto || sendto == ''){
			throw 'Missing Arguments.'
		}else{
			if(color && !color == ''){
			RespondEmbed.setColor(color)
		}
		if(footer && !footer == ''){
			RespondEmbed.setFooter(footer)
		}
		if(imageurl && !imageurl == ''){
			RespondEmbed.setImage(imageurl)
		}
		sendto.send(RespondEmbed)
		}
		
}
 modaction = function (RanCommand, RanBy, RanIn, FullCommand){
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
 errorlog = function (error){
	errorcount = errorcount + 1
	const ErrorReportEmbed = new Discord.MessageEmbed()
		ErrorReportEmbed.setColor('#FF0000')
		ErrorReportEmbed.setTitle('Bot Error')
		ErrorReportEmbed.setDescription(`An error has occurred while the bot was running.`)
		ErrorReportEmbed.addFields(
			{ name: 'Error information', value: `${error}`, inline: false },
		)
		ErrorReportEmbed.setTimestamp()
		const ErrorLog = client.channels.cache.get(`${BotLog}`);
		ErrorLog.send(ErrorReportEmbed)
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const allCommandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
		if(!command.mod && !safemode ==true){
			client.commands.set(command.name, command);
		}
}
for (const file of allCommandFiles) {
	const modcommand = require(`./commands/${file}`);
	if(safemode == true && modcommand.essential == true){
		client.modcommands.set(modcommand.name, modcommand);
	}else{
		if(!safemode == true){
			client.modcommands.set(modcommand.name, modcommand);
		}
	}
	
}

//Command list
getCommandList = function(modCheck, botManagerCheck, userID, showMemberCommands){
	const findCommandListUser = fs.readdirSync('./commands').filter(file => file.startsWith('USER_'));
	const findCommandListMod = fs.readdirSync('./commands').filter(file => file.startsWith('MOD_'));
	const findCommandListBotManager = fs.readdirSync('./commands').filter(file => file.startsWith('BOTMANAGER_'));
	const commandListUser = [];
	const commandListMod = [];
	const commandListBotManager = [];
	var commandList = []
	var restrictions = require('./restrictions.json')
	var commandEssential = restrictions[2];
	for (const file of findCommandListUser) {
		const command = require(`./commands/${file}`);
		commandListUser.join(' ')
		if(!command.hidden == true || safemode ==true){
			if(safemode == true && commandEssential && commandEssential[command.name] == true){
				commandListUser.push(command.name)
				console.log(command.name)	
			}else{
				if(!safemode == true){
				commandListUser.push(command.name)
				console.log(command.name)
				}	
			}
		}
		
	}
	if(modCheck == true){
		for (const file of findCommandListMod) {
		const command = require(`./commands/${file}`);
		if(!command.hidden == true || safemode ==true){
			if(safemode == true && commandEssential && commandEssential[command.name] == true){
				commandListMod.push(command.name)
				console.log(command.name)
			}else{
				if(!safemode == true){
				commandListMod.push(command.name)
				console.log(command.name)
				}
			}
		}
	}
}
	
	if(botManagerCheck == true){
	for (const file of findCommandListBotManager) {
		const command = require(`./commands/${file}`);
		commandListBotManager.join(' ')
		if(!command.hidden == true || safemode ==true){
			if(safemode == true && commandEssential && commandEssential[command.name] == true){
				commandListBotManager.push(command.name)
				console.log(command.name)
			}else{
				if(!safemode == true){
					commandListBotManager.push(command.name)
					console.log(command.name)
				}
			}
		}	
	}
}
	
	//Not the best way, but will work on later
	usercommandstring = ['__**    User    **__']
	modcommandstring = ['__**    Mod    **__']
	botmanagercommandstring = ['__**    Bot Manager    **__']
	if(!showMemberCommands == false){
		commandList.push(usercommandstring)
		commandList.push(commandListUser)
	}
	
	if(modCheck == true){
	commandList.push(modcommandstring)
	commandList.push(commandListMod)
	}
	if(botManagerCheck == true){
		commandList.push(botmanagercommandstring)
		commandList.push(commandListBotManager)
	}
	const newcommandlist = commandList.toString().replace(/,/g, '\n')
	return newcommandlist
}



//Shot on iPhone reactions
client.on('message', message => {
	if(safemode == true)return;
	if (message.author.bot)return;
        if (message.channel.id != '616472674406760448')return; //This locks it to the Apple Explained server
        const content = message.content.toLowerCase();
        if (message.attachments.size != '0'){
          if (!content.includes(`iphone`)){respond('',`<@${message.author.id}>, please specify the iPhone used to shoot the picture.`, message.channel);message.delete();return;}else
          {
          message.react('❤️');
          message.react('👍');
        }}
})

//AI Modules
client.on('message', message => {
	if (fs.existsSync('./aiModule.js' && !fs.existsSync('./safe_mode.flag'))){
		const aiModule = require('./aiModule.js')
	}
	if(!safemode == true)
	if (fs.existsSync('./aiModule.js'))

	function returnFunction(result){
		message.channel.send(result)
	}

	function returnFunctionRandomizer(result){
		message.channel.send(result)
	}

	if(message.content.startsWith(`<@${client.user.id}>`) && !message.author.bot){
		const aiModule = require('./aiModule.js')
		const text = message.content.slice(`<@${client.user.id}>`.length+1).toLowerCase()
		aiModule.execute(text, message.author, returnFunction)
	}else if(message.content.startsWith(`<@!${client.user.id}>`) && !message.author.bot){
		const aiModule = require('./aiModule.js')
		const text = message.content.slice(`<@!${client.user.id}>`.length+1).toLowerCase()
		aiModule.execute(text, message.author, returnFunction)
	}
})


//Commands
client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
		const args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = client.modcommands.get(commandName)
			|| client.modcommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		var restrictions = require('./restrictions.json');
		var channelRestrictions = restrictions[0];
		var commandDisabled = restrictions[1];
		var commandEssential = restrictions[2];


	if(!command){
		return;
	}
	
	if(safemode == true && commandEssential && !commandEssential[command.name] == true){
		if(!command.name.includes('help')){
			return;
		}
	}	
	//Command disabled
	if (commandDisabled[command.name] == true) {
		respond('🛑 Command disabled',`<@${message.author.id}>, the command you are trying to run is disabled at the moment. Please try again later.`, message.channel)
		return;
	}
	//Bot Manager (over mod)
	if(command.botmanager == true && message.member.roles.cache.some(role => role.id === `${BotManagerRoleID}`)){
		command.execute(message, args, client);
		return;
	}
	//Mod command and no permission
		if (command.mod && !message.member.roles.cache.some(role => role.id === `${ModeratorRoleID}`)) {
			respond('🛑 Incorrect permissions',`<@${message.author.id}>, you don't seem to have the correct permissions to use this command or you can't run this command in this channel. Please try again later.`, message.channel) 		
			return;
	}
	//Channel not allowed
		if (channelRestrictions[command.name] && !channelRestrictions[command.name].includes(message.channel.id)) {
			respond('🛑 Incorrect permissions',`<@${message.author.id}>, you don't seem to have the correct permissions to use this command or you can't run this command in this channel. Please try again later.`, message.channel) 
			return;
		}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 0) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			respond('⏲️',`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`, message.channel);
			return;
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


	//Normal
	try {
		command.execute(message, args, client, this);
	} catch (error) {
		console.error(error);
		respond('Error', 'Something went wrong.\n'+error, message.channel)
		
	}

	
});







process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection: ', error));

//Error
client.on('error', error => {
	if(safemode == true){
		console.log(error)
		return;
	}
	console.error('ERROR: ', error);
	errorcount + 1
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
	if(safemode == true)return;
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
	})
			const guild = member.guild
			if (fs.existsSync('./logs/prebanlist.json')){
			prebanList = require('./logs/prebanlist.json')
			
			if(prebanList[member.id]){
				respond('Banned',`You were banned from the Apple Explained server. (PREBAN)\n\nReason: ${prebanList[member.id]}`, member)
				respond('Banned',`${member.user.tag} was banned from the server. (PREBAN)\nReason: ${prebanList[member.id]}`, guild.channels.cache.get(UserLog))
				modaction('ban', client.user.tag, 'Automatic preban.', `Automatic preban. Reason: ${prebanList[member.id]}`)
				member.ban({reason: `Prebanned. Reason: ${prebanList[member.id]}`});
			}
			delete require.cache[require.resolve(`./logs/prebanlist.json`)]
		}
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
		if(AssignMemberRoleOnJoin == true){
			const role = member.guild.roles.cache.find(role => role.id === `${MemberRoleID}`);
			member.roles.add(role);
		}
	});

//Member leave
client.on('guildMemberRemove', member => {
	if(safemode == true)return;
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
	if(safemode == true)return;
	if(message.channel.type == 'dm')return;
	const profanity = require('./profanity.json');
	var editedMessage = message.toString().replace(/[^\w\s]/g, "").replace(/\_/g, "")
	var blocked = profanity.filter(word => editedMessage.toLowerCase().includes(word));
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
	var dateTime = date+' '+time;
	if (blocked.length > 0) {
		if(blocked == `${blocked}`)
			console.log(`${message.author.tag} tried to use profanity. Logged word: ${blocked}`);
			message.delete()
			respond('',`<@${message.author.id}>, watch your language. A warning has been logged.`, message.channel, 'FF0000')
			const reason = message.content.replace(`${blocked}`, `**${blocked}**`)
			
			userwarnings = require('./logs/userwarnings.json')

			if (!userwarnings[message.author.id])
				userwarnings[message.author.id] = [];

			userwarnings[message.author.id].push(`Profanity: ${reason}`);

		fs.writeFile('./logs/userwarnings.json', JSON.stringify(userwarnings), (err) => {
			if (err) {
			  console.log(err);
			  respond('',`An error occured during saving.`, message.channel);
			  return;
			}
		})

			respond('Profanity Filter 🗣️',`Hey <@${message.author.id}>, please watch your language next time. Punishment information was updated on your profile.\nYour message: ${reason}`, message.author)
	}
})

//Log deleted messages
client.on('messageDelete', async message => {
	if(safemode == true)return;
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

//Member update
client.on('guildMemberUpdate', ( oldmember, newmember) => { 
	if(oldmember.bot)return

	let oldNickname = oldmember ? oldmember.displayName : null;
	let newNickname = newmember ? newmember.displayName : null;

	const memberUpdateEmbed = new Discord.MessageEmbed()
	memberUpdateEmbed.setAuthor(`${newmember.user.tag}`, `${newmember.user.displayAvatarURL()}`)
	if(oldmember.roles.cache.array().toString() != newmember.roles.cache.array().toString()){
		memberUpdateEmbed.addField('Role Update',`Old roles: ${oldmember.roles.cache.array().toString()}\nUpdated roles: ${newmember.roles.cache.array().toString()}`, false)
	}
	if(oldNickname != newNickname ){
		memberUpdateEmbed.addField('Nickname Update',`Old nickname: ${oldNickname}\nUpdated nickname: ${newNickname}`, false)
	}
	if(newmember.user.displayAvatarURL() != oldmember.user.displayAvatarURL()){
		memberUpdateEmbed.addField('Icon Update',`Old icon: ${oldmember.user.displayAvatarURL()}\nUpdated icon: ${newmember.user.displayAvatarURL()}`, false)
	}

	const channel = client.channels.cache.get(`${ModLog}`);
	channel.send(memberUpdateEmbed)
    
}) 

//message log
client.on('message', message => {
	if(safemode == true)return;
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
	if(safemode == true)return;
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
	const profanity = require('./profanity.json');
	var editedMessage = newMessage.toString().replace(/[^\w\s]/g, "").replace(/\_/g, "")
	var blocked = profanity.filter(word => editedMessage.toLowerCase().includes(word));
	if (blocked.length > 0) {
		if(blocked == `${blocked}`)
			oldMessage.delete()
			respond('',`<@${oldMessage.author.id}>, please don't edit your message to bypass the profanity filter. A warning has been logged.`, oldMessage.channel, 'FF0000')
			const reason = newMessage.toString().toLowerCase().replace(`${blocked}`, `**${blocked}**`)
			
			userwarnings = require('./logs/userwarnings.json')

			if (!userwarnings[oldMessage.author.id])
				userwarnings[oldMessage.author.id] = [];

			userwarnings[oldMessage.author.id].push(`Profanity (Message Edit): ${reason}`);

		fs.writeFile('./logs/userwarnings.json', JSON.stringify(userwarnings), (err) => {
			if (err) {
			  console.log(err);
			  respond('',`An error occured during saving.`, oldMessage.channel);
			  return;
			}
		})

			respond('Profanity Filter 🗣️',`Hey <@${oldMessage.author.id}>, please don't edit your message to bypass the profanity filter. Punishment information has been updated on your profile.\nYour message: ${reason}`, oldMessage.author)
	}
})

//Below are client emit actions
client.on("StartupIssue", () => {
	var today = new Date();
	fs.readFile('./errorcount.txt', function(err, data){
		if(err){
			fs.writeFileSync('./errorcount.txt',0+1);
		}else{
			fs.writeFileSync('./errorcount.txt',Number(data)+1);
		}
	})
	var titleofstartup = 'Bot Started - Issue Detected'
	var descriptionofstartup = 'The bot loaded successfully, but restarted unexpectedly.'
	if(safemode == true){
		var titleofstartup = 'Bot Started - Safe Mode'
		var descriptionofstartup = 'The bot was unable to start normally multiple times, so it entered safe mode.'
	}

		var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+' '+time;
		const StartupEmbed = new Discord.MessageEmbed()
		.setColor('#ffa900')
		.setTitle(titleofstartup)
		.setDescription(descriptionofstartup)
		.setTimestamp()
		.setFooter(footertext)
		modlog = client.channels.cache.get(`${BotLog}`);
		modlog.send(StartupEmbed);

		return
})

client.on('StartupPassed', () => {
	if (fs.existsSync('./errorcount.txt')){
		fs.unlinkSync(`./errorcount.txt`)
	}
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
	const StartupEmbed = new Discord.MessageEmbed()
		.setColor('#00FF00')
		.setTitle('Bot Started')
		.setDescription(`Bot has started successfully.`)
		.setTimestamp()
		.setFooter(footertext)
	modlog = client.channels.cache.get(`${BotLog}`);
	modlog.send(StartupEmbed);
	fs.writeFileSync('./runstate.txt', 'running')
	return;
})

//Hardcoded events


function clean(text) {
	if (typeof(text) === "string")
	  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
  }
  client.on("message", message => {
	const args = message.content.split(" ").slice(1);
   
	if (message.content.startsWith(prefix + "eval")) {
		if(safemode == true){
			respond('', `❌ This command is not available while in safe mode.`, message.channel)
			return
		}
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

		//This code here
	   
		if (message.content.startsWith(prefix + "safemode",)) {
			if(!message.member.roles.cache.some(role => role.id == BotManagerRoleID)){respond('❌ Bot Manager Command Only', 'This command can only be ran by the dev team.', message.channel);return;}
			try {
				safemode = true
				fs.writeFileSync('./safe_mode.flag', (error) => {
					if(error)console.log(error)
				});
				console.log('WARNING: SAFE MODE ACTIVE')
				respond('Safe Mode', '✅ Successfully switched to Safe Mode.', message.channel)
				return;
			  } catch (error) {
					respond('Error', `${error}`, message.channel)
			  errorlog(error)
			  // Your code broke (Leave untouched in most cases)
			  console.error('an error has occured', error);
			  }}}
  );
client.on('message',message =>{
	if (message.content.startsWith(prefix + "entersafemode",)) {
		if(!message.member.roles.cache.some(role => role.id == BotManagerRoleID)){respond('❌ Bot Manager Command Only', 'This command can only be ran by the dev team.', message.channel);return;}
		try {
			safemode = true
			fs.writeFileSync('./safe_mode.flag', (error) => {
				if(error)console.log(error)
			});
			console.log('WARNING: SAFE MODE ACTIVE')
			respond('Safe Mode', '✅ Successfully switched to Safe Mode.', message.channel)
			return;
		  } catch (error) {
				respond('Error', `${error}`, message.channel)
		  errorlog(error)
		  // Your code broke (Leave untouched in most cases)
		  console.error('an error has occured', error);
		  }}
});
  client.on('message',message => { 
  if (message.content.startsWith(prefix + "exitsafemode")) {
	if(!message.member.roles.cache.some(role => role.id == BotManagerRoleID)){respond('❌ Bot Manager Command Only', 'This command can only be ran by the dev team.', message.channel);return;}
	try {
		safemode = false
		fs.readFile('./safe_mode.flag', (error) => {
			if(!error) {
			fs.unlinkSync('./safe_mode.flag', (error) => {
				if(error)console.log(error)
			});
			console.log('WARNING: SAFE MODE ACTIVE')
			respond('Safe Mode', '✅ Successfully deactivated Safe mode.', message.channel)
		}
		    else {
				respond('Safe Mode', 'Safe Mode has already been deactivated!', message.channel)
			}
		})

	  } catch (error) {
			respond('Error', `${error}`, message.channel)
	  errorlog(error)
	  // Your code broke (Leave untouched in most cases)
	  console.error('an error has occured', error);
	  }}})

// Sentry mode
	client.on('message',message => { 
		if (message.content.startsWith(prefix + "entersentrymode")) {
			if(!message.member.roles.cache.some(role => role.id == ModeratorRoleID)){
				respond('❌ Moderator/Bot Owner Command Only', 'This command can only be ran by the moderator team.', message.channel);
				return;
			}
			try {
				sentrymode = true
				fs.writeFileSync('./sentry_mode.flag', (error) => {
					if(error)console.log(error)
				});
				console.log('Sentry mode is active.')
				respond('<:sus:662817457425219614> Sentry Mode', '✅ Successfully activated Sentry Mode.\nThe mods may not be here, but I\'ll be watching you... <:sus:662817457425219614>', message.channel)
			} catch (error) {
					respond('Error', `${error}`, message.channel)
			errorlog(error)
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
			}}})

// Sentry mode off
	client.on('message',message => { 
		if (message.content.startsWith(prefix + "exitsentrymode")) {
			if(!message.member.roles.cache.some(role => role.id == ModeratorRoleID)){
				respond('❌ Moderator/Bot Owner Command Only', 'This command can only be ran by the moderator team.', message.channel);
				return;
			}
			try {
				sentrymode = false
				fs.unlinkSync('./sentry_mode.flag', (error) => {
					if(error)console.log(error)
				});
				console.log('Sentry mode is active.')
				respond('👀 Sentry Mode', '✅ Successfully deactivated Sentry Mode.\nHello, moderators! I\'ve stood guard while you\'re out! 👀', message.channel)
			} catch (error) {
					respond('Error', `${error}`, message.channel)
			errorlog(error)
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
			}}})
//Login
client.login(token);