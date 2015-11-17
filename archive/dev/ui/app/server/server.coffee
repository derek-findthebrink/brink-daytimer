# app/server/server
# ---------------------------------------
tag = "app/server/server:%s =>"

# Requires
# ---------------------------------------
express = require("express")
fs = require("fs")

# Logic
# ---------------------------------------


index = fs.readFileSync("./ui/index.html", {encoding: "utf8"})

app = express()

# setup
app.use(express.static("ui"))

# routing

app.get("*", (req,res)->
	res.send(index)
	res.end()
	)


server = app.listen(2000, ()->
	host = server.address().address
	port = server.address().port

	console.log(tag, "stats", "listening at: " + host + ":" + port)

	)