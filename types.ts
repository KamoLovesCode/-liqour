export interface ThemeColor {
  name: string;
  hex: string;
}

export interface Theme {
  primary: string; // hex color
  isDarkMode: boolean;
}

export interface ThemeContextType {
  theme: Theme;
  setThemeColor: (colorHex: string) => void;
  toggleDarkMode: () => void;
  setThemeByName: (name: string) => void;
}
