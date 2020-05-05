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
    const argarray = message.content.slice('.rolldicegame').trim().split(/ +/g);
    console.log(argarray[1])
    // Generate random number from 1-6 then multiply by the number of dice
    var number = Math.ceil(Math.random() * 6)
    var numbermul = Math.ceil(number * argarray[1])
    var numberApMod = Math.ceil(Math.random() * 6)
    var numberApModmul = Math.ceil(numberApMod * argarray[1] * 3)
    var numswitch = Math.ceil(Math.random() * 12)
    var divisor = Math.ceil(Math.random * 24)
    const filter = response => {
    console.log(response)
    }
    // The classic switcharoo
    function competition() {
      if (numswitch < 7) {
        var temp1 = numberApModmul
        var temp2 = numbermul
        var numbermul = temp1
        var numberApModmul = temp2
        if (divisor < 13){
          var numbermul = temp2
          andthewinneris()
        } else {
          var numbermul = Math.ceil(temp2/2)
          andthewinneris()
        }
      } else if (numswitch < 13){
        var temp1 = numberApModmul
        var temp2 = numbermul
        var numbermul = temp2
        var numberApModmul = temp1
        if (divisor < 13){
          var numbermul = temp2
          andthewinneris()
        } else {
          var numbermul = Math.ceil(temp2/2)
          andthewinneris()
        }
      }
    // If statements with the dice
    function andthewinneris() {
    if (numberApMod < numbermul) {
      // You win!
      respond('',`You rolled a ${numbermul}, <@${message.author.id}>.\nI rolled a ${numberApModmul}.\nYou win, congratulations <@${message.author.id}>!` , message.channel)
    } else if (numberApMod < numbermul) {
      // lol you lose
      respond('',`You rolled a ${numbermul}, <@${message.author.id}>.\nI rolled a ${numberApModmul}.\nYou lose, better luck next time <@${message.author.id}>!` , message.channel)
    }
  }
}
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
    }}