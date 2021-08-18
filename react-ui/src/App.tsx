import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from './routes/SignIn/SignIn';
import SignUp from './routes/SignUp/SignUp';
import Home from './routes/Home/Home';
import Workouts from './routes/Workouts/Workouts';
import Trends from './routes/Trends/Trends';
import Settings from './routes/Settings/Settings';
import FitTracThemeProvider from './contexts/FitTracThemeContext';
import AuthProvier from './contexts/FirebaseContext';
import PrivateRoute from './routes/PrivateRoute';

function App() {
    return (
        <FitTracThemeProvider>
            <AuthProvier>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <SignIn />
                        </Route>
                        <Route exact path="/signup">
                            <SignUp />
                        </Route>
                        <PrivateRoute exact path="/home">
                            <Home />
                        </PrivateRoute>
                        <PrivateRoute exact path="/workouts">
                            <Workouts />
                        </PrivateRoute>
                        <PrivateRoute exact path="/trends">
                            <Trends />
                        </PrivateRoute>
                        <PrivateRoute exact path="/settings">
                            <Settings />
                        </PrivateRoute>
                    </Switch>
                </Router>
            </AuthProvier>
        </FitTracThemeProvider>
    );
}
export default App;
