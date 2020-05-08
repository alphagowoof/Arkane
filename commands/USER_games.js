module.exports = {
    name: 'games',
    aliases: ['gamecenter', 'gamecentre'],
    description: 'Shows all game commands.',
    cooldown: 5,
      execute(message, args, client) {
      const Discord = require('discord.js');
      const fs = require('fs');
      try {
        respond('Game Center 🎮','**Welcome to the Game Center!**\nHere are some game commands you can use to play with Apple Moderator:\n.coingame\n.neverhaveiever\n.rolldicegame\n.slots\n.trivia', message.channel)
        message.delete()
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
    }}