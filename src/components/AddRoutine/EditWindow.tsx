import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps{
    Open: boolean,
    handleOpen: any, 
    handleClose: any 
}

interface IState{
    
}

export default class EditWindow extends React.Component<IProps, IState> {
    public constructor(props:any) {
        super(props);
        this.state = {
            
        }
    }

    public render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.props.handleOpen}>
                Slide in alert dialog
                </Button>
                
                <Dialog
                maxWidth={"md"}
                open={this.props.Open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle id="alert-dialog-slide-title">{"Add Workout Routine"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Add your workout routine. You can add exercises with the + button and 
                        type in the number of sets, time, and etc in the boxes. 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                    Done
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        );
    }
}