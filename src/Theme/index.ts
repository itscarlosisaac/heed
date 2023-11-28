import { extendTheme } from '@chakra-ui/react'
import { ModalTheme, AccordionTheme, InputTheme } from './Components'
import colors from "./Colors.ts";
import {ButtonTheme} from "./Components/Button.ts";

const ChakraCustomTheme = extendTheme({
  colors: {
    app: colors
  },
  components: {
    Button: ButtonTheme,
    Modal: ModalTheme,
    Accordion: AccordionTheme,
    Input: InputTheme
  }
})

export default ChakraCustomTheme
