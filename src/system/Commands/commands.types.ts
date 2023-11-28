import Selectable from "../Ables/Selectable.ts";

export interface Command {
    execute(...args: unknown[]): void;
}
export interface IMoveableControl {
    init: () => void,
    commands: Record<string, Command>,
    selectable: Selectable
}