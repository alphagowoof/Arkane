module.exports = {
  name: 'ping',
  aliases: ['ping'],
  description: 'Pings. What else would it do? :joy:',
  usage: '',
  cooldown: 0,
	execute(message, args) {
    try{
    message.channel.send('Pinging...').then(sent => {
      sent.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`).then(results => results.delete()).then(results => {
        const result = results
        respond('', `Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`, message.channel)
      })
  })
  }catch(error) {
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
  }}
}