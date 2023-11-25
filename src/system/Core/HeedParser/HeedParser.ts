import Unit from "../../Unit";
import TemplateParser from "../../TemplateParser.ts";
import {IHeedElement} from "../../../redux/Editor/EditorInitialState.ts";
import AppError from "../../Error/AppError.ts";
import {AppErrorCode} from "../../Error/AppError.types.ts";
import heedElementManager from "../../../mobx/Managers/HeedElementManager.ts";
import Selectable from "../../Ables/Selectable.ts";

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


        //
        const selectable = new Selectable('#canvas', document.querySelector("#unit"));
        //
        // // SELECTABLE
        selectable.addEventListener('boundingBoxAttached', (event: CustomEvent) => {
            heedElementManager.select(event.detail.element as HTMLElement);
            console.log('Element attached:', event.detail.element);
        });

        selectable.addEventListener('boundingBoxDetached', (event: CustomEvent) => {
            heedElementManager.select(null)
            console.log('Element detached:', event.detail.element);
        });

        selectable.boundingBox.addEventListener('dragMove', (event: CustomEvent) => {
            // console.log('Element move:', event.detail.element);
            heedElementManager.update_position({target: event.detail.element})
            heedElementManager.update_size({target: event.detail.element})
        });

        selectable.boundingBox.addEventListener('resized', (event: CustomEvent) => {
            // console.log('Element move:', event.detail.element);
            heedElementManager.update_position({target: event.detail.element})
            heedElementManager.update_size({target: event.detail.element})
        });

        Array.from(heedUnit.children).forEach((child) => {
            // TODO - Figure out why the element is duplicated when using the child
            const clonedElement = child.cloneNode(false) as HTMLElement
            clonedElement.style.userSelect = "none"
            unitElements.appendChild(clonedElement)

            // Assuming you have elements you want to make movable
            clonedElement.addEventListener('mousedown', (event: MouseEvent) =>
                selectable.attach(event, clonedElement as HTMLElement)
            );

            heedElementManager.add_element(clonedElement);
        })


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