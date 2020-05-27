module.exports = {
	name:"aiModule",
	execute(input, author, returnFunction){
		input = input.replace(/\!/g, '').replace(/\?/g, '').replace(/\./g,'')
		if(input == 'hi'){
			returnFunction(`Hello <@${author.id}>!`)
		}else 
		if(input == `stop being sentient`){
			returnFunction(`I'm not sentient <@${author.id}>!`)
		} else 
		if(input == `bye`){
			returnFunction(`Bye <@${author.id}>! :wave:`)
		} else  
		if(input == `who are you`){
			returnFunction(`:thinking:`)
		} else  
		if(input.includes(`go away`)){
			returnFunction(`Ok :pensive:`)
		} else  
		if(input.includes(`i'm sorry`)){
			returnFunction(`It's fine :slight_smile:`)
		} else  
		if(input == `are you sentient`){
			returnFunction(`No :wink:`)
		} else  
		if(input.includes('how are you')){
			returnFunction(`I'm doing pretty good`)
		} else  
		if(input.includes(`🔫`)){
			returnFunction(`🙌\n😰`)
		} else  
		if(input == `how are the games I made for you?`){
			returnFunction(`Good!`)
		} else  
		if(input == `you can't get the sus emojis from Daniel's bot emoji server?`){
			returnFunction(`...`)
		} else  
		if(input == `no`){
			returnFunction(`u`)
		} else  
		if(input.includes(`:sus:`) || input.includes(`:supersus:`)){
			returnFunction(`😰`)
		} else 
		if(input != '' && !fs.existsSync('./aiModule1.js')){
			returnFunction(`Sorry <@${author.id}>, I don't know how to respond to that...`)
		}else 
		if(input != '' && fs.existsSync('./aiModule1.js')){
			aiModule1 = require('./aiModule1.js')
			aiModule1.execute(input, author, returnFunction)
		}
	}
}

/*

 if(input == `TEXT`){
			returnFunction(`TEXT`)
		} else

*/