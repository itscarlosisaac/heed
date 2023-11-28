import SelectCommand from "./SelectCommand";
import MoveableControl from "./MoveableControl.ts";
import DeselectCommand from "./DeselectCommand.ts";

const control = new MoveableControl();

const selectCommand = new SelectCommand(control);
const deselectCommand = new DeselectCommand(control);

// Setting commands
control.setCommand('select', selectCommand)
control.setCommand('deselect', deselectCommand)

export default control