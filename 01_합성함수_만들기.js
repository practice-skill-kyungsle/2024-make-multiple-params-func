/**
 * 01. 합성함수 만들어보기
 * 합성 함수를 만드는 것은 유지보수에 좋은 행동이다.
 * 순수함수를 여러개 만들어 엮는 행동이기 때문이다.
 * 하나의 역할만 하는 순수함수는 가독성을 높여주며, 함수를 믿기 쉬워진다.
 */

const add2 = (num) => num+2;
const square = (num) => num*num;

// 위 두개의 함수를 하나로 묶는 함수는 아래와 같다
const add2AndSquare = (num) => square(add2(num))

// compose라는 함수를 만들어두면 합성 함수를 만들기 더욱 편하다
// 아래의 함수에서 (val => ...) 부분이 compose 함수의 반환값이다. 즉 함수를 반환하는 것이다.
const compose = (func1, func2) => val => func2(func1(val));

// 위 방식은 두 개의 함수만을 합성할 수 있다. 여러개의 함수를 합성하려면, reduceRight라는 메서드를 사용한다.
// Array.prototype.reduceRight 의 활용법은 아래와 같다

const array1 = [[0, 1], [2, 3], [4, 5]].reduceRight(
    (accumulator, currentValue) => accumulator.concat(currentValue)
  );
  
console.log(array1);  // [4, 5, 2, 3, 0, 1]

// 오른쪽에서 왼쪽으로 돈다는 것에 유의한다

const compose = (...paramFuncArr) => (initialVal) => paramFuncArr.reduceRight((val, fn) => fn(val), initialVal);

// 함수의 매개변수를 rest parameter로 받는다면, 인자들을 요소로 하는 배열로 받을 수 있기 때문에 가능한 일이다
// 이 두 코드는 완전히 같다
multiply5(add2(multiply3(add2(2))));
compose(multiply5, add2, multiply3, add2)(2);

// compose는 맨 오른쪽에 있는 함수부터 실행되므로, 왼쪽에 있는 함수부터 실행하려면 이렇게 한다

const pipe = (...funcs) => (initialVal) 
	=> funcs.reduce((val, fn) => fn(val), initialVal);

// 이 두 코드는 완전히 같다 
multiply5(add2(multiply3(add2(2))));
pipe(add2, multiply3, add2, multiply5)(2);