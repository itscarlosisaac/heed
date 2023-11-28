import {Command} from "./commands.types";

class CommandInvoker {
    executeCommand(command: Command) {
        command.execute();
    }
}

export default CommandInvoker;