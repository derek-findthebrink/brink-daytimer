# app
# ---------------------------------------
tag = "app:%s =>"

# Requires
# ---------------------------------------
ui = require "./ui.cjsx"
col = require "./collections/index.cjsx"
rMain = require "./router/main.cjsx"


# Logic
# ---------------------------------------
app = window.app = {}

_.extend(app, Backbone.Events)

app.c = {}
app.v = require "./react/index.cjsx"
app.c.trackers = new col.trackers()
app.c.daytimers = new col.daytimers()

uiInit = ->
	app.router = new rMain()
	$(document).ready(()->
		ui.slicknav()
		)
	

do appReady = ->
	if app.c.trackers.ready && app.c.daytimers.ready 
		uiInit()
		app.trigger("ready")
	else
		_.delay(appReady, 20)


# ui logic
