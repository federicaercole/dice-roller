import D2 from "../assets/svg/d2.svg";
import D4 from "../assets/svg/d4.svg";
import D6 from "../assets/svg/d6.svg";
import D8 from "../assets/svg/d8.svg";
import D12 from "../assets/svg/d12.svg";
import D20 from "../assets/svg/d20.svg";
interface Props {
    index: number,
    dieSize: number,
    rolledNumbers: number[],
}

export function Die({ index, dieSize, rolledNumbers }: Props) {

    function printDieSVG(dieSize: number): React.ReactNode {
        switch (dieSize) {
            case 2:
                return <D2 />;
            case 4:
                return <D4 />;
            case 6:
                return <D6 />;
            case 8:
            case 10:
            case 100:
                return <D8 />;
            case 12:
                return <D12 />;
            case 20:
                return <D20 />;
        }
    }

    return (
        <li>
            {printDieSVG(dieSize)}
            <span>{rolledNumbers[index] ? rolledNumbers[index] : "?"}</span>
        </li>
    )
}