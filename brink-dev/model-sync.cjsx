# brink-dev/model-sync
# ---------------------------------------
tag = "brink-dev/model-sync:%s =>"

# Requires
# ---------------------------------------
models = require("./models.cjsx")
_ = require("underscore")
reactForm = require("./form-react.cjsx")
modelBackbone = require("./model-backbone.cjsx")
modelMongoose = require("./model-mongoose.cjsx")
refgen = require("./model-refgen.cjsx")


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

m.makeMongooseSchema = (name)->
	c = m.get(name)
	modelMongoose.make(c)

m.refgen = refgen.gen

exports = module.exports = m