# router/main
# ---------------------------------------
tag = "router/main:%s =>"

# Requires
# ---------------------------------------
$ = window.$
_ = window._
Backbone = window.Backbone

# Logic
# ---------------------------------------

main = Backbone.Router.extend({
	routes:
		"questions": "pageQuestions"
	initialize: ->
		# console.log(tag, "Router", "init!")
		this.app = window.App
		if !Backbone.History.started
			Backbone.history.start({
				pushState: true
				})
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
	pageQuestions: ->
		# alert("questions route init")
		# console.log(this.app)
		this.app.v.questions.render()
	})


exports = module.exports = main