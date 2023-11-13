import {
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
} from '@chakra-ui/react'
import {useSelector} from "react-redux";
import {ApplicationRootState} from "../../../redux/store/store.ts";
import {IHeedElement} from "../../../redux/Editor/EditorInitialState.ts";

function Position(): JSX.Element {

    const selector = useSelector<ApplicationRootState>(s => s.editor.selected) as IHeedElement;

    return (
        <>
            <HStack spacing={4}>
                <InputGroup>
                    <Input name={'x-position'}
                           color={'white'}
                           placeholder="0"
                           value={selector ? selector.position.left : ""} />
                    <InputRightElement>
                        <Text color={'white'}>X</Text>
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input name={'y-position'}
                           color={'white'}
                           placeholder="0"
                           value={selector ? selector.position.top : ""} />
                    <InputRightElement>
                        <Text color={'white'}>Y</Text>
                    </InputRightElement>
                </InputGroup>
            </HStack>
        </>
    )
}

export default Position
