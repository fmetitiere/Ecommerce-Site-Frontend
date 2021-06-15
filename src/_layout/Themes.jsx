export const ThemeLight = {
    id: "ThemeLight",
    BackgroundColor: "rgb(255 255 255 / 98%);",
    primaryColor: "#EDEDED",
    topBarColor: "white",
    iconColor: "black",
    fontColor: "#616161",
    fontFamily: "Source Sans Pro, sans-serif",
    bodyColor: "#F9F9F9",
    boxShadow: "2px 2px 10px #dedede" ,
    button:{
      primaryColor: "#0AD4FA",
      primaryFontHoverColor: "#fff",
    }
  };
  
  export const ThemeDark = {
    id: "ThemeDark",
    BackgroundColor: "rgb(0 0 0 / 98%);",
    primaryColor: "#8F8F8F",
    topBarColor: "#212121",
    iconColor: "white",
    fontColor: "white",
    fontFamily: "Source Sans Pro, sans-serif",
    bodyColor: "#212121",
    boxShadow: "none",
    button:{
      primaryColor: "#fff",
      primaryFontHoverColor: "#616161",
    }
  };
  
  export const ThemeButtons = [
    {
      id: ThemeLight.id,
      background: "white",
      color: "white",
      name: "Light",
    },
    {
      id: ThemeDark.id,
      background: "black",
      color: "white",
      name: "Dark",
    },
  ];
  
  export const Themes = [ThemeLight, ThemeDark];
  