import { createContext, useContext, useState } from 'react';
import { createTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';
import { fittracthemecontext } from '../types/types';

const FitTracThemeContext = createContext({} as fittracthemecontext);

export const useFitTracTheme = () => {
    return useContext(FitTracThemeContext);
};

export default function FitTracThemeProvider(props: any) {
    const [darkMode, toggleDarkMode] = useState(false);
    const fitTracTheme = createTheme({
        palette: {
            type: darkMode ? 'dark' : 'light',
            background: {
                paper: darkMode ? '#282c34' : '#ffffff',
                default: darkMode ? '#282c34' : '#ffffff'
            },
            // common: {
            //     white: '#282c34'
            // }
        },
        transitions: {
            // duration: {
            //     leavingScreen: 3000,
            //     enteringScreen: 3000,
            // }
        },
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    '*::-webkit-scrollbar': {
                        width: '0.7em'
                    },
                    '*::-webkit-scrollbar-track': {
                        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: darkMode ? '#ffffff' : '#282c34',
                        borderRadius: 20,
                    },
                    // '*::-webkit-scrollbar-thumb:hover': {
                    // }
                }
            }
        }
    });
    const [deviceMode, toggleDeviceMode] = useState(window.innerWidth >= fitTracTheme.breakpoints.values.lg ? true : false);

    const fitTracThemeContext = {
        fitTracTheme,
        darkMode,
        toggleDarkMode,
        deviceMode,
        toggleDeviceMode,
    }
    console.log(fitTracTheme)
    return (
        <ThemeProvider theme={fitTracTheme}>
            <CssBaseline />
            <FitTracThemeContext.Provider value={fitTracThemeContext}>
                { props.children }
            </FitTracThemeContext.Provider>
        </ThemeProvider>
    )
}