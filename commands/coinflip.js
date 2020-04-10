module.exports = {
  name: 'coinflip',
  aliases: ['flipcoin'],
  description: 'Flips a coin.',
  usage: '',
  cooldown: 0,
	execute(message, args) {
    const Discord = require('discord.js');
    
    const fs = require('fs');
    try {
    var number = Math.ceil(Math.random() * 10)
    if (number > 5){
      respond('','Heads.',message.channel)
    return;
  }else {
    respond('','Tails.', message.channel)}
    return;
  }catch(error) {
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}