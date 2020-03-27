import React from "react";
import Header from "./Header";

function App() {
  let counter = 0;
  const increment = () => {
    counter++;
    console.info({ counter: counter });
    return counter;
  };
  const decrement = () => {
    counter--;
    console.info({ counter: counter });
    return counter;
  };
  return (
    <div>
      <Header>Be the Hero.</Header>
      <span>
        <h2>Counter: {counter}</h2>
      </span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default App;
