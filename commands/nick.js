module.exports = {
  name: 'nick',
  aliases: ['nickname'],
	description: 'Sets the bot nickname.',
	execute(message, args) {
    try {message.channel.send('This command is currently unavailable.')
    return;
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    const reason = args.join(' ')
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