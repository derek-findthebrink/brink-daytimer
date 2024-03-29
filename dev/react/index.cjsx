# react/index
# ---------------------------------------
tag = "react/index:%s =>"

# Requires
# ---------------------------------------
# Cannot handle require calls here as is not pushed through browserify prior to loading

# Logic
# ---------------------------------------
QuestionItems = React.createClass({
	render: ->
		# console.log(tag, "questionItems:render:this", this)
		createItem = (question, index)->
			# console.log(tag, "createItem:question", question)
			# console.log(tag, "createItem:index", index)
			
			# set correct li classes
			if question.complete
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
		return (
			<div id="questions">
				<QuestionItems questions={  this.state.questions  } />
			</div>
			)
	# firebase connection pulled from window.b (base) object
	componentWillMount: ->
		ref = b.getQuestionsBase()
		this.bindAsArray(ref, "questions")
	})



# Launcher
# ----------------------------------------------------
React.render(
	<QuestionsList />,
	$("main")[0]
	)