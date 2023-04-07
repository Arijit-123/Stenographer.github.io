import { createContext, useContext, useState } from "react";
import { themeOptions } from "../Styles/theme";
// import { defaultTheme } from "react-select";


const themeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const defaultTheme =JSON.parse(localStorage.getItem("theme")) || themeOptions[0].value;
    const [theme, setTheme] = useState(defaultTheme);

    const values = {
        theme,
        setTheme,
        defaultTheme
    };
    return( <themeContext.Provider value={values}>{children}</themeContext.Provider>
    )
}

export  const useTheme = () => useContext(themeContext)

