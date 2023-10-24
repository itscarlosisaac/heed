import TemplateGenerator from './TemplateGenerator'
import FileManager from './FileManager'
import path from "path";

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
      this.generator
        .generateHTMLFile(templatePath, jsFiles)
        .then((templateData) => {
          console.log('Template Data: ', templateData, destination)
          this.writer.Write(destination, templateData)
          jsFiles.forEach((file) => this.writer.Copy(file, path.resolve(path.dirname(destination), path.basename(file))))
          resolve()
        })
        .catch((e: unknown) => {
          reject(e)
        })
    })
    // Use the HTMLFileGenerator to generate the HTML file

    // Write the JavaScript files to disk
    // jsFiles.forEach((jsFile) => {
    //   fs.copyFile(jsFile, `output/${jsFile}`, (err) => {
    //     if (err) {
    //       console.error(`Error copying JavaScript file ${jsFile}: ${err}`)
    //     } else {
    //       console.log(`JavaScript file ${jsFile} copied to output directory.`)
    //     }
    //   })
    // })
  }
}
export default new TemplateWriter(TemplateGenerator, FileManager)
