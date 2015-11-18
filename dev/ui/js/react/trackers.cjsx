# react/trackers
# ---------------------------------------
tag = "react/trackers:%s =>"

# Requires
# ---------------------------------------
brinkFormGen = require("../../../../brink-dev/model-sync.cjsx")

# Logic
# ---------------------------------------

t = {}

# brink-dev: form generator
FieldBuilder = brinkFormGen.ReactFieldBuilder
fields = brinkFormGen.get("trackers").fields


Trackers = React.createClass({
	getInitialState: ->
		return {
			trackers: []
		}
	componentDidMount: ->
		target = app
		setState = (e)=>
			this.setState({
				trackers: e
				})
		setState(app.c.trackers.toJSON())
		target.on("trackers", (e)=>
			setState(e)
			console.log(tag, "json trackers on set state", e)
			)
	render: ->
		trackers = this.state.trackers
		if !trackers 
			return
		<div className="trackers">
			<TrackerAdd fields={fields} />
			<ul className="tracker-list">
				{
					trackers.map((x, i)->
						<TrackerItem key={i} tracker={x} />
						)
				}
			</ul>
		</div>
	})

TrackerItem = React.createClass({
	render: ->
		tracker = this.props.tracker
		<li className="tracker-item">
			<div className="edit">
				<img src="/assets/caret-complete.png" />
			</div>
			<div className="details">
				<p>{tracker.category}</p>
				<h2>{tracker.question}</h2>
				<p>{tracker.frequency} / day</p>
				<p>{moment(tracker.dateLastAnswered).format("YYYY-MM-DD")}</p>
			</div>
			<app.v.Menu.Main type="tracker" target={tracker} />
		</li>
	})

TrackerAdd = React.createClass({
	componentDidMount: ->
		$this = $(ReactDOM.findDOMNode(this))
		$this.accordion({
			collapsible: true
			heightStyle: "content"
			active: false
			})
		$this.find("input[type='submit']").click((e)=>
			form = $this.find("form")
			e.preventDefault()
			redIt = (obj, v)->
				obj[v.name] = v.value
				return obj
			d = form.serializeArray().reduce(redIt, {})
			console.log(tag, "form data", d)
			app.c.trackers.add(d)
			$this.find("input, textarea").not("input[type='submit']").val("")
			)
	render: ->
		fields = this.props.fields
		<div>
			<h3>Tracker Add</h3>
			<form>
				{
					fields.map((x, i)->
						# console.log(tag, "field", x)
						FieldBuilder(x, i)
						)
				}
			</form>
		</div>
	})


t.Main = Trackers


exports = module.exports = t