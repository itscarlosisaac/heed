import { IUnit, IUnitMetadata, IUnitMetaTag, IUnitScript, IUnitStyle } from '../shared/types'

class Unit implements IUnit {
  filename: string
  filepath: string
  extension: string
  content: string
  id: string
  metadata: IUnitMetadata | null = null
  metaTag: IUnitMetaTag[] = []
  scriptTag: IUnitScript[] = []
  styleTag: IUnitStyle[] = []
  constructor(filename: string, id: string, content: string, extension: string, filepath: string) {
    this.id = id
    this.content = content
    this.filename = filename
    this.filepath = filepath
    this.extension = extension
  }

  setScripts(scripts: IUnitScript[]): void {
    this.scriptTag = scripts
  }
  setStyles(styles: IUnitStyle[]): void {
    this.styleTag = styles
  }
  setMetatags(metatags: IUnitMetaTag[]): void {
    this.metaTag = metatags
  }

  get(): any {
    return {
      filename: this.filename,
      filepath: this.filepath,
      extension: this.extension,
      content: this.content,
      id: this.id,
      metadata: this.metadata,
      metaTag: this.metaTag,
      scriptTag: this.scriptTag,
      styleTag: this.styleTag
    }
  }
}

export default Unit
