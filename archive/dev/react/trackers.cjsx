# react/trackers
# ---------------------------------------
tag = "react/trackers:%s =>"

# Requires
# ---------------------------------------
React = window.React
ReactFireMixin = window.ReactFireMixin
b = window.b

# Logic
# ---------------------------------------

TrackerItems = React.createClass({
	render: ->
		createItem = (question, index)->

			<li className="complete" key={index}>
				<div className="todayItem-details">
					<img className="icon-details" src="assets/caret-complete.png" />
				</div>
				<div className="todayItem-question">
					<p>{question.question}</p>
				</div>
			</li>

		return (<ul className="questions-list">{this.props.questions.map(createItem)}</ul>)
	})

Trackers = React.createClass({
	mixins: [ReactFireMixin]
	render: ->
		<div id="trackers">
			<TrackerItems questions={this.state.questions} />
		</div>
	componentWillMount: ->
		ref = b.getQuestionsBase()
		this.bindAsArray(ref, "questions")
	})

renderTrackers = ->
	React.render(
		<Trackers />,
		$("main")[0]
		)

exports = module.exports = {
	class: Trackers
	render: renderTrackers
}