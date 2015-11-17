# router
# ---------------------------------------
tag = "router:%s =>"

# Requires
# ---------------------------------------


# Logic
# ---------------------------------------

home = (req,res)->
	res.render("index")

r = (app)->
	app.get("/", home)
	app.get("/trackers", home)
	app.get("/stats", home)
	app.get("/dashboard", home)
	app.get("/settings", home)


exports = module.exports = r