# react/index
# ---------------------------------------
tag = "react/index:%s =>"

# Requires
# ---------------------------------------
trackers = require "./trackers.cjsx"
dashboard = require "./dashboard.cjsx"
settings = require "./settings.cjsx"
stats = require "./stats.cjsx"

# Logic
# ---------------------------------------

v = {}

v.Trackers = trackers
v.Dashboard = dashboard
v.Settings  = settings
v.Stats = stats

exports = module.exports = v