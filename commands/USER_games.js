module.exports = {
    name: 'games',
    aliases: ['gamecenter', 'gamecentre'],
    description: 'Shows all game commands.',
    cooldown: 5,
      execute(message, args, client) {
      const Discord = require('discord.js');
      const fs = require('fs');
      try {
        respond('Game Center 🎮',"**Welcome to the Game Center!**\nHere are some game commands you can use to play with Apple Moderator:\n**.cryptogram**\n**.neverhaveiever**\n**.rolldicegame**\n**.slots**\n**.trivia (broken currently)**\nIf you want to suggest questions/Never have I ever statements, use these:\n**.neverhaveieversuggest**\n**.suggestquestion**\nHave fun with Apple Mod!\nWith ❤️ from game creators: <@454579681602043916> and <@461560462991949863>.\nSupported by Tommy's IRL girlfriend <@707863465833791541>! Love you, Steph!", message.channel)
        message.delete()
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
    }}