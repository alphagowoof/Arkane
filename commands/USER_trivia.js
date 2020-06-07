module.exports = {
  name: 'trivia',
  aliases: ['factgame', 'triviagame'],
  description: '**This is a game command.**\nLearn something new with Apple Mod.\n(Trivia will only include history of the Apple company, the Apple Explained channel, the server and its users for now.)\nTo answer a question, use .answer (question ID) (your answer).',
  usage: '',
  cooldown: 0,
  hidden: true,
	execute(message, args, client) {
    const fs = require('fs');
    const Discord = require('discord.js')
    const msg = message
    try {
    //Pick a question
    const quiz = require('./quiz.json');
    var randgen = Math.floor(Math.random() * quiz.length)
    if(randgen === 0) {
      var randgen = 69
    }
    const item = quiz[randgen];
    const ans = item.answer
    console.log(ans)
    const filter = response => {
      console.log(response)
      return item.answer
    }
    console.log(item)
        respond('Trivia',`<@${message.author.id}>'s question:\n` + item.question+ '\n' + item.choice1 + '\n' + item.choice2 +'\n' + item.choice3 + '\n' + item.choice4 + '\n' + "Question ID: " + item.qid + '\n' + `**use \`.answer (question ID) (your answer)\` to answer the question**\nExample: .answer 2 C`, message.channel) 
        fs.writeFile('./temp/'+message.author.id+'_current-trivia.json', JSON.stringify([{"qid":item.qid}]), error => {
          console.log(error)
          if(!error){
            console.log('Successfully written current QID to file.')
          }else{
            console.log('Failed to write current QID to file.')
          }
        })
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }
}