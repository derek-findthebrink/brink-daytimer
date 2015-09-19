# config
# ---------------------------------------
tag = "config:%s =>"

# Requires
# ---------------------------------------
fs = require("fs")

# Logic
# ---------------------------------------
readOpts = {
	encoding: "utf8"
}

config = ()->
	this.programRoot = "/home/derek/.daytimer/" 
	this.configFile = this.programRoot + ".daytimerconf.json"
	this.questionsDir = this.programRoot + "questions/"
	this.contents = JSON.parse(fs.readFileSync(this.configFile, readOpts))

	this.getQuestions = ()->
		x = fs.readFileSync(this.configFile, readOpts)
		json = JSON.parse(x)
		target = json.questions
		return target

	this.writeConfig = (data)->
		json = JSON.stringify(data, null, "\t")
		fs.writeFileSync(this.configFile, json)
		console.log(tag, "config:write", "data written")

	this.writeQuestion = (data)->
		json = JSON.stringify(data, null, "\t")
		fs.writeFile(data.filename, json, (err)->
			if err
				throw err
			console.log(tag, "writeQuestion:written", "question written successfully")
			)

	return this

exports = module.exports = config