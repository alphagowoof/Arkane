module.exports = {
    name: 'rolldicegame',
    aliases: ['dicerollgame', 'dicegame', 'rollgame'],
    description: 'Play a dice game with Apple Mod.',
    usage: '(number of dice to be rolled) | rolldicegame 1',
    cooldown: 0,
      execute(message, args, client) {
      const fs = require('fs');
      try {
      // Get number of dice using arguments
      var diceno = args
      // Generate random number from 1-6 then multiply by the number of dice
      var number = Math.ceil(Math.random() * 6 * diceno)
      var numberApMod = Math.ceil(Math.random() * 6 * diceno)
      // If statements involving the dice
      const filter = response => {
      console.log(response)
      }
      if (numberApMod < number) {
        // You win!
        respond('',`You rolled a ${number}, <@${message.author.id}>.\nI rolled a ${numberApMod}.\nYou win, congratulations <@${message.author.id}>!` , message.channel)
      } else if (numberApMod < number) {
        // lol you lose
        respond('',`You rolled a ${number}, <@${message.author.id}>.\nI rolled a ${numberApMod}.\nYou lose, better luck next time <@${message.author.id}>!` , message.channel)
      }
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
    }}