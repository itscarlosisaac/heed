import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

export const InputTheme = defineMultiStyleConfig({
  variants: {
    outline: {
      field: {
        borderColor: '#3F5073'
      }
    }
  },
  defaultProps: {
    size: 'md'
  }
})
