import {open, save} from "@tauri-apps/api/dialog";

class FileModal {
    async open_file_action(){
        return await open({
            multiple: false,
            filters: [{
                name: 'HTML Files',
                extensions: ['html']
            }]
        });
    }

    async save_file_action(){
        return await save({
            title: "Create new file",
            filters: [{
                name: 'HTML Files',
                extensions: ['html']
            }]
        })
    }
}

export default FileModal;