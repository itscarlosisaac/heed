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
import DraggableInput from "../../Form/DraggableInput.tsx";

function Position(): JSX.Element {

    return (
        <>
            <HStack spacing={3}>
                <InputGroup>
                    <DraggableInput
                        disabled={!heedElementManager.selected_element}
                        name={'x-position'}
                        variant={"editor"}
                        placeholder="--"
                        type={"number"}/>
                    <InputRightElement>
                        <Text color={'white'}>X</Text>
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <Input
                        disabled={!heedElementManager.selected_element}
                        name={'y-position'}
                        placeholder="--"
                        variant={"editor"}
                        type={"number"}
                        defaultValue={
                            heedElementManager.selected_style ?
                                heedElementManager.selected_style.top.replace("px", '') : "--"
                        }/>
                    <InputRightElement>
                        <Text color={'white'}>Y</Text>
                    </InputRightElement>
                </InputGroup>

                <IconButton
                    visibility={"hidden"} aria-label="Link" icon={<LinkIcon color={"transparent"}/>}/>
            </HStack>
        </>
    )
}

export default observer(Position)
