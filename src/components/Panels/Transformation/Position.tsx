import {
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
} from '@chakra-ui/react'
import {observer} from "mobx-react";
import heedElementManager from "../../../mobx/Managers/HeedElementManager.ts";

function Position(): JSX.Element {
    return (
        <>
            <HStack spacing={4}>
                <InputGroup>
                    <Input name={'x-position'}
                           color={'white'}
                           placeholder="0"
                           defaultValue={
                               heedElementManager.selected_style ?
                                   heedElementManager.selected_style.left : ""
                           }/>
                    <InputRightElement>
                        <Text color={'white'}>X</Text>
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input name={'y-position'}
                           color={'white'}
                           placeholder="0"
                           defaultValue={
                               heedElementManager.selected_style ?
                                   heedElementManager.selected_style.top : ""
                           }/>
                    <InputRightElement>
                        <Text color={'white'}>Y</Text>
                    </InputRightElement>
                </InputGroup>
            </HStack>
        </>
    )
}

export default observer(Position)
