import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

interface IProps{
  handleOpen: any
}

interface IState{
  // setOpen: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: 10,
      right: 0,
      bottom: 0,  
      position: 'fixed'
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

export default class AddWorkoutButton extends React.Component<IProps, IState>{
  constructor(props: any) {
      super(props)
      this.state = {
        // setOpen: false
      }
  }

  public render() {
      return(
        <div>
          <this.AddWorkoutButton/>
        </div> 
      )
  }


  private AddWorkoutButton = () => {
      const classes = useStyles();
    
      return (
        <div>
          <Fab color="secondary" aria-label="add" className={classes.fab} onClick={this.props.handleOpen}>
            <AddIcon />
          </Fab>
        </div>
      );
    }
}
