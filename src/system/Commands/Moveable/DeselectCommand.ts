import MoveableControl from "./MoveableControl.ts";

class DeselectCommand {
    private control: MoveableControl
    constructor(control: MoveableControl) {
        this.control = control
    }
    public execute(event: MouseEvent): void {
        console.log("Will deselect", event.target)
        this.control.selectable.deselect();
    }
}

export default DeselectCommand;


