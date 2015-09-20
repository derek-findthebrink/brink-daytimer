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

one = createQuestion("Tucker", "did you walk him?", false)
two = createQuestion("Tucker", "did you feed him brekkers?", false)
three = createQuestion("Tucker", "did you feed him dinner?", false)

arr = [one, two, three]

b = new base("derek")

logData = (err, data)->
	if err
		throw err
	console.log(data.val())

b.readQuestions(logData)
# _.each(arr, b.addQuestion, b)
