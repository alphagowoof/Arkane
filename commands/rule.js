module.exports = {
  name: 'rule',
  aliases: ['sendrule'],
  description: 'Sends a rule.',
  usage: '<rule number>',
  cooldown: 0,
  disable:true,
	execute(message, args) {
    const Discord = require('discord.js');
    const client = new Discord.Client();
	const fs = require('fs');

	//loading rules
	//const {Rule1, Rule2, Rule3, Rule4, Rule5, Rule6, Rule7, Rule8, Rule9, Rule10} = require('../rules.json')
	const rulenumber = args.join(' ')
	fs.readFile('../files/rules/rule'+rulenumber, (err, data) => {
		const ruledata = data
	try {
		 if (ruledata == 'undefined')return;
		const RuleEmbed = new Discord.MessageEmbed()
		.setTitle('About Rule')
		.addFields(
		  { name: 'Rule', value: `${ruledata}`, inline: false },
			  )
		.setTimestamp()
		message.channel.send(RuleEmbed);
		return;
	}catch(error) {
			// Your code broke (Leave untouched in most cases)
			console.error('an error has occured', error);
		  }
		})
		  
  }}