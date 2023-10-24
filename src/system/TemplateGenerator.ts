import FileManager from './FileManager'

class TemplateGenerator {
  async generateHTMLFile(templatePath: string, jsFiles: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      // Read the HTML template file
      FileManager.Read(templatePath)
        .then((templateData) => {
          // Create a string to hold the script tags for JavaScript files
          const scriptTags = jsFiles.map((jsFile) => `<script src="${jsFile}"></script>`).join('\n')

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
