!function b(u,t,c){function h(bb,ub){if(!t[bb]){if(!u[bb]){var tb="function"==typeof require&&require;if(!ub&&tb)return tb(bb,!0);if(i)return i(bb,!0);var cb=new Error("Cannot find module '"+bb+"'");throw cb.code="MODULE_NOT_FOUND",cb}var hb=t[bb]={exports:{}};u[bb][0].call(hb.exports,function(b){var t=u[bb][1][b];return h(t?t:b)},hb,hb.exports,b,u,t,c)}return t[bb].exports}for(var i="function"==typeof require&&require,bb=0;bb<c.length;bb++)h(c[bb]);return h}({1:[function(b,u,t){(function(b){"use strict";function u(b,u){if(!(b instanceof u))throw new TypeError("Cannot call a class as a function")}function t(b){return""===b?"":b.length.toString(2)}function c(b){return"string"!=typeof b&&console.error("Please input string"),new Array(h(b)+1).join("0")}function h(b){return"string"!=typeof b&&console.error("Please input string."),""===b?0:parseInt(b,2)}function i(b){return!!b.match(/^-/)}var bb="x",ub="",tb=function(){function b(b){if("0"===b||""===b)return bb;if(i(b))return decr(minus(b));try{var u=b.match(/^([01]*)10*$/)[1]}catch(t){return NaN}return u}function u(b){if("0"===b||""===b)return bb;if(i(b))return minus(b);try{var u=b.match(/^[01]*1(0*)$/)[1]}catch(c){return NaN}return t(u)}return{s:b,e:u}}();!function(){var t=function cb(b){u(this,cb),this.s=tb.s(b),this.e=tb.e(b)},i={n:function(b,u){return b===bb&&u===bb?ub:b+"1"+c(u)},zeroQ:function(b){return b instanceof t&&b.s===bb&&b.e===bb},sameQ:function(b,u){return b instanceof t&&b.s===u.s&&b.e===u.e},minus:function(b,u){if("string"!=typeof b&&console.error("Please input string."),"traditional"===u){b===ub&&(b="0");var t=-parseInt(b,2);return 0===t?ub:t.toString(2)}return b===ub?ub:b.match(/^-[01]+$/)?b.match(/^-([01]+)$/)[1]:b.match(/^1[01]*$/)?"-"+b:void 0},plus:function hb(b,u,c){var bb=i.n,tb=i.incr,cb=i.decr,hb=i.plus,ib=i.sub;if(("string"!=typeof b||"string"!=typeof u)&&console.error("Please input string."),"traditional"===c){b===ub&&(b="0"),u===ub&&(u="0");var bu=parseInt(b,2)+parseInt(u,2);return 0===bu?ub:bu.toString(2)}var uu=new t(b),tu=new t(u);if(u===ub)return b;if(b===ub)return u;if(uu.e===tu.e){var cu=new t(tb(hb(uu.s,tu.s)));return bb(cu.s,tb(hb(cu.e,uu.e)))}return h(uu.e)>h(tu.e)?bb(hb(bb(uu.s,cb(ib(uu.e,tu.e))),tu.s),tu.s):h(tu.e)>h(uu.e)?bb(hb(bb(tu.s,cb(ib(tu.e,uu.y))),uu.s),uu.e):void console.error("invalid value:plus",b,u)},sub:function(b){function u(u,t,c){return b.apply(this,arguments)}return u.toString=function(){return b.toString()},u}(function(b,u,c){var h=i.plus,bb=i.minus;if(("string"!=typeof b||"string"!=typeof u)&&console.error("Please input string."),"traditional"===c){b===ub&&(b="0"),u===ub&&(u="0");var tb=parseInt(b,2)-parseInt(u,2);return 0===tb?ub:tb.toString(2)}var cb=new t(b),hb=new t(u);if(u===ub)return b;if(b===ub)return bb(u);if(cb.e===hb.e){var ib=new t(sub(cb.s,hb.s));return n(ib.s,incr(h(ib.e,cb.e)))}return cb.e.length>hb.length?n(sub(n(cb.s,decr(sub(cb.e,hb.e))),hb.s),hb.e):hb.e.length>cb.e.length?n(sub(n(hb.s,decr(sub(hb.e,cb.e))),cb.s),cb.e):void console.error("invalid value:sub",b,u)}),incr:function(b){function u(u,t){return b.apply(this,arguments)}return u.toString=function(){return b.toString()},u}(function(b,u){var c=i.n,bb=(i.minus,i.decr);if("string"!=typeof b&&console.error("Please input string."),"traditional"===u){b===ub&&(b="0");var tb=parseInt(b,2)+1;return 0===tb?ub:tb.toString(2)}var cb=new t(b);if(b===ub)return"1";if(""===cb.e){var hb=new t(incr(cb.s,"traditional"));return c(hb.s,incr(plus(hb.e,cb.e),"traditional"))}return h(cb.e)>0?c(c(cb.s,bb(cb.e,"traditional")),""):void console.error("invalid value:","incr",b)}),decr:function(b){function u(u,t){return b.apply(this,arguments)}return u.toString=function(){return b.toString()},u}(function(b,u){if("string"!=typeof b&&console.error("Please input string."),"traditional"===u){b===ub&&(b="0");var c=parseInt(b,2)-1;return 0===c?ub:c.toString(2)}var i=new t(b);return b===ub?minus("1"):""===i.e?n(tb.s(i.s),incr(plus(tb.e(i.s),i.e,"traditional"),"traditional")):h(i.e)>0?n(decr(n(i.s,decr(i.e,"traditional")),"traditional"),"0"):void console.error("invalid value:","decr",b)})};b.Interspersion=tb,b.Intsprs=i,b.V=t}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);