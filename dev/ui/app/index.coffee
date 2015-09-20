# app
# ---------------------------------------
tag = "app:%s =>"

# Requires
# ---------------------------------------

# window requires
window.$ = require("jquery")
window.React = require("react")

# node requires
_ = require("underscore")

base = require("./connect.coffee")


# Logic
# ---------------------------------------

createQuestion = (name, question, complete)->
	x = {
		name: name
		question: question 
		complete: complete or false
	}
	return x

b = new base("derek")

logData = (err, data)->
	if err
		throw err
	console.log(data.val())

b.readQuestions(logData)
# _.each(arr, b.addQuestion, b)
