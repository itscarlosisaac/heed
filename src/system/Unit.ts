import { IUnit, IUnitMetadata } from '../shared/types'

class Unit implements IUnit {
  filename: string
  id: string
  metadata: IUnitMetadata

  constructor(filename: string, id: string) {
    this.filename = filename
    this.id = id
  }
}

export default Unit
