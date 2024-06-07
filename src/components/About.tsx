import { Heading } from "./Heading";

function About() {

    return (<main>
        <Heading>About</Heading>
        <p>This app was created by <a href="https://federicaercole.com/">Federica Ercole</a> (or visit my <a href="https://github.com/federicaercole">GitHub</a>).</p>
        <h2>Technologies used</h2>
        <ul>
            <li>React</li>
            <li>Zustand library</li>
            <li>Randomized algorithm: Mersenne Twister 19937 in random-js library</li>
        </ul>
        <h2>Icons</h2>
        <ul>
            <li>Dice by <a href="https://www.figma.com/community/file/1203819943958471388/dice">Daniella Rosito Michelena Munhoz</a></li>
            <li>Google Icons</li>
        </ul>
    </main>)
}

export default About