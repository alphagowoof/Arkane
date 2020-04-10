module.exports = {
  name: 'show',
  aliases: ['showchannel', 'visible'],
  description: 'Shows the channel the command is ran in.',
  usage: '',
  cooldown: 0,
  mod:true,
	execute(message, args) {
	const channel = message.channel
    try {
		channel.updateOverwrite(channel.guild.roles.everyone, { VIEW_CHANNEL: true });
		respond('','<#'+message.channel.id+'> is no longer hidden.', message.channel)
		modaction(this.name, message.author.tag, message.channel.name, message.content)
	}
		catch(error) {
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
		  }
		  
  }}