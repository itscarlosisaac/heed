import {open} from "@tauri-apps/api/dialog";

class FileModal {
    async OpenFileAction(){
        return await open({
            multiple: false,
            filters: [{
                name: 'HTML Files',
                extensions: ['html']
            }]
        });
    }
}

export default FileModal;