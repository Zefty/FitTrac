import * as React from 'react';
import FitTracHeader from './components/FitTracHeader/FitTracHeader';
// import AddWorkoutButton from './components/AddWorkout/AddWorkoutButton';
import Workouts from './components/Workouts/Workouts';
// import EditWindow from './components/EditWindow/EditWindow'

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
    return (
      <div style={{background: this.state.isDarkMode === true ? '#212121' : '#fff', minHeight: '100vh'}}>
        <FitTracHeader darkModeToggle={this.darkModeToggle} isDarkMode={this.state.isDarkMode}/>
        <Workouts isDarkMode={this.state.isDarkMode}/>
        <div id="google_translate_element"></div>
      </div>
    );
  }

  private darkModeToggle = () => {
    this.setState({isDarkMode: !this.state.isDarkMode})
    console.log(this.state.isDarkMode)
  }
}

export default App;
