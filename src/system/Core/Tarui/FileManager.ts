import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';

class FileManager {
  public async Read(path: string ): Promise<string> {
    return await readTextFile(path, { dir: BaseDirectory.AppConfig });
  }
  // public async Write(path: PathLike, data: string): Promise<void> {
  //   return await fs.writeFile(path, data, { encoding: 'utf-8', flag: 'w' })
  // }
  // public async Copy(from: PathLike, to: PathLike): Promise<void> {
  //   return await fs.copyFile(from, to)
  // }
  // public async MakeDirectory(destination: PathLike): Promise<void> {
  //   return await fs.mkdir(destination)
  // }
}

export default FileManager
