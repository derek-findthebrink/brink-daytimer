# app/collections/questions
# ---------------------------------------
tag = "app/collections/questions:%s =>"

# Requires
# ---------------------------------------
_ = window._
Backbone = window.Backbone
base = window.b

# Logic
# ---------------------------------------


# Questions
# ------------------------------------------------------------
# Backbone Model
# used to add questions to firebase

# TASK: immutable -> true

modelQuestion = Backbone.Model.extend({
	defaults: 
		type: "boolean"
		category: "uncategorized"
		question: false
		frequency: 1
		min: 0
		timeRange: false
		goal: 0
		dateLastAnswered: false
		refs: []
	})


# Backbone/Firebase Collection
# used to add models -> react handles all ui business

questions = Backbone.Firebase.Collection.extend({
	url: base.questionsBase
	model: modelQuestion
	})






# Daytimer
# -------------------------------------------------------------
# Backbone Model
# used to add new entries to Daytimer collection

modelDaytimer = Backbone.Model.extend({
	defaults: 
		questionRef: false
		date: new Date()
		complete: false
		start: false
		end: false
	})

# Backbone/Firebase Collection
# the daytimer collection
# objects are programatically added

daytimers = Backbone.Firebase.Collection.extend({
	url: base.daytimerBase
	model: modelDaytimer
	})






# Exports
# ----------------------------------------------------------------

exports = module.exports = {
	questions: questions
	daytimers: daytimers
}