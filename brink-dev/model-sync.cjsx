# brink-dev/model-sync
# ---------------------------------------
tag = "brink-dev/model-sync:%s =>"

# Requires
# ---------------------------------------
models = require("./models.cjsx")
reactForm = require("./form-react.cjsx")
modelBackbone = require("./model-backbone.cjsx")
modelMongoose = require("./model-mongoose.cjsx")


# Logic
# ---------------------------------------

m = {}
m.get = (modelName)->
	target = _.filter(models, (x)->
		x.name == modelName
		)
	# console.log(tag, "target", target)
	return target[0]

m.ReactFieldBuilder = reactForm.fieldBuilder

# backbone
m.makeBackboneDefaults = (name)->
	c = m.get(name)
	modelBackbone.make(c)

exports = module.exports = m