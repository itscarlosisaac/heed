import Unit from "../../Unit";
import TemplateParser from "../../TemplateParser.ts";
import Transformable from "../../Transformables/Transformable.ts";
import {IHeedElement} from "../../../redux/Editor/EditorInitialState.ts";
import AppError from "../../Error/AppError.ts";
import {AppErrorCode} from "../../Error/AppError.types.ts";
import {layer_behavioral_subject} from "../HeedIo/LayerObservable.ts";

class HeedParser {

    readonly templateParser: TemplateParser;
    private parsedElements: IHeedElement[] = [];

    constructor(templateParser: TemplateParser) {
        this.templateParser = templateParser
        this.RenderParsedData = this.RenderParsedData.bind(this)
    }

    async ParseUnitData(unit: Unit) {
        this.templateParser.parse(unit.content)
            .then((parsedDoc) => {
                    unit.setScripts(parsedDoc.scripts)
                    unit.setStyles(parsedDoc.styles)
                    unit.setMetatags(parsedDoc.meta)
                }
            )
        return unit;
    }

    public RenderParsedData(unit: Unit) {
        const domParser = new DOMParser();
        const parsedDoc = domParser.parseFromString(unit.content, 'text/html')
        const heedUnit = parsedDoc.querySelector('heed-unit')
        const unitElements = document.querySelector('#unit')

        if (!heedUnit || !unitElements) {
            throw new AppError(AppErrorCode.ConstructError, "Unable to construct the unit.")
        }

        Array.from(heedUnit.children).forEach((child) => {
            // TODO - Figure out why the element is duplicated when using the child
            const clonedElement = child.cloneNode(false) as HTMLElement
            unitElements.appendChild(clonedElement)
        })
        layer_behavioral_subject.next(unitElements.children);

        return unit;
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