import { useState, useEffect } from "react";

function useOpenStatus(menu: React.RefObject<HTMLDivElement>, btn: React.RefObject<HTMLButtonElement>) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        function closeOpenMenuWhenClickingOutside(event: MouseEvent | KeyboardEvent) {
            if (!menu.current?.contains(event.target as Node) && event.target !== btn.current) {
                setIsOpen(false);
            }
        }

        function closeOpenMenuWhenUsingKeyboard(event: KeyboardEvent) {
            if (event.key === "Enter") {
                closeOpenMenuWhenClickingOutside(event);
            }
        }

        document.addEventListener("mousedown", closeOpenMenuWhenClickingOutside);
        document.addEventListener("keydown", closeOpenMenuWhenUsingKeyboard);
        return () => {
            document.removeEventListener("mousedown", closeOpenMenuWhenClickingOutside);
            document.removeEventListener("keydown", closeOpenMenuWhenUsingKeyboard);
        }
    }, [menu, btn])

    return { isOpen, setIsOpen };
}

export default useOpenStatus