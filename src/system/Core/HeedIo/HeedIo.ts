import { basename, extname, resolve, dirname, resolveResource } from '@tauri-apps/api/path';
import FileModal from "../Tarui/FileModal.ts";
import FileManager from "../Tarui/FileManager.ts";
import Unit from "../../Unit.ts";
import {IUnit} from "../../../shared/types";
import {DesignConverter} from "../../DesignConverter/DesignConverter.ts";
import GenerateUUID from "../../utils/GenerateUUID.ts";
import {AppErrorCode} from "../../Error/AppError.types.ts";
import AppError from "../../Error/AppError.ts";
import FileObserver from "../../Observables/FileObserver.ts";
import {map, Observable, Subject} from "rxjs";
import HeedParser from "../HeedParser/HeedParser.ts";

class HeedIo {

    fileModal: FileModal
    fileManager: FileManager

    constructor(fileModal: FileModal, fileManager: FileManager) {
        this.fileModal = fileModal;
        this.fileManager = fileManager;
    }

    // Open a unit.
    async open_file(){
        const path = await this.fileModal.open_file_action();
        if( typeof path != "string" ) return

        const fileData = await this.fileManager.Read(path);
        const filename = await basename(path);
        const fileExtension = await extname(path);

        const unit = new Unit( filename, GenerateUUID('unit'), fileData, fileExtension, path);

        const obs = new Observable<Unit>((s) => s.next(unit));
        const sub = new Subject<Unit>()
        const fileObserver = new FileObserver<Unit, any>(sub, obs);

        function secondTest(data: unknown) {
            console.log("FileObserver: second from first observer", data)
            return data
        }

        function thirdTest(data: unknown) {
            console.log("FileObserver: third from first observer", data)
            throw new Error("FileObserver: Unable to continue to ")
            return data
        }

        fileObserver.attach(map(HeedParser.RenderParsedData))
        fileObserver.attach(map(secondTest))
        fileObserver.attach(map(thirdTest))

        fileObserver.subscribe(file => {
            console.log("FileObserver file:", file);
        });

        fileObserver.init()
        return unit;
    }

    // Save the current unit
    async save_file(unit: IUnit) {
        const dom_parser = new DOMParser();
        const parsed_current_doc = dom_parser.parseFromString(unit.content, "text/html");

        const editor_dom_unit = document.querySelector("#unit");
        const editor_content = parsed_current_doc.querySelector('heed-unit');

        if( !editor_content  || !editor_dom_unit){
            throw new AppError(AppErrorCode.ElementNotFound, "Unable to save the file.")
        }

        editor_content.innerHTML = editor_dom_unit.innerHTML;

        const result = DesignConverter.convertToHeedFormat(editor_content.outerHTML)
        const HTML = DesignConverter.convertToHTMLFormat(result)

        return await this.fileManager.Write(unit.filepath, HTML);
    }

    // Create a new file
    async create_file() {
        const filepath = await this.fileModal.save_file_action();
        if( !filepath ) return;

        const templatePath = await resolveResource('_up_/resources/templates/320x250.html')
        const jsPath = await resolveResource('_up_/resources/templates/unit.js')

        const templateData = await this.fileManager.Read(templatePath);
        const scriptName = await basename(jsPath);
        const scriptTags = `<script src=${scriptName}></script>`
        const output = templateData.replace('</head>',`\n${scriptTags}\n</head>` )

        // Creating dir and files
        let dirPath = await dirname(filepath)
        let filename = await basename(filepath);
        dirPath = await resolve(dirPath, filename.replace(".html", ""))

        let jsFilePath = await resolve(dirPath, scriptName)

        await this.fileManager.MakeDirectory(dirPath)
        await this.fileManager.Write( `${dirPath}/${filename}`, output );
        await this.fileManager.Copy(jsPath, jsFilePath);

    }

}

export default new HeedIo(
    new FileModal(),
    new FileManager()
)