# brink-dev/model-refgen
# ---------------------------------------
tag = "brink-dev/model-refgen:%s =>"

# Requires
# ---------------------------------------
crypto = require("crypto")

# Logic
# ---------------------------------------

m = {}

refgen = (title, length, string)->
	t = title.toUpperCase().substring(0, 2 || title.length)
	hash = crypto.createHash("sha").update(string).digest("hex")
	fhash = hash.substring(0, length).toUpperCase()
	final = t + fhash
	# console.log(tag, "refgen:inputs", title, length, string, hash, final)
	return final

m.gen = refgen

exports = module.exports = m