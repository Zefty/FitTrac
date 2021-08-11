import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './routes/Home/Home'
import Workouts from './routes/Workouts/Workouts';
import Trends from './routes/Trends/Trends'
import Settings from './routes/Settings/Settings'
import Drawer from './components/Drawer/Drawer';
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

function App() {
    const [darkMode, toggleDarkMode] = useState(false);
    const [drawer, toggleDrawer] = useState(window.innerWidth >= 1200 ? true : false);
    const [desktopMode, toggleDesktopMode] = useState(window.innerWidth >= 1200 ? true : false);

    const theme = createTheme({
        palette: {
            type: darkMode ? 'dark' : 'light',
            background: {
                paper: darkMode ? '#282c34' : '#ffffff',
                default: darkMode ? '#282c34' : '#ffffff'
            }
        },
    });   
    const useStyles = makeStyles(styles(theme));
    const classes = useStyles();

    const handleWindowSizeChange = () => {
        toggleDesktopMode(window.innerWidth >= 1200)
        toggleDrawer(window.innerWidth >= 1200);
    }
    
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
 
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Drawer desktopMode={desktopMode} drawer={drawer} toggleDrawer={() => toggleDrawer(!drawer)} />
                <div className={clsx(classes.app, { [classes.appShift]: drawer && desktopMode })}>
                    <Switch>
                        <Route exact path="/">
                            <Home 
                            theme={theme} 
                            darkMode={darkMode} 
                            toggleDarkMode={() => toggleDarkMode(!darkMode)} 
                            toggleDrawer={() => toggleDrawer(!drawer)} />
                        </Route>
                        <Route path="/workouts">
                            <Workouts 
                            theme={theme} darkMode={darkMode} 
                            toggleDarkMode={() => toggleDarkMode(!darkMode)}
                            toggleDrawer={() => toggleDrawer(!drawer)} />
                        </Route>
                        <Route path="/trends">
                            <Trends  
                            theme={theme} 
                            darkMode={darkMode} 
                            toggleDarkMode={() => toggleDarkMode(!darkMode)}
                            toggleDrawer={() => toggleDrawer(!drawer)} />
                        </Route>
                        <Route path="/settings">
                            <Settings 
                            theme={theme} 
                            darkMode={darkMode} 
                            toggleDarkMode={() => toggleDarkMode(!darkMode)}
                            toggleDrawer={() => toggleDrawer(!drawer)} />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </ThemeProvider>
    );
}

const styles = (theme) => {
    return {
        app: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appShift: {
            marginLeft: 300,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        '@global': {
            '*::-webkit-scrollbar': {
                width: '0.7em'
            },
            '*::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '*::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.type === 'dark' ? '#ffffff' : '#282c34',
                borderRadius: 20,
            },
            // '*::-webkit-scrollbar-thumb:hover': {
            // }
        }
    }
}

export default App;
