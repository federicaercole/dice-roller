import { Heading } from "./Heading";
import Image from "./Image";

function Guide() {

    return (<main>
        <Heading>How to use this app</Heading>
        <ol>
            <li>Choose the input mode: buttons or formula.</li>
            <li>Click the buttons of the dice you want to roll or write a formula (for example, 1d6+1d8).</li>
            <li>Roll the dice!</li>
        </ol>
        <Image src="image2" caption="Buttons mode" />
        <p>If you want to delete all the dice, click the "Clear" button. Use the "Save dice" button to save these dice as a set.</p>
        <h2>Dice's options</h2>
        <p>Every dice has a menu from which you can choose to delete or to lock the result of the dice.
            A locked dice doesn't change its number when you roll the dice.</p>
        <Image src="image1" caption="Option menu of a die" />
        <h2>App's settings</h2>
        <p>From the settings, you can manage different dice sets (up to 30).
            If you often use particular combinations of dice, you can add dice as a set and load it whenever you want.</p>
        <Image src="image3" caption="An example of saved dice set and its option menu" />
        <p>A warning about the reset app button: everything will be deleted! Use this button if there's something wrong with the app or when you want to delete all the sets and reset to the default settings.
        </p>
        <p><strong>If you delete the browser's cookies, you lose all the sets!</strong></p>
    </main>);
}

export default Guide