import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import Icon from '@material-ui/core/Icon';
// import DeleteIcon from '@material-ui/icons/Delete';
// import NavigationIcon from '@material-ui/icons/Navigation';

import EditWindow from './EditWindow';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: 10,
      right: 50,
      bottom: 50,  
      position: 'fixed'
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);


interface IProps{
  handleOpen: any
}

interface IState{
  // setOpen: boolean
}

export default class AddRoutineButton extends React.Component<IProps, IState>{
  constructor(props: any) {
      super(props)
      this.state = {
        // setOpen: false
      }
  }

  public render() {
      return(
        <div>
          <this.AddRoutineButton/>
        </div> 
      )
  }


  private AddRoutineButton = () => {
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


// export default function AddRoutineButton() {
//   const classes = useStyles();

//   return (
//     <div>

//       <Fab color="secondary" aria-label="add" className={classes.fab} onClick={() => { console.log('onClick'); }}>
//         <AddIcon />
//       </Fab>
//     </div>
//   );
// }