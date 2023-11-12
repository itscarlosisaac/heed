import PanelContainer from '../PanelContainer/PanelContainer'
import {
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    IconButton,
} from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import {useSelector} from "react-redux";
import {ApplicationRootState} from "../../../redux/store/store.ts";

function Size(): JSX.Element {

    const selector = useSelector<ApplicationRootState>(s => s.editor.selected) as HTMLElement;

    return (
        <>
            <HStack spacing={4}>
                <InputGroup>
                    <Input name={'width'}
                           color={'white'}
                           placeholder="0"
                           value={selector ? selector.style.width.replace("px", '') : ""} />
                    <InputRightElement>
                        <Text color={'white'}>W</Text>
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input name={'height'}
                           color={'white'}
                           placeholder="0"
                           value={selector ? selector.style.height.replace("px", '') : ""} />
                    <InputRightElement>
                        <Text color={'white'}>H</Text>
                    </InputRightElement>
                </InputGroup>
                <IconButton aria-label="Link" icon={<LinkIcon />} />
            </HStack>
        </>
    )
}

export default Size
