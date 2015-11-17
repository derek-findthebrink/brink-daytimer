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
  console.log(tag, "defaults", x);
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

m.makeBackbone = function(name) {
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

console.log(tag, "bfg", brinkFormGen);

brinkFormGen.makeBackbone("daytimers");

modelQuestion = Backbone.Model.extend({
  idAttribute: "_id",
  defaults: {
    type: "boolean",
    category: "uncategorized",
    question: "",
    frequency: 1,
    min: 0,
    timeRange: false,
    goal: 0,
    dateLastAnswered: new Date(),
    refs: []
  }
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
  defaults: {
    questionRef: false,
    date: new Date(),
    complete: false,
    start: false,
    end: false
  }
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


},{"./collections/index.cjsx":6,"./react/index.cjsx":8,"./router/main.cjsx":10,"./ui.cjsx":11}],8:[function(require,module,exports){
var exports, tag, trackers, v;

tag = "react/index:%s =>";

trackers = require("./trackers.cjsx");

v = {};

v.Trackers = trackers;

exports = module.exports = v;


},{"./trackers.cjsx":9}],9:[function(require,module,exports){
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
    return React.createElement("li", null, React.createElement("div", {
      "className": "todayItem-details"
    }, React.createElement("img", {
      "src": "/assets/caret-complete.png"
    })), React.createElement("div", {
      "className": "todayItem-question"
    }, React.createElement("h2", null, tracker.question)), React.createElement("div", {
      "className": "todayItem-menu"
    }, React.createElement("img", {
      "src": "/assets/button-complete.png"
    })));
  }
});

TrackerAdd = React.createClass({displayName: "TrackerAdd",
  componentDidMount: function() {
    var $this;
    $this = $(this.getDOMNode());
    $this.accordion({
      collapsible: true,
      heightStyle: "content"
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


},{"../../../../brink-dev/model-sync.cjsx":4}],10:[function(require,module,exports){
var exports, main, tag;

tag = "router/main:%s =>";

main = Backbone.Router.extend({
  routes: {
    "trackers": "trackers"
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
  }
});

exports = module.exports = main;


},{}],11:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9kZXJlay9iaXRzeW5jL2J0c3luYy9EZXZlbG9wZXIvdW5peC9kYXl0aW1lci9icmluay1kZXYvZm9ybS1yZWFjdC5janN4IiwiL2hvbWUvZGVyZWsvYml0c3luYy9idHN5bmMvRGV2ZWxvcGVyL3VuaXgvZGF5dGltZXIvYnJpbmstZGV2L21vZGVsLWJhY2tib25lLmNqc3giLCIvaG9tZS9kZXJlay9iaXRzeW5jL2J0c3luYy9EZXZlbG9wZXIvdW5peC9kYXl0aW1lci9icmluay1kZXYvbW9kZWwtbW9uZ29vc2UuY2pzeCIsIi9ob21lL2RlcmVrL2JpdHN5bmMvYnRzeW5jL0RldmVsb3Blci91bml4L2RheXRpbWVyL2JyaW5rLWRldi9tb2RlbC1zeW5jLmNqc3giLCIvaG9tZS9kZXJlay9iaXRzeW5jL2J0c3luYy9EZXZlbG9wZXIvdW5peC9kYXl0aW1lci9icmluay1kZXYvbW9kZWxzLmNqc3giLCIvaG9tZS9kZXJlay9iaXRzeW5jL2J0c3luYy9EZXZlbG9wZXIvdW5peC9kYXl0aW1lci9kZXYvdWkvanMvY29sbGVjdGlvbnMvaW5kZXguY2pzeCIsIi9ob21lL2RlcmVrL2JpdHN5bmMvYnRzeW5jL0RldmVsb3Blci91bml4L2RheXRpbWVyL2Rldi91aS9qcy9pbmRleC5janN4IiwiL2hvbWUvZGVyZWsvYml0c3luYy9idHN5bmMvRGV2ZWxvcGVyL3VuaXgvZGF5dGltZXIvZGV2L3VpL2pzL3JlYWN0L2luZGV4LmNqc3giLCIvaG9tZS9kZXJlay9iaXRzeW5jL2J0c3luYy9EZXZlbG9wZXIvdW5peC9kYXl0aW1lci9kZXYvdWkvanMvcmVhY3QvdHJhY2tlcnMuY2pzeCIsIi9ob21lL2RlcmVrL2JpdHN5bmMvYnRzeW5jL0RldmVsb3Blci91bml4L2RheXRpbWVyL2Rldi91aS9qcy9yb3V0ZXIvbWFpbi5janN4IiwiL2hvbWUvZGVyZWsvYml0c3luYy9idHN5bmMvRGV2ZWxvcGVyL3VuaXgvZGF5dGltZXIvZGV2L3VpL2pzL3VpLmNqc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNFQSxJQUFBOztBQUFBLEdBQUEsR0FBTTs7QUFVTixZQUFBLEdBQWUsU0FBQyxLQUFEO0VBQ2QsSUFBRyxDQUFDLEtBQUssQ0FBQyxRQUFWO0FBQUE7R0FBQSxNQUVLLElBQUcsS0FBSyxDQUFDLFFBQU4sS0FBa0IsUUFBckI7V0FDSixLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQixJQUEzQixFQUNDLEtBQUssQ0FBQyxhQUFOLENBQW9CLE9BQXBCLEVBQTZCO01BQUMsV0FBQSxFQUFhLG1CQUFkO0tBQTdCLEVBQWlFLFFBQWpFLENBREQsRUFFQyxLQUFLLENBQUMsYUFBTixDQUFvQixPQUFwQixFQUE2QjtNQUFDLE1BQUEsRUFBUSxRQUFUO01BQW1CLE9BQUEsRUFBVSxLQUFLLENBQUMsS0FBbkM7S0FBN0IsQ0FGRCxFQURJO0dBQUEsTUFLQSxJQUFHLEtBQUssQ0FBQyxRQUFOLEtBQWtCLFFBQXJCO1dBQ0osS0FBSyxDQUFDLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkIsSUFBM0IsRUFDQyxLQUFLLENBQUMsYUFBTixDQUFvQixPQUFwQixFQUE2QjtNQUFDLFNBQUEsRUFBWSxLQUFLLENBQUMsSUFBbkI7S0FBN0IsRUFBeUQsS0FBSyxDQUFDLElBQS9ELENBREQsRUFFQyxLQUFLLENBQUMsYUFBTixDQUFvQixRQUFwQixFQUE4QjtNQUFDLE1BQUEsRUFBUyxLQUFLLENBQUMsSUFBaEI7S0FBOUIsRUFFRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQVgsQ0FBZSxTQUFDLENBQUQ7YUFDZCxLQUFLLENBQUMsYUFBTixDQUFvQixRQUFwQixFQUE4QjtRQUFDLE9BQUEsRUFBVSxDQUFDLENBQUMsS0FBYjtPQUE5QixFQUFxRCxDQUFD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LElBTkc7R0FBbEI7QUFEVTs7QUFZWCxPQUFBLEdBQVUsTUFBTSxDQUFDLE9BQVAsR0FBaUI7RUFDMUIsUUFBQSxFQUFVLFFBRGdCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiMgYnJpbmstZGV2L2Zvcm0tcmVhY3RcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG50YWcgPSBcImJyaW5rLWRldi9mb3JtLXJlYWN0OiVzID0+XCJcblxuIyBSZXF1aXJlc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4jIExvZ2ljXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbmZpZWxkQnVpbGRlciA9IChmaWVsZCktPlxuXHRpZiAhZmllbGQudHlwZUZvcm1cblx0XHRyZXR1cm5cblx0ZWxzZSBpZiBmaWVsZC50eXBlRm9ybSA9PSBcInN1Ym1pdFwiXG5cdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtcImNsYXNzTmFtZVwiOiBcImxhYmVsLXBsYWNlaG9sZGVyXCJ9LCBcIlxcdTAwYTBcIiksXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge1widHlwZVwiOiBcInN1Ym1pdFwiLCBcInZhbHVlXCI6IChmaWVsZC52YWx1ZSl9KVxuXHRcdClcblx0ZWxzZSBpZiBmaWVsZC50eXBlRm9ybSA9PSBcInNlbGVjdFwiXG5cdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtcImh0bWxGb3JcIjogKGZpZWxkLm5hbWUpfSwgKGZpZWxkLm5hbWUpKSxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiwge1wibmFtZVwiOiAoZmllbGQubmFtZSl9LFxuXHRcdFx0XHQoXG5cdFx0XHRcdFx0ZmllbGQubGlzdC5tYXAoKHgpLT5cblx0XHRcdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwge1widmFsdWVcIjogKHgudmFsdWUpfSwgKHgubmFtZSkpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHQpXG5cdGVsc2UgaWYgZmllbGQudHlwZUZvcm0gPT0gXCJ0ZXh0YXJlYVwiXG5cdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtcImh0bWxGb3JcIjogKGZpZWxkLm5hbWUpfSwgKGZpZWxkLm5hbWUpKSxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCB7XCJuYW1lXCI6IChmaWVsZC5uYW1lKX0pXG5cdFx0KVxuXHRlbHNlXG5cdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHtcImh0bWxGb3JcIjogKGZpZWxkLm5hbWUpfSwgKGZpZWxkLm5hbWUpKSxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7XCJ0eXBlXCI6IChmaWVsZC50eXBlRm9ybSksIFwibmFtZVwiOiAoZmllbGQubmFtZSl9KVxuXHRcdClcbmYgPSB7fVxuZi5maWVsZEJ1aWxkZXIgPSBmaWVsZEJ1aWxkZXJcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZiIsIiMgYnJpbmstZGV2L21vZGVsLWJhY2tib25lXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudGFnID0gXCJicmluay1kZXYvbW9kZWwtYmFja2JvbmU6JXMgPT5cIlxuXG4jIFJlcXVpcmVzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubW9kZWxzID0gcmVxdWlyZShcIi4vbW9kZWxzLmNqc3hcIilcblxuIyBMb2dpY1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbm0gPSB7fVxuXG5tLm1ha2UgPSAobW9kZWxTZXQpLT5cblx0ZGVmYXVsdHMgPSB7fVxuXHRmaWVsZHMgPSBtb2RlbFNldC5maWVsZHNcblx0Xy5lYWNoKGZpZWxkcywgKGVsLCBpLCB4KS0+XG5cdFx0ZGVmYXVsdHNbZWwubmFtZV0gPSBlbC5kZWZhdWx0XG5cdFx0KVxuXHR4ID0gXy5vbWl0KGRlZmF1bHRzLCBcInN1Ym1pdFwiKVxuXHRjb25zb2xlLmxvZyh0YWcsIFwiZGVmYXVsdHNcIiwgeClcblx0cmV0dXJuIHhcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gbSAiLCIjIGJyaW5rLWRldi9tb2RlbC1tb25nb29zZVxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnRhZyA9IFwiYnJpbmstZGV2L21vZGVsLW1vbmdvb3NlOiVzID0+XCJcblxuIyBSZXF1aXJlc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4jIExvZ2ljXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tID0ge31cblxuXG5cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gbSIsIiMgYnJpbmstZGV2L21vZGVsLXN5bmNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG50YWcgPSBcImJyaW5rLWRldi9tb2RlbC1zeW5jOiVzID0+XCJcblxuIyBSZXF1aXJlc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbm1vZGVscyA9IHJlcXVpcmUoXCIuL21vZGVscy5janN4XCIpXG5yZWFjdEZvcm0gPSByZXF1aXJlKFwiLi9mb3JtLXJlYWN0LmNqc3hcIilcbm1vZGVsQmFja2JvbmUgPSByZXF1aXJlKFwiLi9tb2RlbC1iYWNrYm9uZS5janN4XCIpXG5tb2RlbE1vbmdvb3NlID0gcmVxdWlyZShcIi4vbW9kZWwtbW9uZ29vc2UuY2pzeFwiKVxuXG5cbiMgTG9naWNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm0gPSB7fVxubS5nZXQgPSAobW9kZWxOYW1lKS0+XG5cdHRhcmdldCA9IF8uZmlsdGVyKG1vZGVscywgKHgpLT5cblx0XHR4Lm5hbWUgPT0gbW9kZWxOYW1lXG5cdFx0KVxuXHQjIGNvbnNvbGUubG9nKHRhZywgXCJ0YXJnZXRcIiwgdGFyZ2V0KVxuXHRyZXR1cm4gdGFyZ2V0WzBdXG5cbm0uUmVhY3RGaWVsZEJ1aWxkZXIgPSByZWFjdEZvcm0uZmllbGRCdWlsZGVyXG5cbiMgYmFja2JvbmVcbm0ubWFrZUJhY2tib25lID0gKG5hbWUpLT5cblx0YyA9IG0uZ2V0KG5hbWUpXG5cdG1vZGVsQmFja2JvbmUubWFrZShjKVxuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBtIiwiIyBicmluay1kZXYvbW9kZWxzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudGFnID0gXCJicmluay1kZXYvbW9kZWxzOiVzID0+XCJcblxuIyBSZXF1aXJlc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4jIExvZ2ljXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5qc29uID0gW1xuXHRcdHtcblx0XHRcdG5hbWU6IFwidHJhY2tlcnNcIlxuXHRcdFx0YWN0aW9uOiBcIi9kYXRhL3RyYWNrZXJzXCJcblx0XHRcdGZpZWxkczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJ0eXBlXCJcblx0XHRcdFx0XHRkZWZhdWx0OiBcImJvb2xlYW5cIlxuXHRcdFx0XHRcdHR5cGVEYjogU3RyaW5nXG5cdFx0XHRcdFx0dHlwZUZvcm06IFwic2VsZWN0XCJcblx0XHRcdFx0XHRsaXN0OiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IFwiYm9vbGVhblwiXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBcIlQwMVwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IFwicHJvY2Vzc1wiXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBcIlQwMlwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcImNhdGVnb3J5XCJcblx0XHRcdFx0XHRkZWZhdWx0OiBcInVuY2F0ZWdvcml6ZWRcIlxuXHRcdFx0XHRcdHR5cGVEYjogU3RyaW5nXG5cdFx0XHRcdFx0dHlwZUZvcm06IFwic2VsZWN0XCJcblx0XHRcdFx0XHRsaXN0OiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IFwidHVja2VyXCJcblx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiQzAxXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bmFtZTogXCJjbGVhblwiXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBcIkMwMlwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IFwibnV0cml0aW9uXCJcblx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiQzAzXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bmFtZTogXCJib2R5XCJcblx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiQzA0XCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bmFtZTogXCJtb25leVwiXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBcIkMwNVwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcInF1ZXN0aW9uXCJcblx0XHRcdFx0XHRkZWZhdWx0OiBcIlwiXG5cdFx0XHRcdFx0dHlwZURiOiBTdHJpbmdcblx0XHRcdFx0XHR0eXBlRm9ybTogXCJ0ZXh0XCJcblx0XHRcdFx0fVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJmcmVxdWVuY3lcIlxuXHRcdFx0XHRcdGRlZmF1bHQ6IDBcblx0XHRcdFx0XHR0eXBlRGI6IE51bWJlclxuXHRcdFx0XHRcdHR5cGVGb3JtOiBcIm51bWJlclwiXG5cdFx0XHRcdH1cblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwibWluaW11bVwiXG5cdFx0XHRcdFx0ZGVmYXVsdDogXCIwXCJcblx0XHRcdFx0XHR0eXBlRGI6IE51bWJlclxuXHRcdFx0XHRcdHR5cGVGb3JtOiBcIm51bWJlclwiXG5cdFx0XHRcdH1cblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwidGltZVJhbmdlXCJcblx0XHRcdFx0XHRkZWZhdWx0OiBcImZhbHNlXCJcblx0XHRcdFx0XHR0eXBlRGI6IFN0cmluZ1xuXHRcdFx0XHRcdHR5cGVGb3JtOiBcInJhbmdlXCJcblx0XHRcdFx0fVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJnb2FsXCJcblx0XHRcdFx0XHRkZWZhdWx0OiBcIjBcIlxuXHRcdFx0XHRcdHR5cGVEYjogTnVtYmVyXG5cdFx0XHRcdFx0dHlwZUZvcm06IFwibnVtYmVyXCJcblx0XHRcdFx0fVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJkYXRlTGFzdEFuc3dlcmVkXCJcblx0XHRcdFx0XHRkZWZhdWx0OiAtPlxuXHRcdFx0XHRcdFx0cmV0dXJuIG5ldyBEYXRlKClcblx0XHRcdFx0XHR0eXBlRGI6IERhdGUgXG5cdFx0XHRcdH1cblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwicmVmc1wiXG5cdFx0XHRcdFx0ZGVmYXVsdDogW11cblx0XHRcdFx0XHR0eXBlRGI6IFtdXG5cdFx0XHRcdH1cblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiZGVzY3JpcHRpb25cIlxuXHRcdFx0XHRcdHR5cGVEYjogU3RyaW5nXG5cdFx0XHRcdFx0ZGVmYXVsdDogXCJcIlxuXHRcdFx0XHRcdHR5cGVGb3JtOiBcInRleHRhcmVhXCJcblx0XHRcdFx0fVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJzdWJtaXRcIlxuXHRcdFx0XHRcdHZhbHVlOiBcIlN1Ym1pdFwiXG5cdFx0XHRcdFx0dHlwZUZvcm06IFwic3VibWl0XCJcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH1cblx0XHR7XG5cdFx0XHRuYW1lOiBcImRheXRpbWVyc1wiXG5cdFx0XHRmaWVsZHM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwicXVlc3Rpb25SZWZcIlxuXHRcdFx0XHRcdGRlZmF1bHQ6IFwiZmFsc2VcIlxuXHRcdFx0XHRcdHR5cGVEYjogU3RyaW5nXG5cdFx0XHRcdH1cblx0XHRcdFx0e1xuXHRcdFx0XHRcdG5hbWU6IFwiY29tcGxldGVcIlxuXHRcdFx0XHRcdGRlZmF1bHQ6IGZhbHNlXG5cdFx0XHRcdFx0dHlwZURiOiBCb29sZWFuIFxuXHRcdFx0XHR9XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcInN0YXJ0XCJcblx0XHRcdFx0XHRkZWZhdWx0OiAtPlxuXHRcdFx0XHRcdFx0cmV0dXJuIG5ldyBEYXRlKClcblx0XHRcdFx0XHR0eXBlRGI6IERhdGVcblx0XHRcdFx0fVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmFtZTogXCJlbmRcIlxuXHRcdFx0XHRcdGRlZmF1bHQ6IC0+XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3IERhdGUoKVxuXHRcdFx0XHRcdHR5cGVEYjogRGF0ZVxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fVxuXHRdXG5cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0ganNvbiIsIiMgYXBwL2NvbGxlY3Rpb25zL3F1ZXN0aW9uc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnRhZyA9IFwiYXBwL2NvbGxlY3Rpb25zL3F1ZXN0aW9uczolcyA9PlwiXG5cbiMgUmVxdWlyZXNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5icmlua0Zvcm1HZW4gPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vYnJpbmstZGV2L21vZGVsLXN5bmMuY2pzeFwiKVxuXG4jIExvZ2ljXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jb25zb2xlLmxvZyh0YWcsIFwiYmZnXCIsIGJyaW5rRm9ybUdlbilcblxuYnJpbmtGb3JtR2VuLm1ha2VCYWNrYm9uZShcImRheXRpbWVyc1wiKVxuXG4jIFF1ZXN0aW9uc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgQmFja2JvbmUgTW9kZWxcbiMgdXNlZCB0byBhZGQgcXVlc3Rpb25zIHRvIGZpcmViYXNlXG5cbiMgVEFTSzogaW1tdXRhYmxlIC0+IHRydWVcblxubW9kZWxRdWVzdGlvbiA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XG5cdGlkQXR0cmlidXRlOiBcIl9pZFwiXG5cdGRlZmF1bHRzOiBcblx0XHR0eXBlOiBcImJvb2xlYW5cIlxuXHRcdGNhdGVnb3J5OiBcInVuY2F0ZWdvcml6ZWRcIlxuXHRcdHF1ZXN0aW9uOiBcIlwiXG5cdFx0ZnJlcXVlbmN5OiAxXG5cdFx0bWluOiAwXG5cdFx0dGltZVJhbmdlOiBmYWxzZVxuXHRcdGdvYWw6IDBcblx0XHRkYXRlTGFzdEFuc3dlcmVkOiBuZXcgRGF0ZSgpXG5cdFx0cmVmczogW11cblx0fSlcblxuXG4jIEJhY2tib25lL0ZpcmViYXNlIENvbGxlY3Rpb25cbiMgdXNlZCB0byBhZGQgbW9kZWxzIC0+IHJlYWN0IGhhbmRsZXMgYWxsIHVpIGJ1c2luZXNzXG5cbnRyYWNrZXJzID0gQmFja2JvbmUuQ29sbGVjdGlvbi5leHRlbmQoe1xuXHR1cmw6IFwiL2RhdGEvdHJhY2tlcnNcIlxuXHRtb2RlbDogbW9kZWxRdWVzdGlvblxuXHRuYW1lOiBcInRyYWNrZXJzXCJcblx0aW5pdGlhbGl6ZTogLT5cblx0XHR0aGlzLm9uY2UoXCJzeW5jXCIsID0+XG5cdFx0XHR0aGlzLnJlYWR5ID0gdHJ1ZVxuXHRcdFx0KVxuXHRcdHRoaXMuZmV0Y2goKVxuXHRyZWFkeTogZmFsc2Vcblx0fSlcblxuXG5cblxuXG5cbiMgRGF5dGltZXJcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBCYWNrYm9uZSBNb2RlbFxuIyB1c2VkIHRvIGFkZCBuZXcgZW50cmllcyB0byBEYXl0aW1lciBjb2xsZWN0aW9uXG5cbm1vZGVsRGF5dGltZXIgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xuXHRpZEF0dHJpYnV0ZTogXCJfaWRcIlxuXHRkZWZhdWx0czogXG5cdFx0cXVlc3Rpb25SZWY6IGZhbHNlXG5cdFx0ZGF0ZTogbmV3IERhdGUoKVxuXHRcdGNvbXBsZXRlOiBmYWxzZVxuXHRcdHN0YXJ0OiBmYWxzZVxuXHRcdGVuZDogZmFsc2Vcblx0fSlcblxuIyBCYWNrYm9uZS9GaXJlYmFzZSBDb2xsZWN0aW9uXG4jIHRoZSBkYXl0aW1lciBjb2xsZWN0aW9uXG4jIG9iamVjdHMgYXJlIHByb2dyYW1hdGljYWxseSBhZGRlZFxuXG5kYXl0aW1lcnMgPSBCYWNrYm9uZS5Db2xsZWN0aW9uLmV4dGVuZCh7XG5cdHVybDogXCIvZGF0YS9kYXl0aW1lcnNcIlxuXHRtb2RlbDogbW9kZWxEYXl0aW1lclxuXHRuYW1lOiBcImRheXRpbWVyc1wiXG5cdGluaXRpYWxpemU6IC0+XG5cdFx0dGhpcy5vbmNlKFwic3luY1wiLCA9PlxuXHRcdFx0dGhpcy5yZWFkeSA9IHRydWVcblx0XHRcdClcblx0XHR0aGlzLmZldGNoKClcblx0cmVhZHk6IGZhbHNlXG5cdH0pXG5cblxuXG5cblxuXG4jIEV4cG9ydHNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB7XG5cdHRyYWNrZXJzOiB0cmFja2Vyc1xuXHRkYXl0aW1lcnM6IGRheXRpbWVyc1xufSIsIiMgYXBwXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudGFnID0gXCJhcHA6JXMgPT5cIlxuXG4jIFJlcXVpcmVzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudWkgPSByZXF1aXJlIFwiLi91aS5janN4XCJcbmNvbCA9IHJlcXVpcmUgXCIuL2NvbGxlY3Rpb25zL2luZGV4LmNqc3hcIlxuck1haW4gPSByZXF1aXJlIFwiLi9yb3V0ZXIvbWFpbi5janN4XCJcblxuXG4jIExvZ2ljXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuYXBwID0gd2luZG93LmFwcCA9IHt9XG5cbl8uZXh0ZW5kKGFwcCwgQmFja2JvbmUuRXZlbnRzKVxuXG5hcHAuYyA9IHt9XG5hcHAudiA9IHJlcXVpcmUgXCIuL3JlYWN0L2luZGV4LmNqc3hcIlxuYXBwLmMudHJhY2tlcnMgPSBuZXcgY29sLnRyYWNrZXJzKClcbmFwcC5jLmRheXRpbWVycyA9IG5ldyBjb2wuZGF5dGltZXJzKClcblxudWlJbml0ID0gLT5cblx0YXBwLnJvdXRlciA9IG5ldyByTWFpbigpXG5cdCQoZG9jdW1lbnQpLnJlYWR5KCgpLT5cblx0XHR1aS5zbGlja25hdigpXG5cdFx0KVxuXHRcblxuZG8gYXBwUmVhZHkgPSAtPlxuXHRpZiBhcHAuYy50cmFja2Vycy5yZWFkeSAmJiBhcHAuYy5kYXl0aW1lcnMucmVhZHkgXG5cdFx0dWlJbml0KClcblx0XHRhcHAudHJpZ2dlcihcInJlYWR5XCIpXG5cdGVsc2Vcblx0XHRfLmRlbGF5KGFwcFJlYWR5LCAyMClcblxuXG4jIHVpIGxvZ2ljXG4iLCIjIHJlYWN0L2luZGV4XG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudGFnID0gXCJyZWFjdC9pbmRleDolcyA9PlwiXG5cbiMgUmVxdWlyZXNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG50cmFja2VycyA9IHJlcXVpcmUgXCIuL3RyYWNrZXJzLmNqc3hcIlxuXG4jIExvZ2ljXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52ID0ge31cblxudi5UcmFja2VycyA9IHRyYWNrZXJzXG5cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdiIsIiMgcmVhY3QvdHJhY2tlcnNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG50YWcgPSBcInJlYWN0L3RyYWNrZXJzOiVzID0+XCJcblxuIyBSZXF1aXJlc1xuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmJyaW5rRm9ybUdlbiA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9icmluay1kZXYvbW9kZWwtc3luYy5janN4XCIpXG5cbiMgTG9naWNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnQgPSB7fVxuXG4jIGJyaW5rLWRldjogZm9ybSBnZW5lcmF0b3JcbkZpZWxkQnVpbGRlciA9IGJyaW5rRm9ybUdlbi5SZWFjdEZpZWxkQnVpbGRlclxuZmllbGRzID0gYnJpbmtGb3JtR2VuLmdldChcInRyYWNrZXJzXCIpLmZpZWxkc1xuXG5cblRyYWNrZXJzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRnZXRJbml0aWFsU3RhdGU6IC0+XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRyYWNrZXJzOiBbXVxuXHRcdH1cblx0Y29tcG9uZW50RGlkTW91bnQ6IC0+XG5cdFx0dGFyZ2V0ID0gYXBwLmMudHJhY2tlcnNcblx0XHRzZXRTdGF0ZSA9ID0+XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0dHJhY2tlcnM6IHRhcmdldC50b0pTT04oKVxuXHRcdFx0XHR9KVxuXHRcdHNldFN0YXRlKClcblx0XHR0YXJnZXQub24oXCJzeW5jXCIsID0+XG5cdFx0XHRzZXRTdGF0ZSgpXG5cdFx0XHQpXG5cdHJlbmRlcjogLT5cblx0XHR0cmFja2VycyA9IHRoaXMuc3RhdGUudHJhY2tlcnNcblx0XHRpZiAhdHJhY2tlcnMgXG5cdFx0XHRyZXR1cm5cblx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcInRyYWNrZXJzXCJ9LFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChUcmFja2VyQWRkLCB7XCJmaWVsZHNcIjogKGZpZWxkcyl9KSxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7XCJjbGFzc05hbWVcIjogXCJ0cmFja2VyLWxpc3RcIn0sXG5cdFx0XHRcdChcblx0XHRcdFx0XHR0cmFja2Vycy5tYXAoKHgpLT5cblx0XHRcdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoVHJhY2tlckl0ZW0sIHtcInRyYWNrZXJcIjogKHgpfSlcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0KVxuXHRcdFx0KVxuXHRcdClcblx0fSlcblxuVHJhY2tlckl0ZW0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHJlbmRlcjogLT5cblx0XHR0cmFja2VyID0gdGhpcy5wcm9wcy50cmFja2VyXG5cdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImNsYXNzTmFtZVwiOiBcInRvZGF5SXRlbS1kZXRhaWxzXCJ9LFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHtcInNyY1wiOiBcIi9hc3NldHMvY2FyZXQtY29tcGxldGUucG5nXCJ9KVxuXHRcdFx0KSxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwidG9kYXlJdGVtLXF1ZXN0aW9uXCJ9LFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDJcIiwgbnVsbCwgKHRyYWNrZXIucXVlc3Rpb24pKVxuXHRcdFx0KSxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiY2xhc3NOYW1lXCI6IFwidG9kYXlJdGVtLW1lbnVcIn0sXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwge1wic3JjXCI6IFwiL2Fzc2V0cy9idXR0b24tY29tcGxldGUucG5nXCJ9KVxuXHRcdFx0KVxuXHRcdClcblx0fSlcblxuVHJhY2tlckFkZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Y29tcG9uZW50RGlkTW91bnQ6IC0+XG5cdFx0JHRoaXMgPSAkKHRoaXMuZ2V0RE9NTm9kZSgpKVxuXHRcdCR0aGlzLmFjY29yZGlvbih7XG5cdFx0XHRjb2xsYXBzaWJsZTogdHJ1ZVxuXHRcdFx0aGVpZ2h0U3R5bGU6IFwiY29udGVudFwiXG5cdFx0XHR9KVxuXHRcdCR0aGlzLmZpbmQoXCJpbnB1dFt0eXBlPSdzdWJtaXQnXVwiKS5jbGljaygoZSk9PlxuXHRcdFx0Zm9ybSA9ICR0aGlzLmZpbmQoXCJmb3JtXCIpXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdHJlZEl0ID0gKG9iaiwgdiktPlxuXHRcdFx0XHRvYmpbdi5uYW1lXSA9IHYudmFsdWVcblx0XHRcdFx0cmV0dXJuIG9ialxuXHRcdFx0ZCA9IGZvcm0uc2VyaWFsaXplQXJyYXkoKS5yZWR1Y2UocmVkSXQsIHt9KVxuXHRcdFx0Y29uc29sZS5sb2codGFnLCBcImZvcm0gZGF0YVwiLCBkKVxuXHRcdFx0YXBwLmMudHJhY2tlcnMuYWRkKGQpXG5cdFx0XHQkdGhpcy5maW5kKFwiaW5wdXQsIHRleHRhcmVhXCIpLm5vdChcImlucHV0W3R5cGU9J3N1Ym1pdCddXCIpLnZhbChcIlwiKVxuXHRcdFx0KVxuXHRyZW5kZXI6IC0+XG5cdFx0ZmllbGRzID0gdGhpcy5wcm9wcy5maWVsZHNcblx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgbnVsbCwgXCJUcmFja2VyIEFkZFwiKSxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIsIG51bGwsXG5cdFx0XHRcdChcblx0XHRcdFx0XHRmaWVsZHMubWFwKCh4KS0+XG5cdFx0XHRcdFx0XHQjIGNvbnNvbGUubG9nKHRhZywgXCJmaWVsZFwiLCB4KVxuXHRcdFx0XHRcdFx0RmllbGRCdWlsZGVyKHgpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHQpXG5cdH0pXG5cblxudC5NYWluID0gVHJhY2tlcnNcblxuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB0IiwiIyByb3V0ZXIvbWFpblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnRhZyA9IFwicm91dGVyL21haW46JXMgPT5cIlxuXG4jIFJlcXVpcmVzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiMgTG9naWNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1haW4gPSBCYWNrYm9uZS5Sb3V0ZXIuZXh0ZW5kKHtcblx0cm91dGVzOlxuXHRcdFwidHJhY2tlcnNcIjogXHRcInRyYWNrZXJzXCJcblx0aW5pdGlhbGl6ZTogLT5cblx0XHQjIGNvbnNvbGUubG9nKHRhZywgXCJSb3V0ZXJcIiwgXCJpbml0IVwiKVxuXHRcdGlmICFCYWNrYm9uZS5IaXN0b3J5LnN0YXJ0ZWRcblx0XHRcdEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoe1xuXHRcdFx0XHRwdXNoU3RhdGU6IHRydWVcblx0XHRcdFx0fSlcblx0XHRyZXR1cm4gdGhpc1xuXHRiaW5kQW5jaG9yczogLT5cblx0XHR0YXJnZXRzID0gJChcImFbaHJlZl49Jy8nXVwiKVxuXHRcdCMgY29uc29sZS5sb2codGFnLCBcImJpbmRBbmNob3JzOnRhcmdldHNcIiwgdGFyZ2V0cylcblx0XHR0YXJnZXRzLmNsaWNrKChlKT0+XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdCMgY29uc29sZS5sb2codGFnLCBcImV2ZW50XCIsIGUpXG5cdFx0XHR0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQucGF0aG5hbWUucmVwbGFjZShcIi9cIiwgXCJcIilcblx0XHRcdCMgY29uc29sZS5sb2codGFnLCBcImFuY2hvcjpjbGlja1wiLCB0YXJnZXQpXG5cdFx0XHR0aGlzLm5hdmlnYXRlKHRhcmdldCwge3RyaWdnZXI6IHRydWV9KVxuXHRcdFx0KVxuXHR0cmFja2VyczogLT5cblx0XHQjIGNvbnNvbGUubG9nKHRhZywgXCJ0cmFja2Vyc1wiLCBcImluaXQhXCIpXG5cdFx0UmVhY3QucmVuZGVyKFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChhcHAudi5UcmFja2Vycy5NYWluLCBudWxsKVxuXHRcdFx0JChcIi5jb250ZW50XCIpWzBdXG5cdFx0XHQpXG5cdH0pXG5cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gbWFpbiIsIiMgYXBwL3VpXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudGFnID0gXCJhcHAvdWk6JXMgPT5cIlxuXG4jIFJlcXVpcmVzXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiMgTG9naWNcbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnNsaWNrbmF2ID0gLT5cblx0JChcIm5hdlwiKS5zbGlja25hdih7XG5cdFx0aW5pdDogLT5cblx0XHRcdCQoXCJuYXZcIikuaGlkZSgpXG5cdFx0XHRhcHAucm91dGVyLmJpbmRBbmNob3JzKClcblx0XHRwcmVwZW5kVG86ICQoXCIuc2xpY2tuYXZcIilcblx0XHRsYWJlbDogXCJcIlxuXHRcdGNsb3NlT25DbGljazogdHJ1ZVxuXHRcdH0pXG5cbiMgY29uc29sZS5sb2codGFnLCBcImluaXRcIiwgXCJ1aSBpbml0IVwiKVxuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB7XG5cdHNsaWNrbmF2OiBzbGlja25hdlxufSJdfQ==
