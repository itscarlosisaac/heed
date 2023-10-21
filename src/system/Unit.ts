import { IUnit, IUnitMetadata } from '../shared/types'

class Unit implements IUnit {
  filename: string
  content: string
  id: string
  metadata: IUnitMetadata | null = null
  constructor(filename: string, id: string, content: string) {
    this.id = id
    this.content = content
    this.filename = filename
  }
}

export default Unit
