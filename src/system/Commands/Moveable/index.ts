import SelectCommand from "./SelectCommand";
import MoveableControl from "./MoveableControl.ts";
import DeselectCommand from "./DeselectCommand.ts";
import DeleteCommand from "./DeleteCommand.ts";

const control = new MoveableControl();

const selectCommand = new SelectCommand(control);
const deselectCommand = new DeselectCommand(control);
const deleteCommand = new DeleteCommand(control);

// Setting commands
control.setCommand('select', selectCommand)
control.setCommand('deselect', deselectCommand)
control.setCommand('delete', deleteCommand);

export default control