import {
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
    Text,
} from '@chakra-ui/react'
import {useState, useRef, useCallback, useEffect} from "react";
import heedElementManager from "../../mobx/Managers/HeedElementManager.ts";
import {observer} from "mobx-react";

function DraggableInput(props: InputProps) {

    const lastYPosition = useRef(0)
    const [value, setValue] = useState(
        heedElementManager.selected_style?.top.replace("px", "") || 0
    )

    const handleMouseDown = useCallback((event: MouseEvent) => {
        lastYPosition.current = event.clientY;
        const handleMouseMove = (event: MouseEvent ) => {
            const deltaY = lastYPosition.current - event.clientY;
            if (deltaY !== 0) {
                setValue((prevValue) => prevValue + deltaY);
                lastYPosition.current = event.clientY;
            }
        };
        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }, []);


    useEffect(() => {
        heedElementManager.set_move("top", value)
    }, [value])

    return (
        <>
            <InputGroup>
                <Input
                    value={value}
                    onMouseDown={handleMouseDown}
                    {...props} />
                <InputRightElement>
                    <Text>X</Text>
                </InputRightElement>
            </InputGroup>
        </>
    );
}

export default observer(DraggableInput);