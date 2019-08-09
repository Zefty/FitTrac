import * as React from 'react';
import FitTracHeader from './components/FitTracHeader/FitTracHeader';
import AddWorkoutButton from './components/AddWorkout/AddWorkoutButton';
import Workouts from './components/Workouts/Workouts';
import EditWindow from './components/AddWorkout/EditWindow'

interface IState {
  openWindow: boolean,
  data: string,
}

class App extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      openWindow: false,
      data: ""
    };
  }

  public render() {
    return (
      <div>
        
        <FitTracHeader/>



        
        <Workouts handleOpen={this.handleOpen}/>
        <EditWindow openWindow={this.state.openWindow} handleOpen={this.handleOpen} handleClose={this.handleClose}/>
        <AddWorkoutButton handleOpen={this.handleOpen}/>



      </div>
    );
  }

  public handleOpen = () => {
    this.setState({openWindow: true})
  }

  public handleClose = () => {
    this.setState({openWindow: false})
  }
}

export default App;
