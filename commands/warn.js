module.exports = {
  name: 'warn',
  aliases: ['punish'],
	description: 'Logs a warning.',
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    const userid = message.mentions.users.first().id
    let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
    const reason = reasonraw.join(' ')
    const authorusername = message.author.username
    fs.appendFileSync('./logs/' + userid + '-warnings.log', '\nWarning\: Issued by '+ authorusername +'\nReason\:' + reason);
    message.channel.send('<@'+message.mentions.users.first().id + '> had a warning logged.')
    const warnedperson = message.mentions.users.first().id
    message.channel.send('<@'+message.mentions.users.first().id + '> has been warned due to: '+ reason); 
  }}
    // fetch user via given user id
   // let user = client.fetchUser(warnedperson)
    //.then(user => {
        // once promise returns with user, send user a DM
    //    user.send('You have been warned due to: '+ reason); 
    //});
   // }