import SelectCommand from "./SelectCommand";
import MoveableControl from "./MoveableControl.ts";
import DeselectCommand from "./DeselectCommand.ts";
import DeleteCommand from "./DeleteCommand.ts";
import RotateCommand from "./RotateCommand.ts";
import MoveCommand from "./MoveCommand.ts";

const control = new MoveableControl();

const selectCommand = new SelectCommand(control);
const deselectCommand = new DeselectCommand(control);
const deleteCommand = new DeleteCommand(control);
const rotateCommand = new RotateCommand(control);
const moveCommand = new MoveCommand(control);

// Setting commands
control.setCommand('select', selectCommand)
control.setCommand('deselect', deselectCommand)
control.setCommand('delete', deleteCommand);
control.setCommand('rotate', rotateCommand);
control.setCommand('move', moveCommand);

export default control