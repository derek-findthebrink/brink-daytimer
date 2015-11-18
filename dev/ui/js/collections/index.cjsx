# app/collections/questions
# ---------------------------------------
tag = "app/collections/questions:%s =>"

# Requires
# ---------------------------------------
brinkFormGen = require("../../../../brink-dev/model-sync.cjsx")

# Logic
# ---------------------------------------

# console.log(tag, "bfg", brinkFormGen)
# brinkFormGen.makeBackbone("daytimers")


# Questions
# ------------------------------------------------------------
# Backbone Model
# used to add questions to firebase

# TASK: immutable -> true

refgen = brinkFormGen.refgen

modelTrackers = Backbone.Model.extend({
	idAttribute: "_id"
	defaults: brinkFormGen.makeBackboneDefaults("trackers")
	name: "trackers"
	initialize: ->
		if this.isNew() || !this.get("ref")
			console.log(tag, "trackers:isNew", true)
			str = this.get("type") + this.get("category") + this.get("question") + moment().format("YYYY-MM-DD HH:mm")
			this.set("ref", refgen(this.name, 6, str))
			console.log(tag, "refgen:res", this.get("ref"))
			this.save()

	})


# Backbone/Firebase Collection
# used to add models -> react handles all ui business

trackers = Backbone.Collection.extend({
	url: "/data/trackers"
	model: modelTrackers
	name: "trackers"
	initialize: ->
		this.once("sync", =>
			this.ready = true
			)
		this.on("sync remove", =>
			app.trigger(this.name, this.toJSON())
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
	defaults: brinkFormGen.makeBackboneDefaults("daytimers")
	name: "daytimer"
	initialize: ->
		if this.isNew() || !this.get("ref")
			str = this.get("questionRef") + moment().format("YYYY-MM-DD HH:mm")
			this.set("ref", refgen(this.name, 8, str))
			this.save()
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
		this.on("sync remove", =>
			app.trigger(this.name, this.toJSON())
			)
		this.fetch()
	ready: false
	})


# types
# -----------------------------------------------------------

modelTypes = Backbone.Model.extend({
	idAttribute: "_id"
	defaults: brinkFormGen.makeBackboneDefaults("types")
	name: "types"
	initialize: ->
		if this.isNew() || !this.get("ref")
			str = this.get("title") + this.get("description") + moment().format("YYYY-MM-DD HH:mm")
			this.set("ref", brinkFormGen.refgen(this.name, 6, str))
			this.save()
	})
types = Backbone.Collection.extend({
	url: "/data/types"
	name: "types"
	model: modelTypes
	initialize: ->
		this.once("sync", =>
			this.ready = true
			)
		this.on("sync remove", =>
			app.trigger(this.name, this.toJSON())
			)
		this.fetch()
	ready: false
	})


# categories
# -----------------------------------------------------------
modelCategory = Backbone.Model.extend({
	idAttribute: "_id"
	defaults: brinkFormGen.makeBackboneDefaults("categories")
	name: "category"
	initialize: ->
		if this.isNew() || !this.get("ref")
			str = this.get("title") + this.get("description") + moment().format("YYYY-MM-DD HH:mm")
			this.set("ref", brinkFormGen.refgen(this.name, 6, str))
			this.save()
	})
categories = Backbone.Collection.extend({
	url: "/data/categories"
	name: "categories"
	model: modelCategory
	initialize: ->
		this.once("sync", =>
			this.ready = true
			)
		this.on("sync remove", =>
			app.trigger(this.name, this.toJSON())
			)
		this.fetch()
	ready: false
	})

# Exports
# ----------------------------------------------------------------

exports = module.exports = {
	trackers: trackers
	daytimers: daytimers
	types: types
	categories: categories
}