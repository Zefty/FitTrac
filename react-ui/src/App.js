import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from './routes/SignIn/SignIn';
import SignUp from './routes/SignUp/SignUp';
import Home from './routes/Home/Home';
import Workouts from './routes/Workouts/Workouts';
import Trends from './routes/Trends/Trends';
import Settings from './routes/Settings/Settings';
import Drawer from './components/Drawer/Drawer';
import Resizer from './components/Resizer/Resizer';
import FitTracTheme from './FitTracTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ProvideAuth from './api/firebase';
import PrivateRoute from './routes/PrivateRoute';

function App() {
    const [darkMode, toggleDarkMode] = useState(false);
    const [drawer, toggleDrawer] = useState(window.innerWidth >= 1200 ? true : false);
    const [desktopMode, toggleDesktopMode] = useState(window.innerWidth >= 1200 ? true : false);

    const handleWindowSizeChange = () => {
        toggleDesktopMode(window.innerWidth >= 1200)
        toggleDrawer(window.innerWidth >= 1200);
    };

    const fitTracTheme = FitTracTheme(darkMode);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (
        <ThemeProvider theme={fitTracTheme}>
            <CssBaseline />
            <ProvideAuth>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <SignIn />
                        </Route>
                        <Route exact path="/signup">
                            <SignUp />
                        </Route>
                        <React.Fragment>
                            <Drawer desktopMode={desktopMode} drawer={drawer} toggleDrawer={() => toggleDrawer(!drawer)} />
                            <Resizer drawer={drawer} desktopMode={desktopMode}>
                                <PrivateRoute exact path="/home">
                                    <Home
                                        darkMode={darkMode}
                                        toggleDarkMode={() => toggleDarkMode(!darkMode)}
                                        toggleDrawer={() => toggleDrawer(!drawer)} />
                                </PrivateRoute>
                                <PrivateRoute exact path="/workouts">
                                    <Workouts
                                        darkMode={darkMode}
                                        toggleDarkMode={() => toggleDarkMode(!darkMode)}
                                        toggleDrawer={() => toggleDrawer(!drawer)} />
                                </PrivateRoute>
                                <PrivateRoute exact path="/trends">
                                    <Trends
                                        darkMode={darkMode}
                                        toggleDarkMode={() => toggleDarkMode(!darkMode)}
                                        toggleDrawer={() => toggleDrawer(!drawer)} />
                                </PrivateRoute>
                                <PrivateRoute exact path="/settings">
                                    <Settings
                                        darkMode={darkMode}
                                        toggleDarkMode={() => toggleDarkMode(!darkMode)}
                                        toggleDrawer={() => toggleDrawer(!drawer)} />
                                </PrivateRoute>
                            </Resizer>
                        </React.Fragment>
                    </Switch>
                </Router>
            </ProvideAuth>
        </ThemeProvider>
    );
}
export default App;
