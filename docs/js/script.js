let tmp;
let tmp1;
let tmp2;

for (let i = 0; i <= 10; i++) {
  tmp = new V(i.toString(2));
  console.log('V:', tmp);

  tmp2 = Intsprs.n(tmp.s, tmp.e);
  console.log('n:', tmp2);
}

tmp = Intsprs.zeroQ(new V(''));
console.log('zeroQ:', tmp);

tmp1 = new V('10100');
tmp2 = new V('10100');
tmp = Intsprs.sameQ(tmp1, tmp2);
console.log('sameQ:', tmp);

tmp = Intsprs.n('110','100');
console.log(tmp);

tmp = Intsprs.minus('1010');
console.log(tmp);

tmp = Intsprs.incr('111');
console.log(tmp);

tmp = Intsprs.decr('100');
console.log(tmp);

for (let i = 0; i <= 10; i++) {
  tmp = Intsprs.incr(i.toString(2));
  console.log(`${i.toString(2)} + 1:`, tmp);
}

for (let i = 10; i > 0; i--) {
  tmp = Intsprs.decr(i.toString(2));
  console.log(`${i.toString(2)} - 1:`, tmp);
}

for (let n1 = 0; n1 <= 10; n1++) {
  tmp = '';
  for (let n2 = 0; n2 <= 10; n2++) {
    tmp1 = Intsprs.mult(n1.toString(2), n2.toString(2));
    tmp2 = ('  ' + (parseInt(tmp1, 2) || 0)).slice(-3);
    tmp += `${tmp2 } `;
  }
  console.log(tmp);
}
