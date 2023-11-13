import { Text, HStack, Input, VStack } from '@chakra-ui/react'
import PanelContainer from '../PanelContainer/PanelContainer'
import {useSelector} from "react-redux";
import {ApplicationRootState} from "../../../redux/store/store.ts";
import {IHeedElement} from "../../../redux/Editor/EditorInitialState.ts";

function Properties(): JSX.Element {
  const selector = useSelector<ApplicationRootState>(s => s.editor.selected) as IHeedElement;

  return (
    <>
      <PanelContainer title={'Properties'}>
        <VStack spacing={4} alignItems={'flex-start'}>
          <HStack w={'100%'}>
            <Text color={'white'}>Id: </Text>
            <Input name={'id'} color={'white'} placeholder={'id'} value={selector ? selector.id : ""} />
          </HStack>

          <HStack w={'100%'}>
            <Text color={'white'}>Name: </Text>
            <Input name={'name'} color={'white'} placeholder={'name'} />
          </HStack>
        </VStack>
      </PanelContainer>
    </>
  )
}

export default Properties
