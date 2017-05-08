// plusとsubではエラーがたくさん
function v(n) {
  var x=0;
  var y=0;
  var ret = {};
  if(n!==~~n) {
    console.error('invalid value:', 'v', n);
    ret.x = NaN;
    ret.y = NaN;
    return ret;
  }
  if(n===0) {
    ret.x = 0;
    ret.y = Number.NEGATIVE_INFINITY;
    ret.valueOf = function() {
      return 0;
    }
    ret.toString = function() {
      return '0';
    };
    return ret;
  }
  while((n & 1)==0) {
    n>>=1;
    y++;
  }
  x = n>>1;
  ret.x = x;
  ret.y = y;
  ret.valueOf = function() {
    return ret.x+','+ret.y;
  }
  ret.toString = function() {
    return '('+ret.x+','+ret.y+')';
  };
  return ret;
}

function n(x, y) {
  return (x*2+1)*Math.pow(2, y);
}

function plus(n1, n2) {
  var traceTxt = '';
  var v1 = v(n1);
  var v2 = v(n2);
  
  if(n2===0) {
    return n1;
  }
  if(n1===0) {
    return n2;
  }

  if(v1.y===v2.y) {
    var vTmp = v(v1.x+v2.x+1);
    return n(vTmp.x, incr(plus(vTmp.y, v1.y)));
  } else if(v1.y>v2.y) {
    return n( plus( n(v1.x, decr(plus(v1.y, -v2.y))), v2.x ), v2.y );
  } else if(v2.y>v1.y) {
    return n( plus( n(v2.x, decr(plus(v2.y, -v1.y))), v1.x ), v1.y );
  } else {
    console.error('invalid value:'+'plus', n1, n2);
  }
}

function sub(n1, n2) {
  var traceTxt = '';
  var v1 = v(n1);
  var v2 = v(n2);
  
  if(n2===0) {
    return n1;
  }
  if(n1===0) {
    return -n2;
  }

  if(v1.y===v2.y) {
    var vTmp = v(v1.x-v2.x);
    return n(vTmp.x, 1+(vTmp.y+ v1.y));
  } else if(v1.y>v2.y) {
    return n( ( n(v1.x+ -1+((v1.y- v2.y))), v2.x ), v2.y );
  } else if(v2.y>v1.y) {
    return n( ( n(v2.x+ -1+((v2.y- v1.y))), v1.x ), v1.y );
  } else {
    console.error('invalid value:'+'sub', n1, n2);
  }
}

function incr(n1) {
  var v1 = v(n1);
  if(n1===0) {
    return 1;
  }
  if(v1.y===0) {
    var vTmp = v(v1.x+1);
    return n(vTmp.x, vTmp.y+v1.y+1);
  } else if(v1.y>0) {
    return n( n(v1.x, v1.y-1), 0 );
  } else {
    console.error('invalid value:', 'incr', n1);
  }
  var vTmp = v();
}

function decr(n1) {
  var v1 = v(n1);
  if(n1===0) {
    return -1;
  }
  if(v1.y===0) {
    var vTmp = v(v1.x);
    return n(vTmp.x, vTmp.y+v1.y+1);
  } else if(v1.y>0) {
    return n( n(v1.x, v1.y-1)-1, 0 );
  } else {
    console.error('invalid value:', 'decr', n1);
  }
  var vTmp = v();
}

var i, j;
for(j=-0; j<15; j++) {
  var tmp = '';
  for(i=-0; i<15; i++) {
    tmp += plus(i, j) + ' ';
  }
  console.log(tmp);
}
