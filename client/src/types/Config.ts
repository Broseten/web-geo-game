export interface ThemeColors {
  [key: string]: {
    [shade: string]: string;
  };
}

export interface Logo {
  src: string;
  link: string;
  alt: string;
  height: string;
}

export interface Config {
  languages: Record<string, string>;
  theme: {
    colors: ThemeColors;
  };
  logos: Logo[];
}
