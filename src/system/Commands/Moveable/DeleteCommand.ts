import MoveableControl from "./MoveableControl.ts";

class DeleteCommand {
    private control: MoveableControl
    constructor(control: MoveableControl) {
        this.control = control
    }
    public execute(): void {
        if( this.control.selectable.selected )
            this.control.selectable.selected.remove()
    }
}

export default DeleteCommand;


