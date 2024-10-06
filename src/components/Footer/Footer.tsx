import { useState } from 'react';
import './Footer.css';

function Footer() {
  const [counter, setCounter]= useState(0);
  return (
    <>
      <div id='footer'>
        <p>
          This is a footer, still in test, you can play with this counter: {counter}
        </p>
        <button  onClick={() => setCounter(counter + 1)}>Click me</button>
      </div>
    </>
  )
}

export default Footer