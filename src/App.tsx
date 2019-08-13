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



        {/* handleOpen={this.handleOpen} */}
        <Workouts isDarkMode={this.state.isDarkMode}/>
        {/* <EditWindow 
        openWindow={this.state.openWindow} 
        workoutId={this.state.workoutId} 
        workoutName={this.state.workoutName}
        workoutDescription={this.state.workoutDescription}
        handleOpen={this.handleOpen} 
        handleClose={this.handleClose}
        style={{position: 'absolute', bottom: '0'}}
        /> */}
        {/* <AddWorkoutButton updateWorkout={Workouts.updateWorkouts()}/> */}
        <div id="google_translate_element"></div>



      </div>
    );
  }

  private darkModeToggle = () => {
    this.setState({isDarkMode: !this.state.isDarkMode})
    console.log(this.state.isDarkMode)
  }

  

  // public handleOpen = (workoutId: number, workoutName: string, workoutDescription: string) => {

  //   this.setState({workoutId: workoutId})
  //   this.setState({workoutName: workoutName})
  //   this.setState({workoutDescription: workoutDescription})
  //   this.setState({openWindow: true})
    
    
  // }

  // public handleClose = () => {
  //   // this.setState({workoutId: -1})
  //   this.setState({openWindow: false})
  // }
}

export default App;
