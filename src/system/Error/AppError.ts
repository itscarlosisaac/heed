import {AppErrorCode, AppErrorMessage} from "./AppError.types";
class AppError extends Error {
    public readonly name: string;
    public readonly code: AppErrorCode;

    constructor(code: AppErrorCode, message: string = "" ) {
        super(`${AppErrorMessage[code]} - ${message}}`);
        this.name = 'AppError';
        this.code = code;
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, AppError.prototype);
    }

    toString() {
        return `${this.name}: ${this.message} (Code: ${this.code})`;
    }
}

export default AppError;