import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { buttonTheme } from './ButtonTheme';

// TODO generate the types? https://www.chakra-ui.com/guides/theming-custom-colors

// Add color mode config
const config: ThemeConfig = {
  //initialColorMode: 'dark',
  useSystemColorMode: false,
}

const customTheme = initTheme();

export function initTheme() {
  return {
    config: config,
    fonts: {
      heading: '"Avenir Next", sans-serif',
      body: '"Open Sans", sans-serif',
    },
    colors: {
      primary: {
        50: '#e0f2f2',
        100: '#a7c8c7',
        200: '#80cccc',
        300: '#4db8b8',
        400: '#26a3a3',
        500: '#097575',
        600: '#086b6b',
        700: '#065c5c',
        800: '#054d4d',
        900: '#033838'
      },
      // primary: {
      //   50: '#e3f2fd',
      //   100: '#bbdefb',
      //   200: '#90caf9',
      //   300: '#64b5f6',
      //   400: '#42a5f5',
      //   500: '#2196f3',
      //   600: '#1e88e5',
      //   700: '#1976d2',
      //   800: '#1565c0',
      //   900: '#0d47a1'
      // },
      secondary: {
        50: '#fff7e6',
        100: '#ffeacc',
        200: '#ffd8a3',
        300: '#ffc57a',
        400: '#ffb352',
        500: '#f4bb6d',
        600: '#cc8e00',
        700: '#996b00',
        800: '#664700',
        900: '#332400'
      },
      gray: {
        50: '#f9f9f9',
        100: '#f2f2f2',
        200: '#e6e6e6',
        300: '#d9d9d9',
        400: '#bfbfbf',
        500: '#a6a6a6',
        600: '#8c8c8c',
        700: '#595959',
        800: '#404040',
        900: '#292929'
      }
    },
    hr: {
      color: "white"
    },
    components: {
      Button: buttonTheme
    },
    // sizes: {
    //     xl: {
    //         h: '56px',
    //         fontSize: 'lg',
    //         px: '32px',
    //         bg: '#9747FF'
    //     },
    // }
  };
}



export default extendTheme(customTheme);
