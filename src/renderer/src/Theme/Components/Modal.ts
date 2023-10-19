import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

export const ModalTheme = defineMultiStyleConfig({
  sizes: {
    welcomeModal: {
      dialog: {
        borderRadius: 0,
        h: '400px',
        w: '600px'
      }
    }
  }
})
