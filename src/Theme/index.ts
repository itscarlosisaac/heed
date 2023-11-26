import { extendTheme } from '@chakra-ui/react'
import { ModalTheme, AccordionTheme, InputTheme } from './Components'

const ChakraCustomTheme = extendTheme({
  components: {
    Modal: ModalTheme,
    Accordion: AccordionTheme,
    Input: InputTheme
  }
})

export default ChakraCustomTheme
