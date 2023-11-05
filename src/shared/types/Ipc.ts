import { GenericFunction } from './Generic'
export interface IpcApi {
  on(channel: string, callback: GenericFunction): void
  removeListener(channel: string, callback: GenericFunction): void
  send(channel: string, payload?: unknown): void
}
export enum IpcChannel {
  openFile = 'open_file',
  saveFile = 'save_file',
  createFile = 'create_file'
}
