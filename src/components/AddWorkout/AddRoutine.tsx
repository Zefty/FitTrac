import * as React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';

interface IProps{
    
}

interface IState{
    open: boolean,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: 10,
      right: 30,
      bottom: 30,  
      position: 'fixed'
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

export default class AddRoutine extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            open: false,
        }
    }

    public render() {
        return(
            <this.AddRoutineButton/>
            
            
        )
    }


    private AddRoutineButton = () => {
        const classes = useStyles();
      
        return (
          <div>
            <Fab color="secondary" aria-label="add" className={classes.fab} onClick={() => { console.log('onClick');}}>
              <AddIcon />
            </Fab>
          </div>
        );
      }


}

// import * as React from 'react'
// import {Tooltip, Button, Dialog,  }from '@material-ui/core'
// import {AppBar, Toolbar, IconButton, Typography, Slide} from "@material-ui/core"
// import AddIcon from '@material-ui/icons/Add'
// import CloseIcon from "@material-ui/icons/Close"

// interface IState{
//     open: any
// }

// export default class NewAnswerButton extends React.Component<any, IState>{
//     constructor(props: any){
//         super(props);
//         this.state = ({
//             open: false
//         })
//     }

//     render(){
//         return(
//             <div>
//                 <div className="addIcon">
//                     <Tooltip title="Add Answer">
//                         <Button variant="fab" color="secondary" onClick={this.onClickAddAnswer}>
//                             <AddIcon />
//                         </Button>
//                     </Tooltip>
//                 </div>

//                 <Slide direction="up" in={this.state.open}>
//                     <Dialog>
//                         <div style={{paddingTop:"0px"}}>
//                             <AppBar style={{position: "relative"}}>
//                                 <Toolbar>
//                                     <IconButton
//                                         color="inherit"
//                                         onClick={this.handleClose}
//                                         aria-label="Close"
//                                     >
//                                         <CloseIcon />
//                                     </IconButton>
//                                     <Typography variant="h6" color="inherit" style={{flex: 1}}>
//                                         Post
//                                     </Typography>
//                                 </Toolbar>
//                             </AppBar>
//                             <div className="fullscreen">
                        
//                             </div>
//                         </div>
//                     </Dialog>
//                 </Slide>
//             </div>
//         )
//     }

//     private onClickAddAnswer = () => {
//         this.setState({open: true})
//     }

//     private handleClose = () => {
//         this.setState({open: false})
//     }
   
// }