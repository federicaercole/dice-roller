import { useRef } from "react";
import Close from "../assets/svg/close.svg";
import { ModalInt } from "./types";
import { ModalContent } from "./ModalContent";
interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalContent: ModalInt;
}

function Modal({ setIsOpen, modalContent }: Props) {
    const focusableElements = useRef<HTMLElement[]>([]);

    const setFocusableElements = (element: HTMLButtonElement) => {
        if (!element) return;
        if (focusableElements.current.find(focusableElement => focusableElement === element)) return;
        focusableElements.current = [...focusableElements.current, element];
    };

    const focusTrap = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const elements = focusableElements.current;
        const firstElement = elements[0];
        const lastElement = elements[elements.length - 1];

        if (e.key === "Tab" && !e.shiftKey) {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
        else if (e.key === "Tab" && e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        }
        else return;
    };

    function handleKeyboardButtons(e: React.KeyboardEvent<HTMLInputElement>) {
        switch (true) {
            case e.key === "Escape": return setIsOpen(false);
            case e.key === "Tab": return focusTrap(e);
            default: return;
        }
    }

    function printModalTitle() {
        switch (modalContent.modal) {
            case "add":
                return "Add a new set";
            case "load":
                return `Load ${modalContent.set?.name}`;
            case "delete":
                return `Do you want to delete ${modalContent.set?.name}?`;
            case "edit":
                return `Edit ${modalContent.set?.name}`;
            case "errorMaxNumberOfSets":
                return `Max number of sets reached`;
            case "errorMaxNumberOfDice":
                return `Max number of dice reached`;
        }
    }

    return (<div role="dialog" className="modal" aria-labelledby="dialog-title" aria-modal="true" onKeyDown={handleKeyboardButtons}>
        <div>
            <button type="button" className="only-svg-btn" ref={setFocusableElements} onClick={() => setIsOpen(false)} autoFocus><Close /><span className="visually-hidden">Close</span></button>
            <h2 id="dialog-title">{printModalTitle()}</h2>
            <ModalContent content={modalContent} setIsOpen={setIsOpen} setRef={setFocusableElements} />
        </div>
    </div>)
}

export default Modal