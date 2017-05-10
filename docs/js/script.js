const toInt = Intsprs.toInt;

let tmp;
let tmp1;
let tmp2;


for (let i = 0; i <= 10; i++) {
  tmp = new V(i);
  console.log('V:', tmp);

  tmp2 = Intsprs.n(tmp.s, tmp.e);
  console.log('n:', toInt(tmp2));
}

tmp = Intsprs.zeroQ(new V(''));
console.log('zeroQ:', tmp);

tmp1 = new V('10100');
tmp2 = new V('10100');
tmp = Intsprs.sameQ(tmp1, tmp2);
console.log('sameQ:', tmp);

tmp = Intsprs.n('110','100');
console.log(tmp);

tmp = Intsprs.minus(10);
console.log(toInt(tmp));

tmp = Intsprs.incr(7);
console.log(toInt(tmp));

tmp = Intsprs.decr(4);
console.log(toInt(tmp));

for (let i = 0; i <= 10; i++) {
  tmp = Intsprs.incr(i);
  console.log(`${i} + 1:`, toInt(tmp, 2));
}

for (let i = 10; i > 0; i--) {
  tmp = Intsprs.decr(i.toString(2));
  console.log(`${i} - 1:`, toInt(tmp, 2));
}

for (let i = 0; i < 10; i++) {
  tmp = Intsprs.double(i.toString(2));
  console.log(`${i} * 2:`, toInt(tmp));
}

for (let n1 = 0; n1 <= 10; n1++) {
  tmp = '';
  for (let n2 = 0; n2 <= 10; n2++) {
    tmp1 = Intsprs.plus(n1.toString(2), n2.toString(2));
    tmp2 = ('  ' + toInt(tmp1, 2)).slice(-3);
    tmp += `${tmp2 } `;
  }
  console.log(tmp);
}

for (let n1 = 0; n1 <= 10; n1++) {
  tmp = '';
  for (let n2 = 0; n2 <= 10; n2++) {
    tmp1 = Intsprs.mult(n1.toString(2), n2.toString(2));
    tmp2 = ('  ' + toInt(tmp1, 2)).slice(-3);
    tmp += `${tmp2 } `;
  }
  console.log(tmp);
}
