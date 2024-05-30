import { Menu } from './components/Menu';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MessageOutletContext } from './components/types';
import useOpenStatus from './components/useOpenStatus';
import { useRef } from 'react';
import Close from "./assets/svg/close.svg";

function App() {
  const [message, setMessage] = useState<string>("");
  const openMessage = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const { isOpen, setIsOpen } = useOpenStatus(openMessage, closeBtn, setMessage);

  useEffect(() => {
    if (message !== "") {
      setIsOpen(true);
    }
  }, [message, setIsOpen])

  return (<>
    {isOpen && <aside ref={openMessage}>{message}<button type="button" className="only-svg-btn" ref={closeBtn} onClick={() => { setIsOpen(false); setMessage("") }}>
      <Close /><span className="visually-hidden">Close</span></button></aside>}
    <Outlet context={[message, setMessage] satisfies MessageOutletContext} />
    <Menu />
  </>)
}

export default App
