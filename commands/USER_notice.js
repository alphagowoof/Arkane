module.exports = {
  name: 'notice',
  aliases: ['none'],
  description: 'Sends a notice.',
  usage: '<notice number>',
  cooldown: 5,
  disable:false
  execute(message, args, client) {
    const Discord = require('discord.js');
    const fs = require('fs')
    const {prefix, token} = require('../config.json'); 
    const argarray = message.content.slice(prefix.length).trim().split(/ +/g);
    const rulenumber = argarray[1]
    var entry = rulenumber;
    var dict = require("../notice.json");
    var result = dict['Notice'+argarray[1]];
    if(`${result}` == 'undefined'){respond('', 'Please make sure you entered a valid notice number.',message.channel);return;}
            try {
              const RuleEmbed = new Discord.MessageEmbed()
              .setTitle('about Notice '+argarray[1])
              .setDescription(`${result}`)
              .setTimestamp()
              message.channel.send(RuleEmbed);
              return;
            }catch(error) {
              respond('Error', 'Something went wrong.\n'+error+`\nMessage:${Message}\nArgs: ${args}\n`, message.channel)
              errorlog(error)
              //your code broke (leave untouched in most cases)
            console.error('an error has occured', error);
            }
            
  }

}
