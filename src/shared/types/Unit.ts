export interface IUnit {
  filename: string
  id: string
  metadata: IUnitMetadata | null
}

export interface IUnitMetadata {
  author: string
  createdAt: string
  lastModifiedAt: string
}
