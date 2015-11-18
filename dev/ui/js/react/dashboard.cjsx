# react/dashboard
# ---------------------------------------
tag = "react/dashboard:%s =>"

# Requires
# ---------------------------------------
weather = require "weather"

# Logic
# ---------------------------------------

d = {}

Dashboard = React.createClass({
	componentDidMount: ->
	render: ->
		<div>
			<h2>Dashboard!</h2>
		</div>
	})

d.Main = Dashboard

exports = module.exports = d