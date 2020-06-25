module.exports = {
	name: 'removerestrict',
	description: 'Removes restriction of a user.',
	aliases: ['free'],
	usage: '<user> <1/2/3/4>',
	cooldown: 0,
	mod:true,
	essential:true,
	execute(message, args, client) {
		try{
        mentionedUser = message.mentions.members.first()
        if(!mentionedUser){
            respond('', 'User mention was not found.', message.channel)
            return;
        }
        const {ModeratorRoleID} = require('../config.json');
		function restrictLevel1(){
            const rolename = 'Restricted (Level 1)'
            const role = message.guild.roles.cache.find(role => role.name === rolename);
            const member = message.mentions.members.first();
            if (message.author.id == message.mentions.members.first().id){respond('',`You can't perform this action on yourself.`, message.channel);return;}
            const checkmemberforroles = message.mentions.members.first()
            if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
            member.roles.remove([role])
                respond('🚫 Remove Restrict',`Removed ${member}'s restrictions.`,message.channel)
                modaction('removerestrict', message.author.tag, message.channel.name, message.content, message)
                return
		}
		function restrictLevel2(){
            const rolename = 'Restricted (Level 2)'
            const role = message.guild.roles.cache.find(role => role.name === rolename);
            const member = message.mentions.members.first();
            if (message.author.id == message.mentions.members.first().id){respond('',`You can't perform this action on yourself.`, message.channel);return;}
            const checkmemberforroles = message.mentions.members.first()
            if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
            member.roles.remove([role])
                respond('🚫 Remove Restrict',`Removed ${member}'s restrictions.`,message.channel)
                modaction('removerestrict', message.author.tag, message.channel.name, message.content, message)
                return
		}
		function restrictLevel3(){
            const rolename = 'Restricted (Level 3)'
            const role = message.guild.roles.cache.find(role => role.name === rolename);
            const member = message.mentions.members.first();
            if (message.author.id == message.mentions.members.first().id){respond('',`You can't perform this action on yourself.`, message.channel);return;}
            const checkmemberforroles = message.mentions.members.first()
            if (checkmemberforroles.roles.cache.some(role => role.id === `${ModeratorRoleID}`)){respond('',`You can't perform that action on this user.`, message.channel);return;;return;}
            member.roles.remove([role])
                respond('🚫 Remove Restrict',`Removed ${member}'s restrictions.`,message.channel)
                modaction('removerestrict', message.author.tag, message.channel.name, message.content, message)
                return
		}
        function restrictLevel4(){
            const rolename = 'Restricted (Level 4)'
            const role = message.guild.roles.cache.find(role => role.name === rolename);
            const member = message.mentions.members.first();
            if (message.author.id == message.mentions.members.first().id){respond('',`You can't perform this action on yourself.`, message.channel);return;}
            const checkmemberforroles = message.mentions.members.first()
            member.roles.remove([role])
                respond('🚫 Remove Restrict',`Removed ${member}'s restrictions.`,message.channel)
                modaction('removerestrict', message.author.tag, message.channel.name, message.content, message)
                return
		}
		console.log(args[1])
		if(args[1] && args[1] == '1'){
			restrictLevel1()
		}else if(args[1] && args[1] == '2'){
			restrictLevel2()
		}else if(args[1] && args[1] == '3'){
			restrictLevel3()
		}else if(args[1] && args[1] == '4'){
			restrictLevel4()
		}else{
            respond('🚫 Restrict','Please choose a level from 1-4.',message.channel)
            return
        }

	}catch(error) {
		respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
		errorlog(error)
		// Your code broke (Leave untouched in most cases)
		console.error('an error has occured', error);
		}
	}
	
};
