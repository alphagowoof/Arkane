module.exports = {
  name: 'news',
  aliases: ['newsletter','changelog'],
  description: 'Shows new features and more about Apple Mod',
  usage: '',
  cooldown: 0,
  execute(message, args, client) {
    const fs = require('fs');
    try {
    if(fs.existsSync('./files/news.json')){
        data = []

        newsData = require('../files/news.json')
        if(newsData.visible == true){

        data.push(newsData.title)
        data.push(newsData.date)
        data.push(newsData.author)
        data.push("---------------------------------------------------------------------")
        data.push(newsData.content)
        data.join('\n')
        const newsEmbed = new Discord.MessageEmbed()
        .setColor('#0000ff')
        .setTitle('News')
        .setDescription(data)
        .setTimestamp()
        message.channel.send(newsEmbed)
        }else{
          const newsEmbed = new Discord.MessageEmbed()
          .setColor('#0000ff')
          .setTitle('News')
          .setDescription("No news available.")
          .setTimestamp()
          message.channel.send(newsEmbed)
        }
      }else{
        const newsEmbed = new Discord.MessageEmbed()
        .setColor('#0000ff')
        .setTitle('News')
        .setDescription("No news available.")
        .setTimestamp()
        message.channel.send(newsEmbed)
      }
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }

  }}