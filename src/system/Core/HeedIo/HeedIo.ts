import { basename, extname } from '@tauri-apps/api/path';
import FileModal from "../Tarui/FileModal.ts";
import FileManager from "../Tarui/FileManager.ts";
import Unit from "../../Unit.ts";
import {IUnit} from "../../../shared/types";
import {DesignConverter} from "../../DesignConverter/DesignConverter.ts";

class HeedIo {

    fileModal: FileModal
    fileManager: FileManager

    constructor(fileModal: FileModal, fileManager: FileManager) {
        this.fileModal = fileModal;
        this.fileManager = fileManager;
    }

    // Open a unit.
    async open_file(){
        const path = await this.fileModal.OpenFileAction();
        if( typeof path != "string" ) return

        const fileData = await this.fileManager.Read(path);
        const filename = await basename(path);
        const fileExtension = await extname(path);
        console.log("Filename: ", filename, fileExtension)
        console.log("File Data", fileData)
        return new Unit( filename, "34313", fileData, fileExtension, path);
    }


    // Save the current unit
    async save_file(unit: IUnit) {
        const dom_parser = new DOMParser();
        const parsed_current_doc = dom_parser.parseFromString(unit.content, "text/html");

        const editor_dom_unit = document.querySelector("#unit");
        const editor_content = parsed_current_doc.querySelector('heed-unit');

        if( !editor_content  || !editor_dom_unit){
            throw new Error('Unable to save, some dom elements are not present.')
        }

        editor_content.innerHTML = editor_dom_unit.innerHTML;

        const result = DesignConverter.convertToHeedFormat(editor_content.outerHTML)
        const HTML = DesignConverter.convertToHTMLFormat(result)

        return await this.fileManager.Write(unit.filepath, HTML);
    }

}

export default new HeedIo(
    new FileModal(),
    new FileManager()
)