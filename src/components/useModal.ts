import { useState } from "react";
import useOpenStatus from "./useOpenStatus";
import { ModalInt } from "./types";

export function useModal(modal: React.RefObject<HTMLDivElement>) {
    const { isOpen, setIsOpen } = useOpenStatus(modal);
    const [modalContent, setModalContent] = useState<ModalInt>({ modal: "" });

    function openModal(modal: ModalInt) {
        setIsOpen(true);
        setModalContent(modal);
    }

    return { isOpen, setIsOpen, modalContent, openModal };
}