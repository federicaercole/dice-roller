
import { useDiceStore } from "./DiceStore";
import { produce } from "immer";
import { DiceSetInt, DieInt, ModalInt } from './types';
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { MessageOutletContext } from "./types";
import { useChangeDiceSet } from "./useChangeDiceSet";

interface ModalContentProps {
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
    content?: ModalInt,
    setRef: (element: HTMLButtonElement) => void,
}

export function ModalContent({ setIsOpened, content, setRef }: ModalContentProps) {
    const [, setMessage] = useOutletContext<MessageOutletContext>();

    switch (content!.modal) {
        case "add":
            return <AddNewModal setIsOpened={setIsOpened} setRef={setRef} setMessage={setMessage} />;
        case "load":
            return <LoadModal setIsOpened={setIsOpened} content={content} setRef={setRef} setMessage={setMessage} />;
        case "delete":
            return <DeleteModal setIsOpened={setIsOpened} content={content} setRef={setRef} setMessage={setMessage} />;
        case "edit":
            return <EditModal setIsOpened={setIsOpened} content={content} setRef={setRef} setMessage={setMessage} />;
    }
}

interface ModalProps extends ModalContentProps {
    setMessage: React.Dispatch<React.SetStateAction<string>>
}

function AddNewModal({ setRef, setIsOpened, setMessage }: ModalProps) {
    const { setName, diceSet, addDiceToSet } = useChangeDiceSet();

    return (<form>
        <label htmlFor="name">Set name</label>
        <input type="text" id="name" {...setName} />
        <label htmlFor="dice">Dice (example: 4d6 + 1d8)</label>
        <input type="text" id="dice" {...diceSet} />
        <button type="submit" ref={setRef} onClick={() => { addDiceToSet(); setIsOpened(false); setMessage("A new set has been added!") }}>Save set</button>
    </form>)
}

function LoadModal({ setIsOpened, content, setRef, setMessage }: ModalProps) {
    const navigate = useNavigate();
    const loadDiceSet = (setDice: DieInt[]) => useDiceStore.setState(state => ({ dice: state.dice = setDice }));

    return (<>
        <p>Do you want to load this set?</p>
        <div>
            <button type="button" ref={setRef} onClick={() => setIsOpened(false)} >No</button>
            <button type="button" ref={setRef} onClick={() => {
                loadDiceSet(content!.set!.dice);
                setIsOpened(false);
                navigate("/");
                setMessage("The set has been loaded!");
            }} >Yes</button>
        </div>
    </>)
}

function DeleteModal({ setIsOpened, content, setRef, setMessage }: ModalProps) {
    const deleteDiceSet = (setName: string) => useDiceStore.setState(produce(state => { state.settings.sets = state.settings.sets.filter((set: DiceSetInt) => set.name !== setName) }));

    return (<>
        <p>It will be gone forever!</p>
        <div>
            <button type="button" ref={setRef} onClick={() => setIsOpened(false)} >No</button>
            <button type="button" ref={setRef} onClick={() => { deleteDiceSet(content!.set!.name); setIsOpened(false); setMessage("The set has been deleted"); }} >Yes</button>
        </div>
    </>)
}

function EditModal({ setIsOpened, content, setRef, setMessage }: ModalProps) {
    const { setName, diceSet, addDiceToSet } = useChangeDiceSet(content!.set);

    return (<form>
        <label htmlFor="name">Set name</label>
        <input type="text" id="name" {...setName} />
        <label htmlFor="dice">Dice (example: 4d6 + 1d8)</label>
        <input type="text" id="dice" {...diceSet} />
        <button type="submit" ref={setRef} onClick={() => { addDiceToSet(); setIsOpened(false); setMessage("The set has been edited!") }}>Save set</button>
    </form>)
}