import FileManager from './Core/Tarui/FileManager'
import path from 'path'

class TemplateGenerator {
  async generateHTMLFile(templatePath: string, jsFiles: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      // Read the HTML template file
      FileManager.Read(templatePath)
        .then((templateData) => {
          // Create a string to hold the script tags for JavaScript files
          const scriptTags = jsFiles
            .map((jsFile) => {
              // Gets the filename of the js file
              const fileName = path.basename(jsFile)
              return `<script src="./${fileName}"></script>`
            })
            .join('\n')

          // Inject the script tags into the template
          const htmlOutput = templateData.replace('</head>', `\n${scriptTags}\n</head>`)

          // Resolves the promise returning the html template
          resolve(htmlOutput)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
}

export default new TemplateGenerator()
