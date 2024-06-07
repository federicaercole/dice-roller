import { Menu } from './components/Menu';
import { Link, Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
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
  const navRef = useRef<HTMLElement>(null);

  const location = useLocation();

  useEffect(() => {
    const titles: { [key: string]: string } = {
      '/': 'Dice Roller',
      '/about': 'About Dice Roller',
      '/settings': 'Settings - Dice Roller',
      '/guide': 'How to use this app - Dice Roller',
    }

    if (message !== "") {
      setIsOpen(true);
      if (isOpen && closeBtn.current) {
        closeBtn.current.focus();
      }
    }

    document.title = titles[location.pathname] ?? 'Page Not Found - Dice Roller';
  }, [message, setIsOpen, location, isOpen])

  return (<>
    {isOpen && <aside ref={openMessage}>
      <span role="status">{message}</span>
      <button type="button" className="only-svg-btn" ref={closeBtn} aria-label="Dismiss" onClick={() => { setIsOpen(false); setMessage("") }}>
        <Close /></button></aside>}
    <Link className="skip-link" to="#menu" onClick={() => { if (navRef.current) navRef.current.focus() }}>Skip to navigation</Link>
    <Outlet context={[message, setMessage] satisfies MessageOutletContext} />
    <Menu innerRef={navRef} />
    <ScrollRestoration />
  </>)
}

export default App
