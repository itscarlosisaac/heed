import MoveableControl from "./MoveableControl.ts";

class MoveCommand {
	private control: MoveableControl
	constructor(control: MoveableControl) {
		this.control = control
	}
	public execute(x: number, y: number): void {
		console.log("Will move,", x, y)
		this.control.selectable.moveable.requestMove(x,y);
	}
}

export default MoveCommand;


