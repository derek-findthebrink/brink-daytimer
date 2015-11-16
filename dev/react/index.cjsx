# react/index (Views Index)
# ---------------------------------------
tag = "react/index:%s =>"

# Requires
# ---------------------------------------
dashboard = require "./dashboard"
list = require "./questions"
stats = require "./stats"
settings = require "./settings"
trackers = require "./trackers"
questions = require "./questions"


# Logic
# ---------------------------------------

index = {
	trackers: trackers
	dashboard: dashboard
	stats: stats
	settings: settings
	widgets:
		questions: questions
}


module.exports = exports = index