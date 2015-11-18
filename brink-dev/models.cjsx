# brink-dev/models
# ---------------------------------------
tag = "brink-dev/models:%s =>"

# Requires
# ---------------------------------------


# Logic
# ---------------------------------------

json = [
		{
			name: "trackers"
			action: "/data/trackers"
			fields: [
				{
					name: "type"
					default: "boolean"
					typeDb: String
					typeForm: "select"
					list: [
						{
							name: "boolean"
							value: "T01"
						}
						{
							name: "process"
							value: "T02"
						}
					]
				}
				{
					name: "category"
					default: "uncategorized"
					typeDb: String
					typeForm: "select"
					list: [
						{
							name: "tucker"
							value: "C01"
						}
						{
							name: "clean"
							value: "C02"
						}
						{
							name: "nutrition"
							value: "C03"
						}
						{
							name: "body"
							value: "C04"
						}
						{
							name: "money"
							value: "C05"
						}
					]
				}
				{
					name: "question"
					default: ""
					typeDb: String
					typeForm: "text"
				}
				{
					name: "frequency"
					default: 0
					typeDb: Number
					typeForm: "number"
				}
				{
					name: "minimum"
					default: "0"
					typeDb: Number
					typeForm: "number"
				}
				{
					name: "timeRange"
					default: "false"
					typeDb: String
					typeForm: "range"
				}
				{
					name: "goal"
					default: "0"
					typeDb: Number
					typeForm: "number"
				}
				{
					name: "dateLastAnswered"
					default: ->
						return new Date()
					typeDb: Date 
				}
				{
					name: "refs"
					default: []
					typeDb: []
				}
				{
					name: "description"
					typeDb: String
					default: ""
					typeForm: "textarea"
				}
				{
					name: "submit"
					value: "Submit"
					typeForm: "submit"
				}
				{
					name: "ref"
					typeDb: String
				}
			]
		}
		{
			name: "daytimers"
			fields: [
				{
					name: "questionRef"
					default: "false"
					typeDb: String
				}
				{
					name: "complete"
					default: false
					typeDb: Boolean 
				}
				{
					name: "start"
					default: ->
						return new Date()
					typeDb: Date
				}
				{
					name: "end"
					default: ->
						return new Date()
					typeDb: Date
				}
				{
					name: "ref"
					typeDb: String
				}
			]
		}
		{
			name: "types"
			fields: [
				{
					name: "title"
					default: ""
					typeDb: String
					typeForm: "text"
				}
				{
					name: "description"
					default: ""
					typeDb: String
					typeForm: "textarea"
				}
				{
					name: "ref"
					typeDb: String
				}
				{
					name: "submit"
					value: "Submit"
					typeForm: "submit"
				}
			]
		}
		{
			name: "categories"
			fields: [
				{
					name: "title"
					default: ""
					typeDb: String
					typeForm: "text"
				}
				{
					name: "description"
					default: ""
					typeDb: String
					typeForm: "textarea"
				}
				{
					name: "submit"
					typeForm: "submit"
					value: "Submit"
				}
			]
		}
	]


exports = module.exports = json