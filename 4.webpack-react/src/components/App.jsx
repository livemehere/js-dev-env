import data from '@public/data.json'
import {useState} from "react";

export default function App(){
    console.log(data)
    const [count, setCount] = useState(0);

    return <div>
        <h1>피카츄12</h1>
        <div>{count}</div>
        <button onClick={()=> setCount(prev=> prev+1)}>UPUP</button>
        <img src='/pica.png' alt=""/>
    </div>
}