(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var exports, f, fieldBuilder, tag;

tag = "brink-dev/form-react:%s =>";

fieldBuilder = function(field) {
  if (!field.typeForm) {

  } else if (field.typeForm === "submit") {
    return React.createElement("div", null, React.createElement("label", {
      "className": "label-placeholder"
    }, "\u00a0"), React.createElement("input", {
      "type": "submit",
      "value": field.value
    }));
  } else if (field.typeForm === "select") {
    return React.createElement("div", null, React.createElement("label", {
      "htmlFor": field.name
    }, field.name), React.createElement("select", {
      "name": field.name
    }, field.list.map(function(x) {
      return React.createElement("option", {
        "value": x.value
      }, x.name);
    })));
  } else if (field.typeForm === "textarea") {
    return React.createElement("div", null, React.createElement("label", {
      "htmlFor": field.name
    }, field.name), React.createElement("textarea", {
      "name": field.name
    }));
  } else {
    return React.createElement("div", null, React.createElement("label", {
      "htmlFor": field.name
    }, field.name), React.createElement("input", {
      "type": field.typeForm,
      "name": field.name
    }));
  }
};

f = {};

f.fieldBuilder = fieldBuilder;

exports = module.exports = f;


},{}],2:[function(require,module,exports){
var exports, m, models, tag;

tag = "brink-dev/model-backbone:%s =>";

models = require("./models.cjsx");

m = {};

m.make = function(modelSet) {
  var defaults, fields, x;
  defaults = {};
  fields = modelSet.fields;
  _.each(fields, function(el, i, x) {
    return defaults[el.name] = el["default"];
  });
  x = _.omit(defaults, "submit");
  return x;
};

exports = module.exports = m;


},{"./models.cjsx":5}],3:[function(require,module,exports){
var exports, m, tag;

tag = "brink-dev/model-mongoose:%s =>";

m = {};

exports = module.exports = m;


},{}],4:[function(require,module,exports){
var exports, m, modelBackbone, modelMongoose, models, reactForm, tag;

tag = "brink-dev/model-sync:%s =>";

models = require("./models.cjsx");

reactForm = require("./form-react.cjsx");

modelBackbone = require("./model-backbone.cjsx");

modelMongoose = require("./model-mongoose.cjsx");

m = {};

m.get = function(modelName) {
  var target;
  target = _.filter(models, function(x) {
    return x.name === modelName;
  });
  return target[0];
};

m.ReactFieldBuilder = reactForm.fieldBuilder;

m.makeBackboneDefaults = function(name) {
  var c;
  c = m.get(name);
  return modelBackbone.make(c);
};

exports = module.exports = m;


},{"./form-react.cjsx":1,"./model-backbone.cjsx":2,"./model-mongoose.cjsx":3,"./models.cjsx":5}],5:[function(require,module,exports){
var exports, json, tag;

tag = "brink-dev/models:%s =>";

json = [
  {
    name: "trackers",
    action: "/data/trackers",
    fields: [
      {
        name: "type",
        "default": "boolean",
        typeDb: String,
        typeForm: "select",
        list: [
          {
            name: "boolean",
            value: "T01"
          }, {
            name: "process",
            value: "T02"
          }
        ]
      }, {
        name: "category",
        "default": "uncategorized",
        typeDb: String,
        typeForm: "select",
        list: [
          {
            name: "tucker",
            value: "C01"
          }, {
            name: "clean",
            value: "C02"
          }, {
            name: "nutrition",
            value: "C03"
          }, {
            name: "body",
            value: "C04"
          }, {
            name: "money",
            value: "C05"
          }
        ]
      }, {
        name: "question",
        "default": "",
        typeDb: String,
        typeForm: "text"
      }, {
        name: "frequency",
        "default": 0,
        typeDb: Number,
        typeForm: "number"
      }, {
        name: "minimum",
        "default": "0",
        typeDb: Number,
        typeForm: "number"
      }, {
        name: "timeRange",
        "default": "false",
        typeDb: String,
        typeForm: "range"
      }, {
        name: "goal",
        "default": "0",
        typeDb: Number,
        typeForm: "number"
      }, {
        name: "dateLastAnswered",
        "default": function() {
          return new Date();
        },
        typeDb: Date
      }, {
        name: "refs",
        "default": [],
        typeDb: []
      }, {
        name: "description",
        typeDb: String,
        "default": "",
        typeForm: "textarea"
      }, {
        name: "submit",
        value: "Submit",
        typeForm: "submit"
      }
    ]
  }, {
    name: "daytimers",
    fields: [
      {
        name: "questionRef",
        "default": "false",
        typeDb: String
      }, {
        name: "complete",
        "default": false,
        typeDb: Boolean
      }, {
        name: "start",
        "default": function() {
          return new Date();
        },
        typeDb: Date
      }, {
        name: "end",
        "default": function() {
          return new Date();
        },
        typeDb: Date
      }
    ]
  }
];

exports = module.exports = json;


},{}],6:[function(require,module,exports){
var brinkFormGen, daytimers, exports, modelDaytimer, modelQuestion, tag, trackers;

tag = "app/collections/questions:%s =>";

brinkFormGen = require("../../../../brink-dev/model-sync.cjsx");

modelQuestion = Backbone.Model.extend({
  idAttribute: "_id",
  defaults: brinkFormGen.makeBackboneDefaults("trackers")
});

trackers = Backbone.Collection.extend({
  url: "/data/trackers",
  model: modelQuestion,
  name: "trackers",
  initialize: function() {
    this.once("sync", (function(_this) {
      return function() {
        return _this.ready = true;
      };
    })(this));
    return this.fetch();
  },
  ready: false
});

modelDaytimer = Backbone.Model.extend({
  idAttribute: "_id",
  defaults: brinkFormGen.makeBackboneDefaults("daytimers")
});

daytimers = Backbone.Collection.extend({
  url: "/data/daytimers",
  model: modelDaytimer,
  name: "daytimers",
  initialize: function() {
    this.once("sync", (function(_this) {
      return function() {
        return _this.ready = true;
      };
    })(this));
    return this.fetch();
  },
  ready: false
});

exports = module.exports = {
  trackers: trackers,
  daytimers: daytimers
};


},{"../../../../brink-dev/model-sync.cjsx":4}],7:[function(require,module,exports){
var app, appReady, col, rMain, tag, ui, uiInit;

tag = "app:%s =>";

ui = require("./ui.cjsx");

col = require("./collections/index.cjsx");

rMain = require("./router/main.cjsx");

app = window.app = {};

_.extend(app, Backbone.Events);

app.c = {};

app.v = require("./react/index.cjsx");

app.c.trackers = new col.trackers();

app.c.daytimers = new col.daytimers();

uiInit = function() {
  app.router = new rMain();
  return $(document).ready(function() {
    return ui.slicknav();
  });
};

(appReady = function() {
  if (app.c.trackers.ready && app.c.daytimers.ready) {
    uiInit();
    return app.trigger("ready");
  } else {
    return _.delay(appReady, 20);
  }
})();


},{"./collections/index.cjsx":6,"./react/index.cjsx":9,"./router/main.cjsx":13,"./ui.cjsx":14}],8:[function(require,module,exports){
var Dashboard, d, exports, tag;

tag = "react/dashboard:%s =>";

d = {};

Dashboard = React.createClass({displayName: "Dashboard",
  render: function() {
    return React.createElement("div", null, React.createElement("h2", null, "Dashboard!"));
  }
});

d.Main = Dashboard;

exports = module.exports = d;


},{}],9:[function(require,module,exports){
var dashboard, exports, settings, stats, tag, trackers, v;

tag = "react/index:%s =>";

trackers = require("./trackers.cjsx");

dashboard = require("./dashboard.cjsx");

settings = require("./settings.cjsx");

stats = require("./stats.cjsx");

v = {};

v.Trackers = trackers;

v.Dashboard = dashboard;

v.Settings = settings;

v.Stats = stats;

exports = module.exports = v;


},{"./dashboard.cjsx":8,"./settings.cjsx":10,"./stats.cjsx":11,"./trackers.cjsx":12}],10:[function(require,module,exports){
var Settings, exports, s, tag;

tag = "react/settings:%s =>";

s = {};

Settings = React.createClass({displayName: "Settings",
  render: function() {
    return React.createElement("div", null, React.createElement("h2", null, "Settings"));
  }
});

s.Main = Settings;

exports = module.exports = s;


},{}],11:[function(require,module,exports){
var Stats, exports, s, tag;

tag = "react/settings:%s =>";

s = {};

Stats = React.createClass({displayName: "Stats",
  render: function() {
    return React.createElement("div", null, React.createElement("h2", null, "Stats"));
  }
});

s.Main = Stats;

exports = module.exports = s;


},{}],12:[function(require,module,exports){
var FieldBuilder, TrackerAdd, TrackerItem, Trackers, brinkFormGen, exports, fields, t, tag;

tag = "react/trackers:%s =>";

brinkFormGen = require("../../../../brink-dev/model-sync.cjsx");

t = {};

FieldBuilder = brinkFormGen.ReactFieldBuilder;

fields = brinkFormGen.get("trackers").fields;

Trackers = React.createClass({displayName: "Trackers",
  getInitialState: function() {
    return {
      trackers: []
    };
  },
  componentDidMount: function() {
    var setState, target;
    target = app.c.trackers;
    setState = (function(_this) {
      return function() {
        return _this.setState({
          trackers: target.toJSON()
        });
      };
    })(this);
    setState();
    return target.on("sync", (function(_this) {
      return function() {
        return setState();
      };
    })(this));
  },
  render: function() {
    var trackers;
    trackers = this.state.trackers;
    if (!trackers) {
      return;
    }
    return React.createElement("div", {
      "className": "trackers"
    }, React.createElement(TrackerAdd, {
      "fields": fields
    }), React.createElement("ul", {
      "className": "tracker-list"
    }, trackers.map(function(x) {
      return React.createElement(TrackerItem, {
        "tracker": x
      });
    })));
  }
});

TrackerItem = React.createClass({displayName: "TrackerItem",
  render: function() {
    var tracker;
    tracker = this.props.tracker;
    return React.createElement("li", null, React.createElement("p", null, tracker.category), React.createElement("h2", null, tracker.question), React.createElement("p", null, tracker.frequency, " \x2F day"), React.createElement("p", null, moment(tracker.dateLastAnswered).format("YYYY-MM-DD")));
  }
});

TrackerAdd = React.createClass({displayName: "TrackerAdd",
  componentDidMount: function() {
    var $this;
    $this = $(this.getDOMNode());
    $this.accordion({
      collapsible: true,
      heightStyle: "content",
      active: false
    });
    return $this.find("input[type='submit']").click((function(_this) {
      return function(e) {
        var d, form, redIt;
        form = $this.find("form");
        e.preventDefault();
        redIt = function(obj, v) {
          obj[v.name] = v.value;
          return obj;
        };
        d = form.serializeArray().reduce(redIt, {});
        console.log(tag, "form data", d);
        app.c.trackers.add(d);
        return $this.find("input, textarea").not("input[type='submit']").val("");
      };
    })(this));
  },
  render: function() {
    fields = this.props.fields;
    return React.createElement("div", null, React.createElement("h3", null, "Tracker Add"), React.createElement("form", null, fields.map(function(x) {
      return FieldBuilder(x);
    })));
  }
});

t.Main = Trackers;

exports = module.exports = t;


},{"../../../../brink-dev/model-sync.cjsx":4}],13:[function(require,module,exports){
var exports, main, tag;

tag = "router/main:%s =>";

main = Backbone.Router.extend({
  routes: {
    "trackers": "trackers",
    "dashboard": "dashboard",
    "stats": "stats",
    "settings": "settings"
  },
  initialize: function() {
    if (!Backbone.History.started) {
      Backbone.history.start({
        pushState: true
      });
    }
    return this;
  },
  bindAnchors: function() {
    var targets;
    targets = $("a[href^='/']");
    return targets.click((function(_this) {
      return function(e) {
        var target;
        e.preventDefault();
        target = e.currentTarget.pathname.replace("/", "");
        return _this.navigate(target, {
          trigger: true
        });
      };
    })(this));
  },
  trackers: function() {
    return React.render(React.createElement(app.v.Trackers.Main, null), $(".content")[0]);
  },
  dashboard: function() {
    console.log(tag, "dashboard", "init");
    return React.render(React.createElement(app.v.Dashboard.Main, null), $(".content")[0]);
  },
  stats: function() {
    console.log(tag, "stats", "init");
    return React.render(React.createElement(app.v.Stats.Main, null), $(".content")[0]);
  },
  settings: function() {
    console.log(tag, "settings", "init");
    return React.render(React.createElement(app.v.Settings.Main, null), $(".content")[0]);
  }
});

exports = module.exports = main;


},{}],14:[function(require,module,exports){
var exports, slicknav, tag;

tag = "app/ui:%s =>";

slicknav = function() {
  return $("nav").slicknav({
    init: function() {
      $("nav").hide();
      return app.router.bindAnchors();
    },
    prependTo: $(".slicknav"),
    label: "",
    closeOnClick: true
  });
};

exports = module.exports = {
  slicknav: slicknav
};


},{}]},{},[7])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9kZXJlay9iaXRzeW5jL2J0c3luYy9EZXZlbG9wZXIvdW5peC9kYXl0aW1lci9icmluay1kZXYvZm9ybS1yZWFjdC5janN4IiwiL2hvbWUvZGVyZWsvYml0c3luYy9idHN5bmMvRGV2ZWxvcGVyL3VuaXgvZGF5dGltZXIvYnJpbmstZGV2L21vZGVsLWJhY2tib25lLmNqc3giLCIvaG9tZS9kZXJlay9iaXRzeW5jL2J0c3luYy9EZXZlbG9wZXIvdW5peC9kYXl0aW1lci9icmluay1kZXYvbW9kZWwtbW9uZ29vc2UuY2pzeCIsIi9ob21lL2RlcmVrL2JpdHN5bmMvYnRzeW5jL0RldmVsb3Blci91bml4L2RheXRpbWVyL2JyaW5rLWRldi9tb2RlbC1zeW5jLmNqc3giLCIvaG9tZS9kZXJlay9iaXRzeW5jL2J0c3luYy9EZXZlbG9wZXIvdW5peC9kYXl0aW1lci9icmluay1kZXYvbW9kZWxzLmNqc3giLCIvaG9tZS9kZXJlay9iaXRzeW5jL2J0c3luYy9EZXZlbG9wZXIvdW5peC9kYXl0aW1lci9kZXYvdWkvanMvY29sbGVjdGlvbnMvaW5kZXguY2pzeCIsIi9ob21lL2RlcmVrL2JpdHN5bmMvYnRzeW5jL0RldmVsb3Blci91bml4L2RheXRpbWVyL2Rldi91aS9qcy9pbmRleC5janN4IiwiL2hvbWUvZGVyZWsvYml0c3luYy9idHN5bmMvRGV2ZWxvcGVyL3VuaXgvZGF5dGltZXIvZGV2L3VpL2pzL3JlYWN0L2Rhc2hib2FyZC5janN4IiwiL2hvbWUvZGVyZWsvYml0c3luYy9idHN5bmMvRGV2ZWxvcGVyL3VuaXgvZGF5dGltZXIvZGV2L3VpL2pzL3JlYWN0L2luZGV4LmNqc3giLCIvaG9tZS9kZXJlay9iaXRzeW5jL2J0c3luYy9EZXZlbG9wZXIvdW5peC9kYXl0aW1lci9kZXYvdWkvanMvcmVhY3Qvc2V0dGluZ3MuY2pzeCIsIi9ob21lL2RlcmVrL2JpdHN5bmMvYnRzeW5jL0RldmVsb3Blci91bml4L2RheXRpbWVyL2Rldi91aS9qcy9yZWFjdC9zdGF0cy5janN4IiwiL2hvbWUvZGVyZWsvYml0c3luYy9idHN5bmMvRGV2ZWxvcGVyL3VuaXgvZGF5dGltZXIvZGV2L3VpL2pzL3JlYWN0L3RyYWNrZXJzLmNqc3giLCIvaG9tZS9kZXJlay9iaXRzeW5jL2J0c3luYy9EZXZlbG9wZXIvdW5peC9kYXl0aW1lci9kZXYvdWkvanMvcm91dGVyL21haW4uY2pzeCIsIi9ob21lL2RlcmVrL2JpdHN5bmMvYnRzeW5jL0RldmVsb3Blci91bml4L2RheXRpbWVyL2Rldi91aS9qcy91aS5janN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDRUEsSUFBQTs7QUFBQSxHQUFBLEdBQU07O0FBVU4sWUFBQSxHQUFlLFNBQUMsS0FBRDtFQUNkLElBQUcsQ0FBQyxLQUFLLENBQUMsUUFBVjtBQUFBO0dBQUEsTUFFSyxJQUFHLEtBQUssQ0FBQyxRQUFOLEtBQWtCLFFBQXJCO1dBQ0osS0FBSyxDQUFDLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkIsSUFBM0IsRUFDQyxLQUFLLENBQUMsYUFBTixDQUFvQixPQUFwQixFQUE2QjtNQUFDLFdBQUEsRUFBYSxtQkFBZDtLQUE3QixFQUFpRSxRQUFqRSxDQURELEVBRUMsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsT0FBcEIsRUFBNkI7TUFBQyxNQUFBLEVBQVEsUUFBVDtNQUFtQixPQUFBLEVBQVUsS0FBSyxDQUFDLEtBQW5DO0tBQTdCLENBRkQsRUFESTtHQUFBLE1BS0EsSUFBRyxLQUFLLENBQUMsUUFBTixLQUFrQixRQUFyQjtXQUNKLEtBQUssQ0FBQyxhQUFOLENBQW9CLEtBQXBCLEVBQTJCLElBQTNCLEVBQ0MsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsT0FBcEIsRUFBNkI7TUFBQyxTQUFBLEVBQVksS0FBSyxD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Q0FDQyxLQUFLLENBQUMsYUFBTixDQUFvQixHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFoQyxFQUFzQyxJQUF0QyxDQURELEVBRUMsQ0FBQSxDQUFFLFVBQUYsQ0FBYyxDQUFBLENBQUEsQ0FGZjtFQUZNLENBbkNzQjtFQXlDN0IsUUFBQSxFQUFVLFNBQUE7SUFDVCxPQUFPLENBQUMsR0FBUixDQUFZLEdBQVosRUFBaUIsVUFBakIsRUFBNkIsTUFBN0I7V0FDQSxLQUFLLENBQUMsTUFBTixDQUNDLEtBQUssQ0FBQyxhQUFOLENBQW9CLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQW5DLEVBQXlDLElBQXpDLENBREQsRUFFQyxDQUFBLENBQUUsVUFBRixDQUFjLENBQUEsQ0FBQSxDQUZmO0VBRlMsQ0F6Q21CO0NBQXZCOztBQWtEUCxPQUFBLEdBQVUsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7QUMzRDNCLElBQUE7O0FBQUEsR0FBQSxHQUFNOztBQVNOLFFBQUEsR0FBVyxTQUFBO1NBQ1YsQ0FBQSxDQUFFLEtBQUYsQ0FBUSxDQUFDLFFBQVQsQ0FBa0I7SUFDakIsSUFBQSxFQUFNLFNBQUE7TUFDTCxDQUFBLENBQUUsS0FBRixDQUFRLENBQUMsSUFBVCxDQUFBO2FBQ0EsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFYLENBQUE7SUFGSyxDQURXO0lBSWpCLFNBQUEsRUFBVyxDQUFBLENBQUUsV0FBRixDQUpNO0lBS2pCLEtBQUEsRUFBTyxFQUxVO0lBTWpCLFlBQUEsRUFBYyxJQU5HO0dBQWxCO0FBRFU7O0FBWVgsT0FBQSxHQUFVLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0VBQzFCLFFBQUEsRUFBVSxRQURnQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIjIGJyaW5rLWRldi9mb3JtLXJlYWN0XG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudGFnID0gXCJicmluay1kZXYvZm9ybS1yZWFjdDolcyA9PlwiXG5cbiMgUmVxdWlyZXNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuIyBMb2dpY1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5maWVsZEJ1aWxkZXIgPSAoZmllbGQpLT5cblx0aWYgIWZpZWxkLnR5cGVGb3JtXG5cdFx0cmV0dXJuXG5cdGVsc2UgaWYgZmllbGQudHlwZUZvcm0gPT0gXCJzdWJtaXRcIlxuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7XCJjbGFzc05hbWVcIjogXCJsYWJlbC1wbGFjZWhvbGRlclwifSwgXCJcXHUwMGEwXCIpLFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcInR5cGVcIjogXCJzdWJtaXRcIiwgXCJ2YWx1ZVwiOiAoZmllbGQudmFsdWUpfSlcblx0XHQpXG5cdGVsc2UgaWYgZmllbGQudHlwZUZvcm0gPT0gXCJzZWxlY3RcIlxuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7XCJodG1sRm9yXCI6IChmaWVsZC5uYW1lKX0sIChmaWVsZC5uYW1lKSksXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHtcIm5hbWVcIjogKGZpZWxkLm5hbWUpfSxcblx0XHRcdFx0KFxuXHRcdFx0XHRcdGZpZWxkLmxpc3QubWFwKCh4KS0+XG5cdFx0XHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHtcInZhbHVlXCI6ICh4LnZhbHVlKX0sICh4Lm5hbWUpKVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KVxuXHRlbHNlIGlmIGZpZWxkLnR5cGVGb3JtID09IFwidGV4dGFyZWFcIlxuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7XCJodG1sRm9yXCI6IChmaWVsZC5uYW1lKX0sIChmaWVsZC5uYW1lKSksXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIiwge1wibmFtZVwiOiAoZmllbGQubmFtZSl9KVxuXHRcdClcblx0ZWxzZVxuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7XCJodG1sRm9yXCI6IChmaWVsZC5uYW1lKX0sIChmaWVsZC5uYW1lKSksXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge1widHlwZVwiOiAoZmllbGQudHlwZUZvcm0pLCBcIm5hbWVcIjogKGZpZWxkLm5hbWUpfSlcblx0XHQpXG5mID0ge31cbmYuZmllbGRCdWlsZGVyID0gZmllbGRCdWlsZGVyXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGYiLCIjIGJyaW5rLWRldi9tb2RlbC1iYWNrYm9uZVxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnRhZyA9IFwiYnJpbmstZGV2L21vZGVsLWJhY2tib25lOiVzID0+XCJcblxuIyBSZXF1aXJlc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbm1vZGVscyA9IHJlcXVpcmUoXCIuL21vZGVscy5janN4XCIpXG5cbiMgTG9naWNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5tID0ge31cblxubS5tYWtlID0gKG1vZGVsU2V0KS0+XG5cdGRlZmF1bHRzID0ge31cblx0ZmllbGRzID0gbW9kZWxTZXQuZmllbGRzXG5cdF8uZWFjaChmaWVsZHMsIChlbCwgaSwgeCktPlxuXHRcdGRlZmF1bHRzW2VsLm5hbWVdID0gZWwuZGVmYXVsdFxuXHRcdClcblx0eCA9IF8ub21pdChkZWZhdWx0cywgXCJzdWJtaXRcIilcblx0IyBjb25zb2xlLmxvZyh0YWcsIFwiZGVmYXVsdHNcIiwgeClcblx0cmV0dXJuIHhcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gbSAiLCIjIGJyaW5rLWRldi9tb2RlbC1tb25nb29zZVxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnRhZyA9IFwiYnJpbmstZGV2L21vZGVsLW1vbmdvb3NlOiVzID0+XCJcblxuIyBSZXF1aXJlc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4jIExvZ2ljXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tID0ge31cblxuXG5cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gbSIsIiMgYnJpbmstZGV2L21vZGVsLXN5bmNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG50YWcgPSBcImJyaW5rLWRldi9tb2RlbC1zeW5jOiVzID0+XCJcblxuIyBSZXF1aXJlc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbm1vZGVscyA9IHJlcXVpcmUoXCIuL21vZGVscy5janN4XCIpXG5yZWFjdEZvcm0gPSByZXF1aXJlKFwiLi9mb3JtLXJlYWN0LmNqc3hcIilcbm1vZGVsQmFja2JvbmUgPSByZXF1aXJlKFwiLi9tb2RlbC1iYWNrYm9uZS5janN4XCIpXG5tb2RlbE1vbmdvb3NlID0gcmVxdWlyZShcIi4vbW9kZWwtbW9uZ29vc2UuY2pzeFwiKVxuXG5cbiMgTG9naWNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm0gPSB7fVxubS5nZXQgPSAobW9kZWxOYW1lKS0+XG5cdHRhcmdldCA9IF8uZmlsdGVyKG1vZGVscywgKHgpLT5cblx0XHR4Lm5hbWUgPT0gbW9kZWxOYW1lXG5cdFx0KVxuXHQjIGNvbnNvbGUubG9nKHRhZywgXCJ0YXJnZXRcIiwgdGFyZ2V0KVxuXHRyZXR1cm4gdGFyZ2V0WzBdXG5cbm0uUmVhY3RGaWVsZEJ1aWxkZXIgPSByZWFjdEZvcm0uZmllbGRCdWlsZGVyXG5cbiMgYmFja2JvbmVcbm0ubWFrZUJhY2tib25lRGVmYXVsdHMgPSAobmFtZSktPlxuXHRjID0gbS5nZXQobmFtZSlcblx0bW9kZWxCYWNrYm9uZS5tYWtlKGMpXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IG0iLCIjIGJyaW5rLWRldi9tb2RlbHNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG50YWcgPSBcImJyaW5rLWRldi9tb2RlbHM6JXMgPT5cIlxuXG4jIFJlcXVpcmVzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiMgTG9naWNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmpzb24gPSBbXG5cdFx0e1xuXHRcdFx0bmFtZTogXCJ0cmFja2Vyc1wiXG5cdFx0XHRhY3Rpb246IFwiL2RhdGEvdHJhY2tlcnNcIlxuXHRcdFx0ZmllbGRzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcInR5cGVcIlxuXHRcdFx0XHRcdGRlZmF1bHQ6IFwiYm9vbGVhblwiXG5cdFx0XHRcdFx0dHlwZURiOiBTdHJpbmdcblx0XHRcdFx0XHR0eXBlRm9ybTogXCJzZWxlY3RcIlxuXHRcdFx0XHRcdGxpc3Q6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bmFtZTogXCJib29sZWFuXCJcblx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiVDAxXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bmFtZTogXCJwcm9jZXNzXCJcblx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiVDAyXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH1cblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiY2F0ZWdvcnlcIlxuXHRcdFx0XHRcdGRlZmF1bHQ6IFwidW5jYXRlZ29yaXplZFwiXG5cdFx0XHRcdFx0dHlwZURiOiBTdHJpbmdcblx0XHRcdFx0XHR0eXBlRm9ybTogXCJzZWxlY3RcIlxuXHRcdFx0XHRcdGxpc3Q6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bmFtZTogXCJ0dWNrZXJcIlxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJDMDFcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBcImNsZWFuXCJcblx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiQzAyXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bmFtZTogXCJudXRyaXRpb25cIlxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJDMDNcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBcImJvZHlcIlxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJDMDRcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBcIm1vbmV5XCJcblx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiQzA1XCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH1cblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwicXVlc3Rpb25cIlxuXHRcdFx0XHRcdGRlZmF1bHQ6IFwiXCJcblx0XHRcdFx0XHR0eXBlRGI6IFN0cmluZ1xuXHRcdFx0XHRcdHR5cGVGb3JtOiBcInRleHRcIlxuXHRcdFx0XHR9XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcImZyZXF1ZW5jeVwiXG5cdFx0XHRcdFx0ZGVmYXVsdDogMFxuXHRcdFx0XHRcdHR5cGVEYjogTnVtYmVyXG5cdFx0XHRcdFx0dHlwZUZvcm06IFwibnVtYmVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJtaW5pbXVtXCJcblx0XHRcdFx0XHRkZWZhdWx0OiBcIjBcIlxuXHRcdFx0XHRcdHR5cGVEYjogTnVtYmVyXG5cdFx0XHRcdFx0dHlwZUZvcm06IFwibnVtYmVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJ0aW1lUmFuZ2VcIlxuXHRcdFx0XHRcdGRlZmF1bHQ6IFwiZmFsc2VcIlxuXHRcdFx0XHRcdHR5cGVEYjogU3RyaW5nXG5cdFx0XHRcdFx0dHlwZUZvcm06IFwicmFuZ2VcIlxuXHRcdFx0XHR9XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcImdvYWxcIlxuXHRcdFx0XHRcdGRlZmF1bHQ6IFwiMFwiXG5cdFx0XHRcdFx0dHlwZURiOiBOdW1iZXJcblx0XHRcdFx0XHR0eXBlRm9ybTogXCJudW1iZXJcIlxuXHRcdFx0XHR9XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcImRhdGVMYXN0QW5zd2VyZWRcIlxuXHRcdFx0XHRcdGRlZmF1bHQ6IC0+XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3IERhdGUoKVxuXHRcdFx0XHRcdHR5cGVEYjogRGF0ZSBcblx0XHRcdFx0fVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJyZWZzXCJcblx0XHRcdFx0XHRkZWZhdWx0OiBbXVxuXHRcdFx0XHRcdHR5cGVEYjogW11cblx0XHRcdFx0fVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJkZXNjcmlwdGlvblwiXG5cdFx0XHRcdFx0dHlwZURiOiBTdHJpbmdcblx0XHRcdFx0XHRkZWZhdWx0OiBcIlwiXG5cdFx0XHRcdFx0dHlwZUZvcm06IFwidGV4dGFyZWFcIlxuXHRcdFx0XHR9XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcInN1Ym1pdFwiXG5cdFx0XHRcdFx0dmFsdWU6IFwiU3VibWl0XCJcblx0XHRcdFx0XHR0eXBlRm9ybTogXCJzdWJtaXRcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fVxuXHRcdHtcblx0XHRcdG5hbWU6IFwiZGF5dGltZXJzXCJcblx0XHRcdGZpZWxkczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJxdWVzdGlvblJlZlwiXG5cdFx0XHRcdFx0ZGVmYXVsdDogXCJmYWxzZVwiXG5cdFx0XHRcdFx0dHlwZURiOiBTdHJpbmdcblx0XHRcdFx0fVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJjb21wbGV0ZVwiXG5cdFx0XHRcdFx0ZGVmYXVsdDogZmFsc2Vcblx0XHRcdFx0XHR0eXBlRGI6IEJvb2xlYW4gXG5cdFx0XHRcdH1cblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwic3RhcnRcIlxuXHRcdFx0XHRcdGRlZmF1bHQ6IC0+XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3IERhdGUoKVxuXHRcdFx0XHRcdHR5cGVEYjogRGF0ZVxuXHRcdFx0XHR9XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcImVuZFwiXG5cdFx0XHRcdFx0ZGVmYXVsdDogLT5cblx0XHRcdFx0XHRcdHJldHVybiBuZXcgRGF0ZSgpXG5cdFx0XHRcdFx0dHlwZURiOiBEYXRlXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9XG5cdF1cblxuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBqc29uIiwiIyBhcHAvY29sbGVjdGlvbnMvcXVlc3Rpb25zXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudGFnID0gXCJhcHAvY29sbGVjdGlvbnMvcXVlc3Rpb25zOiVzID0+XCJcblxuIyBSZXF1aXJlc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmJyaW5rRm9ybUdlbiA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9icmluay1kZXYvbW9kZWwtc3luYy5janN4XCIpXG5cbiMgTG9naWNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMgY29uc29sZS5sb2codGFnLCBcImJmZ1wiLCBicmlua0Zvcm1HZW4pXG4jIGJyaW5rRm9ybUdlbi5tYWtlQmFja2JvbmUoXCJkYXl0aW1lcnNcIilcblxuXG4jIFF1ZXN0aW9uc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgQmFja2JvbmUgTW9kZWxcbiMgdXNlZCB0byBhZGQgcXVlc3Rpb25zIHRvIGZpcmViYXNlXG5cbiMgVEFTSzogaW1tdXRhYmxlIC0+IHRydWVcblxubW9kZWxRdWVzdGlvbiA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XG5cdGlkQXR0cmlidXRlOiBcIl9pZFwiXG5cdGRlZmF1bHRzOiBicmlua0Zvcm1HZW4ubWFrZUJhY2tib25lRGVmYXVsdHMoXCJ0cmFja2Vyc1wiKVxuXHR9KVxuXG5cbiMgQmFja2JvbmUvRmlyZWJhc2UgQ29sbGVjdGlvblxuIyB1c2VkIHRvIGFkZCBtb2RlbHMgLT4gcmVhY3QgaGFuZGxlcyBhbGwgdWkgYnVzaW5lc3NcblxudHJhY2tlcnMgPSBCYWNrYm9uZS5Db2xsZWN0aW9uLmV4dGVuZCh7XG5cdHVybDogXCIvZGF0YS90cmFja2Vyc1wiXG5cdG1vZGVsOiBtb2RlbFF1ZXN0aW9uXG5cdG5hbWU6IFwidHJhY2tlcnNcIlxuXHRpbml0aWFsaXplOiAtPlxuXHRcdHRoaXMub25jZShcInN5bmNcIiwgPT5cblx0XHRcdHRoaXMucmVhZHkgPSB0cnVlXG5cdFx0XHQpXG5cdFx0dGhpcy5mZXRjaCgpXG5cdHJlYWR5OiBmYWxzZVxuXHR9KVxuXG5cblxuXG5cblxuIyBEYXl0aW1lclxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIEJhY2tib25lIE1vZGVsXG4jIHVzZWQgdG8gYWRkIG5ldyBlbnRyaWVzIHRvIERheXRpbWVyIGNvbGxlY3Rpb25cblxubW9kZWxEYXl0aW1lciA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XG5cdGlkQXR0cmlidXRlOiBcIl9pZFwiXG5cdGRlZmF1bHRzOiBicmlua0Zvcm1HZW4ubWFrZUJhY2tib25lRGVmYXVsdHMoXCJkYXl0aW1lcnNcIilcblx0fSlcblxuIyBCYWNrYm9uZS9GaXJlYmFzZSBDb2xsZWN0aW9uXG4jIHRoZSBkYXl0aW1lciBjb2xsZWN0aW9uXG4jIG9iamVjdHMgYXJlIHByb2dyYW1hdGljYWxseSBhZGRlZFxuXG5kYXl0aW1lcnMgPSBCYWNrYm9uZS5Db2xsZWN0aW9uLmV4dGVuZCh7XG5cdHVybDogXCIvZGF0YS9kYXl0aW1lcnNcIlxuXHRtb2RlbDogbW9kZWxEYXl0aW1lclxuXHRuYW1lOiBcImRheXRpbWVyc1wiXG5cdGluaXRpYWxpemU6IC0+XG5cdFx0dGhpcy5vbmNlKFwic3luY1wiLCA9PlxuXHRcdFx0dGhpcy5yZWFkeSA9IHRydWVcblx0XHRcdClcblx0XHR0aGlzLmZldGNoKClcblx0cmVhZHk6IGZhbHNlXG5cdH0pXG5cblxuXG5cblxuXG4jIEV4cG9ydHNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB7XG5cdHRyYWNrZXJzOiB0cmFja2Vyc1xuXHRkYXl0aW1lcnM6IGRheXRpbWVyc1xufSIsIiMgYXBwXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudGFnID0gXCJhcHA6JXMgPT5cIlxuXG4jIFJlcXVpcmVzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudWkgPSByZXF1aXJlIFwiLi91aS5janN4XCJcbmNvbCA9IHJlcXVpcmUgXCIuL2NvbGxlY3Rpb25zL2luZGV4LmNqc3hcIlxuck1haW4gPSByZXF1aXJlIFwiLi9yb3V0ZXIvbWFpbi5janN4XCJcblxuXG4jIExvZ2ljXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuYXBwID0gd2luZG93LmFwcCA9IHt9XG5cbl8uZXh0ZW5kKGFwcCwgQmFja2JvbmUuRXZlbnRzKVxuXG5hcHAuYyA9IHt9XG5hcHAudiA9IHJlcXVpcmUgXCIuL3JlYWN0L2luZGV4LmNqc3hcIlxuYXBwLmMudHJhY2tlcnMgPSBuZXcgY29sLnRyYWNrZXJzKClcbmFwcC5jLmRheXRpbWVycyA9IG5ldyBjb2wuZGF5dGltZXJzKClcblxudWlJbml0ID0gLT5cblx0YXBwLnJvdXRlciA9IG5ldyByTWFpbigpXG5cdCQoZG9jdW1lbnQpLnJlYWR5KCgpLT5cblx0XHR1aS5zbGlja25hdigpXG5cdFx0KVxuXHRcblxuZG8gYXBwUmVhZHkgPSAtPlxuXHRpZiBhcHAuYy50cmFja2Vycy5yZWFkeSAmJiBhcHAuYy5kYXl0aW1lcnMucmVhZHkgXG5cdFx0dWlJbml0KClcblx0XHRhcHAudHJpZ2dlcihcInJlYWR5XCIpXG5cdGVsc2Vcblx0XHRfLmRlbGF5KGFwcFJlYWR5LCAyMClcblxuXG4jIHVpIGxvZ2ljXG4iLCIjIHJlYWN0L2Rhc2hib2FyZFxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnRhZyA9IFwicmVhY3QvZGFzaGJvYXJkOiVzID0+XCJcblxuIyBSZXF1aXJlc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4jIExvZ2ljXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5kID0ge31cblxuRGFzaGJvYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRyZW5kZXI6IC0+XG5cdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImgyXCIsIG51bGwsIFwiRGFzaGJvYXJkIVwiKVxuXHRcdClcblx0fSlcblxuZC5NYWluID0gRGFzaGJvYXJkXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGQiLCIjIHJlYWN0L2luZGV4XG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudGFnID0gXCJyZWFjdC9pbmRleDolcyA9PlwiXG5cbiMgUmVxdWlyZXNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG50cmFja2VycyA9IHJlcXVpcmUgXCIuL3RyYWNrZXJzLmNqc3hcIlxuZGFzaGJvYXJkID0gcmVxdWlyZSBcIi4vZGFzaGJvYXJkLmNqc3hcIlxuc2V0dGluZ3MgPSByZXF1aXJlIFwiLi9zZXR0aW5ncy5janN4XCJcbnN0YXRzID0gcmVxdWlyZSBcIi4vc3RhdHMuY2pzeFwiXG5cbiMgTG9naWNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnYgPSB7fVxuXG52LlRyYWNrZXJzID0gdHJhY2tlcnNcbnYuRGFzaGJvYXJkID0gZGFzaGJvYXJkXG52LlNldHRpbmdzICA9IHNldHRpbmdzXG52LlN0YXRzID0gc3RhdHNcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdiIsIiMgcmVhY3Qvc2V0dGluZ3NcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG50YWcgPSBcInJlYWN0L3NldHRpbmdzOiVzID0+XCJcblxuIyBSZXF1aXJlc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4jIExvZ2ljXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5zID0ge31cblxuXG5TZXR0aW5ncyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cmVuZGVyOiAtPlxuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBudWxsLCBcIlNldHRpbmdzXCIpXG5cdFx0KVxuXHR9KVxuXG5zLk1haW4gPSBTZXR0aW5nc1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzIiwiIyByZWFjdC9zZXR0aW5nc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnRhZyA9IFwicmVhY3Qvc2V0dGluZ3M6JXMgPT5cIlxuXG4jIFJlcXVpcmVzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiMgTG9naWNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnMgPSB7fVxuXG5TdGF0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cmVuZGVyOiAtPlxuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBudWxsLCBcIlN0YXRzXCIpXG5cdFx0KVxuXHR9KVxuXG5zLk1haW4gPSBTdGF0c1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzIiwiIyByZWFjdC90cmFja2Vyc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnRhZyA9IFwicmVhY3QvdHJhY2tlcnM6JXMgPT5cIlxuXG4jIFJlcXVpcmVzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuYnJpbmtGb3JtR2VuID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL2JyaW5rLWRldi9tb2RlbC1zeW5jLmNqc3hcIilcblxuIyBMb2dpY1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudCA9IHt9XG5cbiMgYnJpbmstZGV2OiBmb3JtIGdlbmVyYXRvclxuRmllbGRCdWlsZGVyID0gYnJpbmtGb3JtR2VuLlJlYWN0RmllbGRCdWlsZGVyXG5maWVsZHMgPSBicmlua0Zvcm1HZW4uZ2V0KFwidHJhY2tlcnNcIikuZmllbGRzXG5cblxuVHJhY2tlcnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGdldEluaXRpYWxTdGF0ZTogLT5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dHJhY2tlcnM6IFtdXG5cdFx0fVxuXHRjb21wb25lbnREaWRNb3VudDogLT5cblx0XHR0YXJnZXQgPSBhcHAuYy50cmFja2Vyc1xuXHRcdHNldFN0YXRlID0gPT5cblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHR0cmFja2VyczogdGFyZ2V0LnRvSlNPTigpXG5cdFx0XHRcdH0pXG5cdFx0c2V0U3RhdGUoKVxuXHRcdHRhcmdldC5vbihcInN5bmNcIiwgPT5cblx0XHRcdHNldFN0YXRlKClcblx0XHRcdClcblx0cmVuZGVyOiAtPlxuXHRcdHRyYWNrZXJzID0gdGhpcy5zdGF0ZS50cmFja2Vyc1xuXHRcdGlmICF0cmFja2VycyBcblx0XHRcdHJldHVyblxuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwidHJhY2tlcnNcIn0sXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFRyYWNrZXJBZGQsIHtcImZpZWxkc1wiOiAoZmllbGRzKX0pLFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHtcImNsYXNzTmFtZVwiOiBcInRyYWNrZXItbGlzdFwifSxcblx0XHRcdFx0KFxuXHRcdFx0XHRcdHRyYWNrZXJzLm1hcCgoeCktPlxuXHRcdFx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChUcmFja2VySXRlbSwge1widHJhY2tlclwiOiAoeCl9KVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KVxuXHR9KVxuXG5UcmFja2VySXRlbSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cmVuZGVyOiAtPlxuXHRcdHRyYWNrZXIgPSB0aGlzLnByb3BzLnRyYWNrZXJcblx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsICh0cmFja2VyLmNhdGVnb3J5KSksXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgbnVsbCwgKHRyYWNrZXIucXVlc3Rpb24pKSxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsICh0cmFja2VyLmZyZXF1ZW5jeSksIFwiIFxceDJGIGRheVwiKSxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIChtb21lbnQodHJhY2tlci5kYXRlTGFzdEFuc3dlcmVkKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpKSlcblx0XHQpXG5cdH0pXG5cblRyYWNrZXJBZGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGNvbXBvbmVudERpZE1vdW50OiAtPlxuXHRcdCR0aGlzID0gJCh0aGlzLmdldERPTU5vZGUoKSlcblx0XHQkdGhpcy5hY2NvcmRpb24oe1xuXHRcdFx0Y29sbGFwc2libGU6IHRydWVcblx0XHRcdGhlaWdodFN0eWxlOiBcImNvbnRlbnRcIlxuXHRcdFx0YWN0aXZlOiBmYWxzZVxuXHRcdFx0fSlcblx0XHQkdGhpcy5maW5kKFwiaW5wdXRbdHlwZT0nc3VibWl0J11cIikuY2xpY2soKGUpPT5cblx0XHRcdGZvcm0gPSAkdGhpcy5maW5kKFwiZm9ybVwiKVxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRyZWRJdCA9IChvYmosIHYpLT5cblx0XHRcdFx0b2JqW3YubmFtZV0gPSB2LnZhbHVlXG5cdFx0XHRcdHJldHVybiBvYmpcblx0XHRcdGQgPSBmb3JtLnNlcmlhbGl6ZUFycmF5KCkucmVkdWNlKHJlZEl0LCB7fSlcblx0XHRcdGNvbnNvbGUubG9nKHRhZywgXCJmb3JtIGRhdGFcIiwgZClcblx0XHRcdGFwcC5jLnRyYWNrZXJzLmFkZChkKVxuXHRcdFx0JHRoaXMuZmluZChcImlucHV0LCB0ZXh0YXJlYVwiKS5ub3QoXCJpbnB1dFt0eXBlPSdzdWJtaXQnXVwiKS52YWwoXCJcIilcblx0XHRcdClcblx0cmVuZGVyOiAtPlxuXHRcdGZpZWxkcyA9IHRoaXMucHJvcHMuZmllbGRzXG5cdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImgzXCIsIG51bGwsIFwiVHJhY2tlciBBZGRcIiksXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiLCBudWxsLFxuXHRcdFx0XHQoXG5cdFx0XHRcdFx0ZmllbGRzLm1hcCgoeCktPlxuXHRcdFx0XHRcdFx0IyBjb25zb2xlLmxvZyh0YWcsIFwiZmllbGRcIiwgeClcblx0XHRcdFx0XHRcdEZpZWxkQnVpbGRlcih4KVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0KVxuXHR9KVxuXG5cbnQuTWFpbiA9IFRyYWNrZXJzXG5cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdCIsIiMgcm91dGVyL21haW5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG50YWcgPSBcInJvdXRlci9tYWluOiVzID0+XCJcblxuIyBSZXF1aXJlc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4jIExvZ2ljXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tYWluID0gQmFja2JvbmUuUm91dGVyLmV4dGVuZCh7XG5cdHJvdXRlczpcblx0XHRcInRyYWNrZXJzXCI6IFx0XCJ0cmFja2Vyc1wiXG5cdFx0XCJkYXNoYm9hcmRcIjogXHRcImRhc2hib2FyZFwiXG5cdFx0XCJzdGF0c1wiOiBcdFx0XCJzdGF0c1wiXG5cdFx0XCJzZXR0aW5nc1wiOiBcdFwic2V0dGluZ3NcIlxuXHRpbml0aWFsaXplOiAtPlxuXHRcdCMgY29uc29sZS5sb2codGFnLCBcIlJvdXRlclwiLCBcImluaXQhXCIpXG5cdFx0aWYgIUJhY2tib25lLkhpc3Rvcnkuc3RhcnRlZFxuXHRcdFx0QmFja2JvbmUuaGlzdG9yeS5zdGFydCh7XG5cdFx0XHRcdHB1c2hTdGF0ZTogdHJ1ZVxuXHRcdFx0XHR9KVxuXHRcdHJldHVybiB0aGlzXG5cdGJpbmRBbmNob3JzOiAtPlxuXHRcdHRhcmdldHMgPSAkKFwiYVtocmVmXj0nLyddXCIpXG5cdFx0IyBjb25zb2xlLmxvZyh0YWcsIFwiYmluZEFuY2hvcnM6dGFyZ2V0c1wiLCB0YXJnZXRzKVxuXHRcdHRhcmdldHMuY2xpY2soKGUpPT5cblx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0IyBjb25zb2xlLmxvZyh0YWcsIFwiZXZlbnRcIiwgZSlcblx0XHRcdHRhcmdldCA9IGUuY3VycmVudFRhcmdldC5wYXRobmFtZS5yZXBsYWNlKFwiL1wiLCBcIlwiKVxuXHRcdFx0IyBjb25zb2xlLmxvZyh0YWcsIFwiYW5jaG9yOmNsaWNrXCIsIHRhcmdldClcblx0XHRcdHRoaXMubmF2aWdhdGUodGFyZ2V0LCB7dHJpZ2dlcjogdHJ1ZX0pXG5cdFx0XHQpXG5cdHRyYWNrZXJzOiAtPlxuXHRcdCMgY29uc29sZS5sb2codGFnLCBcInRyYWNrZXJzXCIsIFwiaW5pdCFcIilcblx0XHRSZWFjdC5yZW5kZXIoXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KGFwcC52LlRyYWNrZXJzLk1haW4sIG51bGwpXG5cdFx0XHQkKFwiLmNvbnRlbnRcIilbMF1cblx0XHRcdClcblx0ZGFzaGJvYXJkOiAtPlxuXHRcdGNvbnNvbGUubG9nKHRhZyxcImRhc2hib2FyZFwiLCBcImluaXRcIilcblx0XHRSZWFjdC5yZW5kZXIoXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KGFwcC52LkRhc2hib2FyZC5NYWluLCBudWxsKVxuXHRcdFx0JChcIi5jb250ZW50XCIpWzBdXG5cdFx0XHQpXG5cdHN0YXRzOiAtPlxuXHRcdGNvbnNvbGUubG9nKHRhZywgXCJzdGF0c1wiLCBcImluaXRcIilcblx0XHRSZWFjdC5yZW5kZXIoXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KGFwcC52LlN0YXRzLk1haW4sIG51bGwpXG5cdFx0XHQkKFwiLmNvbnRlbnRcIilbMF1cblx0XHRcdClcblx0c2V0dGluZ3M6IC0+XG5cdFx0Y29uc29sZS5sb2codGFnLCBcInNldHRpbmdzXCIsIFwiaW5pdFwiKVxuXHRcdFJlYWN0LnJlbmRlcihcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoYXBwLnYuU2V0dGluZ3MuTWFpbiwgbnVsbClcblx0XHRcdCQoXCIuY29udGVudFwiKVswXVxuXHRcdFx0KVxuXHR9KVx0XG5cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gbWFpbiIsIiMgYXBwL3VpXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudGFnID0gXCJhcHAvdWk6JXMgPT5cIlxuXG4jIFJlcXVpcmVzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiMgTG9naWNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnNsaWNrbmF2ID0gLT5cblx0JChcIm5hdlwiKS5zbGlja25hdih7XG5cdFx0aW5pdDogLT5cblx0XHRcdCQoXCJuYXZcIikuaGlkZSgpXG5cdFx0XHRhcHAucm91dGVyLmJpbmRBbmNob3JzKClcblx0XHRwcmVwZW5kVG86ICQoXCIuc2xpY2tuYXZcIilcblx0XHRsYWJlbDogXCJcIlxuXHRcdGNsb3NlT25DbGljazogdHJ1ZVxuXHRcdH0pXG5cbiMgY29uc29sZS5sb2codGFnLCBcImluaXRcIiwgXCJ1aSBpbml0IVwiKVxuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB7XG5cdHNsaWNrbmF2OiBzbGlja25hdlxufSJdfQ==
