import MoveableControl from "./MoveableControl.ts";

class DeselectCommand {
    private control: MoveableControl
    constructor(control: MoveableControl) {
        this.control = control
    }
    public execute(): void {
        console.log("Will deselect")
        this.control.selectable.deselect();
    }
}

export default DeselectCommand;


