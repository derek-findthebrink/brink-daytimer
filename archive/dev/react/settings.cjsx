# react/settings
# ---------------------------------------
tag = "react/settings:%s =>"

# Requires
# ---------------------------------------
React = require("react")

# Logic
# ---------------------------------------

Settings = ()->
	render: ->
		<h1>Settings</h1>

renderSettings = ->
	React.render(
		<Settings />,
		$("main")[0]
		)

exports = module.exports = {
	class: Settings
	render: renderSettings
}