import MoveableControl from "./MoveableControl.ts";

class DeleteCommand {
    private control: MoveableControl
    constructor(control: MoveableControl) {
        this.control = control
    }
    public execute(event: MouseEvent): void {
        console.log("Will delete", event.target)
        if( this.control.selectable.selected )
            this.control.selectable.selected.remove()
    }
}

export default DeleteCommand;


