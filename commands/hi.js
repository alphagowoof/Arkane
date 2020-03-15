module.exports = {
  name: 'hi',
  aliases: ['hello'],
  description: 'Logs a warning.',
  usage: 'N/A',
  cooldown: 0,
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    try {const reason = args.join(' ')
    message.channel.send('Hello, <@'+ message.author.id+'>! :wave:');
  }catch(error) {
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