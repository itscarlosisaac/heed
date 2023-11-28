import {Command, IMoveableControl} from "../commands.types";
import Selectable from "../../Ables/Selectable";
import AppError from "../../Error/AppError";
import {AppErrorCode} from "../../Error/AppError.types";

class MoveableControl implements IMoveableControl {

    private commands: Record<string, Command> = {}
    private _selectable: Selectable;

    get selectable(){
        return this._selectable
    }

    public init() {
        const unitElement = document.querySelector("#unit");
        if( !unitElement ) throw new AppError(AppErrorCode.ElementNotFound, "Unable to find the unit element.")
        this._selectable = new Selectable('#canvas', unitElement as HTMLElement);
    }

    setCommand(name: string,command: Command) {
        this.commands[name] = command;
    }

    execute(name: string, args?: unknown[]) {
        this.commands[name].execute(...args || []);
    }
}
export default MoveableControl