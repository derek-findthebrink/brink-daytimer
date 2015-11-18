# index
# ---------------------------------------
tag = "index:%s =>"

# Requires
# ---------------------------------------
ui = require "./ui.cjsx"
col = require "./collections/index.cjsx"
rMain = require "./router/main.cjsx"


# Logic
# ---------------------------------------
app = window.app = {}

_.extend(app, Backbone.Events)

app.on("all", (e)->
	console.log(tag, "app:triggered", e)
	)

app.c = {}
app.v = require "./react/index.cjsx"
app.c.trackers = new col.trackers()
app.c.daytimers = new col.daytimers()
app.c.types = new col.types()
app.c.categories = new col.categories()

uiInit = ->
	app.router = new rMain()
	$(document).ready(()->
		ui.slicknav()
		)
	

i = 0
do appReady = ->
	if app.c.trackers.ready && app.c.daytimers.ready && app.c.categories.ready && app.c.types.ready
		uiInit()
		app.trigger("ready")
		console.log(tag, "app init after", i)
	else
		i++
		console.log(tag, "init delayed", i)
		if i > 15
			console.log(tag, "init", "failed! too many attempts to fetch collections")
			return false
		_.delay(appReady, 20)



# ui logic
