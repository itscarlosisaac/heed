import {
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
} from '@chakra-ui/react'
import {useSelector} from "react-redux";
import {ApplicationRootState} from "../../../redux/store/store.ts";

function Position(): JSX.Element {

    const selector = useSelector<ApplicationRootState>(s => s.editor.selected) as HTMLElement;

    return (
        <>
            <HStack spacing={4}>
                <InputGroup>
                    <Input name={'x-position'}
                           color={'white'}
                           placeholder="0"
                           value={selector ? selector.style.left.replace("px", '') : ""} />
                    <InputRightElement>
                        <Text color={'white'}>X</Text>
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input name={'y-position'}
                           color={'white'}
                           placeholder="0"
                           value={selector ? selector.style.top.replace("px", '') : ""} />
                    <InputRightElement>
                        <Text color={'white'}>Y</Text>
                    </InputRightElement>
                </InputGroup>
            </HStack>
        </>
    )
}

export default Position
