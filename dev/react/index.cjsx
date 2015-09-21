# react/index (Views Index)
# ---------------------------------------
tag = "react/index:%s =>"

# Requires
# ---------------------------------------
questions = require "./questions"
nav = require "./nav"

# Logic
# ---------------------------------------

index = {
	questions: questions
	nav: nav
}

module.exports = exports = index