# react/index
# ---------------------------------------
tag = "react/index:%s =>"

# Requires
# ---------------------------------------
trackers = require "./trackers.cjsx"
dashboard = require "./dashboard.cjsx"
settings = require "./settings.cjsx"
stats = require "./stats.cjsx"
menu = require "./menu.cjsx"

# Logic
# ---------------------------------------

v = {}

v.Trackers = trackers
v.Dashboard = dashboard
v.Settings  = settings
v.Stats = stats
v.Menu = menu

exports = module.exports = v