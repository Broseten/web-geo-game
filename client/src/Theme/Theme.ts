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
      // primary: {
      //   50: '#e0f7f9',
      //   100: '#d1edef',
      //   200: '#a3dbe0',
      //   300: '#75c9d1',
      //   400: '#47b7c2',
      //   500: '#40bbcd',
      //   600: '#369aa6',
      //   700: '#2c7980',
      //   800: '#22575a',
      //   900: '#183634'
      // },
      primary: {
        50: '#e0f2f2',
        100: '#b3dcdc',
        200: '#80cccc',
        300: '#4db8b8',
        400: '#26a3a3',
        500: '#097575',
        600: '#086b6b',
        700: '#065c5c',
        800: '#054d4d',
        900: '#033838'
      },
      // secondary: {
      //   50: "#fff3e0",
      //   100: '#ffebd6',
      //   200: '#ffd7ad',
      //   300: '#ffc284',
      //   400: '#ffae5b',
      //   500: "#f4bb6d",
      //   600: "#fb8c00",
      //   700: "#f57c00",
      //   800: "#ef6c00",
      //   900: "#e65100",
      // }
      secondary: {
        50: '#e0eaf0',
        100: '#b3c8d9',
        200: '#80a3bf',
        300: '#4d7ea5',
        400: '#265f8f',
        500: '#004680',
        600: '#003e73',
        700: '#003563',
        800: '#002c53',
        900: '#001d3a'
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
