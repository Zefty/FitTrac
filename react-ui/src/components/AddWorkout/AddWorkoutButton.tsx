// First FitTrac Component 
// import react components 
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditWindow from '../EditWindow/EditWindow';

interface IProps{
  updateWorkout: any,
  isDarkMode: boolean,
}

interface IState{
  openWindow: boolean,
}

export default class AddWorkoutButton extends React.Component<IProps, IState>{
  constructor(props: any) {
      super(props)
      this.state = {
        openWindow: false
      }
  }

  public render() {
      return(
        <div>
          {/* workout id = 0 signifies creation of new workout*/}
          <EditWindow
          openWindow={this.state.openWindow} 
          handleClose={this.handleClose}
          updateWorkout={this.props.updateWorkout}
          workoutIdx={-1} 
          workoutName={""}
          workoutDescription={""}
          exerciseData={[{exerciseName: "", exerciseSets: "", exerciseReps: ""}]}
          isDarkMode={this.props.isDarkMode}
          />
          <this.AddWorkoutButton/>
        </div> 
      )
  }

  private AddWorkoutButton = () => {
      const classes = useStyles();
      return (
        <div>
          <Fab style={{background: '#B01D39', zIndex:9999}} aria-label="add" className={classes.fab} onClick={this.createNew}>
            <AddIcon style={{color: 'white'}}/>
          </Fab>
        </div>
      );
  }

  // create new workout 
  public createNew = () => {
    this.setState({openWindow: true})
  }

  // passing into editworkout on how to close itself 
  public handleClose = () => {
    this.setState({openWindow: false})
  }
}

// mat ui theming 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: 8,
      right: 0,
      bottom: 0,  
      position: 'fixed',
      
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
      
    },
  }),
);

