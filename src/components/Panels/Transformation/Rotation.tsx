import {
    HStack,
    Input,
    InputGroup,
    InputLeftElement
} from '@chakra-ui/react'
import { UpDownIcon } from '@chakra-ui/icons'
import {observer} from "mobx-react";
import heedElementManager from "../../../mobx/Managers/HeedElementManager.ts";
import AblesUtils from "../../../system/Ables/ables.utils.ts";

function Rotation(): JSX.Element {

    if( heedElementManager.selected_style?.transform){
        console.log("STYLE",AblesUtils.parse_object_transform(heedElementManager.selected_style.transform))
    }
    return (
        <>
            <HStack spacing={4} w={"100%"}>
                <InputGroup>
                    <Input name={'rotation'}
                           color={'white'}
                           placeholder="0"
                           defaultValue={
                               heedElementManager.selected_style ?
                                   AblesUtils.parse_css_transform(heedElementManager.selected_style.transform).rotation
                                    : ""
                           }/>
                    <InputLeftElement>
                        <UpDownIcon color={'white'} />
                    </InputLeftElement>
                </InputGroup>
            </HStack>
        </>
    )
}

export default observer(Rotation)
