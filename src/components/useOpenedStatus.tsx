import { useState, useEffect } from "react";

function useOpenedStatus(menu: React.RefObject<HTMLDivElement>, btn: React.RefObject<HTMLButtonElement>) {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    useEffect(() => {
        function closeOpenedMenuWhenClickingOutside(event: MouseEvent | KeyboardEvent) {
            if (!menu.current?.contains(event.target as Node) && event.target !== btn.current) {
                setIsOpened(false);
            }
        }

        function closeOpenedMenuWhenUsingKeyboard(event: KeyboardEvent) {
            if (event.key === "Enter") {
                closeOpenedMenuWhenClickingOutside(event);
            }
        }

        document.addEventListener("mousedown", closeOpenedMenuWhenClickingOutside);
        document.addEventListener("keydown", closeOpenedMenuWhenUsingKeyboard);
        return () => {
            document.removeEventListener("mousedown", closeOpenedMenuWhenClickingOutside);
            document.removeEventListener("keydown", closeOpenedMenuWhenUsingKeyboard);
        }
    }, [menu, btn])

    return { isOpened, setIsOpened };
}

export default useOpenedStatus