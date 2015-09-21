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
	this.daytimerBase = this.user + "/daytimers"

	this.getQuestionsBase = ->
		base = new firebase(this.questionsBase)
		# console.log(tag, "questionsbase", this.questionsBase)
		return base

	this.addQuestion = (data, cb)->
		this.getQuestionsBase().push(data)
		cb(null)

	this.getDaytimerBase = ->
		base = new firebase(this.daytimerBase)
		return base

	return this

exports = module.exports = base