import { Menu } from './components/Menu';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MessageOutletContext } from './components/types';
import useOpenedStatus from './components/useOpenedStatus';
import { useRef } from 'react';
import Close from "./assets/svg/close.svg";

function App() {
  const [message, setMessage] = useState<string>("");
  const openedMessage = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const { isOpened, setIsOpened } = useOpenedStatus(openedMessage, closeBtn);

  useEffect(() => {
    if (message !== "") {
      setIsOpened(true);
    }
  }, [message, setIsOpened])

  return (<>
    {isOpened && <aside ref={openedMessage}>{message}<button type="button" className="only-svg-btn" ref={closeBtn} onClick={() => { setIsOpened(false); setMessage("") }}>
      <Close /><span className="visually-hidden">Close</span></button></aside>}
    <Outlet context={[message, setMessage] satisfies MessageOutletContext} />
    <Menu />
  </>)
}

export default App
