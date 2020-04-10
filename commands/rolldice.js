module.exports = {
  name: 'rolldice',
  aliases: ['diceroll'],
  description: 'Rolls a dice.',
  usage: '',
  cooldown: 0,
	execute(message, args) {
    const fs = require('fs');
    try {
    var number = Math.ceil(Math.random() * 6)
    respond('',`You rolled a ${number}, <@${message.author.id}>.` , message.channel)
    //message.channel.send(`You rolled a ${number}, <@${message.author.id}>.`)
  }catch(error) {
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}