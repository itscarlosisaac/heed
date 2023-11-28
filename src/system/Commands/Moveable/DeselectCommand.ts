import MoveableControl from "./MoveableControl.ts";

class DeselectCommand {
    private control: MoveableControl
    constructor(control: MoveableControl) {
        this.control = control
    }
    public execute(event: MouseEvent): void {
        console.log("Will deselect", event.target)
        if (
            this.control.selectable.selected &&
            !this.control.selectable.selected.contains(event.target as Node)
        ) {
            this.control.selectable.deselect();
        }

    }
}

export default DeselectCommand;


