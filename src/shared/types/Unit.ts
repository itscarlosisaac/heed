export interface IUnit {
  id: string
  filename: string
  extension: string
  metadata: IUnitMetadata | null
  styleTag: IUnitStyle[]
  scriptTag: IUnitScript[]
  metaTag: IUnitMetaTag[]
  children: HTMLElement[]
}

export interface IUnitMetadata {
  author: string
  createdAt: string
  lastModifiedAt: string
}

export interface IUnitScript {
  attributes: Record<string, string>
  content: string
  position: string
}

export interface IUnitStyle {
  attributes: Record<string, string>
  content: string
  position: string
}

export interface IUnitMetaTag {
  attributes: Record<string, string>
  position: string
}
