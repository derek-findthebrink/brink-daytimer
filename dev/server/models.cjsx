# models
# ---------------------------------------
tag = "models:%s =>"

# Requires
# ---------------------------------------
mongoose = require("mongoose")
Schema = mongoose.Schema

# Logic
# ---------------------------------------

QuestionSchema = new Schema({
	type: String
	category: String
	question: String
	frequency: Number
	min: Number
	timeRange: Number
	goal: Number
	dateLastAnswered: Date 
	refs: []
	})

DaytimerSchema = new Schema({
	questionRef: String
	date: Date
	complete: Boolean
	start: Date
	end: Date
	})

mongoose.model("Question", QuestionSchema)
mongoose.model("Daytimer", DaytimerSchema)