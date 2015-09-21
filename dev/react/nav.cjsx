# react/nav
# ---------------------------------------
tag = "react/nav:%s =>"

# Requires
# ---------------------------------------
React = require("react")
Link = require("react-router").Link

# Logic
# ---------------------------------------

Nav = React.createClass({
	render: ->
		<ul>
			<Link to="/stats">stats</Link>
			<Link to="/questions">questions</Link>
			<Link to="/settings">settings</Link>
		</ul>
	})

render = ->
	React.render(
		<Nav />,
		$("nav")[0]
		)

exports = module.exports = {
	render: render
}