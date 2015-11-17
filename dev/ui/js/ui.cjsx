# app/ui
# ---------------------------------------
tag = "app/ui:%s =>"

# Requires
# ---------------------------------------


# Logic
# ---------------------------------------

slicknav = ->
	$("nav").slicknav({
		init: ->
			$("nav").hide()
			app.router.bindAnchors()
		prependTo: $(".slicknav")
		label: ""
		closeOnClick: true
		})

# console.log(tag, "init", "ui init!")

exports = module.exports = {
	slicknav: slicknav
}