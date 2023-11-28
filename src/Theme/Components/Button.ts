import {defineStyle, defineStyleConfig} from "@chakra-ui/styled-system";


const shared = {
    px: "14px",
    color: 'white',
    fontWeight: '500',
    fontSize: "12px",
    h: "42px",
    borderRadius: "13px",
}

const primary = defineStyle({
    ...shared,
    background: 'app.blue.light',
})

const secondary = defineStyle({
    ...shared,
    background: 'app.blue.dark',
})

export const ButtonTheme = defineStyleConfig({
    variants: {
        primary,
        secondary
    },
})