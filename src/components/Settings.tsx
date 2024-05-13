import { useDiceStore } from "./DiceStore"
import { produce } from "immer";

function Settings() {
    const { settings } = useDiceStore();
    const toggleVisibility = (value: string) => useDiceStore.setState(produce(state => { state.settings.visibility[value] = !state.settings.visibility[value] }));

    return (<>
        <button type="button" role="switch" aria-checked={settings.visibility.sum} onClick={() => toggleVisibility("sum")}>
            <span className="switch"></span>
            Show sum</button>
        <button type="button" role="switch" aria-checked={settings.visibility.rolls} onClick={() => toggleVisibility("rolls")}>
            <span className="switch"></span>
            Show rolls</button>
    </>)
}

export default Settings