import {Command, IMoveableControl} from "../commands.types";
import Selectable from "../../Ables/Selectable";
import AppError from "../../Error/AppError";
import {AppErrorCode} from "../../Error/AppError.types";
import heedElementManager from "../../../mobx/Managers/HeedElementManager.ts";
import AblesEventFactory from "../../Ables/Bounds/ables.events.ts";

class MoveableControl implements IMoveableControl {

    // @ts-ignore
    private _selectable: Selectable;
    private commands: Record<string, Command> = {}

    get commandList(){
        return this.commands;
    }
    get selectable(){
        return this._selectable
    }

    public init() {
        const unitElement = document.querySelector("#unit");
        if( !unitElement ) throw new AppError(AppErrorCode.ElementNotFound, "Unable to find the unit element.")
        this._selectable = new Selectable('#canvas', unitElement as HTMLElement);

        // // The event listener should directly use CustomEvent with the detail type
        this._selectable.addEventListener(AblesEventFactory.events.select.started, (event: CustomEventInit) => {
            // Ensure that `event.detail.element` is an HTMLElement before using it
            if (event.detail.element instanceof HTMLElement) {
                heedElementManager.select(event.detail.element);
            }
        });

        this._selectable.addEventListener(AblesEventFactory.events.select.ended, () => {
            heedElementManager.select(null)
        });

        this._selectable.boundingBox.addEventListener(AblesEventFactory.events.drag.moved, (event: CustomEventInit) => {
            if (event.detail.element instanceof HTMLElement) {
                heedElementManager.update_position(event.detail.element)
                heedElementManager.update_size(event.detail.element)
            }
        });

        this._selectable.boundingBox.addEventListener(AblesEventFactory.events.resize.moved, (event: CustomEventInit) => {
            if (event.detail.element instanceof HTMLElement) {
                heedElementManager.update_position(event.detail.element)
                heedElementManager.update_size(event.detail.element)
            }
        });

        this._selectable.boundingBox.addEventListener(AblesEventFactory.events.rotate.moved, (event: CustomEventInit) => {
            if (event.detail.element instanceof HTMLElement) {
                heedElementManager.update_rotation(event.detail.element)
            }
        });

    }

    setCommand(name: string,command: Command) {
        this.commands[name] = command;
    }

    execute(name: string, args?: unknown[]) {
        this.commands[name].execute(...args || []);
    }
}
export default MoveableControl