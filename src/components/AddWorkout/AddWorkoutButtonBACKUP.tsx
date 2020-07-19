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
  openEditWindow: boolean,
}

export default class AddWorkoutButton extends React.Component<IProps, IState>{
  constructor(props: any) {
      super(props)
      this.state = {
        openEditWindow: false
      }
  }

  public render() {
      return(
        <div>
          {/* workout id = 0 signifies creation of new workout*/}
          {/* <EditWindow
          openEditWindow={this.state.openEditWindow} 
          handleClose={this.handleClose}
          updateWorkout={this.props.updateWorkout}
          isDarkMode={this.props.isDarkMode}
          workoutData={{workoutId: 0}}
          /> */}
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
    this.setState({openEditWindow: true})
  }

  // passing into editworkout on how to close itself 
  public handleClose = () => {
    this.setState({openEditWindow: false})
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

