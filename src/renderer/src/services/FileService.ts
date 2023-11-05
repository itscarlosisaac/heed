import { IpcChannel } from '../../../shared/types'

class FileService {
  public static CreateFile(): void {
    window.electron.ipcRenderer.send(IpcChannel.createFile, {})
  }
  public static OpenFile(): void {
    window.electron.ipcRenderer.send(IpcChannel.openFile, {})
  }
  public static SaveFile(data: string): void {
    window.electron.ipcRenderer.send(IpcChannel.saveFile, data)
  }
}

export default FileService
