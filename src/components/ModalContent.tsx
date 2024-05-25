
import { useDiceStore } from "./DiceStore";
import { produce } from "immer";
import { DiceSetInt, DieInt, ModalInt } from './types';
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { MessageOutletContext } from "./types";
import { useChangeDiceSet } from "./useChangeDiceSet";
import { useValidateForm } from "./useValidateForm";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";
import { isSet } from "./utils";
interface ModalContentProps {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
    content?: ModalInt,
    setRef: (element: HTMLButtonElement) => void,
}

export function ModalContent({ setIsOpened, content, setRef }: ModalContentProps) {
    const [, setMessage] = useOutletContext<MessageOutletContext>();

    switch (content?.modal) {
        case "add":
            return <FormModal setIsOpened={setIsOpened} setRef={setRef} setMessage={setMessage} message={"A new set has been added!"} />;
        case "load":
            return <LoadModal setIsOpened={setIsOpened} set={content.set} setRef={setRef} setMessage={setMessage} />;
        case "delete":
            return <DeleteModal setIsOpened={setIsOpened} set={content.set} setRef={setRef} setMessage={setMessage} />;
        case "edit":
            return <FormModal setIsOpened={setIsOpened} set={content.set} setRef={setRef} setMessage={setMessage} message={"The set has been edited!"} />;
    }
}
interface ModalProps extends ModalContentProps {
    setMessage: React.Dispatch<React.SetStateAction<string>>
    set?: DiceSetInt;
    message?: string;
}

function LoadModal({ setIsOpened, set, setRef, setMessage }: ModalProps) {
    const navigate = useNavigate();
    const loadDiceSet = (setDice: DieInt[]) => useDiceStore.setState(state => ({ dice: state.dice = setDice }));

    return (<>
        <p>Do you want to load this set?</p>
        <div>
            <button type="button" ref={setRef} onClick={() => setIsOpened(false)} >No</button>
            <button type="button" ref={setRef} onClick={() => {
                if (isSet(set)) {
                    loadDiceSet(set.dice);
                    setIsOpened(false);
                    navigate("/");
                    setMessage("The set has been loaded!");
                }
            }} >Yes</button>
        </div>
    </>)
}

function DeleteModal({ setIsOpened, set, setRef, setMessage }: ModalProps) {
    const deleteDiceSet = (setName: string) => useDiceStore.setState(produce(state => { state.settings.sets = state.settings.sets.filter((set: DiceSetInt) => set.name !== setName) }));

    return (<>
        <p>It will be gone forever!</p>
        <div>
            <button type="button" ref={setRef} onClick={() => setIsOpened(false)} >No</button>
            <button type="button" ref={setRef} onClick={() => {
                if (isSet(set)) {
                    deleteDiceSet(set.name);
                    setIsOpened(false);
                    setMessage("The set has been deleted");
                }
            }} >Yes</button>
        </div>
    </>)
}

function FormModal({ setIsOpened, set, setRef, setMessage, message }: ModalProps) {
    const { setName, diceSet, addDiceToSet } = useChangeDiceSet(set);
    const validationErrors = useValidateForm(setName.value, diceSet.value, set);
    const [errors, setErrors] = useState<{ [key: string]: string }>();

    function handleFormSubmit(e: React.FormEvent) {
        if (Object.keys(validationErrors).length > 0) {
            e.preventDefault();
            setErrors(validationErrors);
        } else {
            addDiceToSet();
            setIsOpened(false);
            setMessage(message!)
        }
    }

    return (<form noValidate method="post" onSubmit={handleFormSubmit}>
        <label htmlFor="name">Set name</label>
        <ErrorMessage id="error-name" errorMessage={errors?.name ?? ""} />
        <input type="text" id="name" {...setName} aria-invalid={errors?.name ? true : false} aria-describedby="error-name" />
        <label htmlFor="dice">Dice (example: 4d6+1d8)</label>
        <ErrorMessage id="error-dice" errorMessage={errors?.dice ?? ""} />
        <input type="text" id="dice" {...diceSet} aria-invalid={errors?.dice ? true : false} aria-describedby="error-dice" />
        <button type="submit" ref={setRef} >Save set</button>
    </form>)
}