/**
 * 02 합성 상태값 만들기
 */

import React,{useState} from 'react';

export function App(props) {

  const celsiusToFahrenheit = t => t * 9 / 5 + 32;

  const stateCelsiusToFahrenheit = ([temperature, setTemp]) => {
   const tempF = celsiusToFahrenheit(temperature);
   const setTempF = (tempC) => setTemp(celsiusToFahrenheit(tempC));
   return [tempF, setTempF];
  }

  const compose = (...paramFuncArr) => initVal => paramFuncArr.reduceRight(
      (val, func) => func(val),
      initVal
  );

  // useState(num) 이 먼저 실행되고, 그 결과값이 stateCelsiusToFahrenheit의 매개변수로 넘어간다
  const useFahrenheit = compose(
      stateCelsiusToFahrenheit,
      useState
  );

  // 섭씨를 화씨로 바꾸는 state를 만들어냅니다.
  const [tempF, setTempF] = useFahrenheit(23);

  return (
    <div className='App'></div>
  );
}