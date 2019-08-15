import * as React from 'react';
import FitTracHeader from './components/FitTracHeader/FitTracHeader';
import Workouts from './components/Workouts/Workouts';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

interface IState {
  workoutId: number,
  workoutName: string,
  workoutDescription: string,
  isDarkMode: boolean,

}

class App extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      workoutId: 0,
      workoutName: "",
      workoutDescription: "",
      isDarkMode: false,
    };
  }

  public render() {
    const theme = createMuiTheme({
      palette: {
        type: (this.state.isDarkMode ? 'dark':'light'),
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <div>
          <FitTracHeader darkModeToggle={this.darkModeToggle} isDarkMode={this.state.isDarkMode}/>
          <Workouts isDarkMode={this.state.isDarkMode}/>
          <div id="google_translate_element" style={{position: 'absolute', bottom: 0}}></div>
        </div>
      </MuiThemeProvider>
    );
  }

  private darkModeToggle = () => {
    this.setState({isDarkMode: !this.state.isDarkMode})
    console.log(this.state.isDarkMode)
  }
}

export default App;
