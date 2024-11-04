import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Password = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [changeText, setChangeText] = useState("Copy");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current?.select();
      passwordRef.current.setSelectionRange(0, length);
      window.navigator.clipboard.writeText(password);
      setChangeText("Copied!");
      setTimeout(() => setChangeText("Copy"), 2000);
      toast.success("Password copied successfully...", {
        duration: 1000,
        position: "bottom-center",
      });
    }
  }, [password, length]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full my-6 lg:max-w-md mx-auto bg-gray-700 rounded-lg py-4 px-6 text-orange-500">
      <h2 className="text-center text-white text-2xl font-bold mb-2">
        Password Generator
      </h2>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          placeholder="password"
          value={password}
          readOnly
          className="w-full px-4 py-1 outline-none"
          ref={passwordRef}
        />
        <button
          onClick={copyPassword}
          className="bg-blue-700 text-white px-4 py-1 outline-none font-bold"
        >
          {changeText}
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-start gap-x-4 text-sm">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            id="numberAllow"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed(!numberAllowed)}
          />
          <label htmlFor="numberAllow">Number</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            id="charAllow"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed(!charAllowed)}
          />
          <label htmlFor="charAllow">Character</label>
        </div>
      </div>
    </div>
  );
};

export default Password;
