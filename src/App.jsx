import { useState, useCallback,useEffect,useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');
  // useref hook
  const passwordRef= useRef(null);
  const copyPasswordToClipboard =useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(password); // to copy to clipboard
  },[password])  // another one is dependancy array 1st one is callback
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$&++=;.>*()~';

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);  // yaha humlog optimise ki baat kr rhe hai
  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,characterAllowed])   // yaha humlog ched chad hua toh reload ki baat kr rhe

  return (
    <>
      
  <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
    <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className='className="flex shadow rounded-lg overflow-hidden mb-4 "'>
      <input type="text"
      value={password}
      className='outline-none w-full py-1 px-3  '
      placeholder='password'
      readOnly
      ref={passwordRef} />
      <button onClick={copyPasswordToClipboard}>copy</button>
    </div>
    <div>
      <div>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}} />
        <label>Length:{length}</label>
      </div>
      <div>
        <input type="checkbox"
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={()=>{
          setNumberAllowed((prev)=>!prev);
        }} />
        <label htmlFor='numberInput' >Numbers</label>
      </div>
      <div>
        <input type="checkbox"
        defaultChecked={characterAllowed}
        id='characterInput'
        onChange={()=>{
          setCharacterAllowed((prev)=>!prev);
        }} />
        <label htmlFor='chracterInput' >Character</label>
      </div>
    </div>
  </div>


    </>
  );
}

export default App;
