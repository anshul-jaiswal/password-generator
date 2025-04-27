import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [password, setpassword] = useState("");
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [length, setlength] = useState(7);
  const password_ref=useRef();

  const password_generator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberallowed) str += "0123456789";
    if (charallowed) str += "!@#$^&*-+_=~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberallowed, charallowed, setpassword]);

  const copytoclipboard=useCallback(()=>{
    // password_ref.current?.select()
    window.navigator.clipboard.writeText(password)},[password])
  useEffect(() => {
    password_generator()
  }, [length, numberallowed, charallowed, password_generator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-xl px-4 py-3 my-8 text-orange-500  bg-gray-900 self-center'>
        <h1 className='text-center '>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={password_ref}
          />
          <button 
          onClick={copytoclipboard}
          className='outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-1'>
          <div className='flext items-center gap-x-1'>
            <input
              type="range"
              min={7}
              max={100}
              Value={length}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label>length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberallowed}
              onChange={() => { setnumberallowed((prev) => !prev) }}
            />
            <label>number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charallowed}
              onChange={() => { setcharallowed((prev) => !prev) }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
