import { extendTheme, type ThemeConfig } from '@chakra-ui/react';


// Add color mode config
const config: ThemeConfig = {
  //initialColorMode: 'dark',
  useSystemColorMode: false,
}

const customTheme = {
  config: config,
  fonts: {
    heading: '"Avenir Next", sans-serif',
    body: '"Open Sans", sans-serif',
  },
  colors: {
    brand: {
      grey: '#292929',
      blue: '#a7c8c7',
      teal: '#097575',
      red: '#e63b44',
      orange: '#fea948',
      yellow: '#f4bb6d',
      off: '#f9faf0' // an off-white
    }
  },
}

  // // sizes: {
  // //     xl: {
  // //         h: '56px',
  // //         fontSize: 'lg',
  // //         px: '32px',
  // //         bg: '#9747FF'
  // //     },
  // // }


export default extendTheme(customTheme);