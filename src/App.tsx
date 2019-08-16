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
  hubConnection: any,
  usersCountCurrent: any,
}

class App extends React.Component<{}, IState> {
  public signalR = require("@aspnet/signalr");
  public constructor(props: any) {
    super(props);
    this.state = {
      workoutId: 0,
      workoutName: "",
      workoutDescription: "",
      isDarkMode: false,
      hubConnection: new this.signalR.HubConnectionBuilder().withUrl("https://fittracapi.azurewebsites.net/hub").build(),
      usersCountCurrent: 0,
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
          <div id="google_translate_element" style={{position: 'absolute', bottom: 0}}>
            <div style={{marginLeft: 16}}><b>👥{this.state.usersCountCurrent}</b></div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  private darkModeToggle = () => {
    this.setState({isDarkMode: !this.state.isDarkMode})
    console.log(this.state.isDarkMode)
  }

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
