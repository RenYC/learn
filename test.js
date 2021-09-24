var x = 10;
var foo = {
  x: 20,
  bar: function() {
    console.log(this);
    var x = 30;
    return this.x
  }
}

console.log(foo.bar());
console.log((foo.bar)());
console.log((foo.bar = foo.bar)());
console.log((foo.bar, foo.bar)());