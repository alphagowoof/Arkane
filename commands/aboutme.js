module.exports = {
  name: 'aboutme',
  aliases: [''],
	description: 'Logs a warning.',
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
    const fs = require('fs');
    client.on('message', message => {
    message.channel.sendfile('./logs/' + message.author.id + '-warnings.log')
    message.author.send('Here is what I have on you.')
    })
    }}