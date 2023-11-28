import {observer} from "mobx-react"
import {Text, HStack, Input, VStack} from '@chakra-ui/react'
import PanelContainer from '../PanelContainer/PanelContainer'
import heedElementManager from "../../../mobx/Managers/HeedElementManager.ts";


function Properties(): JSX.Element {
    console.log("ATTRS: ", heedElementManager.selected_attributes)
    return (
        <>
            <PanelContainer title={'Properties'}>
                <VStack spacing={3} alignItems={'flex-start'}>
                    <HStack w={'100%'}>
                        <Text color={'white'}>Id: </Text>
                        <Input
                            name={'id'}
                            placeholder={'id'}
                            onChange={(e) => heedElementManager.update_id(e)}
                            value={
                                heedElementManager.selected_element ?
                                    heedElementManager.selected_attributes?.id : ""
                            }/>
                    </HStack>

                    <HStack w={'100%'}>
                        <Text color={'white'}>Name: </Text>
                        <Input name={'name'} color={'white'} placeholder={'name'}/>
                    </HStack>
                </VStack>
            </PanelContainer>
        </>
    )
}

export default observer(Properties)
