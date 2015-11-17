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
		w = weather({location: "Vancouver, BC"}, (data)->
			console.log(data)
			)
	render: ->
		<div>
			<h2>Dashboard!</h2>
		</div>
	})

d.Main = Dashboard

exports = module.exports = d