// import react components 
import * as React from 'react';
import Workouts from './components/Workouts/Workouts';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
// import Users from '@material-ui/icons/AccountCircle';

// set up states for the main app (will mostly be passed down as props)
interface IState {
  workoutId: number,
  workoutName: string,
  workoutDescription: string,
  isDarkMode: boolean
}

class App extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      workoutId: 0,
      workoutName: "",
      workoutDescription: "",
      isDarkMode: false
    };
  }

  // show main component on DOM 
  public render() {
    // create theme 
    const theme = createMuiTheme({
      palette: {
        type: (this.state.isDarkMode ? 'dark':'light'),
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <div>
          {/* Display, create, and edit workouts component */}
          <Workouts darkModeToggle={this.darkModeToggle} isDarkMode={this.state.isDarkMode}/>
          {/* G translate + signal r component */}
          <div id="google_translate_element" style={{position: 'absolute', bottom: 0}}>
            <div style={{marginLeft: 16}}></div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  // controller for light and dark mode 
  private darkModeToggle = () => {
    this.setState({isDarkMode: !this.state.isDarkMode})
  }
}

export default App;
