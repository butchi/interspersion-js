(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INDETERMINATE = "x";
var ZERO = "";
// const ZERO = "0";

var Interspersion = function Interspersion() {
  function s(n1) {
    if (n1 === "0" || n1 === "") {
      return INDETERMINATE;
    }
    if (negativeQ(n1)) {
      return decr(minus(n1));
    }
    try {
      var ret = n1.match(/^([01]*)10*$/)[1];
    } catch (err) {
      return NaN;
    }
    return ret;
  }
  /*
   * 末尾の0の個数を返す
   */
  function e(n1) {
    if (n1 === "0" || n1 === "") {
      return INDETERMINATE;
    }
    if (negativeQ(n1)) {
      return minus(n1);
    }
    try {
      var ret = n1.match(/^[01]*1(0*)$/)[1];
    } catch (err) {
      return NaN;
    }
    return zeroLen(ret);
  }
  return {
    s: s,
    e: e
  };
}();

function zeroLen(e) {
  if (e === "") {
    return "";
  } else {
    return e.length.toString(2);
  }
}

/**
 * n1個の0の列
 * 小さい数のときはあらかじめ長い0の列を作っておいてsliceするといいかもしれない
 * 参考: http://d.hatena.ne.jp/hir90/20080620/1213987444
 */
function zeros(n1) {
  if (typeof n1 !== "string") {
    console.error("Please input string");
  }

  return new Array(toInt(n1) + 1).join("0");
}

function toInt(n1) {
  if (typeof n1 !== "string") {
    console.error("Please input string.");
  }
  if (n1 === "") {
    return 0;
  }
  return parseInt(n1, 2);
}

function negativeQ(n1) {
  return !!n1.match(/^-/);
}

(function () {
  'use strict';

  var V = function V(n) {
    _classCallCheck(this, V);

    this.s = Interspersion.s(n);
    this.e = Interspersion.e(n);
  };

  var Intsprs = {
    n: function n(s, e) {
      if (s === INDETERMINATE && e === INDETERMINATE) {
        return ZERO;
      } else {
        return s + "1" + zeros(e);
      }
    },

    zeroQ: function zeroQ(v1) {
      return v1 instanceof V && v1.s === INDETERMINATE && v1.e === INDETERMINATE;
    },

    sameQ: function sameQ(v1, v2) {
      return v1 instanceof V && v1.s === v2.s && v1.e === v2.e;
    },

    minus: function minus(n1, mode) {
      if (typeof n1 !== "string") {
        console.error("Please input string.");
      }
      if (mode === "traditional") {
        if (n1 === ZERO) {
          n1 = "0";
        }
        var ret = -parseInt(n1, 2);
        return ret === 0 ? ZERO : ret.toString(2);
      }
      if (n1 === ZERO) {
        return ZERO;
      }
      if (n1.match(/^-[01]+$/)) {
        return n1.match(/^-([01]+)$/)[1];
      } else if (n1.match(/^1[01]*$/)) {
        return "-" + n1;
      }
    },

    plus: function plus(n1, n2, mode) {
      var n = Intsprs.n;
      var incr = Intsprs.incr;
      var decr = Intsprs.decr;
      var plus = Intsprs.plus;
      var sub = Intsprs.sub;

      if (typeof n1 !== "string" || typeof n2 !== "string") {
        console.error("Please input string.");
      }
      if (mode === "traditional") {
        if (n1 === ZERO) {
          n1 = "0";
        }
        if (n2 === ZERO) {
          n2 = "0";
        }
        var ret = parseInt(n1, 2) + parseInt(n2, 2);
        return ret === 0 ? ZERO : ret.toString(2);
      }
      var v1 = new V(n1);
      var v2 = new V(n2);

      if (n2 === ZERO) {
        return n1;
      }
      if (n1 === ZERO) {
        return n2;
      }

      if (v1.e === v2.e) {
        var vTmp = new V(incr(plus(v1.s, v2.s)));
        return n(vTmp.s, incr(plus(vTmp.e, v1.e)));
      } else if (toInt(v1.e) > toInt(v2.e)) {
        return n(plus(n(v1.s, decr(sub(v1.e, v2.e))), v2.s), v2.s);
      } else if (toInt(v2.e) > toInt(v1.e)) {
        return n(plus(n(v2.s, decr(sub(v2.e, v1.y))), v1.s), v1.e);
      } else {
        console.error('invalid value:' + 'plus', n1, n2);
      }
    },

    sub: function (_sub) {
      function sub(_x, _x2, _x3) {
        return _sub.apply(this, arguments);
      }

      sub.toString = function () {
        return _sub.toString();
      };

      return sub;
    }(function (n1, n2, mode) {
      var plus = Intsprs.plus;
      var minus = Intsprs.minus;

      if (typeof n1 !== "string" || typeof n2 !== "string") {
        console.error("Please input string.");
      }
      if (mode === "traditional") {
        if (n1 === ZERO) {
          n1 = "0";
        }
        if (n2 === ZERO) {
          n2 = "0";
        }
        var ret = parseInt(n1, 2) - parseInt(n2, 2);
        return ret === 0 ? ZERO : ret.toString(2);
      }
      var v1 = new V(n1);
      var v2 = new V(n2);

      if (n2 === ZERO) {
        return n1;
      }
      if (n1 === ZERO) {
        return minus(n2);
      }

      if (v1.e === v2.e) {
        var vTmp = new V(sub(v1.s, v2.s));
        return n(vTmp.s, incr(plus(vTmp.e, v1.e)));
      } else if (v1.e.length > v2.length) {
        return n(sub(n(v1.s, decr(sub(v1.e, v2.e))), v2.s), v2.e);
      } else if (v2.e.length > v1.e.length) {
        return n(sub(n(v2.s, decr(sub(v2.e, v1.e))), v1.s), v1.e);
      } else {
        console.error('invalid value:' + 'sub', n1, n2);
      }
    }),

    // 負の数未対応
    incr: function (_incr) {
      function incr(_x4, _x5) {
        return _incr.apply(this, arguments);
      }

      incr.toString = function () {
        return _incr.toString();
      };

      return incr;
    }(function (n1, mode) {
      var n = Intsprs.n;
      var minus = Intsprs.minus;
      var decr = Intsprs.decr;

      if (typeof n1 !== "string") {
        console.error("Please input string.");
      }
      if (mode === "traditional") {
        if (n1 === ZERO) {
          n1 = "0";
        }
        var ret = parseInt(n1, 2) + 1;
        return ret === 0 ? ZERO : ret.toString(2);
      }
      var v1 = new V(n1);

      if (n1 === ZERO) {
        return "1";
      }

      if (v1.e === "") {
        var vTmp = new V(incr(v1.s, "traditional"));
        return n(vTmp.s, incr(plus(vTmp.e, v1.e), "traditional"));
      } else if (toInt(v1.e) > 0) {
        return n(n(v1.s, decr(v1.e, "traditional")), "");
      } else {
        console.error('invalid value:', 'incr', n1);
      }
    }),

    decr: function (_decr) {
      function decr(_x6, _x7) {
        return _decr.apply(this, arguments);
      }

      decr.toString = function () {
        return _decr.toString();
      };

      return decr;
    }(function (n1, mode) {
      if (typeof n1 !== "string") {
        console.error("Please input string.");
      }
      if (mode === "traditional") {
        if (n1 === ZERO) {
          n1 = "0";
        }
        var ret = parseInt(n1, 2) - 1;
        return ret === 0 ? ZERO : ret.toString(2);
      }
      var v1 = new V(n1);
      if (n1 === ZERO) {
        return minus("1");
      }
      if (v1.e === "") {
        return n(Interspersion.s(v1.s), incr(plus(Interspersion.e(v1.s), v1.e, "traditional"), "traditional"));
      } else if (toInt(v1.e) > 0) {
        return n(decr(n(v1.s, decr(v1.e, "traditional")), "traditional"), "0");
      } else {
        console.error('invalid value:', 'decr', n1);
      }
    })
  };

  /*
  var i, j;
  for(j=-8; j<8; j++) {
    var tmp = '';
    for(i=-8; i<8; i++) {
      tmp += sub(i.toString(2), j.toString(2), "traditional") + ' ';
    }
    console.log(tmp);
  }
  */

  // export
  global.Interspersion = Interspersion;
  global.Intsprs = Intsprs;
  global.V = V;
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
