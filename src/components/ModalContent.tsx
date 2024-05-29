
import { useDiceStore } from "./DiceStore";
import { produce } from "immer";
import { DiceSetInt, DieInt, ModalInt } from './types';
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { MessageOutletContext } from "./types";
import { useChangeDiceSet } from "./useChangeDiceSet";
import { useState } from "react";
import { isSet, maxNumberOfDice, maxNumberOfSets } from "./utils";
import { Form, Field } from "./Form";
import { useValidateForm } from "./useValidateForm";
interface ModalContentProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    content?: ModalInt,
    setRef: (element: HTMLButtonElement) => void,
    textContent?: string;
}

export function ModalContent({ setIsOpen, content, setRef }: ModalContentProps) {
    const [, setMessage] = useOutletContext<MessageOutletContext>();

    switch (content?.modal) {
        case "add":
            return <FormModal setIsOpen={setIsOpen} set={content.set} setRef={setRef} setMessage={setMessage} message={"A new set has been added!"} />;
        case "load":
            return <LoadModal setIsOpen={setIsOpen} set={content.set} setRef={setRef} setMessage={setMessage} />;
        case "delete":
            return <DeleteModal setIsOpen={setIsOpen} set={content.set} setRef={setRef} setMessage={setMessage} />;
        case "edit":
            return <FormModal setIsOpen={setIsOpen} set={content.set} setRef={setRef} setMessage={setMessage} message={"The set has been edited!"} />;
        case "errorMaxNumberOfDice":
            return <WarningModal setIsOpen={setIsOpen} setRef={setRef} textContent={`
            You can have a maximum of ${maxNumberOfDice} dice. To add a new die you must delete the existing ones.`} />;
        case "errorMaxNumberOfSets":
            return <WarningModal setIsOpen={setIsOpen} setRef={setRef} textContent={`
            You can have a maximum of ${maxNumberOfSets} sets saved. To add a new set you must delete the existing ones.`} />;
    }
}
export interface ModalProps extends ModalContentProps {
    setMessage: React.Dispatch<React.SetStateAction<string>>
    set?: DiceSetInt;
    message?: string;
}

function LoadModal({ setIsOpen, set, setRef, setMessage }: ModalProps) {
    const navigate = useNavigate();
    const loadDiceSet = (setDice: DieInt[]) => useDiceStore.setState(state => ({ dice: state.dice = setDice }));

    return (<>
        <p>Do you want to load this set?</p>
        <div>
            <button type="button" ref={setRef} onClick={() => setIsOpen(false)} >No</button>
            <button type="button" ref={setRef} onClick={() => {
                if (isSet(set)) {
                    loadDiceSet(set.dice);
                    setIsOpen(false);
                    navigate("/");
                    setMessage("The set has been loaded!");
                }
            }} >Yes</button>
        </div>
    </>)
}

function DeleteModal({ setIsOpen, set, setRef, setMessage }: ModalProps) {
    const deleteDiceSet = (setName: string) => useDiceStore.setState(produce(state => { state.settings.sets = state.settings.sets.filter((set: DiceSetInt) => set.name !== setName) }));

    return (<>
        <p>It will be gone forever!</p>
        <div>
            <button type="button" ref={setRef} onClick={() => setIsOpen(false)} >No</button>
            <button type="button" ref={setRef} onClick={() => {
                if (isSet(set)) {
                    deleteDiceSet(set.name);
                    setIsOpen(false);
                    setMessage("The set has been deleted");
                }
            }} >Yes</button>
        </div>
    </>)
}

function FormModal({ setIsOpen, set, setRef, setMessage, message }: ModalProps) {
    const { setName, diceSet, addDiceToSet } = useChangeDiceSet(set);
    const validationErrors = useValidateForm(diceSet.value, setName.value, set);
    const [errors, setErrors] = useState<{ [key: string]: string }>();

    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            addDiceToSet();
            setIsOpen(false);
            setMessage(message!)
        }
    }

    return (<Form callback={handleFormSubmit} >
        <Field label="Set name" name="name" handle={setName} error={errors?.name ?? ""} />
        <Field label="Dice (example: 4d6+1d8)" name="dice" handle={diceSet} error={errors?.dice ?? ""} />
        <button type="submit" ref={setRef}>Save set</button>
    </Form>)
}

function WarningModal({ setIsOpen, setRef, textContent }: ModalContentProps) {

    return (<>
        <p>{textContent}</p>
        <button type="button" ref={setRef} onClick={() => setIsOpen(false)} >Ok</button>
    </>)
}