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
        message.author.send({
        message: ['','You have a new question suggestion pending.\nIf you approve, mention the user and say "Yes", then get the question choices from them.\nOtherwise, mention the user and say "No, sorry".' + text]
        })
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
    }}