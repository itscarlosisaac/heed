import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  accordionAnatomy.keys
)

const baseStyle = definePartsStyle({
  container: {
    border: 'none'
  },
  button: {
    // bg: '#0D111A',
    border: 'none',
    color: 'app.dark_blue.text',
    fontFamily: 'Roboto',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '20px',
    bg: 'app.gray.dark',
    _hover: {
      // bg: '#0D111A'
    }
  },
  panel: {
    border: 'none',
    borderColor: 'gray.200',
    background: '#ffffff'
  },
  icon: {
    fontSize: '20px',
    background: 'transparent',
    color: 'app.dark_blue.text',
  }
})

export const AccordionTheme = defineMultiStyleConfig({ baseStyle })
