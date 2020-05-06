module.exports = {
    name: 'slots',
    aliases: ['slotmachine', 'vegas'],
    description: 'Play on a slot machine like in Vegas.\n(No gambling included)',
    usage: '',
    cooldown: 0,
      execute(message, args, client) {
      const fs = require('fs');
      const Discord = require('discord.js')
      const msg = message
      try {
      const slot1 = require('./slots1.json')
      const slot2 = require('./slots2.json')
      const slot3 = require('./slots3.json')
      console.log("Slots json files loaded.")
      gen()
      function gen() {
        var rand1 = Math.ceil(Math.random() * 16)
        console.log("Slot 1 generated." + rand1)
        var rand2 = Math.ceil(Math.random() * 16)
        console.log("Slot 2 generated." + rand2)
        var rand3 = Math.ceil(Math.random() * 16)
        console.log("Slot 3 generated." + rand3)
        console.log("If you do not see emojis beside 'Slot converted', check code!")
        conversion()
        function conversion() {
            const {roll1} = slot1[rand1];
            console.log("Slot 1 converted. " + {roll1})
            const {roll2} = slot2[rand2];
            console.log("Slot 2 converted. " + {roll2})
            const {roll3} = slot3[rand3];
            console.log("Slot 3 converted. " + {roll3})
            vegas()
        }
        function vegas() {
            console.log("Checking if slot1 matches slot2...")
          if ({rand1} = {rand2}) {
            console.log("Match.")
            console.log("Checking if slot2 matches slot3...")
              if ({rand2} = {rand3}) {
                console.log("Match. Win.")
                respond('Slots', "<@" + message.author.id + ">'s slot game:\n" + roll1 + " " + roll2 + " " + roll3 + "\n" + "You win this one!\nThink carefully before you gamble in real life Vegas." , message.channel)
              } else {
                console.log("Mismatch. Lose.")
                respond('Slots', "<@" + message.author.id + ">'s slot game:\n" + roll1 + " " + roll2 + " " + roll3 + "\n" + "You lose this one.\nIf you want to gamble in Vegas, it's a bad idea for you." , message.channel)
              }
          } else
          console.log("Mismatch. Lose.")
          respond('Slots', "<@" + message.author.id + ">'s slot game:\n" + roll1 + " " + roll2 + " " + roll3 + "\n" + "You lose this one.\nIf you want to gamble in Vegas, it's a bad idea for you." , message.channel)
        }
    }
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
    }
  }