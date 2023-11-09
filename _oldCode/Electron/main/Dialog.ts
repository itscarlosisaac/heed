import { dialog, SaveDialogOptions, SaveDialogReturnValue, OpenDialogOptions,OpenDialogReturnValue } from 'electron'
class Dialog {
  private static instance: typeof dialog = dialog
  public static async SaveFile(options: SaveDialogOptions): Promise<SaveDialogReturnValue> {
    return await this.instance.showSaveDialog(options)
  }

  public static async OpenFile(options: OpenDialogOptions): Promise<OpenDialogReturnValue> {
    return await this.instance.showOpenDialog(options)
  }

  public static HTMLDialogFilter = {
    name: 'HTML Files',
    extensions: ['html']
  }
}

export default Dialog
