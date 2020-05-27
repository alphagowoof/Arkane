module.exports = {
	name:"aiModule1",
	execute(input, author, returnFunction){
		input = input.replace(/\!/g, '').replace(/\?/g, '').replace(/\./g,'')

		if(input == 'TEXT'){
			returnFunction(`TEXT`)
		} else 
		//Auto
		if(input != '' && !fs.existsSync('./aiModule2.js')){
			returnFunction(`Sorry <@${author.id}>, I don't know how to respond to that...`)
		}else 
		if(input != '' && fs.existsSync('./aiModule2.js')){
			aiModule2 = require('./aiModule2.js')
			aiModule2.execute(input, author, returnFunction)
		}
	}
}

/*

 if(input == `TEXT`){
			returnFunction(`TEXT`)
		} else

*/