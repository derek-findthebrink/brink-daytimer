# app
# ---------------------------------------
tag = "app:%s =>"

# Requires
# ---------------------------------------
# window requires
# each jQuery and slicknav.jquery are loaded via html-initiated requests to lib folder
window.$ = window.jQuery = require("jquery")
window._ = require("underscore")
window.React = require("react")
window.ReactFireMixin = require("reactfire")
window.Backbone = require("backbone")
require("../../../lib/backbonefire/src/backbonefire.js")
require("../../../lib/SlickNav/dist/jquery.slicknav.min.js")

# node requires
base = require("./connect.coffee")
window.b = new base("derek")

# backbone
collections = require("./collections/index")

# router
router = require("../../react/router")

# ui
ui = require("./ui")
views = require("../../react/index")



# Logic
# ---------------------------------------

app = window.App = {}
app.C = {}
app.C.collections = {}
app.C.collections.questions = collections.questions
app.C.collections.daytimers = collections.daytimers
app.c = {}
app.v = {}
app.r = {}
app.c.questions = new app.C.collections.questions()
app.c.daytimers = new app.C.collections.daytimers()


# ui
# views.nav.render()
ui.slicknav()
views.questions.render()