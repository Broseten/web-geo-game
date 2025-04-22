export interface ThemeColors {
   [key: string]: {
     [shade: string]: string;
   };
 }
 
 export interface Config {
   languages: Record<string, string>;
   theme: {
     colors: ThemeColors;
   };
 }
 