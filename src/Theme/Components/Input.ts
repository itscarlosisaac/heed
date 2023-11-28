import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

export const InputTheme = defineMultiStyleConfig({
  variants: {
    editor: {
      field: {
        h: "42px",
        fontSize: "12px",
        borderRadius: "13px",
        background: "app.gray.light",
        borderColor: 'transparent',
        color: "app.dark_blue.text"
      }
    }
  },
  defaultProps: {
    variant: "editor"
  }
})