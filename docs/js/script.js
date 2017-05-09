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

tmp = Intsprs.plus('11', '10');
console.log(tmp);

