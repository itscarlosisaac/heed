import { readTextFile, BaseDirectory, writeTextFile, createDir, copyFile } from '@tauri-apps/api/fs';

class FileManager {
  public async Read(path: string ): Promise<string> {
    return await readTextFile(path, { dir: BaseDirectory.AppConfig });
  }
  public async Write(path: string, data: string): Promise<void> {
    return await writeTextFile(path, data, { append: false });
  }
  public async Copy(from: string, to: string): Promise<void> {
    return await copyFile(from, to)
  }
  public async MakeDirectory(destination: string): Promise<void> {
    return await createDir(destination)
  }
}

export default FileManager
