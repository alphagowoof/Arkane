module.exports = {
  name: 'trivia',
  aliases: ['factgame', 'triviagame'],
  description: 'Learn something new with Apple Mod.\n(Trivia will only include history of the Apple company, the Apple Explained channel and server for now.)\nTo answer a question, use .triviaanswer (question ID) (your answer in lowercase).',
  usage: '',
  cooldown: 0,
	execute(message, args, client) {
    const fs = require('fs');
    const Discord = require('discord.js')
    const msg = message
    try {
    //Initialize variables
    var qa = Math.ceil(Math.random() * 13)
    //Pick a question
    const quiz = require('./quiz.json');
    const item = quiz[Math.floor(Math.random() * quiz.length)];
    const filter = response => {
      console.log(response)
      return item.answer
    };
        message.channel.send(`<@${message.author.id}>'s question:\n` + item.question+ '\n' + item.choice1 + '\n' + item.choice2 +'\n' + item.choice3 + '\n' + item.choice4 + '\n' + "Question ID: " + item.qid + '\n' + "**use `.triviaanswer (question ID) (your answer in lowercase)` to answer the question**") 
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }
}