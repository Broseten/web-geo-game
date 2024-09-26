import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Add color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const customTheme = {
    config: config,
    // fonts: {
    //     heading: '"Avenir Next", sans-serif',
    //     body: '"Open Sans", sans-serif',
    // },
    // // colors: {
    // //     brand: {
    // //         bg: '#9747FF',
    // //         text: '#fff',
    // //         card: '#0A99FF',
    // //     },
    // // },
    // // sizes: {
    // //     xl: {
    // //         h: '56px',
    // //         fontSize: 'lg',
    // //         px: '32px',
    // //         bg: '#9747FF'
    // //     },
    // // }
 }

export default extendTheme(customTheme);