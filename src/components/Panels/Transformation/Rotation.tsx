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
import control from "../../../system/Commands/Moveable";
import {ChangeEvent} from "react";

function Rotation(): JSX.Element {

    function handleChange(event: ChangeEvent ){
        const target = event.target as HTMLInputElement;
        control.execute("rotate", [target.value])
    }
    
    return (
        <>
            <HStack spacing={4} w={"100%"}>
                <InputGroup>
                    <Input name={'rotation'}
                           type={"number"}
                           placeholder="0"
                           onChange={handleChange}
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
