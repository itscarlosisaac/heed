import { basename, extname } from '@tauri-apps/api/path';
import FileModal from "../Tarui/FileModal.ts";
import FileManager from "../Tarui/FileManager.ts";
import Unit from "../../Unit.ts";

class HeedIo {

    fileModal: FileModal
    fileManager: FileManager

    constructor(fileModal: FileModal, fileManager: FileManager) {
        this.fileModal = fileModal;
        this.fileManager = fileManager;
    }

    async openFile(){
        const path = await this.fileModal.OpenFileAction();
        if( typeof path != "string" ) return

        const fileData = await this.fileManager.Read(path);
        const filename = await basename(path);
        const fileExtension = await extname(path);
        console.log("Filename: ", filename, fileExtension)
        console.log("File Data", fileData)
        return new Unit( filename, "34313", fileData, fileExtension, path);
    }

}

export default new HeedIo(
    new FileModal(),
    new FileManager()
)