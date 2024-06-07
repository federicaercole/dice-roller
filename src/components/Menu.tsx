import { NavLink } from "react-router-dom"

export function Menu({ innerRef }: { innerRef: React.RefObject<HTMLElement> }) {

    return (<footer>
        <nav id="menu" tabIndex={-1} ref={innerRef}>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/settings">Settings</NavLink></li>
                <li><NavLink to="/guide">Guide</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
            </ul>
        </nav>
    </footer>)
}