// import react components 
import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import Workouts from './components/Workouts/Workouts';
import Trends from './components/Trends/Trends'
import Settings from './components/Settings/Settings'
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
// import Users from '@material-ui/icons/AccountCircle';

interface IState {
  isDarkMode: boolean
}

class App extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      isDarkMode: false
    };
  }

  // show main component on DOM 
  public render() {
    const theme = createMuiTheme({
      palette: {
        type: (this.state.isDarkMode ? 'dark' : 'light'),
      },
    });
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <this.home />
              </Route>
              <Route path="/dashboard">
                <Workouts theme={theme} darkModeToggle={this.darkModeToggle} isDarkMode={this.state.isDarkMode}/>
              </Route>
              <Route path="/trends">
                <Trends theme={theme} darkModeToggle={this.darkModeToggle} isDarkMode={this.state.isDarkMode}/>
              </Route>
              <Route path="/settings">
                <Settings theme={theme} darkModeToggle={this.darkModeToggle} isDarkMode={this.state.isDarkMode}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }

  // controller for light and dark mode 
  private darkModeToggle = () => {
    this.setState({isDarkMode: !this.state.isDarkMode})
  }

  public home = () => {
    return (<div></div>)
  }



  // public test = (theme: any) => {
  //   // create theme 

  //   return (
  //     <MuiThemeProvider theme={theme.theme}>
  //       <CssBaseline />
  //       <div>
  //         {/* Display, create, and edit workouts component */}
  //         <Workouts darkModeToggle={this.darkModeToggle} isDarkMode={this.state.isDarkMode} />
  //         {/* G translate + signal r component */}
  //         <div id="google_translate_element" style={{ position: 'absolute', bottom: 0 }}>
  //           <div style={{ marginLeft: 16 }}></div>
  //         </div>
  //       </div>
  //     </MuiThemeProvider>
  //   );
  // }
}

export default App;
