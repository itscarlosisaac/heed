import {
    HStack,
    Input,
    InputGroup,
    InputLeftElement
} from '@chakra-ui/react'
import { UpDownIcon } from '@chakra-ui/icons'
import {useSelector} from "react-redux";
import {ApplicationRootState} from "../../../redux/store/store.ts";
import {IHeedElement} from "../../../redux/Editor/EditorInitialState.ts";

function Rotation(): JSX.Element {

    const selector = useSelector<ApplicationRootState>(s => s.editor.selected) as IHeedElement;


    return (
        <>
            <HStack spacing={4} w={"100%"}>
                <InputGroup>
                    <Input name={'rotation'}
                           color={'white'}
                           placeholder="0"
                           defaultValue={selector ? selector.rotation : ""}  w={'100%'} />
                    <InputLeftElement>
                        <UpDownIcon color={'white'} />
                    </InputLeftElement>
                </InputGroup>
            </HStack>
        </>
    )
}

export default Rotation
