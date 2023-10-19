import { extendTheme } from '@chakra-ui/react'
import { ModalTheme } from './Components/Modal'

const ChakraCustomTheme = extendTheme({
  components: {
    Modal: ModalTheme
  }
})

export default ChakraCustomTheme
