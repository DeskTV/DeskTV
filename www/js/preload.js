// Controller.js
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*! Controller.min.js - v1.0.2 - 2017-05-17 */
function Controller(b) {
  "use strict";
  function c() {
    return J ? (d.call(this), void (E = window.requestAnimationFrame(c.bind(this)))) : (window.cancelAnimationFrame(E), void (E = null));
  }function d() {
    switch (N = this.constructor.gamepads[C], F = performance.now(), m.call(this), "LEFT_ANALOG_STICK_HOR" in G && "LEFT_ANALOG_STICK_VERT" in G && o.call(this, "LEFT_ANALOG_STICK", { x: u(N.axes[G.LEFT_ANALOG_STICK_HOR]), y: u(N.axes[G.LEFT_ANALOG_STICK_VERT]) }), "RIGHT_ANALOG_STICK_HOR" in G && "RIGHT_ANALOG_STICK_VERT" in G && o.call(this, "RIGHT_ANALOG_STICK", { x: u(N.axes[G.RIGHT_ANALOG_STICK_HOR]), y: u(N.axes[G.RIGHT_ANALOG_STICK_VERT]) }), this.settings.useAnalogAsDpad) {case "left":
        p.call(this, "left");break;case "right":
        p.call(this, "right");break;case "both":
        p.call(this, "left"), p.call(this, "right");}for (var _a in H) {
      var _b = H[_a];r(_b.name, _b.detail, _b.info), delete H[_a];
    }
  }function f() {
    this.settings = new e(), M && i.call(this);var a = g.call(this);h.call(this, a), a.init && "function" == typeof a.init && a.init(N), 0 === this.constructor.controllerCount && window.addEventListener("gamepaddisconnected", O, !1), c.call(this);
  }function g() {
    var b = {};if (this.constructor.layouts.has(this.name) ? (L = !1, b = this.constructor.layouts.get(this.name)) : "standard" === N.mapping ? (L = !1, b = this.constructor.layouts.get("standard")) : (console.warn(a.MAP), b = this.constructor.layouts.get("_unknown")), l(b), L) return b;var c = y();c && c in b && (b = b[c]);for (var _d in b.axes) {
      switch (_d) {case "LEFT_ANALOG_STICK_HOR":case "LEFT_ANALOG_STICK_VERT":case "RIGHT_ANALOG_STICK_HOR":case "RIGHT_ANALOG_STICK_VERT":
          G[_d] = b.axes[_d];}
    }return b.misc = { L_DPAD_UP: 0, L_DPAD_DOWN: 1, L_DPAD_LEFT: 2, L_DPAD_RIGHT: 3, R_DPAD_UP: 4, R_DPAD_DOWN: 5, R_DPAD_LEFT: 6, R_DPAD_RIGHT: 7 }, b;
  }function h(a) {
    var b = [],
        c = [];F = performance.now(), K.buttons = {}, K.axes = {}, K.misc = {};for (var _d2 in K) {
      var _e = a[_d2];for (var _f in _e) {
        var _a2 = _e[_f].index || _e[_f],
            _g = _e[_f].type || _d2,
            _h = _e[_f].data || void 0;var _i = {};"object" == _typeof(_e[_f]) && (_i = { inputMin: _e[_f].inputMin || void 0, inputMax: _e[_f].inputMax || void 0, method: _e[_f].method || void 0, ignoreConversion: _e[_f].ignoreConversion || void 0 }), "axes" === _g ? (_f.endsWith("_HOR") ? _f = _f.slice(0, -4) : _f.endsWith("_VERT") && (_f = _f.slice(0, -5)), K[_g][_f] = new A(_f, { map: [_d2, _a2], settings: this.settings, options: _i, data: _h }), c.push(_a2)) : "buttons" === _g ? (N.buttons[_a2] && (K[_g][_f] = new z(_f, { map: [_d2, _a2], settings: this.settings, options: _i, data: _h })), b.push(_a2)) : "misc" === _g && (K[_g][_f] = new z(_f, { map: [_d2, _a2], settings: this.settings, options: _i, data: _h }));
      }
    }a.options && a.options.allowsExtras && (k.call(this, b, "buttons"), k.call(this, c, "axes"));
  }function i() {
    this.settings.update(M);
  }function j(a) {
    a.gamepad.index === this.index && (J = !1, this.unwatch.call(this), delete this.constructor.controllers[this.index], 0 === this.constructor.controllerCount && window.removeEventListener("gamepaddisconnected", O), r(this.constructor.events.getName("controller", "disconnect"), { index: this.index, timestamp: Date.now() }, "Controller at index " + this.index + " disconnected."));
  }function k(a, b) {
    var c = "buttons" === b ? "BUTTON" : "AXIS";var d = 0;for (var _e2 in N[b]) {
      if (a.indexOf(parseInt(_e2)) === -1) {
        d++;var _a3 = "MISC" + c + "_" + d;K.buttons[_a3] = new z(_a3, { map: [b, _e2], settings: this.settings });
      }
    }
  }function l(a) {
    I.name = a.name || void 0, I.description = a.description || void 0, I.unknownLayout = L || void 0;for (var _b2 in I) {
      void 0 === I[_b2] && delete I[_b2];
    }
  }function m() {
    var a = K.buttons;for (var _b3 in a) {
      var _c = a[_b3].getGamepadIndex(),
          _d3 = a[_b3].getGamepadSection(),
          _e3 = "object" == _typeof(N[_d3][_c]) ? N[_d3][_c].value : N[_d3][_c];n.call(this, _b3, _e3);
    }
  }function n(a, b) {
    if (void 0 !== b) {
      var _c2 = a.startsWith("L_") || a.startsWith("R_") ? a.substring(2) : a,
          _d4 = K.buttons[a] || K.axes[a] || K.misc[a];if (!H[_c2] || H[_c2].name !== this.constructor.events.getName("button", "during")) {
        if ("function" == typeof _d4.getOption("method") && (b = _d4.getOption("method").call(this, this.constructor.gamepads[this.index], _d4)), b !== _d4.value && (_d4.hasUpdated = !0), !_d4.getOption("ignoreConversion") && _d4.hasUpdated) {
          var _a5 = _d4.getOption("inputMin") || 0,
              _c3 = _d4.getOption("inputMax") || 1;b = t(b, _a5, _c3, 0, 1);
        }var _a4 = b > 0,
            _e4 = _d4.value > 0;if (_a4 || _e4) {
          _d4.update(b);var _f2 = _d4.copy();_f2.name = _c2, _a4 && !_e4 ? x(_c2, this.constructor.events.getName("button", "start"), _f2) : _a4 && _e4 ? x(_c2, this.constructor.events.getName("button", "during"), _f2) : !_a4 && _e4 && x(_c2, this.constructor.events.getName("button", "end"), _f2);
        }
      }
    }
  }function o(a, b) {
    if (void 0 !== b.x && void 0 !== b.y && (!H[a] || H[a].name !== this.constructor.events.getName("analog", "during"))) {
      var _c4 = K.axes[a] || K.buttons[a] || K.misc[a],
          _d5 = q.call(this, b),
          _e5 = w(_d5),
          _f3 = w(_c4.position),
          _g2 = { x: _c4.position.x, y: _c4.position.y };if (_e5 || _f3) {
        _c4.update(_d5);var _b4 = _c4.position.x !== _g2.x || _c4.position.y !== _g2.y,
            _h2 = _c4.copy();_e5 && !_f3 ? x(a + "start", this.constructor.events.getName("analog", "start"), _h2) : _e5 && _f3 ? x(a + "during", this.constructor.events.getName("analog", "during"), _h2) : !_e5 && _f3 && x(a + "end", this.constructor.events.getName("analog", "end"), _h2), _b4 && x(a + "change", this.constructor.events.getName("analog", "change"), _h2);
      }
    }
  }function p(a) {
    var b = "left" === a ? "L_" : "R_",
        c = "left" === a ? "LEFT_ANALOG_STICK" : "RIGHT_ANALOG_STICK",
        d = ["DPAD_UP", "DPAD_DOWN", "DPAD_LEFT", "DPAD_RIGHT"];var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = d[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _e6 = _step.value;
        var _a6 = 0,
            _d6 = 0,
            _f4 = !1;switch (_e6) {case "DPAD_UP":
            _a6 = K.axes[c].position.y, _d6 = K.axes[c].position.x, _f4 = _a6 <= this.settings.analogStickDpadThreshold * -1;break;case "DPAD_DOWN":
            _a6 = K.axes[c].position.y, _d6 = K.axes[c].position.x, _f4 = _a6 >= this.settings.analogStickDpadThreshold;break;case "DPAD_LEFT":
            _a6 = K.axes[c].position.x, _d6 = K.axes[c].position.y, _f4 = _a6 <= this.settings.analogStickDpadThreshold * -1;break;case "DPAD_RIGHT":
            _a6 = K.axes[c].position.x, _d6 = K.axes[c].position.y, _f4 = _a6 >= this.settings.analogStickDpadThreshold;}var _g3 = _f4 && Math.abs(_a6) > Math.abs(_d6) ? 1 : 0;n.call(this, b + _e6, _g3);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }function q(a) {
    var b = { x: 0, y: 0 };return 0 !== a.x && (b.x = t(Math.abs(a.x), this.settings.analogStickDeadzone.min, this.settings.analogStickDeadzone.max, 0, 1), a.x < 0 && 0 !== b.x && (b.x *= -1)), 0 !== a.y && (b.y = t(Math.abs(a.y), this.settings.analogStickDeadzone.min, this.settings.analogStickDeadzone.max, 0, 1), a.y < 0 && 0 !== b.y && (b.y *= -1)), "square" === this.settings.mapAnalogToShape ? s(b) : b;
  }function r(a, b, c) {
    b = b || {}, c = c || void 0, c && console.info(c);var d = new CustomEvent(a, { detail: b, bubbles: !0, cancelable: !1 });window.dispatchEvent(d);
  }function s(a) {
    if (0 === a.x || 0 === a.y) return { x: a.x, y: a.y };{
      var _b5 = { x: Math.abs(a.x), y: Math.abs(a.y) },
          _c5 = Math.hypot(_b5.x, _b5.y);var _d7 = 1;_d7 = _b5.x > _b5.y ? _c5 * (1 / _b5.x) : _c5 * (1 / _b5.y);var _e7 = v(_b5, t(_c5, 0, 1, 0, _d7));return { x: a.x > 0 ? _e7.x : -_e7.x, y: a.y > 0 ? _e7.y : -_e7.y };
    }
  }function t(a, b, c, d, e) {
    var f = (a - b) * (e - d) / (c - b) + d;return e < d ? f < e ? f = e : f > d && (f = d) : f > e ? f = e : f < d && (f = d), f;
  }function u(a) {
    return Math.abs(a) < .1 ? 0 : t(a, -.9, 1, -1, 1);
  }function v(a, b) {
    var c = Math.hypot(a.x, a.y),
        d = Math.acos(a.y / c);return { x: Math.sin(d) * b, y: Math.cos(d) * b };
  }function w(a) {
    return Math.abs(a.x) > 0 || Math.abs(a.y) > 0;
  }function x(a, b, c, d) {
    H[a] = { name: b, detail: c || {}, info: d || void 0 };
  }function y() {
    return "chrome" in window ? "Chrome" : "opera" in window && "[object Opera]" === {}.toString.call(window.opera) ? "Opera" : "MozAppearance" in document.documentElement.style ? "Mozilla" : "WebkitAppearance" in document.documentElement.style ? "Webkit" : void 0;
  }function z(a, b) {
    function c() {
      this.pressed = this.value > (g.buttonThreshold || 0);
    }function d() {
      this.time = F;
    }b = b || {};var e = b.map || [],
        f = b.options || {},
        g = b.settings || {};var h = b.data || void 0,
        i = !1;this.controllerIndex = C, this.name = a, this.value = 0, c.call(this), d.call(this), this.getGamepadSection = function () {
      return e[0];
    }, this.getGamepadIndex = function () {
      return e[1];
    }, this.getOption = function (a) {
      return f[a];
    }, this.update = function (a) {
      this.value = a, c.call(this), d.call(this), i || (i = !0);
    }, this.copy = function () {
      var a = {};for (var _b6 in this) {
        "function" != typeof this[_b6] && (a[_b6] = this[_b6]);
      }return a;
    }, Object.defineProperty(this, "data", { get: function get() {
        return h;
      }, set: function set(a) {
        h = a;
      } }), Object.defineProperty(this, "hasUpdated", { get: function get() {
        return i;
      }, set: function set(a) {
        i = a;
      } });
  }function A(a, b) {
    function c() {
      var a = f(this.position.x, -this.position.y),
          b = i(a);this.angle = { radians: h(a, 3), degrees: h(b, 3) };
    }function d() {
      this.time = F;
    }function e(a) {
      return { x: g(a.x), y: g(a.y) };
    }function f(a, b) {
      if (0 === a && 0 === b) return NaN;var c = Math.atan2(b, a);return c < 0 && (c += 2 * Math.PI), Math.abs(c);
    }function g(a) {
      var b = 0;return Math.abs(a) > 1 ? (b = Math.floor(a), b === -2 && (b = -1)) : b = Math.fround(a), b;
    }function h(a, b) {
      var c = Math.pow(10, b);return Math.round(a * c) / c;
    }function i(a) {
      return isNaN(a) ? NaN : a * (180 / Math.PI);
    }b = b || {};var j = b.map || [],
        k = b.options || {};b.settings || {};var l = b.data || void 0,
        m = !1;this.controllerIndex = C, this.name = a, this.position = e.call(this, { x: 0, y: 0 }), c.call(this), d.call(this), this.getGamepadSection = function () {
      return j[0];
    }, this.getGamepadIndex = function () {
      return j[1];
    }, this.getOption = function (a) {
      return k[a];
    }, this.update = function (a) {
      this.position = e.call(this, a), c.call(this), d.call(this), m || (m = !0);
    }, this.copy = function () {
      var a = {};for (var _b7 in this) {
        "function" != typeof this[_b7] && (a[_b7] = this[_b7]);
      }return a;
    }, Object.defineProperty(this, "data", { get: function get() {
        return l;
      }, set: function set(a) {
        l = a;
      } }), Object.defineProperty(this, "hasUpdated", { get: function get() {
        return m;
      }, set: function set(a) {
        m = a;
      } });
  }if ("Gamepad" !== b.constructor.name) return !1;var B = b.id,
      C = b.index,
      D = Date.now();var E = null,
      F = 0,
      G = {},
      H = {},
      I = {},
      J = !0,
      K = {},
      L = !0,
      M = arguments[1] || !1,
      N = b;var O = j.bind(this);this.watch = function () {
    E || c.call(this);
  }, this.unwatch = function () {
    E && (window.cancelAnimationFrame(E), E = void 0);
  }, Object.defineProperty(this, "index", { get: function get() {
      return C;
    } }), Object.defineProperty(this, "id", { get: function get() {
      return B;
    } }), Object.defineProperty(this, "name", { get: function get() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Controller.layouts.regex[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _a7 = _step2.value;
          if (_a7.test(B)) return B.match(_a7)[1].trim();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    } }), Object.defineProperty(this, "connectedTimestamp", { get: function get() {
      return D;
    } }), Object.defineProperty(this, "layoutInfo", { get: function get() {
      return I;
    } }), Object.defineProperty(this, "inputs", { get: function get() {
      var a = {},
          b = {};for (var _c6 in K.buttons) {
        a[_c6] = K.buttons[_c6].copy();
      }for (var _d8 in K.axes) {
        b[_d8] = K.axes[_d8].copy();
      }return { buttons: a, analogSticks: b };
    } }), this._postSetup = function () {
    var a = { controller: this, id: B, index: C, timestamp: D };L && (a.unknownLayout = L), r(this.constructor.events.getName("controller", "connect"), a, "Gamepad connected at index " + C + ".");
  }, f.call(this);
}Controller.search = function (a) {
  var b = a && a.interval || 500,
      c = a && a.limit || void 0;return Controller.supported ? void (this.interval = setInterval(function () {
    if (void 0 !== c && this.controllerCount >= c) return void clearInterval(this.interval);for (var _b8 in this.gamepads) {
      if (_b8 = parseInt(_b8, 10), isNaN(_b8)) return;if (void 0 !== this.gamepads[_b8] && null !== this.gamepads[_b8] && void 0 === this.getController(_b8)) {
        this.controllers || (this.controllers = {});var _c7 = {};a && "settings" in a && (_c7 = a.settings), this.controllers[_b8] = new Controller(this.gamepads[_b8], _c7), this.controllers[_b8]._postSetup.call(this.controllers[_b8]);
      }
    }
  }.bind(this), b)) : (a && "function" == typeof a.unsupportedCallback && a.unsupportedCallback(), !1);
}, Controller.getController = function (a) {
  return a = parseInt(a), "number" != typeof a || isNaN(a) ? console.warn(a + " must be a number") : a % 1 !== 0 ? console.warn(a + " must be an int") : a < 0 && console.warn(a + " must be positive"), this.controllers && this.controllers[a];
}, Controller.watchAll = function () {
  for (var _a8 in Controller.controllers) {
    Controller.getController(_a8).watch();
  }
}, Controller.unwatchAll = function () {
  for (var _a9 in Controller.controllers) {
    Controller.getController(_a9).unwatch();
  }
}, Object.defineProperty(Controller, "controllerCount", { get: function get() {
    return this.controllers ? Object.keys(this.controllers).length : 0;
  } }), Object.defineProperty(Controller, "supported", { get: function get() {
    try {
      if (null === this.gamepads) throw "GAMEPAD";if ("defineProperty" in Object) return !0;throw "DEFINEPROPERTY";
    } catch (b) {
      return console.warn(a[b]), !1;
    }
  } }), Object.defineProperty(Controller, "gamepads", { get: function get() {
    var a = null;return "getGamepads" in navigator ? a = navigator.getGamepads() : "webkitGamepads" in navigator ? a = navigator.webkitGamepads() : "mozGamepads" in navigator ? a = navigator.mozGamepads() : "gamepads" in navigator && (a = navigator.gamepads()), a;
  }, enumerable: !1 }), Math.hypot = Math.hypot || function () {
  var a = 0;var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = arguments[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _b9 = _step3.value;
      if (_b9 === 1 / 0 || _b9 === -(1 / 0)) return 1 / 0;a += _b9 * _b9;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return Math.sqrt(a);
}, Object.assign = Object.assign || function (a) {
  "use strict";
  if (null === a) throw new TypeError("Cannot convert undefined or null to object");a = Object(a);for (var b = 1; b < arguments.length; b++) {
    var c = arguments[b];if (null !== c) for (var d in c) {
      Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d]);
    }
  }return a;
};var a = { get GAMEPAD() {
    return "This browser does not support the Gamepad API.";
  }, get DEFINEPROPERTY() {
    return "This browser does not suppoert Object.defineProperty().";
  }, get MAP() {
    return 'No matching map found. Using "Standard".';
  } },
    b = function b() {
  var a = "gc";this.getName = function (b, c) {
    var d = [a, this[b.toUpperCase()].base, this[b.toUpperCase()].actions[c]];return d.join(".");
  };
};Object.defineProperty(b.prototype, "CONTROLLER", { value: { base: "controller", actions: { connect: "found", disconnect: "lost" } } }), Object.defineProperty(b.prototype, "BUTTON", { value: { base: "button", actions: { start: "press", during: "hold", end: "release" } } }), Object.defineProperty(b.prototype, "ANALOG", { value: { base: "analog", actions: { start: "start", during: "hold", change: "change", end: "end" } } }), Controller.events = new b();var c = { list: { _unknown: { name: "Unknown Layout", description: "A fallback for when no appropriate layouts are found.", options: { allowsExtras: !0 } } }, register: function register(a) {
    var b = Controller.layouts;var c = a.match;for (var _d9 = 0; _d9 < b.regex.length; _d9++) {
      var _a10 = this.regex[_d9];if (_a10.test(c)) {
        c = c.match(_a10)[1].trim();break;
      }
    }b.list[c.toLowerCase()] = a;
  }, has: function has(a) {
    return a = a.toLowerCase(), a in Controller.layouts.list;
  }, get: function get(a) {
    return a = a.toLowerCase(), Controller.layouts.list[a];
  }, get regex() {
    return [/(.*)\(.*\)/, /[a-zA-Z0-9]{3,4}-[a-zA-Z0-9]{3,4}-(.*)/];
  } };Controller.layouts = c, function () {
  var a = { match: "Standard", name: "Standard", description: "The W3C standard gamepad layout.", buttons: { FACE_1: 0, FACE_2: 1, FACE_3: 2, FACE_4: 3, LEFT_SHOULDER: 4, RIGHT_SHOULDER: 5, LEFT_SHOULDER_BOTTOM: 6, RIGHT_SHOULDER_BOTTOM: 7, SELECT: 8, START: 9, LEFT_ANALOG_BUTTON: 10, RIGHT_ANALOG_BUTTON: 11, DPAD_UP: 12, DPAD_DOWN: 13, DPAD_LEFT: 14, DPAD_RIGHT: 15, HOME: 16 }, axes: { LEFT_ANALOG_STICK_HOR: 0, LEFT_ANALOG_STICK_VERT: 1, RIGHT_ANALOG_STICK_HOR: 2, RIGHT_ANALOG_STICK_VERT: 3 }, options: { allowsExtras: !0 } };Controller.layouts.register(a);
}();var d = function d(a, b, c) {
  this.name = a, this.defaultValue = b, this.setterFunction = c;
},
    e = function e(a) {
  !a && Controller.globalSettings;var b = {};Object.defineProperty(this, "global", { value: !!a, writable: !1, enumerable: !1, configurable: !1 }), this.register = function (c) {
    return a ? ("object" == _typeof(c.defaultValue) ? c.value = Object.assign({}, c.defaultValue) : c.value = c.defaultValue, Object.defineProperty(this.constructor.prototype, c.name, { get: function get() {
        return !this.global && c.name in b ? b[c.name] : c.value;
      }, set: function set(a) {
        if (void 0 === a || "default" === a && this.global) this.global ? "object" == _typeof(c.defaultValue) ? c.value = Object.assign({}, c.defaultValue) : c.value = c.defaultValue : delete b[c.name];else if ("default" === a) "object" == _typeof(c.defaultValue) ? b[c.name] = Object.assign({}, c.defaultValue) : b[c.name] = c.defaultValue;else {
          var _d10 = c.setterFunction(a);null !== _d10 && (this.global ? "object" == (typeof _d10 === "undefined" ? "undefined" : _typeof(_d10)) ? Object.assign(c.value, _d10) : c.value = _d10 : "object" == (typeof _d10 === "undefined" ? "undefined" : _typeof(_d10)) ? Object.assign(b[c.name], _d10) : b[c.name] = _d10);
        }
      }, enumerable: !0 }), !0) : (console.warn("You can only register settings globally:\nController.globalSettings.register()"), !1);
  };
};e.prototype.list = function () {
  var a = {};for (var _b10 in this.constructor.prototype) {
    this.constructor.prototype.hasOwnProperty(_b10) && "function" != typeof this.constructor.prototype[_b10] && (a[_b10] = this[_b10]);
  }return a;
}, e.prototype.clear = function () {
  for (var _a11 in this.constructor.prototype) {
    this.constructor.prototype.hasOwnProperty(_a11) && "function" != typeof this.constructor.prototype[_a11] && (this[_a11] = void 0);
  }return !0;
}, e.prototype.update = function () {
  function a(a) {
    for (var _b11 in a) {
      this[_b11] = a[_b11];
    }
  }var b = !1;switch (arguments.length) {case 1:
      "object" == _typeof(arguments[0]) ? a.call(this, arguments[0]) : console.warn('GC_Settings.update(settings) expects "settings" to be an object of key/value pairs.');break;case 2:
      "string" == typeof arguments[0] && arguments[0] in this ? this[arguments[0]] = arguments[1] : console.warn('GC_Settings.update(settingName, value) expects "settingname" to be the name of a setting.');break;default:
      console.warn('GC_Settings.update() expects either 1 or 2 arguments:\nupdate(settings) - where "settings" is an object key/value pairs\nupdate(settingName, value) - where "settingName" is the setting you want to change and "value" is what you want to change it to.');}return b;
}, Controller.globalSettings = new e(!0), Controller.globalSettings.register(new d("analogStickDeadzone", { min: 0, max: 1 }, function (a) {
  if ("object" != (typeof a === "undefined" ? "undefined" : _typeof(a)) || !("min" in a || "max" in a)) return console.warn('Value must be an object containing either/both "min" and "max" values'), null;var b = {};return "min" in a && "number" == typeof a.min && a.min >= 0 && a.min <= 1 && (b.min = a.min), "max" in a && "number" == typeof a.max && a.max >= 0 && a.max <= 1 && (b.max = a.max), b;
})), Controller.globalSettings.register(new d("analogStickDpadThreshold", .7, function (a) {
  return "number" == typeof a && a >= 0 && a <= 1 ? a : (console.warn("angry"), null);
})), Controller.globalSettings.register(new d("buttonThreshold", .95, function (a) {
  return "number" == typeof a && a >= 0 && a <= 1 ? a : (console.warn("angry"), null);
})), Controller.globalSettings.register(new d("mapAnalogToShape", "none", function (a) {
  return "none" === a ? "none" : "square" === a ? "square" : null;
})), Controller.globalSettings.register(new d("useAnalogAsDpad", "none", function (a) {
  var b = ["none", "left", "right", "both", !1];return b.indexOf(a) > -1 ? a : (console.warn('Not a valid option for "useAnalogAsDpad".'), null);
}));