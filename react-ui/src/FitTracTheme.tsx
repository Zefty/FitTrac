import { createTheme } from "@material-ui/core";

export default function FitTracTheme(darkMode: boolean) {
    return createTheme({
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
}