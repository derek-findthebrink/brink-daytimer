# connect
# ---------------------------------------
tag = "connect:%s =>"

# Requires
# ---------------------------------------
firebase = require("firebase")

# Logic
# ---------------------------------------

base = (user)->
	this.url = "https://brink-today.firebaseio.com"
	this.user = this.url + "/users/" + user
	this.questionsBase = this.user + "/questions"

	this.getQuestionsBase = ->
		base = new firebase(this.questionsBase)
		console.log(tag, "questionsbase", this.questionsBase)
		return base

	this.addQuestion = (data, cb)->
		this.getQuestionsBase().push(data)
		cb(null)

	this.readQuestions = (cb)->
		returnValue = (snap)->
			console.log(tag, "readQuestions:returnValue", snap)
			return cb(null, snap)
		returnFail = (err)->
			console.log(tag, "readQuestions:returnFail", "return failed!")
			cb(err)
		this.getQuestionsBase().once("value", returnValue, returnFail)

	return this

exports = module.exports = base