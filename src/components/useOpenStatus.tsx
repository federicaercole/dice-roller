import { useState, useEffect } from "react";

function useOpenStatus(element: React.RefObject<HTMLDivElement>, btn?: React.RefObject<HTMLButtonElement>, setMessage?: React.Dispatch<React.SetStateAction<string>>) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        function close() {
            setIsOpen(false);
            if (setMessage) {
                setMessage("");
            }
        }

        function closeOpenElementWhenClickingOutside(event: MouseEvent | KeyboardEvent) {
            if (!element.current?.contains(event.target as Node) && event.target !== btn?.current) {
                close();
            }
        }

        function closeOpenElementWhenUsingKeyboard(event: KeyboardEvent) {
            if (event.key === "Enter") {
                closeOpenElementWhenClickingOutside(event);
            } else if (event.key === "Escape") {
                close();
            }
        }

        document.addEventListener("mousedown", closeOpenElementWhenClickingOutside);
        document.addEventListener("keydown", closeOpenElementWhenUsingKeyboard);
        return () => {
            document.removeEventListener("mousedown", closeOpenElementWhenClickingOutside);
            document.removeEventListener("keydown", closeOpenElementWhenUsingKeyboard);
        }
    }, [element, btn, setMessage])

    return { isOpen, setIsOpen };
}

export default useOpenStatus