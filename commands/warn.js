module.exports = {
  name: 'warn',
  aliases: ['punish'],
  description: 'Logs a warning.',
  usage: '<user> <reason>',
  cooldown: 0,
  mod:true,
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    try {
    const userid = message.mentions.users.first().id
    const mentionedmember = '<@'+message.mentions.users.first().id+'>'
    let reasonraw = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));
    const reason = reasonraw.join(' ')
    const authorusername = message.author.username +'#' +message.author.discriminator
    fs.appendFileSync('./logs/' + userid + '-warnings.log', 'Warning\nReason: ' + reason +'\n\n');
    fs.appendFileSync('./logs/' + userid + '-modwarnings.log', 'Warning issued by '+ authorusername +'\nReason: ' + reason +'\n\n');
    message.channel.send(mentionedmember + 'had a warning logged.')
    const warnedperson = message.mentions.users.first()
    const user = client.users.cache.get(warnedperson);
warnedperson.send('You have been warned due to: '+ reason);}catch(error) {
  // Your code broke (Leave untouched in most cases)
  const fs = require('fs');
  const Discord = require('discord.js');
  const { MessageEmbed } = require('discord.js')
  var today = new Date();
  var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  global.dateTime = date+' '+time;
  fs.appendFileSync('./debuglogs/'+sessionid+'-error.log','('+dateTime+')'+error+'\n\n');
  console.error('an error has occured', error);
  }
    
  }}