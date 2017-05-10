const INDETERMINATE = 'x';
const ZERO = '';
// const ZERO = "0";

const Interspersion = (function Interspersion() {
  function s(n1) {
    const decr = Intsprs.decr;
    const minus = Intsprs.minus;

    if(typeof n1 === 'number') {
      n1 = n1.toString(2) || ZERO;
    }

    if(n1 === '0' || n1 === '') {
      return INDETERMINATE;
    }
    if(negativeQ(n1)) {
      return decr(minus(n1));
    }
    try {
      var ret = n1.match(/^([01]*)10*$/)[1];
    } catch(err) {
      return NaN;
    }
    return ret;
  }

  /*
   * 末尾の0の個数を返す
   */
  function e(n1) {
    const minus = Intsprs.minus;

    if(typeof n1 === 'number') {
      n1 = n1.toString(2) || ZERO;
    }

    if(n1=== '0' || n1 === '') {
      return INDETERMINATE;
    }
    if(negativeQ(n1)) {
      return minus(n1);
    }
    try {
      var ret = n1.match(/^[01]*1(0*)$/)[1];
    } catch(err) {
      return NaN;
    }
    return zeroLen(ret);
  }
  return {
    s,
    e,
  };
})();

function zeroLen(e) {
  if(e === '') {
    return '';
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
  if(typeof n1 !== 'string') {
    console.error('Please input string');
  }

  return new Array(Intsprs.toInt(n1) + 1).join('0');
}

function negativeQ(n1) {
  return !!n1.match(/^-/);
}



(function() {
  'use strict';

  class V {
    constructor(n) {
      this.s = Interspersion.s(n);
      this.e = Interspersion.e(n);
    }
  }

  const Intsprs = {
    n: (s, e) => {
      if(s === INDETERMINATE && e === INDETERMINATE) {
        return ZERO;
      } else {
        return s + '1' + zeros(e);
      }
    },

    toInt: (n1) => {
      if(typeof n1 !== 'string') {
        console.error("Please input string.");
      }
      if(n1 === '') {
        return 0;
      }
      return parseInt(n1, 2);
    },

    zeroQ: (v1) => {
      return ((v1 instanceof V) && v1.s === INDETERMINATE && v1.e === INDETERMINATE);
    },

    sameQ: (v1, v2) => {
      return ((v1 instanceof V) && v1.s === v2.s && v1.e === v2.e)
    },

    minus: (n1, mode) => {
      if(typeof n1 === 'number') {
        n1 = n1.toString(2) || ZERO;
      }

      if(typeof n1 !== 'string') {
        console.error('Please input string.');
      }
      if(mode === 'traditional') {
        if(n1 === ZERO) {
          n1 = '0';
        }
        var ret = - parseInt(n1, 2);
        return (ret === 0) ? ZERO : ret.toString(2);
      }
      if(n1 === ZERO) {
        return ZERO;
      }
      if(n1.match(/^-[01]+$/)) {
        return n1.match(/^-([01]+)$/)[1]
      } else if(n1.match(/^1[01]*$/)) {
        return '-' + n1;
      }
    },

    plus: (n1, n2, mode) => {
      const n = Intsprs.n;
      const toInt = Intsprs.toInt;
      const incr = Intsprs.incr;
      const decr = Intsprs.decr;
      const plus = Intsprs.plus;
      const sub = Intsprs.sub;

      if(typeof n1 === 'number') {
        n1 = n1.toString(2) || ZERO;
      }
      if(typeof n2 === 'number') {
        n2 = n2.toString(2) || ZERO;
      }

      if((typeof n1 !== 'string') || (typeof n2 !== 'string')) {
        console.error("Please input string.");
      }
      if(mode === "traditional") {
        let ret = (parseInt(n1, 2) || 0) + (parseInt(n2, 2) || 0);
        return (ret === 0)? ZERO : ret.toString(2);
      }
      var v1 = new V(n1);
      var v2 = new V(n2);
      
      if(n2 === '0' || n2 === '') {
        return n1;
      }
      if(n1 === '0' || n1 === '') {
        return n2;
      }

      if(v1.e === v2.e) {
        let vTmp = new V(incr(plus(v1.s, v2.s)));

        let s3 = vTmp.s;
        let e3 = incr(plus(vTmp.e, v1.e));
        let n3 = n(s3, e3);

        return n3;
      } else if(toInt(v1.e) > toInt(v2.e)) {
        let s3 = plus( n(v1.s, decr(sub(v1.e, v2.e, 'traditional'))), v2.s );
        let e3 = v2.e;
        let n3 = n(s3, e3);

        return n3;
      } else if(toInt(v2.e) > toInt(v1.e)) {
        let s3 = plus( n(v2.s, decr(sub(v2.e, v1.e, 'traditional'))), v1.s );
        let e3 = v1.e;
        let n3 = n(s3, e3);

        return n3;
      } else {
        console.error(`invalid value: plus ${n1}, ${n2}`);
      }
    },

    sub: (n1, n2, mode) => {
      const n = Intsprs.n;
      const toInt = Intsprs.toInt;
      const plus = Intsprs.plus;
      const sub = Intsprs.sub;
      const minus = Intsprs.minus;
      const incr = Intsprs.incr;
      const decr = Intsprs.decr;

      if(typeof n1 === 'number') {
        n1 = n1.toString(2) || ZERO;
      }
      if(typeof n2 === 'number') {
        n2 = n2.toString(2) || ZERO;
      }

      if((typeof n1 !== "string") || (typeof n2 !== "string")) {
        console.error("Please input string.");
      }
      if(mode === "traditional") {
        var ret = (parseInt(n1, 2) || 0) - (parseInt(n2, 2) || 0);
        return (ret === 0) ? ZERO : ret.toString(2);
      }
      const v1 = new V(n1);
      const v2 = new V(n2);

      if(n1 === n2) {
        return ZERO;
      }
      
      if(n2 === '' || n2 === '0') {
        return n1;
      }
      if(n1 === '' || n1 === '0') {
        return minus(n2);
      }

      if(v1.e === v2.e) {
        var vTmp = new V(sub(v1.s, v2.s, 'traditional'));
        return n(vTmp.s, incr(plus(vTmp.e, v1.e)));
      } else if(toInt(v1.e) > toInt(v2.e)) {
        return n( sub( n(v1.s, decr(sub(v1.e, v2.e, 'traditional'))), v2.s, 'traditional' ), v2.e );
      } else if(toInt(v2.e) > toInt(v1.e)) {
        return minus( n( sub( n(v2.s, decr(sub(v2.e, v1.e, 'traditional'))), v1.s, 'traditional' ), v1.e ) );
      } else {
        console.error(`invalid value: sub ${n1}, ${n2}`);
      }
    },

    // 負の数未対応
    incr: (n1, mode) => {
      const n = Intsprs.n;
      const toInt = Intsprs.toInt;
      const minus = Intsprs.minus;
      const plus = Intsprs.plus;
      const incr = Intsprs.incr;
      const decr = Intsprs.decr;

      if(typeof n1 === 'number') {
        n1 = n1.toString(2) || ZERO;
      }

      if(typeof n1 !== 'string') {
        console.error('Please input string.');
      }
      if(mode === 'traditional') {
        if(n1 === ZERO) {
          n1 = '0';
        }
        var ret = parseInt(n1, 2) + 1;
        return (ret === 0) ? ZERO : ret.toString(2);
      }
      var v1 = new V(n1);

      if(n1 === ZERO || n1 === '0') {
        return '1';
      }

      if(v1.e === ZERO) {
        var vTmp = new V(incr(v1.s));
        return n(vTmp.s, incr(plus(vTmp.e, v1.e)));
      } else if(toInt(v1.e) > 0) {
        return n( n(v1.s, decr(v1.e)), ZERO );
      } else {
        console.error(`invalid value: incr ${n1}`);
      }
    },

    decr: (n1, mode) => {
      const n = Intsprs.n;
      const toInt = Intsprs.toInt;
      const plus = Intsprs.plus;
      const minus = Intsprs.minus;
      const incr = Intsprs.incr;
      const decr = Intsprs.decr;

      if(typeof n1 === 'number') {
        n1 = n1.toString(2) || ZERO;
      }

      if(typeof n1 !== 'string') {
        console.error('Please input string.');
      }
      if(mode === 'traditional') {
        var ret = (parseInt(n1, 2) || 0) - 1;
        return (ret === 0)? ZERO : ret.toString(2);
      }
      var v1 = new V(n1);
      if(n1 === ZERO) {
        return minus('1');
      }
      if(v1.e === ZERO) {
        if(v1.s === ZERO) {
          return ZERO;
        }

        let s2 = Interspersion.s(v1.s);
        let e2 = incr(plus(Interspersion.e(v1.s), v1.e));
        let n2 = n(s2, e2);

        return n2;
      } else if(toInt(v1.e) > 0) {
        let s2 = decr(n(v1.s, decr(v1.e)));
        let e2 = ZERO;
        let n2 = n(s2, e2);

        return n2;
      } else {
        console.error(`invalid value: decr ${n1}`);
      }
    },

    double: (n1, mode) => {
      const n = Intsprs.n;
      const plus = Intsprs.plus;
      const mult = Intsprs.mult;

      if(typeof n1 === 'number') {
        n1 = n1.toString(2) || ZERO;
      }

      if(typeof n1 !== 'string') {
        console.error('Please input string.');
      }
      if(mode === 'traditional') {
        let ret = parseInt(n1, 2) || 0;
        return (ret === 0) ? ZERO : ret.toString(2);
      }
      const v1 = new V(n1);

      if(n1 === '0' || n1 === '') {
        return ZERO;
      }

      let n2 = n1 + '0';

      return n2;
    },

    mult: (n1, n2, mode) => {
      const n = Intsprs.n;
      const plus = Intsprs.plus;
      const mult = Intsprs.mult;
      const double = Intsprs.double;

      if(typeof n1 === 'number') {
        n1 = n1.toString(2) || ZERO;
      }
      if(typeof n2 === 'number') {
        n2 = n2.toString(2) || ZERO;
      }

      if((typeof n1 !== 'string') || (typeof n2 !== 'string')) {
        console.error('Please input string.');
      }
      if(mode === 'traditional') {
        let ret = (parseInt(n1, 2) || 0) * (parseInt(n2, 2) || 0);
        return (ret === 0) ? ZERO : ret.toString(2);
      }
      const v1 = new V(n1);
      const v2 = new V(n2);

      if(n1 === '0' || n1 === '' || n2 === '0' || n2 === '') {
        return ZERO;
      }

      if(n1 === '1') {
        return n1;
      }
      if(n2 === '1') {
        return n2;
      }

      let s3 = plus(double(mult(v1.s, v2.s)), plus(v1.s, v2.s));
      let e3 = plus(v1.e, v2.e);
      let n3 = n(s3, e3);

      return n3;
    },
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
