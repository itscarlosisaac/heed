import Unit from "../../Unit";
import TemplateParser from "../../TemplateParser.ts";
import Transformable from "../../Transformables/Transformable.ts";
import {IHeedElement} from "../../../redux/Editor/EditorInitialState.ts";
import AppError from "../../Error/AppError.ts";
import {AppErrorCode} from "../../Error/AppError.types.ts";

class HeedParser {

    readonly templateParser: TemplateParser;
    private parsedElements: IHeedElement[] = [];

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

        if (!heedUnit || !unitElements) {
            throw new AppError(AppErrorCode.ConstructError, "Unable to construct the unit.")
        }

        Array.from(heedUnit.children).forEach((child) => {
            const clonedElement = child.cloneNode(false) as HTMLElement
            unitElements.appendChild(clonedElement)
            new Transformable(clonedElement)
            this.parsedElements.push({
                name: "",
                class: "",
                opacity: 0,
                id: clonedElement.id,
                position: { unit: "px", top: 0, left: 0 },
                size: { unit: "px", width: 0, height: 0 },
                rotation: 0,
            })
        })
    }

    public GetElements() {
        return this.parsedElements;
    }

    public ExtractStyles(element: HTMLElement){
        const computedStyle = window.getComputedStyle(element);
        const rotation = /rotate\(([^)]+)\)/.exec(element.style.transform);
        return {
            size: {
                width: computedStyle.width,
                height: computedStyle.height
            },
            position: {
                top: computedStyle.top,
                left: computedStyle.left
            },
            rotation: rotation ? rotation[1] : '0deg',
            id: element.id || null,
            name: element.getAttribute('name'),
            class: element.className || null,
            opacity: computedStyle.opacity
        };
    }

}

export default new HeedParser(
    new TemplateParser()
);