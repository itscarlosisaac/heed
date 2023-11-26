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
    bg: '#0D111A',
    border: 'none',
    color: '#6B7A99',
    fontFamily: 'Roboto',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '20px',
    _hover: {
      bg: '#0D111A'
    }
  },
  panel: {
    border: 'none',
    borderColor: 'gray.200',
    background: '#1A2233'
  },
  icon: {
    fontSize: '20px',
    background: 'transparent',
    color: 'white'
  }
})

export const AccordionTheme = defineMultiStyleConfig({ baseStyle })
