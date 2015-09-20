

# HelloWorld = React.createClass({
# 	render: ()->
# 		<p>
# 			Hello, <input type="text" placeholder="Your name here!" />!
# 			It is {this.props.date.toTimeString()}
# 		</p>
# 	})

# React.render(
# 	<h1>I'm derek's second react component!</h1>,
# 	document.getElementById("reactExample")
# 	)

# setInterval(()->
# 	React.render(
# 		<HelloWorld date={new Date()} />
# 		document.getElementById("reactTest1")
# 		)
# 	)


# # link test
# aCoolLink = React.createElement("a", {href: 'https://facebook.github.io/react/'}, "Hello!")

# React.render(aCoolLink, document.getElementById("reactExample"))


TodayItem = React.createClass({
	render: ->
		if this.state.completed
			statusText = "complete!"
		else
			statusText = "incomplete!"
		return (<li className="todayItem" onClick={this.handleClick}>
					<div className="todayItem-name">
					<h3>{this.props.name}</h3>
					</div>
					<div className="todayItem-question">
					<p>{this.props.question}</p>
					</div>
					<div className="todayItem-status">
					<h4>Task is {statusText}</h4>
					</div>
				</li>)
	getInitialState: ()->
		return {completed: false}
	handleClick: ()->
		this.setState({completed: !this.state.completed})
	})

TodayList = React.createClass({
	render: ->
		return (
			<h2>Today</h2>
			<ul className="todayContainer">
				<TodayItem name={"tucker"} question={"did you walk him?"} completed={false} />
				<TodayItem name={"tucker"} question={"did you feed him brekkers?"} completed={false} />
				<TodayItem name={"tucker"} question={"did you feed him dinner?"} completed={false} />
			</ul>)
	})

React.render(
	<TodayList />,
	$("#today")[0]
	)




# Clock thing in the footer
# ------------------------------------------------------------------------------

SetIntervalMixin = {
	componentWillMount: ->
		this.intervals = []
	setInterval: ->
		this.intervals.push(setInterval.apply(null, arguments))
	componentWillUnmount: ->
		this.intervals.map(clearInterval)
}

TickTock = React.createClass({
	mixins: [SetIntervalMixin]
	getInitialState: ->
		return {seconds: 0}
	componentDidMount: ->
		this.setInterval(this.tick, 1000)
	tick: ->
		this.setState({seconds: this.state.seconds + 1})
	render: ->
		return (
			<p>
				Daytimer has been running for {this.state.seconds} seconds.
			</p>
			)
	})

React.render(
	<TickTock />,
	$("footer")[0]
	)