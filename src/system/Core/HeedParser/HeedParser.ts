import Unit from "../../Unit";
import TemplateParser from "../../TemplateParser.ts";
import {IHeedElement} from "../../../redux/Editor/EditorInitialState.ts";
import AppError from "../../Error/AppError.ts";
import {AppErrorCode} from "../../Error/AppError.types.ts";
import heedElementManager from "../../../mobx/Managers/HeedElementManager.ts";
import Selectable from "../../Ables/Selectable.ts";
import AblesEventFactory from "../../Ables/Bounds/ables.events.ts";

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


        // SELECTABLE
        const unitElement = document.querySelector("#unit");
        if( !unitElement ) throw new AppError(AppErrorCode.ElementNotFound, "Unable to find the unit element.")
        const selectable = new Selectable('#canvas', unitElement as HTMLElement);


        // The event listener should directly use CustomEvent with the detail type
        selectable.addEventListener(AblesEventFactory.events.select.started, (event: CustomEventInit) => {
            // Ensure that `event.detail.element` is an HTMLElement before using it
            if (event.detail.element instanceof HTMLElement) {
                heedElementManager.select(event.detail.element);
            }
        });

        selectable.addEventListener(AblesEventFactory.events.select.ended, () => {
            heedElementManager.select(null)
        });

        selectable.boundingBox.addEventListener(AblesEventFactory.events.drag.moved, (event: CustomEventInit) => {
            if (event.detail.element instanceof HTMLElement) {
                heedElementManager.update_position(event.detail.element)
                heedElementManager.update_size(event.detail.element)
            }
        });

        selectable.boundingBox.addEventListener(AblesEventFactory.events.resize.moved, (event: CustomEventInit) => {
            if (event.detail.element instanceof HTMLElement) {
                heedElementManager.update_position(event.detail.element)
                heedElementManager.update_size(event.detail.element)
            }
        });

        selectable.boundingBox.addEventListener(AblesEventFactory.events.rotate.moved, (event: CustomEventInit) => {
            if (event.detail.element instanceof HTMLElement) {
                heedElementManager.update_rotation(event.detail.element)
            }
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