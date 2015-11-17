# index
# ---------------------------------------
tag = "index:%s =>"

# Requires
# ---------------------------------------
fs = require("fs")

express = require("express")
logger = require("morgan")
bodyParser = require("body-parser")
cookieParser = require("cookie-parser")
mongoose = require("mongoose")

routes = require("./router")
db = require "./db"


# Logic
# ---------------------------------------

mongo = "mongodb://localhost/daytimer"
mongoose.connect(mongo)

app = express()

# use
app.use(logger("dev"))
app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("./ui"))
app.set("views", "dev/ui/jade")
app.set("view engine", "jade")

# routes
routes(app)
db(app)

server = app.listen(2000, (req,res)->
	host = server.address().address
	port = server.address().port
	if host == "::"
		host = "localhost"

	console.log("Daytimer listening at http://%s:%s", host, port)
	)