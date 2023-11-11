import TemplateGenerator from './TemplateGenerator'
import FileManager from './Core/Tarui/FileManager'
import path from 'path'

class TemplateWriter {
  constructor(
    private generator: typeof TemplateGenerator,
    private writer: typeof FileManager
  ) {
    this.generator = generator
    this.writer = writer
  }

  async writeTemplate(templatePath: string, destination: string, jsFiles: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      // Use the HTMLFileGenerator to generate the HTML file
      this.generator
        .generateHTMLFile(templatePath, jsFiles)
        .then(async (templateData) => {
          // Parse the path to get the details of the filename and extension.
          const parsedPath = path.parse(destination)
          const updatedDestination = path.join(path.dirname(destination), parsedPath.name)
          // Creates Directory
          await this.writer.MakeDirectory(updatedDestination)
          // Writes the html file to disk
          await this.writer.Write(
            path.join(updatedDestination, path.basename(destination)),
            templateData
          )
          // Writes the js files to disk
          jsFiles.forEach((file) =>
            this.writer.Copy(file, path.resolve(updatedDestination, path.basename(file)))
          )
          resolve()
        })
        .catch((e: unknown) => {
          reject(e)
        })
    })
  }
}
export default new TemplateWriter(TemplateGenerator, FileManager)
