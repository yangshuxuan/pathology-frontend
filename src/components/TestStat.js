import React, { useState } from "react";
const TestStat = () => {
  console.log("run again");
  const [state, setState] = useState(0);
  console.log(state);
//   const [arr, setArr] = useState([state]);
  const clickHandler = () => {
     setState(state + 1);
    //setArr(arr); //为什么这个不起作用呢，是因为引用的地址没有发生改变，所以不会触发重新执行
    //setArr([...arr, state+1]);
    
  };
  console.log("end run");
  return (
    <div>
      <button onClick={clickHandler}>点击我</button>
      <h1>{state}</h1>
      {/* <h2>{arr}</h2> */}
    </div>
  );
};
export default TestStat;
