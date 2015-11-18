# react/menu
# ---------------------------------------
tag = "react/menu:%s =>"

# Requires
# ---------------------------------------


# Logic
# ---------------------------------------

m = {}

Menu = React.createClass({
	componentDidMount: ->
		type = this.props.type
		target = this.props.target
		if type == "tracker"
			this.tracker(target)
	tracker: (tracker)->
		model = app.c.trackers.findWhere({ ref: tracker.ref })
		console.log(model)
		$this = $(ReactDOM.findDOMNode(this))
		deleteButton = $this.find("iron-icon[data-action='delete']")
		editButton = $this.find("iron-icon[data-action='edit']")
		deleteButton.click((e)->
			model.destroy()
			)
	render: ->
		<div className="menu">
			<iron-icon icon="icons:delete" data-action="delete" />
			<iron-icon icon="icons:create" data-action="edit" />
		</div>
	})

m.Main = Menu

exports = module.exports = m