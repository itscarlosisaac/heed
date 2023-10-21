import * as fs from 'node:fs/promises'
import { PathLike } from 'node:fs'
import { FileHandle } from 'fs/promises'

class FileManager {
  public async Read(path: PathLike | FileHandle): Promise<string> {
    return await fs.readFile(path, { encoding: 'utf-8', flag: 'r' })
  }
  public async Write(path: PathLike, data: string): Promise<void> {
    return await fs.writeFile(path, data, { encoding: 'utf-8', flag: 'w' })
  }
}

export default new FileManager()