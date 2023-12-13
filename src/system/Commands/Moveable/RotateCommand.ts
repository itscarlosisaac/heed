import MoveableControl from "./MoveableControl.ts";

class RotateCommand {
	private control: MoveableControl
	constructor(control: MoveableControl) {
		this.control = control
	}
	public execute(angle: number): void {
		this.control.selectable.rotate.requestRotate(angle)
	}
}

export default RotateCommand;


