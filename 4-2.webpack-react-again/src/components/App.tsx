import { useState } from 'react';

import Desc from '@/components/Desc';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello, world!2222232312qwdqwdqwdqwdqwdqwdqwdqwdqwd12312s23242</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <img src='/pikachu-00.jpg' alt='' />
      <img src='/pikachu-00.jpg' alt='' />
      <Desc />
    </div>
  );
}
