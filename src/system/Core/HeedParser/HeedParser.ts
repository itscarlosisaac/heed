import Unit from "../../Unit";
import TemplateParser from "../../TemplateParser.ts";
import Transformable from "../../Transformables/Transformable.ts";

class HeedParser {

    readonly templateParser: TemplateParser;

    constructor(templateParser: TemplateParser) {
        this.templateParser = templateParser
    }

    async ParseUnitData(unit: Unit) {
        this.RenderParsedData(unit)
        this.templateParser.parse(unit.content)
            .then((parsedDoc) => {
                unit.setScripts(parsedDoc.scripts)
                unit.setStyles(parsedDoc.styles)
                unit.setMetatags(parsedDoc.meta)
            }
        )
        return unit;
    }

    private RenderParsedData(unit: Unit) {
        const Domparser = new DOMParser();
        const parsedDoc = Domparser.parseFromString(unit.content, 'text/html')
        const heedUnit = parsedDoc.querySelector('heed-unit')
        const unitElements = document.querySelector('#unit')

        if( !heedUnit || !unitElements ){
            throw new Error("Unable to construct unit.")
        }

        Array.from(heedUnit.children).forEach((child) => {
            const copy = child.cloneNode(false) as HTMLElement
            console.log("Element: ", copy)
            unitElements.appendChild(copy)
            new Transformable(copy)
          })
    }

}

export default new HeedParser(
    new TemplateParser()
);