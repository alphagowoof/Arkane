module.exports = {
  name: 'aboutbot',
  aliases: ['botinfo', 'infobot', 'botabout',],
  description: 'Gets information about bot.',
  usage: '',
  cooldown: 0,
	execute(message, args, client) {
    const fs = require('fs');
    try {
      const member = client.user
      const icon = member.displayAvatarURL({ dynamic: true })
      const name = client.user.username
      const AvatarEmbed = new Discord.MessageEmbed()
      .setTitle('About '+name )
      .addFields(
        { name: 'Version', value: version, inline: false },
        { name: 'Author', value: 'Daniel C (TechGeekGamer)', inline:false},
        { name: 'Source', value: 'https://github.com/TechGeekGamer/Apple-Explained-Moderation-Bot', inline: false },
        
			)
      .setThumbnail(`${icon}`)
      message.channel.send(AvatarEmbed)
    }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }
  }}