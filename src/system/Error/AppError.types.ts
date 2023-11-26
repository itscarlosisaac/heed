export enum AppErrorCode {
    // Unit Errors
    ConstructError = 300,

    // Parser Error
    TransformParserError = 400,


    // File Errors
    FileNotFound = 1001,
    PermissionDenied = 1002,
    ReadError = 1003,
    WriteError = 1004,
    FileAlreadyExists = 1005,
    FileIsOpen = 1006,
    FileTooLarge = 1007,
    InvalidFileFormat = 1008,
    PathTooLong = 1009,
    DiskFull = 1010,
    NetworkError = 1011,
    InsufficientResources = 1012,
    FileLocked = 1013,
    EOFUnexpected = 1014,
    EncodingError = 1015,

    // DOM Errors
    ElementNotFound = 2001
}

export const AppErrorMessage: Record<AppErrorCode, string> = {
    [AppErrorCode.ConstructError]: "Unable to Construct Unit",
    [AppErrorCode.TransformParserError]: "",
    [AppErrorCode.FileNotFound]: "File Not Found",
    [AppErrorCode.ElementNotFound]: "Unable to find Dom element.",
    [AppErrorCode.PermissionDenied]: "",
    [AppErrorCode.ReadError]: "",
    [AppErrorCode.WriteError]: "",
    [AppErrorCode.FileAlreadyExists]: "",
    [AppErrorCode.FileIsOpen]: "",
    [AppErrorCode.FileTooLarge]: "",
    [AppErrorCode.InvalidFileFormat]: "",
    [AppErrorCode.PathTooLong]: "",
    [AppErrorCode.DiskFull]: "",
    [AppErrorCode.NetworkError]: "",
    [AppErrorCode.InsufficientResources]: "",
    [AppErrorCode.FileLocked]: "",
    [AppErrorCode.EOFUnexpected]: "",
    [AppErrorCode.EncodingError]: ""
}