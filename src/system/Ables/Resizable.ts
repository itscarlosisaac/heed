import {AnchorPosition, Point, ShareState, Size} from "./ables.types";
import {ResizeBound} from "./Bounds/ResizeBound.ts";
import ablesUtils from "./ables.utils.ts";
import AppError from "../Error/AppError.ts";
import {AppErrorCode} from "../Error/AppError.types.ts";
import AblesEventFactory from "./Bounds/ables.events.ts";

class Resizable {
    protected target: HTMLElement
    protected selectedElement: HTMLElement | null = null;

    state: ShareState;
    handlers: ResizeBound[] = []
    private anchor: keyof AnchorPosition & string = "top_left"

    constructor(target: HTMLElement, state: ShareState, handlers: ResizeBound[]) {
        this.state = state;
        this.target = target;
        this.handlers = handlers;

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.attachEventListeners()
    }

    private attachEventListeners(): void {
        this.handlers.forEach( (handle) =>
            handle.handler.addEventListener('mousedown', this.onMouseDown))
    }

    onAttachResizable(element: HTMLElement) {
        this.selectedElement = element;
    }

    private handleInitialSetup(event: MouseEvent){
        this.state.initialSize = {
            width: this.target.offsetWidth,
            height: this.target.offsetHeight,
        }

        this.state.initialCenter = {
            width: this.target.offsetLeft + this.target.offsetWidth / 2,
            height: this.target.offsetTop + this.target.offsetHeight / 2,
        }

        this.state.dragStartPosition = {
            x: event.clientX,
            y: event.clientY
        }

        const event_target = event.target as HTMLElement;
        if( !event_target ) throw new AppError(AppErrorCode.ElementNotFound, "Unable to find Resize handler.")

        this.state.initial_coordinates = ablesUtils.get_original_coordinates(this.target);
        this.anchor = event_target.dataset.anchor as keyof AnchorPosition || "top_left";
    }

    onMouseDown(event: MouseEvent): void {
        event.stopPropagation()
        this.state.isResizing = true;
        this.handleInitialSetup(event)
        document.addEventListener('mousemove', this.onMouseMove )
        document.addEventListener('mouseup', this.onMouseUp)
    }

    onMouseMove(event: MouseEvent): void  {
        if( !this.state.isResizing|| !this.selectedElement ) return;

        const distance = ablesUtils.get_point_distance(this.state.dragStartPosition, {
            x: event.clientX,
            y: event.clientY,
        })

        const initial_rotation = ablesUtils.get_current_rotation(this.target)
        const initial_radian_rotation = (initial_rotation * Math.PI) / 180
        const cosFraction = Math.cos(initial_radian_rotation)
        const sinFraction = Math.sin(initial_radian_rotation)

        const rotated_distance: Point = {
            x: cosFraction * distance.x + sinFraction * distance.y,
            y: cosFraction * distance.y - sinFraction * distance.x,
        };

        const min_width = 40;
        const min_height = 40;

        let new_size: Size = {
            width: min_width,
            height: min_height,
        };

        switch (this.anchor) {
            case 'top_left':
                new_size.width = Math.max(
                    min_width,
                    this.state.initialSize.width + rotated_distance.x
                );
                new_size.height = Math.max(
                    min_height,
                    this.state.initialSize.height + rotated_distance.y
                );
                break;
            case 'top_right':
                new_size.width = Math.max(
                    min_width,
                    this.state.initialSize.width - rotated_distance.x
                );
                new_size.height = Math.max(
                    min_height,
                    this.state.initialSize.height + rotated_distance.y
                );
                break;
            case 'bottom_left':
                new_size.width = Math.max(
                    min_width,
                    this.state.initialSize.width + rotated_distance.x
                );
                new_size.height = Math.max(
                    min_height,
                    this.state.initialSize.height - rotated_distance.y
                );
                break;
            case 'bottom_right':
                new_size.width = Math.max(
                    min_width,
                    this.state.initialSize.width - rotated_distance.x
                );
                new_size.height = Math.max(
                    min_height,
                    this.state.initialSize.height - rotated_distance.y
                );
                break;
        }

        if (new_size.height == min_height) {
            new_size.height = min_height;
            rotated_distance.y = min_height / 2 + this.state.initial_coordinates.top_left.y / 2;
        }

        if (new_size.width == min_width) {
            new_size.width = min_width;
            rotated_distance.x = min_width / 2 + this.state.initial_coordinates.top_left.x / 2;
        }

        // Rotate this point around the center
        const scale_factor = ablesUtils.get_scale_factor(this.state.initialSize, new_size);

        const unrotated_resized_rectangle = ablesUtils.get_unrotated_size(
            scale_factor,
            this.state.initial_coordinates,
            this.anchor
        );
        const rotated_resized_rectangle = ablesUtils.calculate_rotated_rectangle(
            {...unrotated_resized_rectangle, center: this.state.initial_coordinates.center},
            initial_radian_rotation
        )

        const new_center = {
            x: (rotated_resized_rectangle.top_right.x + rotated_resized_rectangle.bottom_left.x) / 2,
            y: (rotated_resized_rectangle.top_right.y + rotated_resized_rectangle.bottom_left.y) / 2,
        };

        const new_position = ablesUtils.rotate_point(
            rotated_resized_rectangle.top_left,
            new_center,
            -initial_radian_rotation
        );

        // Updating element's styles
        this.selectedElement.style.width = new_size.width + "px"
        this.selectedElement.style.height = new_size.height + "px"
        this.selectedElement.style.top = new_position.y + "px"
        this.selectedElement.style.left = new_position.x + "px"

        // Updating Bounding box's styles
        this.target.style.width = new_size.width + "px"
        this.target.style.height = new_size.height + "px"
        this.target.style.top = new_position.y + "px"
        this.target.style.left = new_position.x + "px"

        // Dispatch a custom event to notify that the element has been moved
        this.target.dispatchEvent(
            AblesEventFactory.instance.create_event(
                AblesEventFactory.events.resize.moved,
                {element: this.selectedElement})
        )
    }

    onMouseUp():void {
        this.state.isResizing = false;
        document.removeEventListener('mousemove', this.onMouseMove )
        document.removeEventListener('mouseup', this.onMouseUp)
    }

}

export default Resizable