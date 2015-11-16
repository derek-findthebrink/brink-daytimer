# react/questions
# ---------------------------------------
tag = "react/questions:%s =>"

# Requires
# ---------------------------------------
React = window.React 
ReactFireMixin = window.ReactFireMixin
b = window.b

# React Router components

# Logic
# ---------------------------------------

QuestionItems = React.createClass({
	render: ->
		# console.log(tag, "questionItems:render:this", this)
		createItem = (question, index)->
			# console.log(tag, "createItem:question", question)
			# console.log(tag, "createItem:index", index)
			
			# set correct li classes
			if question.complete == true
				qClass = "complete"
				qCaret = "assets/caret-complete.png"
				qToggle = "assets/button-complete.png"
			else if question.complete == "pending"
				qClass = "pending"
				qCaret = "assets/caret-pending.png"
				qToggle = "assets/button-pending.png"
			else
				qClass = "incomplete"
				qCaret = "assets/caret-incomplete.png"
				qToggle = "assets/button-incomplete.png"

			<li className={  qClass  } key={  index  } >
				<div className="todayItem-details">
					<img className="icon-details" src={  qCaret  } />
				</div>
				<div className="todayItem-question">
					<p>{  question.question  }</p>
				</div>
				<div className="todayItem-menu">
					<img className="icon-toggle" src={  qToggle  } />
				</div>
			</li>
		return (<ul className="questions-list">{  this.props.questions.map(createItem)  }</ul>)
	})

QuestionsList = React.createClass({
	mixins: [ReactFireMixin]
	render: ->
		<div id="questions">
			<QuestionItems questions={  this.state.questions  } />
		</div>
	# firebase connection pulled from window.b (base) object
	componentWillMount: ->
		ref = b.getDaytimerBase()
		this.bindAsArray(ref, "questions")
	})

renderQuestions = ->
	React.render(
		<QuestionsList />,
		$("main")[0]
		)


exports = module.exports = {
	class: QuestionsList
	render: renderQuestions
}