import React, { useState } from "react";
import Header from "./Header";

function App() {
  const [counter, setCounter] = useState(0);
  const increment = () => {
    setCounter(counter + 1 );
  };
  const decrement = () => {
    setCounter(counter - 1 );
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
