import { Link } from "react-router-dom"

export function Menu() {

    return (<footer>
        <nav id="menu">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li>How to use</li>
                <li><Link to="/settings">Settings</Link></li>
                <li>About</li>
            </ul>
        </nav>
    </footer>)
}