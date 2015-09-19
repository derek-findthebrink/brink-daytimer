# daytimer
# ---------------------------------------
tag = "daytimer:%s =>"

# Requires
# ---------------------------------------
program = require("commander")

# Logic
# ---------------------------------------
input = {}

program
	.command("question", "add tracking question")
	.parse(process.argv)

