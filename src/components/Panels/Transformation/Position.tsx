import {
    HStack, IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Text,
} from '@chakra-ui/react'
import {observer} from "mobx-react";
import heedElementManager from "../../../mobx/Managers/HeedElementManager.ts";
import {LinkIcon} from "@chakra-ui/icons";

function Position(): JSX.Element {

    return (
        <>
            <HStack spacing={3}>
                <InputGroup>
                    <Input name={'x-position'}
                           variant={"editor"}
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
                           placeholder="0"
                           variant={"editor"}
                           defaultValue={
                               heedElementManager.selected_style ?
                                   heedElementManager.selected_style.top : ""
                           }/>
                    <InputRightElement>
                        <Text color={'white'}>Y</Text>
                    </InputRightElement>
                </InputGroup>

                <IconButton
                    visibility={"hidden"} aria-label="Link" icon={<LinkIcon color={"transparent"} />} />
            </HStack>
        </>
    )
}

export default observer(Position)
