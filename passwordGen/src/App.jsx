import { useCallback, useEffect, useRef, useState } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

// useRef -- kisi bhi chiz ke refence lena hota hai tb hum useRef use krte hai...

const passwordRef = useRef(null);

  //passwordGen is a function jisme sb perform krenge apn
  const passwordGen = useCallback(() => {
    let pass = ""; // is fuunction mai jo bhi password generate hoga usko pass mai store kraenge fir setPassword mai se password ko dedenge...
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // ye tera data jisko use krke apn password bnaenge...

    if (numberAllowed) str += "123456789";
    if (charAllowed) str += "@#$^(&)-{*!~}[]?";

    //ab password bnaenge jo random char pick krega strinh mai se charcter, num , aplhbaest u know hum loop chalake humare string mai se random value niklaenge but how many iterations , so iteration will be ki hum slider mai kitna length denge...

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); // ye toda smjh lena ki random value kaise nikale
      pass += str.charAt(char); // array mai se char ka index aaya hai naki char to char ka index iss method se aaega

    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed ,setPassword]);

  const copypasswordtoClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password);
  },[password])
  
useEffect(()=>{
  passwordGen()
},[length,numberAllowed,charAllowed,passwordGen])

  // passwordGen() ye hum aisi ni chla skte kuki react kb konsi chiz render hogi ye hum handle ni krte wo react krti hai to kaise password ko fir generate kraye  : One way is create a button and generate a password and 2 way is useEffect hook 

  // ab password ko generate krana hai reload pe to humko waha useEffect ka use aaeega jb bhi koi dependencies hit hogi or dependecies mai apna function bhi hai passwordGen() jo hum aise direct call ni kr skte  jo hum denge array ke form mai to fir wo reload krega or fir password leke aaega ,

  //useCallback memoize and optimize  ke liye use hora mtlb baar na function load ho or performance ka use sahi ho
  // useEffect tera password generate ke liye use hora 
  return (
    <>
      <div className="w-1/2 max-w-mid mx-auto  shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 "
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copypasswordtoClipboard} 
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={7}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="numberInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
