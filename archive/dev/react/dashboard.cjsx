# react/dashboard
# ---------------------------------------
tag = "react/dashboard:%s =>"

# Requires
# ---------------------------------------
React = require("react")

# views
Questions = require("./questions").class

# Logic
# ---------------------------------------

Dashboard = ()->
	render: ->
		<div>
			<div id="questions">
				<Questions />
			</div>
			<div id="weather">
				<h2>Weather</h2>
			</div>
			<div id="breaks">
				<h2>Breaks</h2>
			</div>
		</div>

renderDashboard = ->
	React.render(
		<Dashboard />
		$("main")[0]
		)


exports = module.exports = {
	class: Dashboard
	render: renderDashboard
}