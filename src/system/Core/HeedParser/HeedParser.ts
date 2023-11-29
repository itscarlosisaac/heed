import Unit from "../../Unit";
import TemplateParser from "../../TemplateParser.ts";
import {IHeedElement} from "../../../redux/Editor/EditorInitialState.ts";
import AppError from "../../Error/AppError.ts";
import {AppErrorCode} from "../../Error/AppError.types.ts";
import heedElementManager from "../../../mobx/Managers/HeedElementManager.ts";
import control from "../../Commands/Moveable";

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
        control.init();
        const viewer = document.querySelector(".viewer");

        if( !viewer )
            throw new AppError(AppErrorCode.ElementNotFound, "Unable to find viewer.");

        // TODO - Look into why when adding an else statement to select the element
        // is seems to select multiple times.
        viewer.addEventListener('mousedown', (event) => {
            // const target = event.target as HTMLElement;
            // const isClickable = target.getAttribute('data-clickable')
            // if( !!isClickable || isClickable == null ) {
            //     control.execute('deselect', [event])
            // }
        })

        let isMouseInBounds = false
        // Event listener for mouse movement
        viewer.addEventListener('mouseenter', () => {
            isMouseInBounds = true
        });

        viewer.addEventListener('mouseleave', () => {
            isMouseInBounds = false
        });

        // Deletes element if cursor is withing the bounds of
        // the working area and an element is selected.
        // document.addEventListener('keydown', (event: KeyboardEvent) => {
        //     const isDeleteKey = event.keyCode == 8;
        //     const hasSelected = control.selectable.selected;
        //     console.log("Will delete", hasSelected)
        //     if(isDeleteKey && hasSelected && isMouseInBounds) {
        //         control.execute('delete', [event])
        //         control.execute('deselect', [event])
        //     }
        // })

        Array.from(heedUnit.children).forEach((child) => {
            // TODO - Figure out why the element is duplicated when using the child
            const clonedElement = child.cloneNode(false) as HTMLElement
            clonedElement.style.userSelect = "none"
            unitElements.appendChild(clonedElement)

            clonedElement.addEventListener('mousedown', (event: MouseEvent) => {
                    control.execute("select", [event, clonedElement as HTMLElement])
                }
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