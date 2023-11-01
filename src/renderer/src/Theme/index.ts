import { extendTheme} from '@chakra-ui/react'
import { ModalTheme, AccordionTheme } from './Components'

const ChakraCustomTheme = extendTheme({
  components: {
    Modal: ModalTheme,
    Accordion: AccordionTheme
  }
})

export default ChakraCustomTheme
