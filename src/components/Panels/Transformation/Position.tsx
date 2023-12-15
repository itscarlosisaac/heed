import {
    HStack, IconButton,
    InputGroup,
    InputRightElement,
    Text,
} from '@chakra-ui/react'
import {observer} from "mobx-react";
import heedElementManager from "../../../mobx/Managers/HeedElementManager.ts";
import {LinkIcon} from "@chakra-ui/icons";
import DraggableInput from "../../Form/DraggableInput.tsx";
import control from "../../../system/Commands/Moveable";

function Position(): JSX.Element {
    function handleChange(value: number, dir: string ){
        const current = heedElementManager.selected_style ;
        if( !current ) { return }
        dir === "vertical" ?
            ( control.execute("move", [value, current.top.replace("px", "")])) :
            ( control.execute("move", [current.left.replace("px", ""), value]))
    }
    return (
        <>
            <HStack spacing={3}>
                <InputGroup>
                    <DraggableInput
                        label={<p>X</p>}
                        name={'horizontal'}
                        type={"number"}
                        placeholder="0"
                        onChange={(e: number) => handleChange(e, "horizontal")}
                        defaultValue={
                            heedElementManager.selected_style ?
                                heedElementManager.selected_style.left
                                : ""
                        }/>
                    <InputRightElement>
                        <Text color={'white'}>X</Text>
                    </InputRightElement>
                </InputGroup>
                <InputGroup>
                    <DraggableInput
                        label={<p>X</p>}
                        name={'vertical'}
                        type={"number"}
                        placeholder="0"
                        onChange={(e) => handleChange(e, "vertical")}
                        defaultValue={
                            heedElementManager.selected_style ?
                                heedElementManager.selected_style.top
                                : ""
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
