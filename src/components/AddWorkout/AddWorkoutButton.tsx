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
          <EditWindow
          openWindow={this.state.openWindow} 
          handleClose={this.handleClose}
          updateWorkout={this.props.updateWorkout}
          workoutId={0} 
          workoutName={""}
          workoutDescription={""}
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

    
  public createNew = () => {
    this.setState({openWindow: true})
  }

  public handleClose = () => {
    this.setState({openWindow: false})
  }
}

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

