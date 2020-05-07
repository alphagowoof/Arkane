module.exports = {
    name: 'suggestquestion',
    aliases: ['triviaadd', 'addtrivia', 'addquestion', 'questionadd'],
    description: 'Suggests a question for the .trivia command. (Question only!)',
    usage: '(question)',
      execute(message, args, client) {
      const Discord = require('discord.js');
      const fs = require('fs');
      const argarray = message.content.slice().trim().split(/ +/g);
      const text = args.join(' ');
      try {
        respond('Suggestion sent!','Your question has been sent to the developer of .trivia and is now under review!', message.channel)
        respond('New question suggestion', 'A question has been sent for your review.\n' + text, message.guild.members.cache.get('454579681602043916'), 'FF000')
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
    }}