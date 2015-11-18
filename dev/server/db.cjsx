# db
# ---------------------------------------
tag = "db:%s =>"

# Requires
# ---------------------------------------
mongoose = require("mongoose")
models = require "./models"

Question = mongoose.model("Question")
Daytimer = mongoose.model("Daytimer")
Type = mongoose.model("Type")
Category = mongoose.model("Category")

# Logic
# ---------------------------------------

# helper functions
h = {}
h.get = (schema)->
	return (req, res)->
		send = (err, data)->
			if err
				console.log(tag, "get-error", err)
				res.send(400)
				res.end()
			else
				res.jsonp(data)
				res.end()
		schema.find().exec(send)

h.add = (schema)->
	return (req,res)->
		schema.create(req.body, (err, s)->
			if err
				res.sendStatus(400)
				res.end()
				console.log(tag, "add:err", err)
			else
				res.jsonp(s)
				res.end()
			)

h.update = (schema)->
	return (req,res)->
		data = req.body
		id = data._id
		delete data._id
		schema.update({
			_id: req.params.id
			}, req.body, {upsert: true}, (err, raw)=>
				if err
					console.log(tag, "update", err)
					res.status(400).end()
				else
					console.log(tag, "update success! raw: ", raw)
					res.status(200).end()
				)

h.delete = (schema)->
	return (req,res)->
		schema.remove({
			_id: req.params.id
			}, (err)->
				if err
					res.send(err)
					res.status(400).end()
				else
					console.log("deleted", req.params.id)
					res.status(200).end()
				)

d = (app)=>

	app.get("/data/trackers", h.get(Question))
	app.post("/data/trackers", h.add(Question))
	app.put("/data/trackers/:id", h.update(Question))
	app.delete("/data/trackers/:id", h.delete(Question))

	app.get("/data/daytimers", h.get(Daytimer))
	app.post("/data/daytimers", h.add(Daytimer))
	app.put("/data/daytimers/:id", h.update(Daytimer))
	app.delete("/data/daytimers/:id", h.delete(Daytimer))

	app.get("/data/categories", h.get(Category))
	app.post("/data/categories", h.add(Category))
	app.put("/data/categories/:id", h.update(Category))
	app.delete("/data/categories/:id", h.delete(Category))

	app.get("/data/types", h.get(Type))
	app.post("/data/types", h.add(Type))
	app.put("/data/types/:id", h.update(Type))
	app.delete("/data/types/:id", h.delete(Type))




exports = module.exports = d