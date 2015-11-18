# brink-dev/model-mongoose
# ---------------------------------------
tag = "brink-dev/model-mongoose:%s =>"

# Requires
# ---------------------------------------
_ = require("underscore")

# Logic
# ---------------------------------------

m = {}

m.make = (modelSchema)->
	schema = {}
	fields = modelSchema.fields
	_.each(fields, (el, i, col)->
		schema[el.name] = el.typeDb
		)
	x = _.omit(schema, "submit")
	# console.log(x)
	return x


exports = module.exports = m