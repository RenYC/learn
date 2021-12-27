// class Dog {
//   constructor(name, age) {
//     this.name = name
//     this.age = age
//   }

//   eat() {
//     console.log('肉骨头真好吃');
//   }
// }

function Dog(name, age) {
  this.name = name
  this.age = age
}

Dog.prototype.eat = function () {
  console.log('肉骨头真好吃');
}

const dog = new Dog('旺财', 3)

