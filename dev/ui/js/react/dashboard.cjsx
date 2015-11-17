# react/dashboard
# ---------------------------------------
tag = "react/dashboard:%s =>"

# Requires
# ---------------------------------------


# Logic
# ---------------------------------------

d = {}

Dashboard = React.createClass({
	render: ->
		<div>
			<h2>Dashboard!</h2>
		</div>
	})

d.Main = Dashboard

exports = module.exports = d