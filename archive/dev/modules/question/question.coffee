# question/question
# ---------------------------------------
tag = "question/question:%s =>"

# Requires
# ---------------------------------------
fs = require("fs")
async = require("async")
_ = require("underscore")
moment = require("moment")

config = require("../config")

# Logic
# ---------------------------------------

c = new config()

parseQuestion = (input, cb)->
	# console.log(tag, "parseQuestion:input", input)
	# console.log(input.question)
	question = {
		question: 
			name: input.name
			type: input.type
			message: input.question
		filename: c.questionsDir + input.name + ".json"
		dateAdded: moment().format("YYYY-MM-DD")
		responses: []
	}
	console.log(tag, "question", question)
	cb(null, question)

writeQuestion = (question, cb)->
	console.log(tag, "input", c.questionsDir)
	c.writeQuestion(question)
	cb(null, question)

updateConfig = (question, cb)->
	data = c.contents
	obj = {
		name: question.question.name
		file: question.filename
		lastResponse: false
	}
	data.questions.push(obj)
	c.writeConfig(data)
	cb(null, question)

question = (input)->
	async.waterfall([
		async.apply(parseQuestion, input)
		writeQuestion
		updateConfig
		], (err, res)->
			if err
				throw err
			# console.log(tag, "question:final", res)
			)

exports = module.exports = question