module.exports = {
	name:"aiModule1",
	module:2,
	execute(input, author, returnFunction){
		console.log('Loaded aiModule '+this.module)
		console.log(input)
		if(input == 'haha'){
			returnFunction(`:laughing:`)
		} else 
		//Auto
		if(input != '' && !fs.existsSync(`./aiModule${this.module+1}.js`)){
			returnFunction(`Sorry <@${author.id}>, I don't know how to respond to that...`)
		}else 
		if(fs.existsSync(`./aiModule${this.module+1}.js`)){
			aiModule = require(`./aiModule${this.module+1}.js`)
			aiModule.execute(input, author, returnFunction)
		}
	}
}

/*

 if(input == `TEXT`){
			returnFunction(`TEXT`)
		} else

*/