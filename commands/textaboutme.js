module.exports = {
  name: 'textaboutme',
  aliases: [''],
	description: 'Gets info about you',
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    message.author.send('Here is what I have on you.')
    const fs = require('fs');
    fs.readFile('./logs/' + message.author.id + '-warnings.log', 'utf8', function(err, contents) {
      // code using file data
      message.author.send('-Warning Log-\n\n' + contents)
  });
  message.author.send('Message log isn\'t available in text form.')
  }}