// import react components 
import * as React from 'react';
import FitTracHeader from './components/FitTracHeader/FitTracHeader';
import Workouts from './components/Workouts/Workouts';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Users from '@material-ui/icons/AccountCircle';

// set up states for the main app (will mostly be passed down as props)
interface IState {
  workoutId: number,
  workoutName: string,
  workoutDescription: string,
  isDarkMode: boolean,
  hubConnection: any,
  usersCountCurrent: any,
}

class App extends React.Component<{}, IState> {
  // setup signal r and constructor for states
  public signalR = require("@aspnet/signalr");
  public constructor(props: any) {
    super(props);
    this.state = {
      workoutId: 0,
      workoutName: "",
      workoutDescription: "",
      isDarkMode: false,
      hubConnection: new this.signalR.HubConnectionBuilder().withUrl("https://fittracapisqlite.azurewebsites.net/hub").build(),
      usersCountCurrent: 0,
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
          {/* Header component */}
          <FitTracHeader darkModeToggle={this.darkModeToggle} isDarkMode={this.state.isDarkMode}/>
          {/* Display, create, and edit workouts component */}
          <Workouts isDarkMode={this.state.isDarkMode}/>
          {/* G translate + signal r component */}
          <div id="google_translate_element" style={{position: 'absolute', bottom: 0}}>
            <div style={{marginLeft: 16}}><b><Users/> {this.state.usersCountCurrent}</b></div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  // controller for light and dark mode 
  private darkModeToggle = () => {
    this.setState({isDarkMode: !this.state.isDarkMode})
  }

  // signal r for showing user count (currently active)
  public componentDidMount = () => {
    this.state.hubConnection.on("Connected", ()  => {
      console.log('A new user has connected to the hub.');
    });

    this.state.hubConnection.on("ShowUserCounts", (usersCount: any)  => {
      console.log(usersCount);
      this.setState({usersCountCurrent:usersCount});
    });

    this.state.hubConnection.start().then(() => this.state.hubConnection.invoke("BroadcastMessage"));
  }
}

export default App;
