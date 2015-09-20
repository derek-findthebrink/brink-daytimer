# app
# ---------------------------------------
tag = "app:%s =>"

# Requires
# ---------------------------------------

# window requires
# each jQuery and slicknav.jquery are loaded via html-initiated requests to lib folder
window.React = require("react")
window.ReactFireMixin = require("reactfire")
window._ = require("underscore")

# node requires
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

window.b = new base("derek")

logData = (err, data)->
	if err
		throw err
	console.log(data.val())

# _.each(arr, b.addQuestion, b)


# slicknav
$("nav").slicknav({
	init: ->
		$("nav").hide()
	prependTo: $(".slicknav")
	label: ""
	})