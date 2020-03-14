module.exports = {
  name: 'idmemberinfo',
  aliases: ['memberinfoid'],
  description: 'Gets info about ID number mentioned',
  usage: '<id>',
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    try{
    fs.readFile('./logs/'+args+'-modwarnings.log', (err, data) => {
      if (err) {
        console.error(err)
        const memberinfoembed = new Discord.MessageEmbed()
        .setColor('#0000ff')
        .setTitle('Member Information')
        .addFields(
          { name: 'Punishment log', value: 'No warning information found', inline: false },
          { name: 'Other information', value: 'Member ID: '+ args , inline: false },
        )
        .setTimestamp()
        .setFooter('Bot written by Daniel C');
        message.channel.send(memberinfoembed)

        return
      }
      const memberinfoembed = new Discord.MessageEmbed()
      .setColor('#0000ff')
      .setTitle('Member Information')
      .addFields(
        { name: 'Punishment log', value: data, inline: false },
        { name: 'Other information', value: 'Member ID: '+ args , inline: false },
      )
      .setTimestamp()
      .setFooter('Bot written by Daniel C');
      message.channel.send(memberinfoembed)
    }) 
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