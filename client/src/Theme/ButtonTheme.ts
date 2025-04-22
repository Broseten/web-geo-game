import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

// TODO use this?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const custom_solid = defineStyle((props: { colorScheme: any; }) => ({
   bg: `${props.colorScheme}`,
   color: "white",
   borderWidth: "1px",
   borderColor: `${props.colorScheme}`,
   _hover: {
      bg: "transparent",
      color: `${props.colorScheme}`,
   },
}));

// TODO use this?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const custom_outline = defineStyle((props: { colorScheme: any; }) => ({
   bg: "transparent",
   borderColor: `${props.colorScheme}`,
   borderWidth: "1px",
   color: `${props.colorScheme}`,
   _hover: {
      bg: `${props.colorScheme}`,
      color: "white",
   },
}));

// const outline = defineStyle({
//    // border: '2px dashed', // change the appearance of the border
//    // borderRadius: 0, // remove the border radius
//    // fontWeight: 'semibold', // change the font weight
// });

export const buttonTheme = defineStyleConfig({
   variants: { custom_solid, custom_outline },
})
