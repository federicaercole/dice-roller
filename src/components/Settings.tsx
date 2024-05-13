import { useDiceStore } from "./DiceStore"
import { produce } from "immer";

function Settings() {
    const { settings } = useDiceStore();
    const toggleVisibility = (value: string) => useDiceStore.setState(produce(state => { state.settings.visibility[value] = !state.settings.visibility[value] }));

    return (<>
        <label htmlFor="sum-visibility">Show sum</label>
        <input id="sum-visibility" type="checkbox" defaultChecked={settings.visibility.sum} onClick={() => toggleVisibility("sum")} />
        <label htmlFor="rolls-visibility">Show single rolls</label>
        <input id="rolls-visibility" type="checkbox" defaultChecked={settings.visibility.rolls} onClick={() => toggleVisibility("rolls")} />
    </>)
}

export default Settings