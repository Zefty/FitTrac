import * as React from 'react';
import Header from './components/Header/Header';
import SearchAppBar from './components/SearchAppBar/SearchAppBar';
import Drawer from './components/Drawer/Drawer';
import AddRoutineButton from './components/AddRoutine/AddRoutineButton';
import AddRoutine from './components/AddRoutine/AddRoutine';
import Routines from './components/Routines/Routines';
import EditWindow from './components/AddRoutine/EditWindow'

interface IState {
  openWindow: boolean,
}




class App extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      openWindow: false,
    };
  }

  public handleOpen = () => {
    this.setState({openWindow: true})
  }

  public handleClose = () => {
    this.setState({openWindow: false})
  }

  public render() {
    return (
      <div>
        {/* <Header/> */}
        <SearchAppBar/>
        {/* <Drawer/> */}
        <div className="container">
          <div className="row">
            <div className="col">
              
            </div>
          </div>
        </div>



        <Routines/>
        {/* <AddRoutine/> */}
        {/* Separate button and window into two components so do not need AddRoutine */}
        <EditWindow openWindow={this.state.openWindow} handleOpen={this.handleOpen} handleClose={this.handleClose}/>
        <AddRoutineButton handleOpen={this.handleOpen}/>



      </div>
    );
  }
}

export default App;
