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

    return (
        <>
            <HStack spacing={4} w={"100%"}>
                <InputGroup>
                    <Input name={'rotation'}
                           placeholder="0"
                           defaultValue={
                               heedElementManager.selected_style ?
                                   AblesUtils.decompose_matrix(heedElementManager.selected_style.transform).rotate
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
