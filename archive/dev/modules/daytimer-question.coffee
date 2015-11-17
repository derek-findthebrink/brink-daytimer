# daytimer-question
# ---------------------------------------
tag = "daytimer-question:%s =>"

# Requires
# ---------------------------------------
program = require("commander")
question = require("./question/question")

# Logic
# ---------------------------------------

input = {}

program
	.option("-n, --name <name>", "title of the question")
	.option("-t, --type <type>", "type of question, can be boolean, number, list, etc.")
	.option("-q, --question <question>", "the question to ask")
	.parse(process.argv)

if program.name
	input.name = program.name

if program.type
	input.type = program.type

if program.question
	input.question = program.question

question(input)