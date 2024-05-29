import { useState } from "react";
import { useChangeDiceSet } from "./useChangeDiceSet";
import { useValidateForm } from "./useValidateForm";
import { useOutletContext } from "react-router-dom";
import { MessageOutletContext, ModalInt } from "./types";
import { DieBtn } from "./DieBtn";
import { Form, Field } from "./Form";
import { useDiceStore } from "./DiceStore";
import { produce } from "immer";
import Switch from "../assets/svg/switch.svg";

function DiceInput({ openModal }: { openModal: (modal: ModalInt) => void }) {
    const { diceSet, addDiceInHome } = useChangeDiceSet();
    const validationErrors = useValidateForm(diceSet.value);
    const [errors, setErrors] = useState<{ [key: string]: string }>();
    const [, setMessage] = useOutletContext<MessageOutletContext>();
    const { settings } = useDiceStore();

    const dieSize = [2, 4, 6, 8, 10, 12, 20, 100];

    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            addDiceInHome();
            setMessage("Dice have been added!")
        }
    }

    const toggleModality = () => useDiceStore.setState(produce(state => {
        if (state.settings.mode === "buttons") {
            state.settings.mode = "input";
        } else {
            state.settings.mode = "buttons";
        }
    }))

    return (<div className="dice-input-container">
        <button type="button" onClick={toggleModality}><Switch />Switch to {settings.mode === "buttons" ? "formula" : "buttons"} mode</button>
        {settings.mode === "buttons" &&
            <div className="dice">
                {dieSize.map(die => <DieBtn dieSize={die} key={`d${die}`} openModal={openModal} />)}
            </div>}
        {settings.mode === "input" &&
            <Form callback={handleFormSubmit}>
                <Field label="Dice (example: 4d6+1d8)" name="dice" handle={diceSet} error={errors?.dice ?? ""} />
                <button type="submit">Add dice</button>
            </Form>}
    </div>)
}

export default DiceInput