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
import DraggableInput from "../../Form/DraggableInput.tsx";

function Rotation(): JSX.Element {
    function handleChange( value: number | ChangeEvent ){
        if( value ){
            control.execute("rotate", [value])
        }
    }
    
    return (
        <>
            <HStack spacing={4} w={"100%"}>
                <InputGroup>
                    
                    <DraggableInput
                        label={<p>Angle</p>}
                        name={'rotation'}
                        type={"number"}
                        placeholder="0"
                        onChange={handleChange}
                        defaultValue={
                            heedElementManager.selected_style ?
                                AblesUtils.decompose_matrix(heedElementManager.selected_style.transform).rotate
                                : ""
                        }/>
                    
                    {/*<Input name={'rotation'}*/}
                    {/*       type={"number"}*/}
                    {/*       placeholder="0"*/}
                    {/*       onChange={handleChange}*/}
                    {/*       defaultValue={*/}
                    {/*           heedElementManager.selected_style ?*/}
                    {/*               AblesUtils.decompose_matrix(heedElementManager.selected_style.transform).rotate*/}
                    {/*                : ""*/}
                    {/*       }/>*/}
                    <InputLeftElement>
                        <UpDownIcon color={'white'} />
                    </InputLeftElement>
                </InputGroup>
            </HStack>
        </>
    )
}

export default observer(Rotation)
