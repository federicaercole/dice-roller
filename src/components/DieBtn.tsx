import D2wn from "../assets/svg/d2wn.svg"
import D4wn from "../assets/svg/d4wn.svg"
import D6wn from "../assets/svg/d6wn.svg"
import D8wn from "../assets/svg/d8wn.svg"
import D10wn from "../assets/svg/d10wn.svg"
import D12wn from "../assets/svg/d12wn.svg"
import D20wn from "../assets/svg/d20wn.svg"
import D100wn from "../assets/svg/d100wn.svg"
interface Props {
    addDice: (size: number) => void,
    dieSize: number
}

export function DieBtn({ addDice, dieSize }: Props) {

    function printDieSVG(dieSize: number): React.ReactNode {
        switch (dieSize) {
            case 2:
                return <D2wn />;
            case 4:
                return <D4wn />;
            case 6:
                return <D6wn />;
            case 8:
                return <D8wn />;
            case 10:
                return <D10wn />;
            case 12:
                return <D12wn />;
            case 20:
                return <D20wn />;
            case 100:
                return <D100wn />;
        }
    }

    return (
        <button type="button" onClick={() => addDice(dieSize)}>{printDieSVG(dieSize)}</button>
    )
}