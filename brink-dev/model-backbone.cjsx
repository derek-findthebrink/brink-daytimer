# brink-dev/model-backbone
# ---------------------------------------
tag = "brink-dev/model-backbone:%s =>"

# Requires
# ---------------------------------------
models = require("./models.cjsx")

# Logic
# ---------------------------------------
m = {}

m.make = (modelSet)->
	defaults = {}
	fields = modelSet.fields
	_.each(fields, (el, i, x)->
		defaults[el.name] = el.default
		)
	x = _.omit(defaults, "submit")
	# console.log(tag, "defaults", x)
	return x

exports = module.exports = m 