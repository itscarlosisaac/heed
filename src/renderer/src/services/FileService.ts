import { IpcChannel } from '../../../shared/types'

class FileService {
  public static CreateFile(): void {
    window.electron.ipcRenderer.send(IpcChannel.createFile, {})
  }
  public static OpenFile(): void {
    window.electron.ipcRenderer.send(IpcChannel.openFile, {})
  }
  public static SaveFile(): void {
    window.electron.ipcRenderer.send(IpcChannel.saveFile, {})
  }
}

export default FileService
