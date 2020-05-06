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
    const arg = message.content.slice('.rolldicegame').trim().split(/ +/g);
    console.log(arg[1])
    if (arg[1] > 0){
      initvar()
    }else {
      const arg = 1
      initvar()
    }
    // Initialize variables
    function initvar() {
    var number = 0
    var numbermul = 0
    var numberApMod = 0
    var numberApModmul = 0
    var numswitch = 0
    var divisor = 0
    var temp1 = 0
    var temp2 = 0
    console.log('Variables have been initialized. Generating dice roll values...')
    // Generate random number from 1-6 then multiply by the number of dice
    var number = Math.ceil(Math.random() * 6 * arg[1])
    console.log('Dice rolled.')
    console.log('Dice multiplied by argument.')
    var numberApMod = Math.ceil(Math.random() * 6 * arg[1])
    console.log('Apple Mod dice rolled.')
    console.log('Apple Mod dice multiplied by argument.')
    var numswitch = Math.ceil(Math.random() * 64)
    console.log('Switcharoo number generated.')
    var divisor = Math.ceil(Math.random * 48)
    console.log('Divisor generated.')
    console.log('If you are seeing this message and there is nothing beneath it, a shadow problem has occured. Check code!')
    competition()
    const filter = response => {
    }
  }
    // The classic switcharoo
    function competition() {
      if (numswitch < 33) {             // Switch = yes
        var temp1 = numberApMod
        var temp2 = number
        var numbermul = temp1
        var numberApModmul = temp2
        console.log(numbermul)
        console.log(numberApModmul)
        if (divisor < 25){             // Divide = no
          var numberApModmul = temp1
          andthewinneris()
        } else {                      // Divide = yes
          var numbermul = Math.ceil(numbermul/1.5)
          console.log(numbermul)
          console.log(numberApModmul)
          andthewinneris()
        }
      } else{      // Switch = no
        var temp1 = numberApMod
        var temp2 = number
        var numbermul = temp2
        var numberApModmul = temp1
        console.log(numbermul)
        console.log(numberApModmul)
        if (divisor < 25){            // Divide = no
          var numbermul = temp2
          console.log(numbermul)
          console.log(numberApModmul)
          andthewinneris()
        } else {                     // Divide = yes
          var numbermul = Math.ceil(numbermul/1.5)
          console.log(numbermul)
          console.log(numberApModmul)
          andthewinneris()
        }
      }
    // If statements with the dice
    function andthewinneris() {
      console.log("Never mind the message above, the code works!")
    if (numberApMod < numbermul) {
      // You win!
      respond('',`You rolled a ${numbermul}, <@${message.author.id}>.\nI rolled a ${numberApModmul}.\nYou win, congratulations <@${message.author.id}>!` , message.channel)
    } else {
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