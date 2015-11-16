# router/main
# ---------------------------------------
tag = "router/main:%s =>"

# Requires
# ---------------------------------------
$ = window.$
_ = window._
Backbone = window.Backbone
React = require("react")

# Logic
# ---------------------------------------

main = Backbone.Router.extend({
	routes:
		"trackers": "pageTrackers"
		"dashboard": "pageDashboard"
		"stats": "pageStats"
		"settings": "pageSettings"
	initialize: ->
		# console.log(tag, "Router", "init!")
		this.app = window.App
		if !Backbone.History.started
			Backbone.history.start({
				pushState: true
				})
		this.navigate("dashboard", {trigger: true})
		this.bindAnchors()
		return this
	bindAnchors: ->
		targets = $("a[href^='/']")
		# console.log(tag, "bindAnchors:targets", targets)
		targets.click((e)=>
			e.preventDefault()
			# console.log(tag, "event", e)
			target = e.currentTarget.pathname.replace("/", "")
			# console.log(tag, "anchor:click", target)
			this.navigate(target, {trigger: true})
			)
	pageTrackers: ->
		# alert("questions route init")
		# console.log(this.app)
		this.app.v.trackers.render()
	pageDashboard: ->
		this.app.v.dashboard.render()
	pageStats: ->
		this.app.v.stats.render()
	pageSettings: ->
		this.app.v.settings.render()
	})


exports = module.exports = main