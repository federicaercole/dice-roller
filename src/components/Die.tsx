interface Props {
    addDice: (size: number) => void,
    dieSize: number
}

export function Die({ addDice, dieSize }: Props) {

    return (<>
        <button type="button" onClick={() => addDice(dieSize)}>Add d{dieSize}</button>
    </>)
}