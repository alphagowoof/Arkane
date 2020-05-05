module.exports = {
  name: 'coingame',
  aliases: ['flipcoingame', 'flipgame', 'coinflipgame'],
  description: 'Guess the side of the coin with Apple Mod.',
  usage: '(heads/tails)',
  cooldown: 0,
	execute(message, args, client) {
    const Discord = require('discord.js');
    const fs = require('fs');
    const arg = message.content.slice('').trim().split(/ +/g); 
    if(arg = 'tails') {
      var side = 1
    } else if(arg = 'heads') {
      var side = 0
    }
    try {
    var number = Math.ceil(Math.random() * 10)
    var coinside = 0
    if (number > 5){
      var coinside = 'Heads'
      var coinside_asnumber = 0 
      showdown()
      return;
    }else{
      var coinside = 'Tails'
      var coinside_asnumber = 1
      showdown()
      return;
    }
    function showdown() {
      if (coinside_asnumber = side) {
        respond('','You guessed:' + arg[1] + '\nThe coin says' + coinside + '\n Congratulations, you got it right!' )
      } else {
        respond('','You guessed:' + arg[1] + '\nThe coin says' + coinside + '\n Sorry, you got it wrong, better luck next time!' )
      }
    }
}catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}