# react/stats
# ---------------------------------------
tag = "react/stats:%s =>"

# Requires
# ---------------------------------------
React = require("react")

# Logic
# ---------------------------------------

Stats = ()->
	render: ->
		<h1>Stats</h1>

renderStats = ->
	React.render(
		<Stats />,
		$("main")[0]
		)

exports = module.exports = {
	class: Stats
	render: renderStats
}