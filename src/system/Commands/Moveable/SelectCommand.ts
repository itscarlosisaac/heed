import MoveableControl from "./MoveableControl.ts";

class SelectCommand {
    private control: MoveableControl
    constructor(control: MoveableControl) {
        this.control = control
    }
    public execute(event: MouseEvent, element: HTMLElement): void {
        this.control.selectable.select(event, element);
    }
}

export default SelectCommand;


