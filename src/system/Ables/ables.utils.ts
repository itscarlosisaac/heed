import {AnchorPosition, Point, Size} from "./ables.types";

function get_original_size(element: HTMLElement): Size {
    return {
        width: element.offsetWidth,
        height: element.offsetHeight,
    };
}

function get_original_coordinates(element: HTMLElement): AnchorPosition {
    return {
        top_left: {
            x: element.offsetLeft,
            y: element.offsetTop,
        },
        top_right: {
            x: element.offsetLeft + element.offsetWidth,
            y: element.offsetTop,
        },
        bottom_right: {
            x: element.offsetLeft + element.offsetWidth,
            y: element.offsetTop + element.offsetHeight,
        },
        bottom_left: {
            x: element.offsetLeft,
            y: element.offsetTop + element.offsetHeight,
        },
        center: {
            x: element.offsetLeft + element.offsetWidth / 2,
            y: element.offsetTop + element.offsetHeight / 2,
        },
    };
}

function get_scale_factor(initial_size: Size, new_size: Size): Size {
    return {
        width: new_size.width / initial_size.width,
        height: new_size.height / initial_size.height,
    };
}

function rotate_point(point: Point, center: Point, angle_in_radians: number): Point {
    const angleSin = Math.sin(angle_in_radians);
    const angleCos = Math.cos(angle_in_radians);

    return {
        x: center.x + (point.x - center.x) * angleCos - (point.y - center.y) * angleSin,
        y: center.y + (point.x - center.x) * angleSin + (point.y - center.y) * angleCos,
    };
}

function get_unrotated_size(
    scale_factor: Size,
    coordinates: AnchorPosition,
    anchor: keyof AnchorPosition & string
): Omit<AnchorPosition, "center"> {
    const {top_left, top_right, bottom_right, bottom_left} = coordinates;

    const anchorCoords = coordinates[anchor];

    return {
        "top_left": {
            x: anchorCoords.x + scale_factor.width * (top_left.x - anchorCoords.x),
            y: anchorCoords.y + scale_factor.height * (top_left.y - anchorCoords.y),
        },
        "top_right": {
            x: anchorCoords.x + (top_right.x - anchorCoords.x) * scale_factor.width,
            y: anchorCoords.y + (top_right.y - anchorCoords.y) * scale_factor.height,
        },
        "bottom_right": {
            x: anchorCoords.x + (bottom_right.x - anchorCoords.x) * scale_factor.width,
            y: anchorCoords.y + (bottom_right.y - anchorCoords.y) * scale_factor.height,
        },
        "bottom_left": {
            x: anchorCoords.x + (bottom_left.x - anchorCoords.x) * scale_factor.width,
            y: anchorCoords.y + (bottom_left.y - anchorCoords.y) * scale_factor.height,
        }
    };
}

function calculate_rotated_rectangle(
    original_coordinates: AnchorPosition,
    angle_in_radians: number
): Omit<AnchorPosition, "center"> {
    return {
        top_left: rotate_point(
            original_coordinates.top_left,
            original_coordinates.center,
            angle_in_radians
        ),
        top_right: rotate_point(
            original_coordinates.top_right,
            original_coordinates.center,
            angle_in_radians
        ),
        bottom_right: rotate_point(
            original_coordinates.bottom_right,
            original_coordinates.center,
            angle_in_radians
        ),
        bottom_left: rotate_point(
            original_coordinates.bottom_left,
            original_coordinates.center,
            angle_in_radians
        ),
    };
}

function get_unrotated_anchor(element: HTMLElement, anchor: keyof AnchorPosition & string): Point {
    return get_original_coordinates(element)[anchor];
}

function get_point_distance(p1: Point, p2: Point) {
    return {
        x: p2.x - p1.x,
        y: p2.y - p1.y,
    };
}

function  get_current_rotation(element: HTMLElement): number {
    const styles = window.getComputedStyle(element, null)
    const transform =
        styles.getPropertyValue('-webkit-transform') ||
        styles.getPropertyValue('-moz-transform') ||
        styles.getPropertyValue('-ms-transform') ||
        styles.getPropertyValue('-o-transform') ||
        styles.getPropertyValue('transform') ||
        'none'
    if (transform != 'none') {
        const values = transform.split('(')[1].split(')')[0].split(',')
        const angle = Math.round(Math.atan2(Number(values[1]), Number(values[0])) * (180 / Math.PI))
        return angle < 0 ? angle + 360 : angle
    }
    return 0
}

function parse_css_transform(transformString:string) {
    const transformObject: Record<string, string | string[]> = {};
    const regex = /(\w+)\(([^)]+)\)/g;
    let match;

    while ((match = regex.exec(transformString)) !== null) {
        const transformType = match[1];
        const values = match[2].split(',').map(val => val.trim());
        transformObject[transformType] = values.length > 1 ? values : values[0];
    }

    return transformObject;
}

function decompose_matrix(matrix_string: string) {
    // Extract the values from the matrix string
    let values: RegExpMatchArray | null = null
    values = matrix_string.match(/matrix\(([^)]+)\)/);
    if( !values ) return {
        translate: {x:0, y: 0},
        rotate: 0,
        scale: 1
    }
    const parseValues = values[1].split(', ').map(Number);

    // Decompose the matrix values
    const [a, b, c, d, e, f] = parseValues;
    const scaleX = Math.sqrt(a * a + b * b);
    const scaleY = Math.sqrt(c * c + d * d);
    const rotation = Math.atan2(b, a);

    // Convert rotation to degrees
    const rotate = rotation * (180 / Math.PI);

    // Return the decomposed values
    return {
        translate: { x: e, y: f },
        rotate: rotate.toFixed(2),
        scale: { x: scaleX.toFixed(2), y: scaleY.toFixed(2) }
    };
}


export default {
    decompose_matrix,
    parse_css_transform,
    get_current_rotation,
    get_point_distance,
    get_original_size,
    get_original_coordinates,
    get_scale_factor,
    rotate_point,
    get_unrotated_size,
    calculate_rotated_rectangle,
    get_unrotated_anchor,
}