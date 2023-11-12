import {
    HStack,
    Input,
    InputGroup,
    InputLeftElement
} from '@chakra-ui/react'
import { UpDownIcon } from '@chakra-ui/icons'

function Rotation(): JSX.Element {
    return (
        <>
            <HStack spacing={4} w={"100%"}>
                <InputGroup>
                    <Input name={''} color={'white'} placeholder="0" w={'100%'} />
                    <InputLeftElement>
                        <UpDownIcon color={'white'} />
                    </InputLeftElement>
                </InputGroup>
            </HStack>
        </>
    )
}

export default Rotation
