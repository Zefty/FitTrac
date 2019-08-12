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

}

class App extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      // openWindow: false,
      workoutId: -1,
      workoutName: "",
      workoutDescription: "",
    };
  }

  public render() {
    return (
      <div>
        
        <FitTracHeader/>



        {/* handleOpen={this.handleOpen} */}
        <Workouts/>
        {/* <EditWindow 
        openWindow={this.state.openWindow} 
        workoutId={this.state.workoutId} 
        workoutName={this.state.workoutName}
        workoutDescription={this.state.workoutDescription}
        handleOpen={this.handleOpen} 
        handleClose={this.handleClose}
        /> */}
        {/* <AddWorkoutButton updateWorkout={Workouts.updateWorkouts()}/> */}



      </div>
    );
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
