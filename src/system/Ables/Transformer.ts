export interface Transformations {
    translate?: { x: number; y: number; z?: number };
    scale?: { x: number; y: number; z?: number };
    rotate?: number;
    skew?: { x: number; y: number; z?: number };
}

class ElementTransformer {
    static parseTransformations(element: HTMLElement) {
        const transformations = element.style.transform;

        const regex =
            /translate\(([^)]+)\)|scale\(([^)]+)\)|rotate\(([^)]+)\)|skew\(([^)]+)\)/g;
        const result: Transformations = {};
        let match;

        while ((match = regex.exec(transformations)) !== null) {
            if (match[1]) {
                const [x, y = 0, z = 0] = match[1].split(',').map((s) => parseFloat(s));
                result.translate = {x, y, z};
            } else if (match[2]) {
                const [x, y = 1, z = 1] = match[2].split(',').map((s) => parseFloat(s));
                result.scale = {x, y, z};
            } else if (match[3]) {
                result.rotate = parseFloat(match[3]);
            } else if (match[4]) {
                const [x, y = 0, z = 0] = match[4].split(',').map((s) => parseFloat(s));
                result.skew = {x, y, z};
            }
        }

        return result;
    }

    private static createTransformString(transforms: Transformations): string {
        let transformString = '';
        if (transforms.translate) {
            transformString += ` translate(${transforms.translate.x}px, ${
                transforms.translate.y
            }px${transforms.translate.z ? `, ${transforms.translate.z}px` : ''})`;
        }

        if (transforms.scale) {
            transformString += ` scale(${transforms.scale.x}, ${transforms.scale.y}${
                transforms.scale.z ? `, ${transforms.scale.z}` : ''
            })`;
        }

        if (transforms.rotate) {
            transformString += ` rotate(${transforms.rotate}deg)`;
        }

        if (transforms.skew) {
            transformString += ` skew(${transforms.skew.x}deg, ${
                transforms.skew.y
            }deg${transforms.skew.z ? `, ${transforms.skew.z}deg` : ''})`;
        }
        return transformString;
    }

    private static applyTransformations(
        element: HTMLElement,
        transforms: Transformations
    ): void {
        element.style.transform = this.createTransformString(transforms);
    }

    static updateTranslate(
        element: HTMLElement,
        x: number,
        y: number,
        z?: number
    ): void {
        const currentTransforms = this.parseTransformations(element);
        currentTransforms.translate = {x, y, z};
        this.applyTransformations(element, currentTransforms);
    }

    static updateRotate(element: HTMLElement, angle: number): void {
        const currentTransforms = this.parseTransformations(element);
        currentTransforms.rotate = angle;
        element.style.transform = this.createTransformString(currentTransforms);
    }

    static updateScale(
        element: HTMLElement,
        x: number,
        y: number,
        z?: number
    ): void {
        const currentTransforms = this.parseTransformations(element);
        currentTransforms.scale = {x, y, z};
        element.style.transform = this.createTransformString(currentTransforms);
    }
}

export default ElementTransformer;
