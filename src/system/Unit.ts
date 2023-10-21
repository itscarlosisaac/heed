import { IUnit, IUnitMetadata } from '../shared/types'

class Unit implements IUnit {
  filename: string
  extension: string
  content: string
  id: string
  metadata: IUnitMetadata | null = null
  constructor(filename: string, id: string, content: string, extension: string) {
    this.id = id
    this.content = content
    this.filename = filename
    this.extension = extension
  }
}

export default Unit
