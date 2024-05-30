import { useDiceStore } from "./DiceStore"
import { produce } from "immer";
import Add from "../assets/svg/add.svg";
import DiceSet from "./DiceSet";
import Modal from "./Modal";
import { useRef } from "react";
import { maxNumberOfSets } from "./utils";
import { useModal } from "./useModal";

function Settings() {
    const modal = useRef<HTMLDivElement>(null);
    const { isOpen, setIsOpen, modalContent, openModal } = useModal(modal);

    const { settings } = useDiceStore();
    const toggleVisibility = (value: string) => useDiceStore.setState(produce(state => { state.settings.visibility[value] = !state.settings.visibility[value] }));

    return (<main>
        <h1>Settings</h1>
        <button type="button" role="switch" aria-checked={settings.visibility.sum} onClick={() => toggleVisibility("sum")}>
            <span className="switch"></span>
            Show sum</button>
        <button type="button" role="switch" aria-checked={settings.visibility.rolls} onClick={() => toggleVisibility("rolls")}>
            <span className="switch"></span>
            Show rolls</button>
        <section>
            <header>
                <h2>Dice Sets</h2>
                <button type="button" className="only-svg-btn"
                    onClick={() => {
                        if (settings.sets.length < maxNumberOfSets) {
                            openModal({ modal: "add" })
                        } else {
                            openModal({ modal: "errorMaxNumberOfSets" })
                        }
                    }}>
                    <Add /><span className="visually-hidden">Add a new set</span></button>
            </header>
            {settings.sets.map((set) => <DiceSet key={set.name} set={set} openModal={openModal} />)}
        </section >
        {isOpen && <Modal innerRef={modal} setIsOpen={setIsOpen} modalContent={modalContent} />}
    </main>)
}

export default Settings