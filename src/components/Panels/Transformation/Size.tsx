import { observer } from "mobx-react"
import {
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    IconButton,
} from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import heedElementManager from "../../../mobx/Managers/HeedElementManager.ts";

function Size() : JSX.Element {
    return (
        <>
            <HStack spacing={3}>
                <InputGroup>
                    <Input name={'width'}
                           placeholder="0"
                           defaultValue={heedElementManager.selected_style ? heedElementManager.selected_style.width : ""} />
                    <InputRightElement>
                        <Text color={'white'}>W</Text>
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input name={'height'}
                           placeholder="0"
                           defaultValue={heedElementManager.selected_style ? heedElementManager.selected_style.height : ""} />
                    <InputRightElement>
                        <Text color={'white'}>H</Text>
                    </InputRightElement>
                </InputGroup>
                <IconButton
                    borderRadius={ "13px"}
                    bg={"app.gray.light"} aria-label="Link" icon={<LinkIcon />} />
            </HStack>
        </>
    )
}

export default observer(Size)
