# app/collections/questions
# ---------------------------------------
tag = "app/collections/questions:%s =>"

# Requires
# ---------------------------------------
brinkFormGen = require("../../../../brink-dev/model-sync.cjsx")

# Logic
# ---------------------------------------

console.log(tag, "bfg", brinkFormGen)

brinkFormGen.makeBackbone("daytimers")

# Questions
# ------------------------------------------------------------
# Backbone Model
# used to add questions to firebase

# TASK: immutable -> true

modelQuestion = Backbone.Model.extend({
	idAttribute: "_id"
	defaults: 
		type: "boolean"
		category: "uncategorized"
		question: ""
		frequency: 1
		min: 0
		timeRange: false
		goal: 0
		dateLastAnswered: new Date()
		refs: []
	})


# Backbone/Firebase Collection
# used to add models -> react handles all ui business

trackers = Backbone.Collection.extend({
	url: "/data/trackers"
	model: modelQuestion
	name: "trackers"
	initialize: ->
		this.once("sync", =>
			this.ready = true
			)
		this.fetch()
	ready: false
	})






# Daytimer
# -------------------------------------------------------------
# Backbone Model
# used to add new entries to Daytimer collection

modelDaytimer = Backbone.Model.extend({
	idAttribute: "_id"
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

daytimers = Backbone.Collection.extend({
	url: "/data/daytimers"
	model: modelDaytimer
	name: "daytimers"
	initialize: ->
		this.once("sync", =>
			this.ready = true
			)
		this.fetch()
	ready: false
	})






# Exports
# ----------------------------------------------------------------

exports = module.exports = {
	trackers: trackers
	daytimers: daytimers
}