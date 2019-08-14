import * as React from 'react';
import FitTracHeader from './components/FitTracHeader/FitTracHeader';
// import AddWorkoutButton from './components/AddWorkout/AddWorkoutButton';
import Workouts from './components/Workouts/Workouts';
// import EditWindow from './components/EditWindow/EditWindow'
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { dark } from '@material-ui/core/styles/createPalette';
import { CssBaseline } from '@material-ui/core';

interface IState {
  // openWindow: boolean,
  workoutId: number,
  workoutName: string,
  workoutDescription: string,
  isDarkMode: boolean,

}





class App extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      // openWindow: false,
      workoutId: -1,
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
      // style={{background: this.state.isDarkMode === true ? '#212121' : '#fff', minHeight: '100vh'}}
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <div>
          
          <FitTracHeader darkModeToggle={this.darkModeToggle} isDarkMode={this.state.isDarkMode}/>
          <Workouts isDarkMode={this.state.isDarkMode}/>
          <div style={{position:'absolute', bottom: 0, marginTop:'1rem'}}>
            <div id="google_translate_element"></div>
          </div>


          

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
