module.exports = {
    name: 'suggestquestion',
    aliases: ['triviaadd', 'addtrivia', 'addquestion', 'questionadd'],
    description: 'Suggests a question for the .trivia command. (Question only!)',
    usage: '(question)',
    cooldown: 180,
      execute(message, args, client) {
      const Discord = require('discord.js');
      const fs = require('fs');
      const argarray = message.content.slice().trim().split(/ +/g);
      const text = args.join(' ');
      try {
        if(text = undefined) {
          respond('No question found','Type a question after typing ' + argarray[0] + ".", message.channel)
        }
        respond('Suggestion sent!','Your question has been sent to the developer of .trivia and is now under review!', message.channel, '29BF00')
        respond('New question suggestion', 'A question have been sent for your review.\n' + text, message.guild.members.cache.get('454579681602043916'), 'FFFFFF')
        message.delete()
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
    }}