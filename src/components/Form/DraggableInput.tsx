import {
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
    Text,
} from '@chakra-ui/react'
import {useState, useRef, useCallback, useEffect, ReactNode} from "react";
import {observer} from "mobx-react";

type CustomProps = {
    label: ReactNode;
    onChange: (value: number) => void;
} & InputProps;

function DraggableInput(props: CustomProps) {
    const lastYPosition = useRef(0);
    const [value, setValue] = useState(0);
    
    const handleMouseDown = useCallback((event: MouseEvent) => {
        lastYPosition.current = event.clientY;
        const handleMouseMove = (event: MouseEvent) => {
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
        if( props.onChange) {
            props.onChange(value);
        }
    }, [value]);
    
    return (
        <>
            <InputGroup>
                <Input value={value} onMouseDown={handleMouseDown} {...props} />
                <InputRightElement>
                    <Text>{props.label}</Text>
                </InputRightElement>
            </InputGroup>
        </>
    );
}

export default observer(DraggableInput);
