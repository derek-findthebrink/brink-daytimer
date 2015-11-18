# models
# ---------------------------------------
tag = "models:%s =>"

# Requires
# ---------------------------------------
require("node-cjsx").transform()
mongoose = require("mongoose")
Schema = mongoose.Schema

brinkModelGen = require("../brink-dev/model-sync.cjsx")

# Logic
# ---------------------------------------


QuestionSchema = new Schema(brinkModelGen.makeMongooseSchema("trackers"))

DaytimerSchema = new Schema(brinkModelGen.makeMongooseSchema("daytimers"))

TypesSchema = new Schema(brinkModelGen.makeMongooseSchema("types"))

CategoriesSchema = new Schema(brinkModelGen.makeMongooseSchema("categories"))

mongoose.model("Question", QuestionSchema)
mongoose.model("Daytimer", DaytimerSchema)
mongoose.model("Type", TypesSchema)
mongoose.model("Category", CategoriesSchema)

