export interface IUnit {
  id: string
  filename: string
  extension: string
  metadata: IUnitMetadata | null
}

export interface IUnitMetadata {
  author: string
  createdAt: string
  lastModifiedAt: string
}
